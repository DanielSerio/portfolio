import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useState } from "react";
import z from "zod";

export type WeatherLocationInputMethod = "lookup" | "coordinates" | "manual";

const CoordinatesValidator = z
  .object({
    lat: z.coerce.number().gte(-90).lte(90),
    lng: z.coerce.number().gte(-180).lte(180),
  })
  .nullable();

export function useWeatherLocationForm() {
  const methodController = useState<WeatherLocationInputMethod>("lookup");
  const form = useForm<{ lat: number; lng: number }>({
    validate: zodResolver(CoordinatesValidator),
    mode: "uncontrolled",
  });

  return {
    methodController,
    form,
  };
}
