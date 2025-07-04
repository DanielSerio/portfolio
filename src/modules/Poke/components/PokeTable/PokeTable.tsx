import type { useListPokemon } from "#poke/hooks";
import { Box, Flex } from "@mantine/core";
import { PokeTableRow } from "./PokeTableRow";
import { flexRender } from "@tanstack/react-table";
import { PokeTableCell } from "./PokeTableCell";
import { PokeTableSkeletonRows } from "./PokeTableSkeletonRows";
import type { CustomColumnDef } from "#poke/types/table.types";

export interface PokeTableProps {
  isLoading: boolean;
  table: ReturnType<typeof useListPokemon>[0]["table"];
  columns: ReturnType<typeof useListPokemon>[0]["columns"];
  recordsPerPage: number;
}

function getGridTemplateColumns<TR, TD>(cols: CustomColumnDef<TR, TD>[]) {
  const total = cols.reduce((sum, col) => sum + col.size, 0);

  return cols
    .map((col) => `${((col.size / total) * 100).toPrecision(6)}%`)
    .join(" ");
}

export function PokeTable({
  isLoading,
  table,
  columns,
  recordsPerPage,
}: PokeTableProps) {
  const gridTemplateColumns = getGridTemplateColumns(columns);

  return (
    <Flex direction="column" className="poke-table-table">
      <header>
        <PokeTableRow header gridTemplateColumns={gridTemplateColumns}>
          {table.getFlatHeaders().map((header) => (
            <PokeTableCell key={header.id}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </PokeTableCell>
          ))}
        </PokeTableRow>
      </header>
      <Box className="body">
        {!!isLoading && recordsPerPage && (
          <PokeTableSkeletonRows
            recordsPerPage={recordsPerPage}
            gridTemplateColumns={gridTemplateColumns}
          />
        )}
        {!isLoading &&
          table.getCoreRowModel().flatRows.map((row) => {
            return (
              <PokeTableRow
                key={row.id}
                gridTemplateColumns={gridTemplateColumns}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <PokeTableCell
                      label={cell.column.columnDef.header as string}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </PokeTableCell>
                  );
                })}
              </PokeTableRow>
            );
          })}
      </Box>
    </Flex>
  );
}
