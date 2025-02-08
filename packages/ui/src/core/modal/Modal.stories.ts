import { Meta, StoryObj } from "@storybook/vue3";
import { Check, Trash2, X as CloseIcon } from "lucide-vue-next";
import { ref } from "vue";

import CoreButton from "../button/Button.vue";
import CoreSelect from "../select/Select.vue";
import CoreModal from "./Modal.vue";

const options = [
  {
    label: "Teste de valor 1",
    value: "teste",
  },
  {
    label: "Teste de valor 2",
    value: "teste 2",
  },
  {
    label: "Teste de valor 3",
    value: "teste 3",
  },
];

const meta: Meta<typeof CoreModal> = {
  title: "Core/Modal",
  component: CoreModal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      subtitle: "CoreModal - @popover/ui/core/modal",
      description: {
        component:
          "The `CoreModal` component is a flexible and customizable modal dialog for the `popover components` library. It supports various features such as teleportation, transitions, and focus trapping. The `transition` prop allows you to define custom transition classes for the modal's enter and leave animations. The `blur` prop adds a backdrop blur effect, and the `closeButton` prop controls the visibility of the close button. Additionally, the component supports ARIA attributes for accessibility.",
      },
    },
  },
  args: {},
  argTypes: {
    modelValue: {
      control: "boolean",
      description: "Controls the visibility of the modal.",
    },
    teleported: {
      control: "boolean",
      description: "Determines if the modal should be teleported to the body.",
    },
    transition: {
      control: "object",
      description:
        "Custom transition classes for the modal's enter and leave animations.",
    },
    class: {
      control: "text",
      description: "Class to apply to the modal content.",
    },
    overlayClass: {
      control: "text",
      description: "Class to apply to the modal overlay.",
    },
    blur: {
      control: "boolean",
      description: "Adds a backdrop blur effect to the modal overlay.",
    },
    closeButton: {
      control: "boolean",
      description: "Controls the visibility of the close button.",
    },
    transparentOverlay: {
      control: "boolean",
      description: "Makes the modal overlay transparent.",
    },
    persist: {
      control: "boolean",
      description:
        "Prevents the modal from closing when clicking outside or pressing the Escape key.",
    },
    ariaLabelledby: {
      control: "text",
      description: "ID of the element that labels the modal for accessibility.",
    },
    ariaDescribedby: {
      control: "text",
      description:
        "ID of the element that describes the modal for accessibility.",
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

  render: (args) => {
    return {
      components: { CoreModal, CoreSelect, CoreButton },
      setup() {
        const modalLoading = ref(false);
        const showModal = ref(false);

        const handleModalConfirm = () => {
          modalLoading.value = true;
          setTimeout(() => {
            modalLoading.value = false;
            showModal.value = false;
          }, 2000);
        };

        return { options, args, modalLoading, showModal, handleModalConfirm };
      },
      template: `
        <CoreButton @click="showModal = true">Open Modal</CoreButton>
        <CoreModal v-model="showModal" v-bind="args" class="rounded-md bg-white shadow-xl border border-neutral-200">
          <div class="wrapper flex h-full min-h-[30vh] w-96 flex-col">
            <header class="border-b border-neutral-200 p-3">
              <p class="font-semibold">You sure?</p>
            </header>
            <main class="flex flex-1 flex-col gap-3 p-3 pb-4">
              <p class="text-sm text-neutral-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                vitae efficitur leo. Duis ut lectus risus. Interdum et malesuada
                fames ac ante ipsum primis in faucibus. Aenean placerat quis sapien
                accumsan cursus. Nullam vulputate mauris a metus tempor efficitur.
                Sed at condimentum tortor. Fusce rhoncus erat in sem ultrices
                interdum. Vivamus in semper nulla, vel fermentum arcu. Nulla
                fermentum ex ante, vestibulum auctor velit finibus vel. Maecenas
                hendrerit dignissim orci et fringilla. Nulla tincidunt vel nisl ac
                pellentesque. Proin vel mauris vel ligula viverra cursus.
              </p>

              <div class="flex flex-col">
                <label class="mb-2 text-sm font-bold">Reason:</label>
                <CoreSelect
                  v-model="option"
                  class="w-64"
                  size="sm"
                  :options="options"
                />
              </div>
            </main>
            <footer class="flex justify-end gap-2 border-t border-neutral-200 p-3">
              <CoreButton
                variant="simple"
                :disabled="modalLoading"
                @click="() => (showModal = false)"
              >
                Cancel
              </CoreButton>
              <CoreButton
                variant="soft"
                :loading="modalLoading"
                @click="handleModalConfirm"
              >
                Confirm
              </CoreButton>
            </footer>
          </div>
        </CoreModal>
        `,
    };
  },
} satisfies Meta<typeof CoreModal>;

export default meta;

type Story = StoryObj<typeof CoreModal>;

export const StandardModalExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the standard usage of the `CoreModal` component with default settings and example content. The modal includes a header, main content area, and footer with action buttons.",
      },
    },
  },
};

export const CustomTransitionModal: Story = {
  args: {
    transition: {
      enterActiveClass: "duration-300 ease-out",
      enterFromClass: "opacity-0 scale-90",
      enterToClass: "opacity-100 scale-100",
      leaveActiveClass: "duration-200 ease-in",
      leaveFromClass: "opacity-100 scale-100",
      leaveToClass: "opacity-0 scale-90",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the `CoreModal` component with custom transition classes for enter and leave animations. The `transition` prop allows you to define custom transition classes for the modal's enter and leave animations.",
      },
    },
  },
};

export const PersistentModal: Story = {
  args: {
    persist: true,
    closeButton: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the `CoreModal` component in a persistent state. The modal will not close when clicking outside or pressing the Escape key. The `persist` prop prevents the modal from closing when clicking outside or pressing the Escape key, and the `closeButton` prop controls the visibility of the close button.",
      },
    },
  },

  render: (args) => {
    return {
      components: { CoreModal, CoreSelect, CoreButton, Check, Trash2 },
      setup() {
        const modalLoading = ref(false);
        const showModal = ref(false);

        const handleModalConfirm = () => {
          modalLoading.value = true;
          setTimeout(() => {
            modalLoading.value = false;
            showModal.value = false;
          }, 1000);
        };

        return { options, args, modalLoading, showModal, handleModalConfirm };
      },
      template: `
        <CoreButton @click="showModal = true">Open Modal</CoreButton>
        <CoreModal v-model="showModal" v-bind="args" class="rounded-md bg-white shadow-xl border border-neutral-200">
          <div class="wrapper flex h-full min-h-[30vh] w-96 flex-col">
            <header class="border-b border-neutral-200 p-3 bg-red-500 rounded-t-md">
              <p class="font-bold text-neutral-50">Danger! Are you sure?</p>
            </header>
            <main class="flex flex-1 flex-col gap-3 p-3 pb-4 ">
              <p class="text-sm text-neutral-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                vitae efficitur leo. Duis ut lectus risus. Interdum et malesuada
                fames ac ante ipsum primis in faucibus.
              </p>
            </main>
            <footer class="flex justify-end gap-2 border-t border-neutral-200 p-3">
              <CoreButton
                variant="link"
                class="text-red-500"
                :disabled="modalLoading"
                @click="() => (showModal = false)"
              >
                Close
              </CoreButton>
              <CoreButton
                variant="normal"
                class="bg-red-500 border-red-500"
                @click="handleModalConfirm"
              >
                <Check v-if="modalLoading" class="w-5 h-5" />
                <Trash2 v-else class="w-5 h-5" />
                Confirm
              </CoreButton>
            </footer>
          </div>
        </CoreModal>
        `,
    };
  },
};

export const BlurTransparentOverlayModal: Story = {
  args: {
    blur: true,
    transparentOverlay: true,
    closeButton: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the `CoreModal` component with both `blur` and `transparentOverlay` props set to `true`. The modal has a different design layout. The `blur` prop adds a backdrop blur effect to the modal overlay, and the `transparentOverlay` prop makes the modal overlay transparent.",
      },
    },
  },
  render: (args) => {
    return {
      components: { CoreModal, CoreButton },
      setup() {
        const showModal = ref(false);

        return { args, showModal };
      },
      template: `
        <CoreButton @click="showModal = true">Open Modal</CoreButton>
        <CoreModal v-model="showModal" v-bind="args" class="rounded-lg bg-white shadow-2xl border border-neutral-300">
          <div class="wrapper flex h-full min-h-[40vh] w-80 flex-col">
            <header class="border-b border-neutral-300 p-4 bg-blue-500 rounded-t-lg">
              <p class="font-bold text-white">Information</p>
            </header>
            <main class="flex flex-1 flex-col gap-4 p-4">
              <p class="text-sm text-neutral-600">
                This modal demonstrates the use of both \`blur\` and \`transparentOverlay\` props. The backdrop is blurred and transparent.
              </p>
            </main>
            <footer class="flex justify-end gap-3 border-t border-neutral-300 p-4">
              <CoreButton
                variant="simple"
                @click="() => (showModal = false)"
              >
                Close
              </CoreButton>
            </footer>
          </div>
        </CoreModal>
      `,
    };
  },
};

export const CustomCloseButton: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the `CoreModal` component with a custom close button. The modal includes a custom close button slot, allowing you to define your own close button design.",
      },
    },
  },

  render: (args) => {
    return {
      components: {
        CoreModal,
        CoreSelect,
        CoreButton,
        Check,
        Trash2,
        CloseIcon,
      },
      setup() {
        const modalLoading = ref(false);
        const showModal = ref(false);

        const handleModalConfirm = () => {
          modalLoading.value = true;
          setTimeout(() => {
            modalLoading.value = false;
            showModal.value = false;
          }, 1000);
        };

        return { options, args, modalLoading, showModal, handleModalConfirm };
      },
      template: `
        <CoreButton @click="showModal = true">Open Modal</CoreButton>
        <CoreModal v-model="showModal" v-bind="args" class="rounded-md bg-white shadow-xl">
          <template #close-btn>
            <span class="text-neutral-50 h-8 w-8 rounded-full flex items-center justify-center border border-transparent hover:border hover:border-neutral-200 transition-all ease-linear duration-200 -translate-y-2 translate-x-2 bg-white/15 hover:bg-white/30">
              <CloseIcon :size="19"  />
            </span>
          </template>
          <div class="wrapper flex h-full min-h-[30vh] w-96 flex-col">
            <header class="border-b border-neutral-200 p-3 bg-red-500 rounded-t-md">
              <p class="font-bold text-neutral-50">Danger! Are you sure?</p>
            </header>
            <main class="flex flex-1 flex-col gap-3 p-3 pb-4 ">
              <p class="text-sm text-neutral-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                vitae efficitur leo. Duis ut lectus risus. Interdum et malesuada
                fames ac ante ipsum primis in faucibus.
              </p>
            </main>
            <footer class="flex justify-end gap-2 border-t border-neutral-200 p-3">
              <CoreButton
                variant="link"
                class="text-red-500"
                :disabled="modalLoading"
                @click="() => (showModal = false)"
              >
                Close
              </CoreButton>
              <CoreButton
                variant="normal"
                class="bg-red-500 border-red-500"
                @click="handleModalConfirm"
              >
                <Check v-if="modalLoading" class="w-5 h-5" />
                <Trash2 v-else class="w-5 h-5" />
                Confirm
              </CoreButton>
            </footer>
          </div>
        </CoreModal>
        `,
    };
  },
};
