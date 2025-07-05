import { z } from "zod";

const dimensionsMinError = "Canvas dimensions cannot be smaller than 200x200";
const dimensionsMaxError = "Canvas dimensions cannot be larger than 640x640";

const dimensionValidator = z.coerce
  .number()
  .int()
  .positive()
  .min(200, dimensionsMinError)
  .max(640, dimensionsMaxError);

export const PixelCanvasFormValidator = z.object({
  width: dimensionValidator,
  height: dimensionValidator,
  color: z
    .string()
    .regex(
      /^#[0-9a-fA-F]{6}$/,
      `Invalid color format. Must be a 7-character hex code (e.g., #RRGGBB)`
    ),
  diameter: z.coerce
    .number()
    .min(1, `Diameter must be at least 1`)
    .max(200, `Diameter cannot be greater than 200`),
});
