import { useListPokemon } from "#poke/hooks";
import { Box, Flex } from "@mantine/core";
import { PokeTableToolbar } from "./PokeTableToolbar";
import { PokeTable } from "./PokeTable/PokeTable";

export function PokeView() {
  const [{ table, columns, query, paging, count }, methods] = useListPokemon();

  return (
    <Box className="poke-table-container">
      <Flex direction="column" className="poke-table-root">
        <PokeTableToolbar
          total={count}
          limit={paging.limit}
          offset={paging.offset}
          methods={methods}
        />
        <PokeTable
          table={table}
          columns={columns}
          isLoading={query.isLoading}
          recordsPerPage={paging.limit}
        />
      </Flex>
    </Box>
  );
}
