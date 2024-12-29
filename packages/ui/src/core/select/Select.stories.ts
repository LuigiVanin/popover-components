import type { Meta, StoryObj } from "@storybook/vue3";
import { Camera, Coffee } from "lucide-vue-next";
import { ref } from "vue";

import CoreSelect from "./Select.vue";

const meta: Meta<typeof CoreSelect> = {
  title: "Core/Select",
  parameters: {
    docs: {
      subtitle: "CoreSelect - @popover/ui/core/select",
      description: {
        component:
          "The `CoreSelect` component is a versatile select input component for the `popover components` library. It supports multiple sizes, making it adaptable to various design needs. The `position` prop allows you to choose from different dropdown positions like `bottom`, `top`, `top left`, `top right`, `bottom left`, and `bottom right`. The `size` prop offers options such as `sm`, `md`, `lg`, and `xl`, ensuring the select input fits well in different UI contexts. Additionally, the component supports a `loading` state with a customizable loading spinner, and various slots for extending its functionality. The `options` generic `T` type should extend the behavior of the `{ value: string | number; label: string }` object.",
      },
    },
  },
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
    options: {
      control: "object",
      description:
        "Array of options to be displayed in the select dropdown. Each option should be an object with `value` and `label` properties.",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text to display when no option is selected.",
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
      description: "Position of the dropdown relative to the select input.",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Size of the select input.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the select input if set to true.",
    },
    loading: {
      control: "boolean",
      description: "Displays a loading spinner if set to true.",
    },
    contentClass: {
      control: "text",
      description: "Class to apply to the dropdown content.",
    },
    class: {
      control: "text",
      description: "Class to apply to the select input.",
    },
    name: {
      control: "text",
      description: "Name attribute for the select input.",
    },
    modelValue: {
      control: "object",
      description: "The currently selected option.",
    },

    // Slots
    sufix: {
      control: "text",
      description:
        "Slot for adding content after the select input. It has a default content as a chevron icon.",
    },
    prefix: {
      control: "text",
      description:
        "Slot for adding content before the select input. It has adefault content of a spinner when the `loading` prop is set to true.",
    },
    option: {
      control: "text",
      description:
        "The most important slot for customizing the option content. It receives the `option` object as a prop that has the `item` object of type `T`, the same type of the prop `options` and represent the current option item of that slot.",
    },
  },

  render: (args) => {
    return {
      components: { CoreSelect },
      setup() {
        const state = ref(false);

        return { args, state };
      },
      template: `
        <CoreSelect v-bind="args" v-model="state" class="w-full max-w-64" />
      `,
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
} satisfies Meta<typeof CoreSelect>;

type Story = StoryObj<typeof meta>;

export const StandartSelect: Story = {
  args: {
    disabled: false,
    loading: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the standard usage of the `CoreSelect` component with default settings.",
      },
    },
  },
};

export const DisabledSelect: Story = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the `CoreSelect` component in a disabled state. When the `disabled` prop is set to `true`, the select input is not interactive.",
      },
    },
  },
};

export const LoadingSelect: Story = {
  args: {
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the `CoreSelect` component in a loading state. When the `loading` prop is set to `true`, a loading spinner is displayed.",
      },
    },
  },
};

export const CustomPrefixSelect: Story = {
  args: {
    loading: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the `CoreSelect` component with a custom prefix slot. The prefix slot is used to add custom content before the select input.",
      },
    },
  },
  render: (args) => {
    return {
      components: { CoreSelect, Coffee },
      setup() {
        const state = ref(false);

        return { args, state };
      },
      template: `
        <CoreSelect v-bind="args" v-model="state" class="w-full max-w-64">
          <template #prefix>
            <div class="flex items-center justify-center w-8 h-full border-r border-gray-300 pr-2 group-hover:border-primary-400 group-hover:text-primary-500 group-focus-within:border-primary-400 group-focus-within:text-primary-500 transition-all duration-200">
              <Coffee :size="20" :class="args.loading && 'animate-spin'" />
            </div>
          </template>
        </CoreSelect>
      `,
    };
  },
};

export const CustomSuffixSelect: Story = {
  args: {
    loading: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the `CoreSelect` component with a custom suffix slot. The suffix slot is used to add custom content after the select input.",
      },
    },
  },
  render: (args) => {
    return {
      components: { CoreSelect, Camera },
      setup() {
        const state = ref(false);

        return { args, state };
      },
      template: `
        <CoreSelect v-bind="args" v-model="state" class="w-full max-w-64">
          <template #sufix>
            <div class="flex items-center justify-center aspect-square h-[85%] my-1  ml-auto  group-hover:border-primary-400 group-hover:text-primary-500 group-focus-within:border-primary-400 group-focus-within:text-primary-500 transition-all duration-200 rounded-full border border-neutral-200 hover:bg-primary-100">
              <Camera :size="16" />
            </div>
          </template>
        </CoreSelect>
      `,
    };
  },
};

export default meta;
