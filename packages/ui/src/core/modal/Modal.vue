<script lang="ts" setup>
import { TransitionClasses } from "../../types";

type ModalProps = {
  modelValue: boolean;
  teleported?: boolean;
  transition?: TransitionClasses;
};

const props = withDefaults(defineProps<ModalProps>(), {
  teleported: true,
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
      <div v-if="props.modelValue" class="">
        <div class="modal-overlay"></div>
        <div class="modal-card">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
