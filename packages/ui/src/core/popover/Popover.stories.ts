import type { Meta, StoryObj } from "@storybook/vue3";
import { X as CloseIcon } from "lucide-vue-next";
import { ref } from "vue";

import CoreButton from "../button/Button.vue";
import CorePopover from "./Popover.vue";

const meta: Meta<typeof CorePopover> = {
  title: "Core/Popover",
  parameters: {
    docs: {
      subtitle: "CorePopover - @popover/ui/core/popover",
      description: {
        component:
          "The `CorePopover` component is a versatile and customizable popover for the `popover components` library. It supports various features such as teleportation, transitions, and persistence. The `transition` prop allows you to define custom transition classes for the popover's enter and leave animations. The `persistent` prop prevents the popover from closing when clicking outside.",
      },
    },
  },

  component: CorePopover,
  tags: ["autodocs"],

  args: {},
  argTypes: {
    position: {
      control: "select",
      options: [
        "top left",
        "top right",
        "bottom left",
        "bottom right",
        "top",
        "bottom",
      ],
      description: "Position of the popover relative to the trigger element.",
    },
    persistent: {
      control: "boolean",
      description: "If true, the popover will not close when clicking outside.",
    },
    teleported: {
      control: "boolean",
      description: "If true, the popover will be teleported to the body.",
    },
    class: {
      control: "text",
      description: "Class name to apply to the popover content.",
    },
    wrapperClass: {
      control: "text",
      description: "Class name to apply to the popover wrapper.",
    },
    transition: {
      control: "object",
      description:
        "Custom transition classes for the popover's enter and leave animations.",
    },

    // SLOTS
    default: {
      control: "text",
      description:
        "Popover trigger element. Should wrap the elements where the popover will be triggered and position is based of.",
    },
    content: {
      control: "text",
      description:
        "Popover content slot. Everything inside of this slot will go inside of the popover. From this slot you can control the popover body style.",
    },
  },

  decorators: [
    () => ({
      template: `
        <div class="flex flex-row justify-center w-full min-h-[25vh] gap-5 items-center flex-wrap">
          <story/>
        </div>`,
    }),
  ],
} satisfies Meta<typeof CorePopover>;

export default meta;

type Story = StoryObj<typeof CorePopover>;

export const StandartPopoverExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the standard usage of the `CorePopover` component with default settings. The popover includes a trigger button and content with a list of items.",
      },
    },
  },

  render: (args) => {
    return {
      components: { CoreButton, CorePopover },
      setup() {
        const showPopover = ref(false);

        return { args, showPopover };
      },
      template: `
         <CorePopover v-model="showPopover" position="bottom left" v-bind="args">
          <CoreButton
            class="px-4 py-1"
            size="md"
            @click="() => (showPopover = !showPopover)"
          >
            Teste 3
          </CoreButton>

          <template #content>
            <div
              class="w-56 rounded-md border border-zinc-200 bg-neutral-50 py-2 px-0 pb-3 shadow-lg"
            >
              <ul class="px-2">
                <li class="py-1 px-3 rounded-md hover:bg-neutral-100 cursor-pointer">
                  <p>Insights</p>
                  <p class="text-sm text-neutral-400">Measure actions your users take</p>
                </li>
                <li class="p-1 px-3 rounded-md hover:bg-neutral-100 cursor-pointer">
                  <p>Automations</p>
                  <p class="text-sm text-neutral-400">Create your own targeted content</p>
                </li>
              </ul>
              <span class="flex w-full bg-neutral-200 h-[1px] my-2" />
              <ul class="px-2">
                <li class="p-1 px-3 rounded-md hover:bg-neutral-100 cursor-pointer">
                  <p>Documentation</p>
                  <p class="text-sm text-neutral-400">Start integrating products and tools</p>
                </li>
              </ul>
            </div>
          </template>
        </CorePopover>
        `,
    };
  },
};

export const HoverBehaviourPopover: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the `CorePopover` component with hover behavior. The popover appears when hovering over the trigger button and disappears when the mouse leaves.",
      },
    },
  },

  render: (args) => {
    return {
      components: { CoreButton, CorePopover },
      setup() {
        const isHover = ref(false);

        const handleHover = (event: Event) => {
          if (event.type === "mouseover") isHover.value = true;
          else if (event.type === "mouseout") isHover.value = false;
        };

        return { args, isHover, handleHover };
      },
      template: `
      <CorePopover :model-value="isHover" position="bottom left" v-bind="args">
        <CoreButton
          class="px-4 py-1"
          size="md"
          @click="() => (showPopover = !showPopover)"
          @mouseenter="handleHover"
          @mouseleave="handleHover"
        >
          Teste 3
        </CoreButton>
        <template #content>
          <div
            class="w-60 rounded-md border border-zinc-200 bg-neutral-50 p-2 px-3 pb-3 shadow-lg mt-2"
          >
            <h3 class="font-semibold mb-1">Information</h3>
            <p class="text-sm text-neutral-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              vitae efficitur leo. Duis ut lectus risus.
            </p>
          </div>
        </template>
      </CorePopover>
      `,
    };
  },
};

export const PersistentPopover: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the `CorePopover` component in a persistent state. The popover will not close when clicking outside, only with direct action. The `persistent` prop prevents the popover from closing when clicking outside.",
      },
    },
  },
  args: {
    persistent: true,
  },
  render: (args) => {
    return {
      components: { CoreButton, CorePopover, CloseIcon },
      setup() {
        const showPopover = ref(false);

        return { args, showPopover };
      },
      template: `
      <CorePopover v-model="showPopover" position="bottom" persistent v-bind="args">
        <CoreButton
          class="px-4 py-1"
          size="md"
          @click="() => (showPopover = !showPopover)"
        >
          Teste 3
        </CoreButton>
        <template #content>
          <div
            class="w-60 rounded-md border border-zinc-200 bg-neutral-50 p-2 px-3 pb-3 shadow-lg relative mt-2"
          >
            <h3 class="font-semibold mb-1">Information</h3>
            <p class="text-sm text-neutral-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              vitae efficitur leo. Duis ut lectus risus.
            </p>
            <CoreButton 
              variant="simple" 
              class="absolute top-2 right-2 p-1" 
              @click="() => (showPopover = !showPopover)"
            >
              <CloseIcon class="w-4 h-4" />
            </CoreButton>
          </div>
        </template>
      </CorePopover>
      `,
    };
  },
};
