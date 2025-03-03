<script lang="ts" setup>
import { cn } from "@popover/tw-utils";
import { onClickOutside, useElementBounding } from "@vueuse/core";
import { computed, Ref, ref } from "vue";

import type { Position } from "../../types";

type TransitionClasses = {
  enterActiveClass: string;
  enterFromClass: string;
  enterToClass: string;
  leaveActiveClass: string;
  leaveFromClass: string;
  leaveToClass: string;
};

type CorePopoverProps = {
  class?: string;
  wrapperClass?: string;
  teleported?: boolean;
  persist?: boolean;
  position?: Position;
  modelValue: boolean;
  transition?: TransitionClasses;
};

const props = withDefaults(defineProps<CorePopoverProps>(), {
  teleported: true,
  class: "",
  wrapperClass: "",
  position: "top",
  persist: false,
  transition: () => ({
    enterActiveClass: "duration-150 ease-out",
    enterFromClass: "opacity-0 translate-y-3",
    enterToClass: "opacity-100 translate-y-0",
    leaveActiveClass: "duration-150 ease-in",
    leaveFromClass: "",
    leaveToClass: "opacity-0 translate-y-3",
  }),
});

const popoverCoreRef: Ref<HTMLElement | null> = ref(null);
const popoverContentRef: Ref<HTMLElement | null> = ref(null);

const persistAnimation = ref<boolean>(false);

const { top, height, width, bottom, left, right } = useElementBounding(
  // eslint-disable-next-line
  popoverCoreRef as any,
);

const positionVariants = {
  top: "bottom-full",
  bottom: "",
  "top left": "bottom-full left-0",
  "top right": "bottom-full right-0",
  "bottom left": "left-0",
  "bottom right": "right-0",
};

const isValidElement = computed(() => {
  try {
    if (process?.env?.TEST_ENV === "test") {
      return true;
    }
  } catch {
    console.info("Not in test environment");
  }

  if (!popoverCoreRef.value) {
    return false;
  }
  return Boolean(
    width.value ||
      height.value ||
      top.value ||
      right.value ||
      bottom.value ||
      left.value,
  );
});

const popoverPositionStyle = computed(() => {
  const topOffset = props.position === "top" ? 0 : (height.value ?? 0);
  return {
    top: `${(top.value || 0) + topOffset}px`,
    left: `${left.value || 0}px`,
    width: `${width.value || 0}px`,
    height: `0px`,
  };
});

const positionVariantsClasses = computed(
  () => positionVariants[props.position],
);

const closePopover = (event: MouseEvent) => {
  if (!props.persist) {
    let hasTargetElement = false;

    if (popoverCoreRef.value?.children) {
      hasTargetElement = Array.from(popoverCoreRef.value.children).some(
        (child) => child.contains(event.target as Node),
      );
    }

    if (!hasTargetElement) emit("update:modelValue", false);
  } else triggerPersistAnimation();
};

const triggerPersistAnimation = () => {
  if (props.persist) {
    persistAnimation.value = true;

    setTimeout(() => {
      persistAnimation.value = false;
    }, 150);
  }
};

// eslint-disable-next-line
onClickOutside(popoverContentRef as any, closePopover);

interface PopoverEvents {
  // eslint-disable-next-line
  (event: "update:modelValue", value: boolean): void;
}

const emit = defineEmits<PopoverEvents>();

defineExpose({
  popoverCoreRef,
  popoverContentRef,
  closePopover,
});
</script>

<template>
  <div
    ref="popoverCoreRef"
    class="popover-wrapper inline-flex items-start"
    v-bind="$attrs"
    :class="cn(props.wrapperClass)"
  >
    <slot />
    <Teleport to="body" :disabled="!props.teleported">
      <Transition
        :enter-active-class="props.transition?.enterActiveClass"
        :enter-from-class="props.transition?.enterFromClass"
        :enter-to-class="props.transition?.enterToClass"
        :leave-active-class="props.transition?.leaveActiveClass"
        :leave-from-class="props.transition?.leaveFromClass"
        :leave-to-class="props.transition?.leaveToClass"
      >
        <div
          v-if="isValidElement && props.modelValue"
          class="popover-content bg-primary-800 fixed z-50 flex justify-center"
          :style="popoverPositionStyle"
        >
          <div
            ref="popoverContentRef"
            role="tooltip"
            :class="
              cn(
                'popover-box absolute',
                positionVariantsClasses,
                props.class,
                persistAnimation && 'persist-animation',
              )
            "
          >
            <slot name="content" />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style>
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
