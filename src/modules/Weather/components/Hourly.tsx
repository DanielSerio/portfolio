import { Flex, Skeleton, Text } from "@mantine/core";
import { format } from "date-fns";
import { WeatherIcon } from "./WeatherIcon";
import { forwardRef, type ForwardedRef } from "react";
import { OverflowTileList } from "#core/components/Sidebar/OverflowTileList";
import type { UseQueryResult } from "@tanstack/react-query";
import type { WeatherResponse } from "#weather/types/weather.response";

export interface HourlyTileProps {
  isNight?: boolean;
  when: Date;
  weathercode: number;
  temperature: number;
  unit: string;
}
function HourlyTileComponent(
  { when, weathercode, isNight, temperature, unit }: HourlyTileProps,
  ref?: ForwardedRef<HTMLDivElement>
) {
  return (
    <Flex direction="column" align="center" w={48} ref={ref}>
      <strong style={{ fontSize: "0.875rem", whiteSpace: "nowrap" }}>
        {format(when, "h a")}
      </strong>
      <WeatherIcon
        style={{ fontSize: 30 }}
        code={weathercode}
        isNight={isNight}
        fallback={<Skeleton h={30} w={30} />}
      />
      <span style={{ fontSize: 18 }}>
        {Math.round(temperature)}
        {unit}
      </span>
    </Flex>
  );
}

const HourlyTile = forwardRef(HourlyTileComponent);

export function Hourly({
  query,
}: {
  query: UseQueryResult<WeatherResponse, Error>;
}) {
  return (
    <>
      <Text size="lg" my="md" style={{ textAlign: "center" }}>
        Hourly
      </Text>
      <OverflowTileList>
        {query.isLoading &&
          [...new Array(7)].map((_, i) => (
            <Skeleton key={`index:${i}`} h={76} w={48} />
          ))}
        {!query.isLoading &&
          !!query.data &&
          query.data.hourly.time.map((time, index) => {
            const { hourly } = query.data;
            return (
              <HourlyTile
                key={time}
                when={new Date(Date.parse(time))}
                weathercode={hourly.weather_code[index]}
                temperature={hourly.temperature_2m[index]}
                unit={query.data.hourly_units.temperature_2m}
              />
            );
          })}
      </OverflowTileList>
    </>
  );
}
