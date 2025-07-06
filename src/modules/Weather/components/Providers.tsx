import { MantineProvider } from "@mantine/core";
import type { PropsWithChildren } from "react";
import { THEME } from "#store/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WeatherProvider } from "#weather/hooks";

const client = new QueryClient();

export function WeatherProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={client}>
      <MantineProvider defaultColorScheme="dark" theme={THEME}>
        <WeatherProvider>{children}</WeatherProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}
