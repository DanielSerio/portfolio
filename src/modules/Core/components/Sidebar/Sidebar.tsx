import { ActionIcon, Box, Flex } from "@mantine/core";
import { SidebarProviders } from "./Providers";
import { TbMenu2 } from "react-icons/tb";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import { LinkList } from "./LinkList";

export function Sidebar() {
  const [isExpanded, { toggle, close }] = useDisclosure();
  const classNames = `sidebar${isExpanded ? " is-expanded" : ""}`;
  const ref = useClickOutside(() => close());
  const activePathName = window.location.pathname;

  return (
    <SidebarProviders>
      <Box component="aside" id="sidebar" className={classNames} ref={ref}>
        <Flex className="top" justify={isExpanded ? "flex-end" : "center"}>
          <ActionIcon size="lg" variant="subtle" color="gray" onClick={toggle}>
            <TbMenu2 style={{ fontSize: 26 }} />
          </ActionIcon>
        </Flex>

        <Box component="nav" id="mainNav">
          {isExpanded && <LinkList activePathName={activePathName} />}
        </Box>
      </Box>
    </SidebarProviders>
  );
}
