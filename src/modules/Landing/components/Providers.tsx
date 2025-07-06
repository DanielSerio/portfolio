import { MantineProvider } from "@mantine/core";
import type { PropsWithChildren } from "react";
import { THEME } from "#store/theme";

export function LandingProviders({ children }: PropsWithChildren) {
  return (
    <MantineProvider defaultColorScheme="dark" theme={THEME}>
      {children}
    </MantineProvider>
  );
}
