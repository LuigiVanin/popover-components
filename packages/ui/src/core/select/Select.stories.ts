import type { Meta, StoryObj } from "@storybook/vue3";

import CoreSelect from "./Select.vue";

const meta: Meta<typeof CoreSelect> = {
  title: "Core/Select",
  // eslint-disable-next-line
  component: CoreSelect as any,
  tags: ["autodocs"],
  args: {
    options: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ],
  },
  argTypes: {
    placeholder: {
      control: "text",
    },
    position: {
      control: "select",
      options: [
        "bottom",
        "top",
        "top left",
        "top right",
        "bottom left",
        "bottom right",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
  },
} satisfies Meta<typeof CoreSelect>;

type Story = StoryObj<typeof meta>;

export const LoadingButton: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the `loading` state of the button. When the `loading` prop is set to `true`, a loading spinner is displayed. You can override the default loading spinner by using the `loadingPrepend` slot to render custom content before the default slot content.",
      },
    },
  },
};

export default meta;
