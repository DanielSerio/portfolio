import { Box } from "@mantine/core";
import { CurrentWeather } from "./CurrentWeather";
import { Forecast } from "./Forecast";
import { Hourly } from "./Hourly";

export function WeatherDisplay() {
  return (
    <Box className="weather-display" p="sm" mih={640} id="weatherDisplay">
      <CurrentWeather />
      <Hourly />
      <Forecast />
    </Box>
  );
}
