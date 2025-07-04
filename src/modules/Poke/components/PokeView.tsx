import { useListPokemon } from "#poke/hooks";
import { Box, Flex } from "@mantine/core";
import { PokeTableToolbar } from "./PokeTableToolbar";
import { PokeTable } from "./PokeTable/PokeTable";

export function PokeView() {
  const [{ table, query, paging }, methods] = useListPokemon();

  return (
    <Box className="poke-table-container">
      <Flex direction="column" className="poke-table-root">
        <PokeTableToolbar />
        <PokeTable
          table={table}
          isLoading={query.isLoading}
          recordsPerPage={paging.limit}
        />
      </Flex>
    </Box>
  );
}
