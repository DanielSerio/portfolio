import { PixelCanvasCanvas } from "./PixelCanvasCanvas";
import { PixelCanvasForm } from "./PixelCanvasForm";
import { PixelCanvasProviders } from "./Providers";

export function PixelCanvas() {
  return (
    <PixelCanvasProviders>
      <PixelCanvasForm />
      <PixelCanvasCanvas />
    </PixelCanvasProviders>
  );
}
