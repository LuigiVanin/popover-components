import type { Meta, StoryObj } from "@storybook/vue3";
import { Check, Coffee } from "lucide-vue-next";
import { computed } from "vue";

import { SizeKey } from "../../types";
import CoreButton from "./Button.vue";

// eslint-disable-next-line
const useIconSize = (args: { size?: SizeKey }) => {
  const size = computed((): number => {
    const sizeTable: Record<SizeKey, number> = {
      sm: 14,
      md: 20,
      lg: 24,
      xl: 32,
    };
    return sizeTable[args.size || "md"];
  });
  return { size };
};

const meta: Meta<typeof CoreButton> = {
  title: "Core/Button",
  component: CoreButton,
  tags: ["autodocs"],
  parameters: {
    slots: {
      default: `Default slot content`,
    },
    docs: {
      subtitle: "CoreButton - @popover/ui/core/button",
      description: {
        component:
          "The `CoreButton` component is a versatile button component for the `popover components` library. It supports multiple variants and sizes, making it adaptable to various design needs. The `variant` prop allows you to choose from styles like `normal`, `outlined`, `link`, `simple`, and `soft`. The `size` prop offers options such as `sm`, `md`, `lg`, and `xl`, ensuring the button fits well in different UI contexts. Additionally, the component supports a `loading` state with a customizable loading spinner, and various slots for extending its functionality.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["normal", "outlined", "link", "simple", "soft"],
      description: "Button style variant",
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
      description: "Button HTML types - native button types",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Button sizes",
    },
    disabled: {
      control: "boolean",
      description: "Button disabled state",
    },
    loading: {
      control: "boolean",
      description:
        "Button loading state - renders a loading spinner (it can be overridden by the `loadingPrepend` slot)",
    },
    default: {
      control: "text",
      description: "Default slot content - can be used to write button text",
    },
    loadingPrepend: {
      control: "text",
      description:
        "Loading prepend slot - it overrides the default loading spinner and renders the slot content before the default slot content",
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
        <div class="flex flex-row justify-center w-full min-h-[25vh] gap-5 items-center flex-wrap">
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
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the `loading` state of the button. When the `loading` prop is set to `true`, a loading spinner is displayed. You can override the default loading spinner by using the `loadingPrepend` slot to render custom content before the default slot content.",
      },
    },
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
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates a button with an icon. Note that the component does not handle icon sizing by default. The user needs to control the height and width of the icon based on the button size being used.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the `normal` variant of the button. Note that button colors are not handled by the component by default. Users should adjust the text, border, and background color by overwriting the class props with Tailwind CSS.",
      },
    },
  },
  render: (args) => {
    return {
      components: { CoreButton, Check },
      setup() {
        const icon = useIconSize(args);

        return { args, size: icon.size };
      },
      template: `
        <CoreButton v-bind="args">
          <Check :size="size" />
          {{args.default || "Default Text"}}
        </CoreButton>
        <CoreButton v-bind="args" class="bg-rose-600 border-rose-600">
          <Check :size="size" />
          {{args.default || "Default Text"}}
        </CoreButton>
        <CoreButton v-bind="args" class="bg-sky-500 border-sky-500">
          <Check :size="size" />  
          {{args.default || "Default Text"}}
        </CoreButton>
        <CoreButton v-bind="args" class="bg-amber-500 border-amber-500">
          <Check :size="size" />
          {{args.default || "Default Text"}}
        </CoreButton>
      `,
    };
  },
};

export const OutlinedButton: Story = {
  name: "Variant | Outlined Button",
  args: {
    variant: "outlined",
    default: "Outlined Button",
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the `outlined` variant of the button. Note that button colors are not handled by the component by default. Users should adjust the text, border, and background color by overwriting the class props with Tailwind CSS.",
      },
    },
  },
  render: (args) => {
    return {
      components: { CoreButton, Check },
      setup() {
        const icon = useIconSize(args);

        return { args, size: icon.size };
      },
      template: `
        <CoreButton v-bind="args">
          <Check :size="size" />
          {{args.default || "Default Text"}}
        </CoreButton>
        <CoreButton v-bind="args" class="text-rose-600 border-rose-600 hover:bg-rose-600">
          <Check :size="size" />
          {{args.default || "Default Text"}}
        </CoreButton>
        <CoreButton v-bind="args" class="border-sky-500 text-sky-500 hover:bg-sky-500">
          <Check :size="size" />  
          {{args.default || "Default Text"}}
        </CoreButton>
        <CoreButton v-bind="args" class="border-amber-500 text-amber-500 hover:bg-amber-500">
          <Check :size="size" />
          {{args.default || "Default Text"}}
        </CoreButton>
      `,
    };
  },
};

export const LinkButton: Story = {
  name: "Variant | Link Button",
  args: {
    variant: "link",
    default: "Link Button",
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the `link` variant of the button. Note that button colors are not handled by the component by default. Users should adjust the text, border, and background color by overwriting the class props with Tailwind CSS.",
      },
    },
  },
  render: (args) => {
    return {
      components: { CoreButton, Check },
      setup() {
        const icon = useIconSize(args);

        return { args, size: icon.size };
      },
      template: `
        <CoreButton v-bind="args">
          <Check :size="size" />
          {{args.default || "Default Text"}}
        </CoreButton>
        <CoreButton v-bind="args" class="text-rose-600 ">
          <Check :size="size" />
          {{args.default || "Default Text"}}
        </CoreButton>
        <CoreButton v-bind="args" class="text-sky-500">
          <Check :size="size" />  
          {{args.default || "Default Text"}}
        </CoreButton>
        <CoreButton v-bind="args" class="text-amber-500">
          <Check :size="size" />  
          {{args.default || "Default Text"}}
        </CoreButton>
      `,
    };
  },
};

export const SimpleButton: Story = {
  name: "Variant | Simple Button",
  args: {
    variant: "simple",
    default: "Simple Button",
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the `simple` variant of the button. Note that button colors are not handled by the component by default. Users should adjust the text, border, and background color by overwriting the class props with Tailwind CSS.",
      },
    },
  },
  render: (args) => {
    return {
      components: { CoreButton, Check },
      setup() {
        const icon = useIconSize(args);

        return { args, size: icon.size };
      },
      template: `
        <CoreButton v-bind="args">
          <Check :size="size" />
          {{args.default || "Default Text"}}
        </CoreButton>
        <CoreButton v-bind="args" class="border-rose-500 text-rose-500">
          <Check :size="size" />
          {{args.default || "Default Text"}}
        </CoreButton>
        <CoreButton v-bind="args" class="border-sky-400 text-sky-400">
          <Check :size="size" />  
          {{args.default || "Default Text"}}
        </CoreButton>
        <CoreButton v-bind="args" class="border-amber-500 text-amber-500">
          <Check :size="size" />
          {{args.default || "Default Text"}}
        </CoreButton>
      `,
    };
  },
};

export const SoftButton: Story = {
  name: "Variant | Soft Button",
  args: {
    variant: "soft",
    default: "Soft Button",
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the `soft` variant of the button. Note that button colors are not handled by the component by default. Users should adjust the text, border, and background color by overwriting the class props with Tailwind CSS.",
      },
    },
  },
  render: (args) => {
    return {
      components: { CoreButton, Check },
      setup() {
        const icon = useIconSize(args);

        return { args, size: icon.size };
      },
      template: `
        <CoreButton v-bind="args">
          <Check :size="size" />
          {{args.default || "Default Text"}}
        </CoreButton>
        <CoreButton v-bind="args" class="bg-rose-100 text-rose-600 border-rose-100 hover:border-rose-600">
          <Check :size="size" />
          {{args.default || "Default Text"}}
        </CoreButton>
        <CoreButton v-bind="args" class="bg-sky-100 text-sky-500 border-sky-100 hover:border-sky-500">
          <Check :size="size" />  
          {{args.default || "Default Text"}}
        </CoreButton>
        <CoreButton v-bind="args" class="bg-amber-100 text-amber-500 border-amber-100 hover:border-amber-500">
          <Check :size="size" />
          {{args.default || "Default Text"}}
        </CoreButton>
      `,
    };
  },
};
