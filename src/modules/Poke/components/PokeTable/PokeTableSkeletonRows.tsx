import { PokeTableRow } from "./PokeTableRow";
import { PokeTableCell } from "./PokeTableCell";
import { Skeleton } from "@mantine/core";

export function PokeTableSkeletonRows({
  gridTemplateColumns,
  recordsPerPage,
}: {
  gridTemplateColumns: string;
  recordsPerPage: number;
}) {
  const trueCount = recordsPerPage >= 5 ? 5 : recordsPerPage;

  return [...new Array(trueCount)].map((_, i) => (
    <PokeTableRow key={i + 1} gridTemplateColumns={gridTemplateColumns}>
      <PokeTableCell>
        <Skeleton h={10} w="100%" my={5} />
      </PokeTableCell>
      <PokeTableCell>
        <Skeleton h={10} w="100%" my={5} />
      </PokeTableCell>
      <PokeTableCell>
        <Skeleton h={10} w="100%" my={5} />
      </PokeTableCell>
    </PokeTableRow>
  ));
}
