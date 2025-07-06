import { Box } from "@mantine/core";
import { CurrentWeather } from "./CurrentWeather";
import { Forecast } from "./Forecast";
import { Hourly } from "./Hourly";
import { useWeather } from "#weather/hooks";

export function WeatherDisplay() {
  const [{ weatherQuery, location }] = useWeather();

  return (
    <Box className="weather-display" p="sm" id="weatherDisplay" mb={96}>
      {!!location && (
        <>
          <CurrentWeather query={weatherQuery} />
          <Hourly query={weatherQuery} />
          <Forecast query={weatherQuery} />
        </>
      )}
    </Box>
  );
}
