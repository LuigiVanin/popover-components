<script lang="ts" setup>
import { cn } from "@popover/tw-utils";

import { TransitionClasses } from "../../types";

type ModalProps = {
  modelValue: boolean;
  teleported?: boolean;
  transition?: TransitionClasses;
  class?: string;
  overlayClass?: string;
};

const props = withDefaults(defineProps<ModalProps>(), {
  teleported: true,
  class: "",
  overlayClass: "",
  transition: () => ({
    enterActiveClass: "duration-150 ease-out",
    enterFromClass: "opacity-0 translate-y-3",
    enterToClass: "opacity-100 translate-y-0",
    leaveActiveClass: "duration-150 ease-in",
    leaveFromClass: "",
    leaveToClass: "opacity-0 translate-y-3",
  }),
});
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
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          :class="
            cn('modal-overlay absolute inset-0 bg-black/40', props.overlayClass)
          "
        />
        <div :class="cn('modal-card', props.class)">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
