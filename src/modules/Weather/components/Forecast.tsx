import { Flex, Group, Skeleton, Text } from "@mantine/core";
import { format } from "date-fns";
import { WeatherIcon } from "./WeatherIcon";
import { forwardRef, type ForwardedRef } from "react";
import { OverflowTileList } from "#core/components/Sidebar/OverflowTileList";
import type { UseQueryResult } from "@tanstack/react-query";
import type { WeatherResponse } from "#weather/types/weather.response";

export interface DailyTileProps {
  isNight?: boolean;
  when: Date;
  weathercode: number;
  temperature: number;
  temperatureMax: number;
  unit: string;
}
function DailyTileComponent(
  {
    when,
    weathercode,
    isNight,
    temperature,
    temperatureMax,
    unit,
  }: DailyTileProps,
  ref?: ForwardedRef<HTMLDivElement>
) {
  return (
    <Flex direction="column" align="center" w={72} ref={ref}>
      <strong style={{ fontSize: "0.875rem" }}>{format(when, "MMM dd")}</strong>
      <WeatherIcon
        style={{ fontSize: 30 }}
        code={weathercode}
        isNight={isNight}
        fallback={<Skeleton h={30} w={30} />}
      />
      <div>
        <span style={{ fontSize: 12 }}>
          {temperature}
          {unit}
        </span>
        <span>/</span>
        <span style={{ fontSize: 12 }}>
          {temperatureMax}
          {unit}
        </span>
      </div>
    </Flex>
  );
}

const DailyTile = forwardRef(DailyTileComponent);

export function Forecast({
  query,
}: {
  query: UseQueryResult<WeatherResponse, Error>;
}) {
  return (
    <>
      <Text size="lg" my="md" style={{ textAlign: "center" }}>
        Daily
      </Text>
      <OverflowTileList>
        {query.isLoading &&
          [...new Array(7)].map((_, i) => (
            <Skeleton key={`index:${i}`} h={76} w={72} />
          ))}
        {!query.isLoading &&
          !!query.data &&
          query.data.daily.time.map((time, index) => {
            const { daily, daily_units } = query.data;

            return (
              <DailyTile
                key={time}
                when={new Date(Date.parse(time))}
                weathercode={daily.weather_code[index]}
                temperature={daily.temperature_2m_min[index]}
                temperatureMax={daily.temperature_2m_max[index]}
                unit={daily_units.temperature_2m_min}
              />
            );
          })}
      </OverflowTileList>
    </>
  );
}
