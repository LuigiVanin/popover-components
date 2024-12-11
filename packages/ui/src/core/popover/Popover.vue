<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { cn } from "@popover/tw-utils";
import { computed, onMounted, ref } from "vue";

type CorePopoverProps = {
  class?: string;
  wrapperClass?: string;
  teleported?: boolean;
  show: boolean;
};

const props = withDefaults(defineProps<CorePopoverProps>(), {
  teleported: true,
  class: "",
  wrapperClass: "",
});

const popoverCoreRef = ref<HTMLElement | null>(null);

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
  return Boolean(
    elementClientRect.value.x ||
      elementClientRect.value.y ||
      elementClientRect.value.width ||
      elementClientRect.value.height ||
      elementClientRect.value.top ||
      elementClientRect.value.right ||
      elementClientRect.value.bottom ||
      elementClientRect.value.left,
  );
});

onMounted(() => {
  const clientRect = popoverCoreRef.value?.getBoundingClientRect();
  console.log(clientRect);
  if (clientRect) {
    elementClientRect.value = clientRect;
  }
});

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
      <div
        v-show="isValidElement && props.show"
        class="popover-content bg-primary-800 fixed"
        :style="{
          top: `${(elementClientRect.top || 0) + (elementClientRect.height || 0)}px`,
          left: `${elementClientRect.left}px`,
          width: `${elementClientRect.width}px`,
          height: `${elementClientRect.height}px`,
        }"
      >
        <div :class="cn('popover-box h-full w-full bg-red-200', props.class)">
          <slot name="content" />
        </div>
      </div>
    </Teleport>
  </div>
</template>
