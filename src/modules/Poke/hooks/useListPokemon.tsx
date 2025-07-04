import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { PokeService } from "#poke/services";
import type { CustomColumnDef } from "#poke/types/table.types";
import type { ExtendedPokemonType } from "#poke/types";

const blank = [] as ExtendedPokemonType[];

export function useListPokemon() {
  const [count, setCount] = useState(0);
  const [paging, setPaging] = useState({
    limit: 25,
    offset: 0,
  });
  const query = useQuery({
    queryKey: ["pokemon", "list", paging.limit, paging.offset],
    async queryFn() {
      const { results, count: responseCount } =
        await PokeService.listPokemon(paging);

      setCount(responseCount);

      return results;
    },
    staleTime: Infinity,
  });

  const columns = [
    {
      id: "id",
      header: "ID",
      size: 40,
      accessorKey: "id",
    },
    {
      id: "url",
      header: "URL",
      size: 240,
      accessorKey: "url",
    },
    {
      id: "name",
      header: "Name",
      size: 140,
      accessorFn({ name }) {
        return name.title;
      },
    },
  ] satisfies CustomColumnDef<ExtendedPokemonType>[];

  const table = useReactTable({
    manualPagination: true,
    rowCount: count,
    columns,
    data: query.data ?? blank,
    getCoreRowModel: getCoreRowModel(),
  });

  const state = {
    count,
    paging,
    table,
    columns,
    query,
  };

  const methods = {
    setLimit: (lim: number) => setPaging({ limit: ~~lim, offset: 0 }),
    goToFirstPage: () => setPaging((curr) => ({ ...curr, offset: 0 })),
    goToNextPage: () =>
      setPaging((curr) => {
        if (curr.offset + curr.limit < count) {
          return {
            ...curr,
            offset: curr.offset + curr.limit,
          };
        }

        return curr;
      }),
    goToLastPage: () =>
      setPaging((curr) => {
        const lastPage = Math.ceil(count / curr.limit);

        return {
          ...curr,
          offset: (lastPage - 1) * curr.limit,
        };
      }),
    goToPrevPage: () =>
      setPaging((curr) => {
        if (curr.offset - curr.limit >= 0) {
          return {
            ...curr,
            offset: curr.offset - curr.limit,
          };
        }

        return curr;
      }),
  };

  return [state, methods] as const;
}
