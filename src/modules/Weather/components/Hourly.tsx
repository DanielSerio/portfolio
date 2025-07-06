import { Flex, Skeleton } from "@mantine/core";
import { format } from "date-fns";
import { WeatherIcon } from "./WeatherIcon";

export interface HourlyTileProps {
  isNight?: boolean;
  when: Date;
  weathercode: number;
  temperature: number;
  unit: string;
}
function HourlyTile({
  when,
  weathercode,
  isNight,
  temperature,
  unit,
}: HourlyTileProps) {
  return (
    <Flex direction="column">
      <strong>{format(when, "hh a")}</strong>
      <WeatherIcon
        style={{ fontSize: 18 }}
        code={weathercode}
        isNight={isNight}
        fallback={<Skeleton h={30} w={30} />}
      />
      <span>
        {temperature}
        {unit}
      </span>
    </Flex>
  );
}

export function Hourly() {
  return <div>Hourly</div>;
}
