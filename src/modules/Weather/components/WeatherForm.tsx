import {
  useWeatherLocationForm,
  type WeatherLocationInputMethod,
} from "#weather/hooks";
import { Box, Button, Flex, Tabs, Text, TextInput } from "@mantine/core";
import { TbCrosshair, TbDatabase, TbLocation, TbTools } from "react-icons/tb";
import { LocationSearch } from "./controls";

export function WeatherForm() {
  const {
    methodController: [method, setMethod],
  } = useWeatherLocationForm();

  return (
    <Flex direction="column" px="sm">
      <Text>Location</Text>
      <Box>
        <Tabs
          value={method}
          onChange={(tab) => setMethod(tab as WeatherLocationInputMethod)}
        >
          <Tabs.List>
            <Tabs.Tab value="lookup" leftSection={<TbDatabase />}>
              Lookup
            </Tabs.Tab>
            <Tabs.Tab value="coordinates" leftSection={<TbLocation />}>
              Coordinates
            </Tabs.Tab>
            <Tabs.Tab value="manual" leftSection={<TbTools />}>
              Manual
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="lookup">
            <Box maw={240} mt="md">
              <LocationSearch
                onSelect={(location) =>
                  console.info("selected location:", location)
                }
              />
            </Box>
          </Tabs.Panel>

          <Tabs.Panel value="coordinates">
            <Button mt="md" rightSection={<TbLocation />}>
              Use My Location
            </Button>
          </Tabs.Panel>

          <Tabs.Panel value="manual">
            <Flex direction="column" mt="md" maw={240}>
              <TextInput size="xs" type="number" label="Longitude" />
              <TextInput size="xs" type="number" label="Latitude" />
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
