import { ActionIcon, Box, Button, Flex } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import {
  useEffect,
  useRef,
  useState,
  type DependencyList,
  type PropsWithChildren,
  type RefObject,
} from "react";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

function OverflowListButton({
  dir,
  disabled,
  onClick,
}: {
  dir: "left" | "right";
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <ActionIcon
      color="gray"
      pos="relative"
      variant="subtle"
      disabled={disabled}
      style={{ opacity: disabled ? 0 : 1 }}
      w={36}
      h={76}
      onClick={onClick}
    >
      {dir === "left" ? <TbChevronLeft /> : <TbChevronRight />}
    </ActionIcon>
  );
}

//TODO: better way to move track
export function OverflowTileList({ children }: PropsWithChildren) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [offsetLeft, setOffsetLeft] = useState(0);

  useEffect(() => {
    if (trackRef.current) {
    }
  }, []);

  const next = () => setOffsetLeft((w) => w + trackRef.current!.clientWidth);
  const prev = () =>
    setOffsetLeft((w) => {
      const trackWidth = trackRef.current?.clientWidth ?? 0;

      if (w <= trackWidth) {
        return 0;
      }

      return w - trackWidth;
    });

  return (
    <Flex align="center" w="100%" pos="relative" style={{ overflow: "hidden" }}>
      <OverflowListButton
        dir="left"
        disabled={offsetLeft <= 0}
        onClick={prev}
      />
      <Box
        pos="relative"
        w={"calc(100% - 76px)"}
        style={{
          overflow: "hidden",
        }}
      >
        <Flex
          columnGap="md"
          ref={trackRef}
          style={{
            transition: "transform 80ms ease-out",
            transform: `translateX(-${offsetLeft}px)`,
          }}
        >
          {children}
        </Flex>
      </Box>
      <OverflowListButton
        dir="right"
        onClick={next}
        disabled={offsetLeft >= (trackRef.current?.clientWidth ?? 300) + 36}
      />
    </Flex>
  );
}
