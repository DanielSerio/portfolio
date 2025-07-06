import { getCurrentCoordinates } from "#weather/utilities";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import { useWeatherLocationForm } from "./useWeatherLocationForm";
import { useGetWeather } from "./useGetWeather";

function useWeatherState() {
  const [loc, setLoc] = useState<{ lat: number; lng: number } | null>(null);
  const {
    methodController: [method, setMethod],
    form,
  } = useWeatherLocationForm();

  const weatherQuery = useGetWeather({
    lat: loc?.lat ?? null,
    lng: loc?.lng ?? null,
  });

  const setFromWindowCoordinates = useCallback(async () => {
    const coords = await getCurrentCoordinates();
    const newLoc = {
      lat: +coords.lat.toFixed(2),
      lng: +coords.lng.toFixed(2),
    };

    form.setValues(newLoc);

    if (newLoc.lat !== null && newLoc.lng !== null) {
      setLoc(newLoc);
    }
  }, [form]);

  const setFromLocationSearch = useCallback(
    (location: { lat: number; lng: number; name: string }) => {
      const newLoc = {
        lat: +location.lat.toFixed(2),
        lng: +location.lng.toFixed(2),
      };

      form.setValues(newLoc);

      if (newLoc.lat !== null && newLoc.lng !== null) {
        setLoc(newLoc);
      }
    },
    [form]
  );

  const state = {
    location: loc,
    locationMethod: method,
    weatherQuery,
    form,
  };
  const methods = {
    setLocationMethod: setMethod,
    setFromWindowCoordinates,
    setFromLocationSearch,
  };

  return [state, methods] as const;
}

export type WeatherState = ReturnType<typeof useWeatherState>;

const WeatherCtx = createContext<null | WeatherState>(null);

export const WeatherProvider = ({ children }: PropsWithChildren) => {
  const state = useWeatherState();

  return <WeatherCtx.Provider value={state}>{children}</WeatherCtx.Provider>;
};

export const useWeather = () => {
  if (WeatherCtx === null) {
    throw new Error(`N provider for WeatherCtx`);
  }

  return useContext(WeatherCtx)!;
};
