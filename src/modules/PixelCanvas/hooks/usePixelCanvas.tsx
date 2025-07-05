import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

export interface InitialPixelCanvasState {
  diameter: number;
  color: string;
  dimensions: [number, number];
}

const absoluteFallbackValues: InitialPixelCanvasState = {
  diameter: 24,
  color: "#000000",
  dimensions: [420, 420],
};

function usePixelCanvasState(initialState?: InitialPixelCanvasState) {
  const [diameter, setDiameter] = useState(
    initialState?.diameter ?? absoluteFallbackValues.diameter
  );
  const [color, setColor] = useState(
    initialState?.color ?? absoluteFallbackValues.color
  );
  const [dimensions, setDimensions] = useState<[number, number]>(
    initialState?.dimensions ?? absoluteFallbackValues.dimensions
  );

  const reset = useCallback(
    (withState?: InitialPixelCanvasState) => {
      const params = {
        ...absoluteFallbackValues,
      };

      if (withState) {
        params.diameter = withState.diameter;
        params.color = withState.color;
        params.dimensions = withState.dimensions;
      } else if (initialState) {
        params.diameter = initialState.diameter;
        params.color = initialState.color;
        params.dimensions = initialState.dimensions;
      }

      setDiameter(params.diameter);
      setColor(params.color);
      setDimensions(params.dimensions);
    },
    [initialState, setDiameter, setColor, setDimensions]
  );

  useEffect(() => {
    if (initialState) {
      reset();
    }
  }, [initialState]);

  const state = {
    diameter,
    color,
    dimensions,
  };

  const methods = {
    setDiameter,
    setColor,
    setDimensions,
    reset,
  };

  return [state, methods] as const;
}

type PixelCanvasState = ReturnType<typeof usePixelCanvasState>;

const PixelCanvasCtx = createContext<null | PixelCanvasState>(null);

export const PixelCanvasProvider = ({ children }: PropsWithChildren) => {
  const state = usePixelCanvasState();

  return (
    <PixelCanvasCtx.Provider value={state}>{children}</PixelCanvasCtx.Provider>
  );
};

export function usePixelCanvas() {
  if (PixelCanvasCtx === null) {
    throw new Error(`No provider for PixelCanvasCtx`);
  }

  return useContext(PixelCanvasCtx!)!;
}
