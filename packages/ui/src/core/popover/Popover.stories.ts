import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";

import CoreButton from "../button/Button.vue";
import CorePopover from "./Popover.vue";

const meta: Meta<typeof CorePopover> = {
  title: "Core/Popover",
  component: CorePopover,
  tags: ["autodocs"],

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
  render: (args) => {
    return {
      components: { CoreButton, CorePopover },
      setup() {
        const showPopover = ref(false);

        return { args, showPopover };
      },
      template: `
         <CorePopover v-model="showPopover" position="bottom left">
          <CoreButton
            class="px-4 py-1"
            size="md"
            @click="() => (showPopover = !showPopover)"
          >
            Teste 3
          </CoreButton>

          <template #content>
            <div
              class="h-20 w-40 rounded-md border border-zinc-200 bg-neutral-50 p-2 shadow-lg"
            >
              <span class="font-bold"> abc </span>
            </div>
          </template>
        </CorePopover>
        `,
    };
  },
};
