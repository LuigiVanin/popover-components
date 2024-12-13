<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { cn } from "@popover/tw-utils";
import { computed, onMounted, ref } from "vue";

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
  position?:
    | "top"
    | "bottom"
    | "top left"
    | "top right"
    | "bottom left"
    | "bottom right";
  show: boolean;
  transition?: TransitionClasses;
};

const props = withDefaults(defineProps<CorePopoverProps>(), {
  teleported: true,
  class: "",
  wrapperClass: "",
  position: "top",
  transition: () => ({
    enterActiveClass: "duration-150 ease-out",
    enterFromClass: "opacity-0 translate-y-3",
    enterToClass: "opacity-100 translate-y-0",
    leaveActiveClass: "duration-150 ease-in",
    leaveFromClass: "opacity-100",
    leaveToClass: "opacity-0 translate-y-3",
  }),
});

const popoverCoreRef = ref<HTMLElement | null>(null);

const positionVariants = {
  top: "bottom-full",
  bottom: "",
  "top left": "bottom-full left-0",
  "top right": "bottom-full right-0",
  "bottom left": "left-0",
  "bottom right": "right-0",
};

const elementClientRect = ref<Partial<DOMRect>>({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

const isValidElement = computed(() => {
  const rect = elementClientRect.value;
  return Boolean(
    rect.x ||
      rect.y ||
      rect.width ||
      rect.height ||
      rect.top ||
      rect.right ||
      rect.bottom ||
      rect.left,
  );
});

const popoverPositionStyle = computed(() => {
  const topOffset =
    props.position === "top" ? 0 : (elementClientRect.value.height ?? 0);
  return {
    top: `${(elementClientRect.value.top || 0) + topOffset}px`,
    left: `${elementClientRect.value.left || 0}px`,
    width: `${elementClientRect.value.width || 0}px`,
    height: `0px`,
  };
});

onMounted(() => {
  const clientRect = popoverCoreRef.value?.getBoundingClientRect();
  if (clientRect) {
    elementClientRect.value = clientRect;
  }
});

const positionVariantsClasses = computed(
  () => positionVariants[props.position],
);

defineEmits(["update:modelValue"]);
</script>

<template>
  <div
    ref="popoverCoreRef"
    class="popover-wrapper inline-flex items-start"
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
          v-if="isValidElement && props.show"
          class="popover-content bg-primary-800 fixed flex justify-center"
          :style="popoverPositionStyle"
        >
          <div
            :class="
              cn('popover-box absolute', positionVariantsClasses, props.class)
            "
          >
            <slot name="content" />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
