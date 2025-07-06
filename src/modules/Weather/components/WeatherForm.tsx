import {
  useWeatherLocationForm,
  type WeatherLocationInputMethod,
} from "#weather/hooks";
import { Box, Button, Flex, Tabs, Text, TextInput } from "@mantine/core";
import { TbCrosshair, TbDatabase, TbLocation, TbTools } from "react-icons/tb";
import { LocationSearch } from "./controls";
import { getCurrentCoordinates } from "#weather/utilities";
import { useCallback } from "react";

export function WeatherForm() {
  const {
    methodController: [method, setMethod],
    form,
  } = useWeatherLocationForm();

  const setFromWindowCoordinates = useCallback(async () => {
    const coords = await getCurrentCoordinates();

    form.setValues({
      lat: +coords.lat.toFixed(4),
      lng: +coords.lng.toFixed(4),
    });
  }, [form]);

  const setFromLocationSearch = useCallback(
    (location: { lat: number; lng: number; name: string }) =>
      form.setValues({
        lat: +location.lat.toFixed(4),
        lng: +location.lng.toFixed(4),
      }),
    [form]
  );

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
