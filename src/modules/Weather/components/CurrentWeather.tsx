import { Box, Skeleton } from "@mantine/core";
import type { PropsWithChildren } from "react";
import { WeatherIcon } from "./WeatherIcon";

export interface CurrentWeatherProps {
  isNight?: boolean;
  isLoading?: boolean;
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

export function CurrentWeather({ isLoading }: CurrentWeatherProps) {
  if (isLoading) {
    return (
      <Wrapper>
        <CurrentWeatherSkeleton />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h1>72*F</h1>
      <WeatherIcon
        code={85}
        style={{ fontSize: 96 }}
        fallback={<Skeleton h={68} w={68} mb="xs" />}
      />
      <p>Sunny</p>
    </Wrapper>
  );
}
