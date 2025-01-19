import { Meta, StoryObj } from "@storybook/vue3";
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
          "This story demonstrates the standard usage of the `CoreModal` component with default settings and the an example content.",
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
          "This story demonstrates the `CoreModal` component with custom transition classes for enter and leave animations.",
      },
    },
  },
};

// export const BlurOverlayModal: Story = {
//   args: {
//     modelValue: true,
//     blur: true,
//   },
//   parameters: {
//     docs: {
//       description: {
//         story:
//           "This story demonstrates the `CoreModal` component with a backdrop blur effect applied to the overlay.",
//       },
//     },
//   },
// };

// export const PersistentModal: Story = {
//   args: {
//     modelValue: true,
//     persist: true,
//   },
//   parameters: {
//     docs: {
//       description: {
//         story:
//           "This story demonstrates the `CoreModal` component in a persistent state. The modal will not close when clicking outside or pressing the Escape key.",
//       },
//     },
//   },
// };
