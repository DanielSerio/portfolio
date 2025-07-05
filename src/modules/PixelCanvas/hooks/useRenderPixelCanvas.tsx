import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type RefObject,
} from "react";
import type { usePixelCanvas } from "./usePixelCanvas";
import { getCanvasMethods } from "#pixel-canvas/utilities";

function useCursorState() {
  const [cursorPosition, setCursorPosition] = useState<
    [null, null] | [number, number]
  >([null, null]);
  const [cursorIsDown, setCursorIsDown] = useState(false);

  const state = {
    cursorPosition,
    cursorIsDown,
  };

  const methods = {
    setCursorPosition,
    setCursorIsDown,
  };

  return [state, methods] as const;
}

interface RenderCursorProps {
  context: CanvasRenderingContext2D;
  cursorX: number;
  cursorY: number;
  save: (callback: () => void) => void;
  draw: (callback: () => void) => void;
}

export interface RenderPixelCanvasProps {
  cursorCanvasRef: RefObject<HTMLCanvasElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  state: ReturnType<typeof usePixelCanvas>[0];
}

export function useRenderPixelCanvas({
  state,
  canvasRef,
  cursorCanvasRef,
}: RenderPixelCanvasProps) {
  const cursorCanvasCtx = useRef<null | CanvasRenderingContext2D>(null);
  const canvasCtx = useRef<null | CanvasRenderingContext2D>(null);
  const [
    { cursorIsDown, cursorPosition },
    { setCursorIsDown, setCursorPosition },
  ] = useCursorState();

  useEffect(() => {
    if (canvasRef.current) {
      canvasCtx.current = canvasRef.current.getContext(
        "2d"
      ) as CanvasRenderingContext2D;
    }
  }, [canvasRef.current]);

  useEffect(() => {
    if (cursorCanvasRef.current) {
      cursorCanvasCtx.current = cursorCanvasRef.current.getContext(
        "2d"
      ) as CanvasRenderingContext2D;
    }
  }, [cursorCanvasRef.current]);

  const renderCursor = useCallback(
    ({
      save,
      draw,
      clear,
      context,
    }: RenderCursorProps & { clear: () => void }) => {
      if (cursorPosition[0]) {
        clear();
        save(() => {
          draw(() => {
            context.strokeStyle = state.color;
            context.arc(...cursorPosition, state.diameter / 2, 0, Math.PI * 2);
            context.stroke();
          });
        });
      }
    },
    [state.diameter, state.color, cursorPosition]
  );

  const renderColor = useCallback(
    ({ save, draw, context }: RenderCursorProps) => {
      if (cursorPosition[0] && cursorIsDown) {
        save(() => {
          draw(() => {
            context.fillStyle = state.color;
            context.arc(...cursorPosition, state.diameter / 2, 0, Math.PI * 2);
            context.fill();
          });
        });
      }
    },
    [state.diameter, state.color, cursorPosition]
  );

  const canvasState = {};
  const canvasMethods = {
    onMouseDown: () => setCursorIsDown(true),
    onMouseUp: () => setCursorIsDown(false),
    onMouseMove: (ev: MouseEvent) => {
      if (canvasCtx.current && cursorCanvasCtx.current) {
        const context = canvasCtx.current;
        const cursorContext = cursorCanvasCtx.current;
        const canvas = canvasCtx.current.canvas!;
        const rect = canvas.getBoundingClientRect();
        const { save, draw } = getCanvasMethods(context);
        const cursorX = ev.clientX - rect.left;
        const cursorY = ev.clientY - rect.top;
        const {
          save: saveCursor,
          draw: drawCursor,
          clear,
        } = getCanvasMethods(cursorContext);
        setCursorPosition([cursorX, cursorY]);
        renderCursor({
          context: cursorContext,
          cursorX,
          cursorY,
          save: saveCursor,
          draw: drawCursor,
          clear,
        });
        renderColor({
          context,
          cursorX,
          cursorY,
          save,
          draw,
        });
      }
    },
    onMouseOut: () => {
      if (canvasCtx.current && cursorCanvasCtx.current) {
        const { clear } = getCanvasMethods(cursorCanvasCtx.current);
        setCursorPosition([null, null]);
        setCursorIsDown(false);
        clear();
      }
    },
  };

  return [canvasMethods, canvasState] as const;
}
