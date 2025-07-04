import type { useListPokemon } from "#poke/hooks";
import { ActionIcon, Flex, Group, Select } from "@mantine/core";
import type { PropsWithChildren } from "react";
import {
  TbChevronsLeft,
  TbChevronLeft,
  TbChevronsRight,
  TbChevronRight,
} from "react-icons/tb";

function PagingButton({
  children,
  disabled,
  onClick,
}: PropsWithChildren<{ onClick: () => void; disabled: boolean }>) {
  return (
    <ActionIcon
      disabled={disabled}
      variant="light"
      color="gray"
      onClick={onClick}
    >
      {children}
    </ActionIcon>
  );
}

export function PokeTableToolbar({
  total,
  limit,
  offset,
  methods: {
    setLimit,
    goToFirstPage,
    goToPrevPage,
    goToNextPage,
    goToLastPage,
  },
}: {
  total: number;
  limit: number;
  offset: number;
  methods: ReturnType<typeof useListPokemon>["1"];
}) {
  const currentPage = offset / limit + 1;
  const totalPages = Math.ceil(total / limit);
  return (
    <Flex p="xs" align="flex-end" justify="space-between">
      <Select
        size="xs"
        label="Per Page"
        className="rpp-select"
        defaultValue={"25"}
        data={["5", "10", "25", "50", "100", "250"]}
        onChange={(value) => {
          if (value) {
            setLimit(+value);
          }
        }}
      />
      <Group gap="xs" mb={1}>
        <PagingButton disabled={currentPage === 1} onClick={goToFirstPage}>
          <TbChevronsLeft />
        </PagingButton>
        <PagingButton disabled={currentPage === 1} onClick={goToPrevPage}>
          <TbChevronLeft />
        </PagingButton>
        <span>
          {currentPage}/{totalPages}
        </span>
        <PagingButton
          disabled={currentPage === totalPages}
          onClick={goToNextPage}
        >
          <TbChevronRight />
        </PagingButton>
        <PagingButton
          disabled={currentPage === totalPages}
          onClick={goToLastPage}
        >
          <TbChevronsRight />
        </PagingButton>
      </Group>
    </Flex>
  );
}
