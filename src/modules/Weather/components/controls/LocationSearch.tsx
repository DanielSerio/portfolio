import { useSearchLocation } from "#weather/hooks";
import { Combobox, TextInput, useCombobox } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import {
  forwardRef,
  useState,
  type ForwardedRef,
  type PropsWithChildren,
} from "react";

function useLocationSearch() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [textFilter, setTextFilter] = useState<string | null>(null);
  const [searchTerm] = useDebouncedValue(textFilter, 300);

  const query = useSearchLocation(searchTerm);

  const state = {
    combobox,
    isLoading: query.isLoading,
    options: query.data
      ? query.data.map((result) => ({
          lat: result.lat,
          lng: result.lon,
          name: result.display_name,
        }))
      : [
          query.isLoading
            ? { lat: null, lng: null, name: "Loading..." }
            : { lat: null, lng: null, name: " " },
        ],
    textFilter,
    query,
  };

  const methods = {
    setTextFilter,
  };

  return [state, methods] as const;
}

function createItemKey({
  lat,
  lng,
  name,
}:
  | { lat: null; lng: null; name: string }
  | { lat: number; lng: number; name: string }) {
  if (lat === null || lng === null) return "null:null:LOADING";

  return `${lat}:${lng}:${name}`;
}

function reverseItemKey(key: string) {
  const [lat, lng, name] = key.split(/[\:]/g) as [string, string, string];

  if (lat === "null") {
    return {
      lat: null,
      lng: null,
      name: "Loading...",
    };
  }

  return {
    lat: +lat,
    lng: +lng,
    name,
  };
}

function LocationSearchComponent(
  {
    onSelect,
  }: PropsWithChildren<{
    onSelect: (location: { lat: number; lng: number; name: string }) => void;
  }>,
  ref?: ForwardedRef<HTMLInputElement>
) {
  const [{ combobox, options, textFilter }, { setTextFilter }] =
    useLocationSearch();

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        const item = reverseItemKey(val);

        setTextFilter(item.name);

        if (item.lat !== null) {
          onSelect(item);
        }

        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <TextInput
          ref={ref}
          value={textFilter ?? ""}
          placeholder="Search By City"
          onChange={(ev) => setTextFilter(ev.target.value)}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.map((option) => (
            <Combobox.Option
              value={createItemKey(option)}
              key={createItemKey(option)}
            >
              {option.name}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export const LocationSearch = forwardRef(LocationSearchComponent);
