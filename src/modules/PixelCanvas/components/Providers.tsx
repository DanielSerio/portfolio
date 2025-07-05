import type { PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";
import { THEME } from "#store/theme";
import { PixelCanvasProvider } from "#pixel-canvas/hooks";

export function PixelCanvasProviders({ children }: PropsWithChildren) {
  return (
    <MantineProvider defaultColorScheme="dark" theme={THEME}>
      <PixelCanvasProvider>{children}</PixelCanvasProvider>
    </MantineProvider>
  );
}
