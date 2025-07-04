import type { useListPokemon } from "#poke/hooks";
import { Flex } from "@mantine/core";
import { PokeTableRow } from "./PokeTableRow";
import { flexRender } from "@tanstack/react-table";
import { PokeTableCell } from "./PokeTableCell";
import { PokeTableSkeletonRows } from "./PokeTableSkeletonRows";

export interface PokeTableProps {
  isLoading: boolean;
  table: ReturnType<typeof useListPokemon>[0]["table"];
  recordsPerPage: number;
}

export function PokeTable({
  isLoading,
  table,
  recordsPerPage,
}: PokeTableProps) {
  const gridTemplateColumns = "";

  return (
    <Flex direction="column" className="poke-table-table">
      <PokeTableRow header gridTemplateColumns={gridTemplateColumns}>
        {table.getFlatHeaders().map((header) => (
          <PokeTableCell key={header.id}>
            {flexRender(header.column.columnDef.header, header.getContext())}
          </PokeTableCell>
        ))}
      </PokeTableRow>
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </PokeTableCell>
                );
              })}
            </PokeTableRow>
          );
        })}
    </Flex>
  );
}
