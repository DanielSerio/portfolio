import { Box, Skeleton } from "@mantine/core";
import type { PropsWithChildren } from "react";
import { WeatherIcon } from "./WeatherIcon";
import type { UseQueryResult } from "@tanstack/react-query";
import type { WeatherResponse } from "#weather/types/weather.response";
import { getWeatherDescriptionFromCode } from "#weather/utilities";

export interface CurrentWeatherProps {
  query?: UseQueryResult<WeatherResponse, Error>;
}

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="current-weather">
      <Box className="current-weather-container" m="auto">
        {children}
      </Box>
    </div>
  );
};

const CurrentWeatherSkeleton = () => {
  return (
    <>
      <Skeleton h={50} w={68} mb="xs" />
      <Skeleton h={68} w={68} mb="xs" />
      <Skeleton h={14} w={68} />
    </>
  );
};

export function CurrentWeather({ query }: CurrentWeatherProps) {
  const isLoading = query?.isLoading ?? false;
  const data = query?.data;

  if (isLoading || !data) {
    return (
      <Wrapper>
        <CurrentWeatherSkeleton />
      </Wrapper>
    );
  }

  const code = data.current.weather_code;
  const description = getWeatherDescriptionFromCode(code);

  return (
    <Wrapper>
      <h1>
        {data.current.temperature_2m}
        {data.current_units.temperature_2m}
      </h1>
      <WeatherIcon
        code={code}
        style={{ fontSize: 96 }}
        fallback={<Skeleton h={68} w={68} mb="xs" />}
      />
      <p>{description}</p>
    </Wrapper>
  );
}
