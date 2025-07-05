import type {
  ParsedLocationSearchResponse,
  RawLocationSearchResponse,
} from "#weather/types/location.response";
import { useQuery } from "@tanstack/react-query";

function toParsedResponse(
  rawItems: RawLocationSearchResponse
): ParsedLocationSearchResponse {
  return rawItems.map((raw) => ({
    ...raw,
    lat: +raw.lat,
    lon: +raw.lon,
    boundingbox: raw.boundingbox.map((n) => +n) as [
      number,
      number,
      number,
      number,
    ],
  }));
}

export function useSearchLocation(searchTerm: string | null) {
  return useQuery({
    enabled: !!searchTerm,
    queryKey: ["weather", "location", "search", searchTerm],
    async queryFn() {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchTerm!)}&format=json`
      );

      const rawResponse = (await response.json()) as RawLocationSearchResponse;

      return toParsedResponse(rawResponse);
    },
  });
}
