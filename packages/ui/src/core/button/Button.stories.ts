import type { Meta, StoryObj } from "@storybook/vue3";
import { Coffee } from "lucide-vue-next";
import { computed } from "vue";

import CoreButton from "./Button.vue";

const meta: Meta<typeof CoreButton> = {
  title: "Core/Button",
  component: CoreButton,
  tags: ["autodocs"],
  parameters: {
    slots: {
      default: `Default slot content`,
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["normal", "outlined", "link", "simple", "soft"],
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
    },
    class: {
      control: "text",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    default: {
      control: "text",
    },
  },
  render: (args) => {
    return {
      components: { CoreButton },
      setup() {
        return { args };
      },
      template: `<CoreButton v-bind="args">{{args.default || "Default Text"}}</CoreButton>`,
    };
  },
  decorators: [
    () => ({
      template: `
        <div class="flex flex-row justify-center w-full">
          <story/>
        </div>`,
    }),
  ],
} satisfies Meta<typeof CoreButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoadingButton: Story = {
  args: {
    variant: "normal",
    loading: true,
  },
};

export const IconButton: Story = {
  render: (args) => {
    return {
      components: { CoreButton, Coffee },
      setup() {
        // const iconSize = computed(() => {
        //   const sizeTable: Record<SizeKey, number> = {
        //     sm: 16,
        //     md: 20,
        //     lg: 24,
        //   }
        //   return sizeTable[args.size || 'md'];
        // })
        return { args };
      },
      template: `
      <CoreButton v-bind="args" class="p-2">
        <Coffee v-if="!args.loading" />
      </CoreButton>`,
    };
  },
};
