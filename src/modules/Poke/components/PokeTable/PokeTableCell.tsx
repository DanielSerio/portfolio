import { Box } from "@mantine/core";
import type { PropsWithChildren } from "react";

export interface PokeTableCellProps extends PropsWithChildren {
  label?: string;
}

export function PokeTableCell({ children, label }: PokeTableCellProps) {
  if (!label) {
    return <Box className="table-cell">{children}</Box>;
  }

  return (
    <Box className="table-cell">
      <span className="label">{label}</span>
      <span className="value">{children}</span>
    </Box>
  );
}
