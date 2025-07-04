import { Box } from "@mantine/core";
import type { PropsWithChildren } from "react";

export interface PokeTableRowProps extends PropsWithChildren {
  gridTemplateColumns: string;
  header?: boolean;
}

export function PokeTableRow({
  gridTemplateColumns,
  children,
  header,
}: PokeTableRowProps) {
  const classes = `table-row${header ? ` header` : ""}`;
  return (
    <Box className={classes} style={{ gridTemplateColumns }}>
      {children}
    </Box>
  );
}
