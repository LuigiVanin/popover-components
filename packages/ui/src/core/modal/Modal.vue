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
  id?: string;
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

const persistAnimation = ref<boolean>(false);

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

const triggerPersistAnimation = () => {
  if (props.persist) {
    persistAnimation.value = true;

    setTimeout(() => {
      persistAnimation.value = false;
    }, 150);
  }
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
    <div :id="props.id" class="modal-wrapper-teleport">
      <Transition
        enter-active-class="duration-150 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-150 ease-in"
        leave-from-class=""
        leave-to-class="opacity-0"
      >
        <div
          v-if="props.modelValue"
          :class="
            cn(
              'modal-overlay fixed inset-0 bg-black/30',
              props.blur && 'backdrop-blur-[2px]',
              props.transparentOverlay && 'bg-transparent',
              props.overlayClass,
            )
          "
        />
      </Transition>
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
          :class="[
            'fixed inset-0 z-40 flex items-center justify-center',
            persistAnimation && 'persist-animation',
          ]"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="props.ariaLabelledby"
          :aria-describedby="props.ariaDescribedby"
          @keydown.esc="close"
          @click="() => (!props.persist ? close() : triggerPersistAnimation())"
        >
          <div
            :id="`${props.id}-card`"
            :class="cn('modal-card relative z-50', props.class)"
            @click.stop
          >
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
    </div>
  </Teleport>
</template>

<style>
body.modal-open {
  overflow: hidden !important;
}

.persist-animation {
  animation: persist-animation 0.15s ease-out;
}

@keyframes persist-animation {
  0% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
