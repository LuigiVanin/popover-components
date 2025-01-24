<script lang="ts" setup>
import { cn } from "@popover/tw-utils";
import { X as CloseIcon } from "lucide-vue-next";
import { onBeforeUnmount, ref, watch } from "vue";

import { TransitionClasses } from "../../types";

type ModalProps = {
  modelValue: boolean;
  teleported?: boolean;
  transition?: TransitionClasses;
  class?: string;
  overlayClass?: string;
  blur?: boolean;
  closeButton?: boolean;
  transparentOverlay?: boolean;
  persist?: boolean;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
};

const props = withDefaults(defineProps<ModalProps>(), {
  teleported: true,
  class: "",
  overlayClass: "",
  blur: false,
  transparentOverlay: false,
  closeButton: true,
  persist: false,
  transition: () => ({
    enterActiveClass: "duration-150 ease-out",
    enterFromClass: "opacity-0 translate-y-4",
    enterToClass: "opacity-100 translate-y-0",
    leaveActiveClass: "duration-150 ease-in",
    leaveFromClass: "",
    leaveToClass: "opacity-0 translate-y-4",
  }),
  ariaLabelledby: undefined,
  ariaDescribedby: undefined,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const modalRef = ref<HTMLElement | null>(null);

const close = () => {
  emit("update:modelValue", false);
};

function handleKeydown(event: KeyboardEvent) {
  if (event.key === "Escape" && !props.persist) {
    close();
  }
}

function trapFocusHandler(event: FocusEvent) {
  if (!modalRef.value) return;
  let hasTargetElement = false;
  if (modalRef.value?.children) {
    hasTargetElement = Array.from(modalRef.value.children).some((child) =>
      child.contains(event.target as Node),
    );
  }

  if (
    hasTargetElement &&
    modalRef.value &&
    !modalRef.value.contains(event.target as Node)
  ) {
    event.stopPropagation();
    event.preventDefault();
    modalRef.value.focus();
  }
}

const destroyHandler = () => {
  document.body.classList.remove("modal-open");
  document.removeEventListener("keydown", handleKeydown);
  document.removeEventListener("focus", trapFocusHandler);
};

const showHandler = () => {
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("focus", trapFocusHandler);
  document.body.classList.add("modal-open");
};

onBeforeUnmount(() => destroyHandler());

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      showHandler();
    } else {
      destroyHandler();
    }
  },
);
</script>

<template>
  <Teleport :disabled="!props.teleported" to="body">
    <Transition
      :enter-active-class="props.transition?.enterActiveClass"
      :enter-from-class="props.transition?.enterFromClass"
      :enter-to-class="props.transition?.enterToClass"
      :leave-active-class="props.transition?.leaveActiveClass"
      :leave-from-class="props.transition?.leaveFromClass"
      :leave-to-class="props.transition?.leaveToClass"
    >
      <div
        v-if="props.modelValue"
        ref="modalRef"
        class="fixed inset-0 z-40 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="props.ariaLabelledby"
        :aria-describedby="props.ariaDescribedby"
        @keydown.esc="close"
        @click="() => !props.persist && close()"
      >
        <div
          :class="
            cn(
              'modal-overlay absolute inset-0 bg-black/30',
              props.blur && 'backdrop-blur-[2px]',
              props.transparentOverlay && 'bg-transparent',
              props.overlayClass,
            )
          "
        />
        <div :class="cn('modal-card relative z-50', props.class)" @click.stop>
          <button
            v-if="props.closeButton"
            type="button"
            class="close-btn absolute right-4 top-4 flex flex-row items-center text-neutral-500"
            @click="close"
          >
            <slot name="close-btn">
              <CloseIcon :size="19" />
            </slot>
          </button>
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
body.modal-open {
  overflow: hidden !important;
}
</style>
