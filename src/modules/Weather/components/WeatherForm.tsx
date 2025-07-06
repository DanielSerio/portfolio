import { useWeather, type WeatherLocationInputMethod } from "#weather/hooks";
import { Box, Button, Flex, Tabs, Text, TextInput } from "@mantine/core";
import { TbCrosshair, TbDatabase, TbLocation, TbTools } from "react-icons/tb";
import { LocationSearch } from "./controls";

export function WeatherForm() {
  const [
    { form, locationMethod: method },
    {
      setLocationMethod: setMethod,
      setFromLocationSearch,
      setFromWindowCoordinates,
    },
  ] = useWeather();

  const defaultTabProps = {
    h: 224,
    style: {
      display: "grid",
      placeContent: "center",
    },
  };

  return (
    <Flex direction="column" px="sm">
      <Text>Location</Text>
      <Box>
        <Tabs
          value={method}
          style={{
            borderBottom: "1px solid var(--mantine-color-default-border)",
          }}
          onChange={(tab) => setMethod(tab as WeatherLocationInputMethod)}
        >
          <Tabs.List>
            <Tabs.Tab size={"xs"} value="lookup" leftSection={<TbDatabase />}>
              <Text size="xs">Lookup</Text>
            </Tabs.Tab>
            <Tabs.Tab value="coordinates" leftSection={<TbLocation />}>
              <Text size="xs">Coordinates</Text>
            </Tabs.Tab>
            <Tabs.Tab value="manual" leftSection={<TbTools />}>
              <Text size="xs">Manual</Text>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="lookup" {...defaultTabProps}>
            <Box w={240} mt="md" mx="auto">
              <LocationSearch onSelect={setFromLocationSearch} />
            </Box>
          </Tabs.Panel>

          <Tabs.Panel value="coordinates" {...defaultTabProps}>
            <Button
              mt="md"
              rightSection={<TbLocation />}
              onClick={setFromWindowCoordinates}
            >
              Use My Location
            </Button>
          </Tabs.Panel>

          <Tabs.Panel value="manual" {...defaultTabProps}>
            <Flex direction="column" mt="md" mx="auto" w={240}>
              <TextInput
                size="xs"
                type="number"
                label="Longitude"
                {...form.getInputProps("lng")}
              />
              <TextInput
                size="xs"
                type="number"
                label="Latitude"
                {...form.getInputProps("lat")}
              />
              <Flex mt="md">
                <Button size="sm" rightSection={<TbCrosshair />}>
                  Set Location
                </Button>
              </Flex>
            </Flex>
          </Tabs.Panel>
        </Tabs>
      </Box>
    </Flex>
  );
}
