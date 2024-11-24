<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { cn } from "@popover/tw-utils";
import { onMounted } from "vue";

import { test } from "../utils/test";

type Props = {
  class?: string;
};

const props = defineProps<Props>();

onMounted(() => {
  test();
});
</script>

<template>
  <button
    :class="[
      cn(
        'bg-primary-100 rounded-md border border-gray-300 px-4 py-1 pb-2 text-white shadow-lg transition-all duration-75 hover:opacity-80',
        props.class,
      ),
    ]"
  >
    <span class="leading-4">
      <slot />
    </span>
  </button>
</template>
