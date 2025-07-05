import { usePixelCanvas, useRenderPixelCanvas } from "#pixel-canvas/hooks";
import { Box, ScrollArea } from "@mantine/core";
import { useRef } from "react";

export function PixelCanvasCanvas() {
  const [state] = usePixelCanvas();
  const cursorCanvasRef = useRef<HTMLCanvasElement>(null);
  const ref = useRef<HTMLCanvasElement>(null);

  const [{ onMouseMove, onMouseOut, onMouseDown, onMouseUp }] =
    useRenderPixelCanvas({
      state,
      canvasRef: ref,
      cursorCanvasRef,
    });

  return (
    <ScrollArea w="100%" h="100%" px="md" mt="md">
      <Box
        w={state.dimensions[0]}
        h={state.dimensions[1]}
        style={{
          position: "relative",
          margin: "0 auto",
        }}
      >
        <canvas
          ref={cursorCanvasRef}
          onMouseMove={onMouseMove}
          onMouseOut={onMouseOut}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          style={{
            position: "absolute",
            zIndex: 2,
            display: "block",
            margin: "0 auto",
          }}
          width={state.dimensions[0]}
          height={state.dimensions[1]}
        />
        <canvas
          ref={ref}
          style={{
            position: "absolute",
            zIndex: 1,
            background: "white",
            display: "block",
            margin: "0 auto",
          }}
          width={state.dimensions[0]}
          height={state.dimensions[1]}
        />
      </Box>
    </ScrollArea>
  );
}
