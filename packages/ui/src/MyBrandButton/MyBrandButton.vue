<script lang="ts" setup>
type Props = {
  class?: string;
};

const props = defineProps<Props>();
</script>

<template>
  <button
    :class="[
      'bg-brand-main rounded-md px-4 py-1 text-red-500 shadow-sm hover:bg-opacity-50 hover:shadow-xl',
      props.class,
    ]"
  >
    <span>
      bby
      <slot />
    </span>
  </button>
</template>
