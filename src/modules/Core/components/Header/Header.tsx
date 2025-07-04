import { Anchor, Box, Group, Text } from "@mantine/core";
import { HeaderProviders } from "./Providers";

export function Header() {
  return (
    <HeaderProviders>
      <Box px="sm" component="header" id="header" className="header" h={48}>
        <Anchor href="/" underline={"never"}>
          <Group align="center" h={46} gap={4}>
            <Text
              size="xl"
              variant="gradient"
              gradient={{ from: "teal.4", to: "indigo.6" }}
            >
              Dan
            </Text>
            <Text size="xl" c="gray.5">
              Serio
            </Text>
          </Group>
        </Anchor>
      </Box>
    </HeaderProviders>
  );
}
