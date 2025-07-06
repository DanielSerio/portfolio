import { WeatherService } from "#weather/services";
import { useQueries, useQuery } from "@tanstack/react-query";

export interface GetWeatherParams {
  lat?: number | null;
  lng?: number | null;
}

function isAcceptableCoordinate(coord?: number | null) {
  return typeof coord === "number";
}

function coordsAreAcceptable(params: GetWeatherParams) {
  return (
    isAcceptableCoordinate(params.lat) && isAcceptableCoordinate(params.lng)
  );
}

export function useGetWeather(options: GetWeatherParams) {
  return useQuery({
    enabled: coordsAreAcceptable(options),
    queryKey: ["weather", "for", options.lat, options.lng],
    async queryFn() {
      return await WeatherService.getForecast(options.lat!, options.lng!);
    },
  });
}
