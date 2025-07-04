import type { PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";
import { THEME } from "#store/theme";

export function HeaderProviders({ children }: PropsWithChildren) {
  return (
    <MantineProvider defaultColorScheme="dark" theme={THEME}>
      {children}
    </MantineProvider>
  );
}
