<script lang="ts" setup>
import { cn } from "@popover/tw-utils";

import type { SizeKey, VariantKey } from "../../types";

type ButtonProps = {
  class?: string;
  type?: "button" | "submit" | "reset";
  variant?: VariantKey;
  size?: SizeKey;
  disabled?: boolean;
  loading?: boolean;
};

const props = withDefaults(defineProps<ButtonProps>(), {
  class: "",
  type: "button",
  variant: "normal",
  size: "md",
  disabled: false,
  loading: false,
});

const variants: Record<VariantKey, string | undefined> = {
  normal: "bg-primary-500 border-primary-500 border text-neutral-200",
  outlined:
    "border border-primary-500 text-primary-500 hover:text-neutral-200 hover:bg-primary-500 hover:opacity-90 bg-transparent",
  link: "shadow-none hover:underline hover:opacity-70 text-primary-500",
  simple:
    "shadow-sm hover:opacity-70 text-neutral-600 border border-neutral-300",
  soft: "bg-primary-200 border border-primary-200 text-primary-500 !shadow-sm hover:border-primary-400 hover:opacity-90",
};

const sizeVariants: Record<SizeKey, string> = {
  sm: "px-4 py-1 text-sm",
  md: "px-7 py-[0.36rem] text-base",
  lg: "px-10 py-2 text-lg",
  xl: "px-12 py-3 text-xl",
};

const loadingSizeVariants: Record<SizeKey, string> = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
  xl: "h-8 w-8",
};

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
  (e: "focus", event: FocusEvent): void;
  (e: "blur", event: FocusEvent): void;
  (e: "mouseenter", event: MouseEvent): void;
  (e: "mouseleave", event: MouseEvent): void;
  (e: "mousedown", event: MouseEvent): void;
  (e: "mouseup", event: MouseEvent): void;
}>();
</script>

<template>
  <button
    v-bind="$attrs"
    :class="[
      cn(
        'flex flex-row items-center justify-center gap-2 rounded-lg shadow-md transition-all duration-75 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50',
        variants[props.variant] || '',
        sizeVariants[props.size] || '',
        props.class,
      ),
    ]"
    :type="props.type"
    :disabled="props.disabled"
    @click="emit('click', $event)"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
    @mouseover="emit('mouseenter', $event)"
    @mouseout="emit('mouseleave', $event)"
    @mousedown="emit('mousedown', $event)"
    @mouseup="emit('mouseup', $event)"
  >
    <slot v-if="props.loading" name="loadingPrepend">
      <span
        :class="
          cn(
            'border-t-primary-400 h-4 w-4 animate-spin rounded-full border-2',
            loadingSizeVariants[props.size] || '',
          )
        "
      />
    </slot>
    <slot />
  </button>
</template>
