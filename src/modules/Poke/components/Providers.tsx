import { MantineProvider } from "@mantine/core";
import type { PropsWithChildren } from "react";
import { THEME } from "#store/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

export function PokeProviders({ children }: PropsWithChildren) {
  return (
    <MantineProvider defaultColorScheme="dark" theme={THEME}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </MantineProvider>
  );
}
