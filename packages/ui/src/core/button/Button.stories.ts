import type { Meta, StoryObj } from "@storybook/vue3";
import { Coffee } from "lucide-vue-next";
import { computed } from "vue";

import { SizeKey } from "../../types";
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
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
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
        <div class="flex flex-row justify-center w-full min-h-[25vh] gap-5 items-center">
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
    default: "",
  },
  render: (args) => {
    return {
      components: { CoreButton },
      setup() {
        return { args };
      },
      template: `
        <CoreButton 
          v-bind="args" 
          :loading="args.loading" 
        >
          {{args.default || args.loading ? "Loading..." : "Ready!"}}
        </CoreButton>`,
    };
  },
};

export const IconButton: Story = {
  render: (args) => {
    return {
      components: { CoreButton, Coffee },
      setup() {
        const iconSize = computed(() => {
          const sizeTable: Record<SizeKey, number> = {
            sm: 14,
            md: 20,
            lg: 24,
            xl: 32,
          };
          return sizeTable[args.size || "md"];
        });
        return { args, iconSize };
      },
      template: `
        <CoreButton v-bind="args" class="p-2">
          <Coffee v-if="!args.loading" :size="iconSize" />
        </CoreButton>
        <CoreButton v-bind="args">Teste</CoreButton>
      `,
    };
  },
};

export const NormalButton: Story = {
  name: "Variant | Normal Button",
  args: {
    variant: "normal",
    default: "Normal Button",
  },
};

export const OutlinedButton: Story = {
  name: "Variant | Outlined Button",
  args: {
    variant: "outlined",
    default: "Outlined Button",
  },
};

export const LinkButton: Story = {
  name: "Variant | Link Button",
  args: {
    variant: "link",
    default: "Link Button",
  },
};

export const SimpleButton: Story = {
  name: "Variant | Simple Button",
  args: {
    variant: "simple",
    default: "Simple Button",
  },
};

export const SoftButton: Story = {
  name: "Variant | Soft Button",
  args: {
    variant: "soft",
    default: "Soft Button",
  },
};
