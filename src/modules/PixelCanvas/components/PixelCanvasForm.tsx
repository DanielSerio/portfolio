import { useForm } from "@mantine/form";
import { usePixelCanvas } from "#pixel-canvas/hooks";
import { zodResolver } from "mantine-form-zod-resolver";
import { PixelCanvasFormValidator } from "#pixel-canvas/utilities";
import {
  ColorInput,
  Fieldset,
  Flex,
  Slider,
  Text,
  TextInput,
} from "@mantine/core";

export function PixelCanvasForm() {
  const [state, methods] = usePixelCanvas();
  const form = useForm({
    initialValues: {
      width: state.dimensions[0],
      height: state.dimensions[1],
      color: state.color,
      diameter: state.diameter,
    },
    validate: zodResolver(PixelCanvasFormValidator),
    onValuesChange: (values) => {
      const parsed = PixelCanvasFormValidator.safeParse(values);

      if (parsed.success) {
        const { width, height, color, diameter } = parsed.data;
        methods.reset({
          dimensions: [width, height],
          diameter,
          color,
        });
      }
    },
  });

  return (
    <Flex
      component="form"
      className="canvas-form"
      wrap="wrap"
      mx="auto"
      w={{
        xs: "fit-content",
        md: 900,
      }}
      columnGap={"xs"}
      px="md"
    >
      <Fieldset legend="Dimensions" w="100%" maw={424} mx="auto">
        <TextInput
          type="number"
          label="Width"
          required
          {...form.getInputProps("width")}
        />
        <TextInput
          type="number"
          label="Height"
          required
          {...form.getInputProps("height")}
        />
      </Fieldset>
      <Fieldset legend="Brush" w="100%" maw={424} mx="auto">
        <ColorInput label="Color" required {...form.getInputProps("color")} />
        <Flex direction="column" mt="xs">
          <Text size="sm" fw="600" mb={3}>
            Diameter
          </Text>

          <Slider
            label="Diameter"
            min={1}
            max={200}
            {...form.getInputProps("diameter")}
          />
        </Flex>
      </Fieldset>
    </Flex>
  );
}
