import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useState } from "react";
import z from "zod";

export type WeatherLocationInputMethod = "lookup" | "coordinates" | "manual";

const CoordinatesValidator = z
  .object({
    latitude: z.coerce.number().gte(-90).lte(90),
    longitude: z.coerce.number().gte(-180).lte(180),
  })
  .nullable();

export function useWeatherLocationForm() {
  const methodController = useState<WeatherLocationInputMethod>("lookup");
  const form = useForm({
    validate: zodResolver(CoordinatesValidator),
  });

  return {
    methodController,
    form,
  };
}
