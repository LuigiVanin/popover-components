<script setup lang="ts">
import { cn } from "@popover/tw-utils";
import { CoreButton } from "@popover/ui";
import { onMounted } from "vue";

onMounted(() => {
  console.log(cn("p-5"));
});
</script>

<template>
  <div class="flex h-[200vh] w-full flex-col">
    <header class="bg-primary-500 h-16"></header>

    <main class="h-full px-4 pt-10">
      <div
        class="shadow-soft hover:shadow-soft-active flex max-w-96 flex-col gap-2 rounded-lg border border-neutral-200 bg-neutral-100 p-5"
      >
        <CoreButton class="bg-primary-200 text-neutral-700">
          Teste 1
        </CoreButton>
        <CoreButton class="bg-primary-400 text-neutral-100">
          Teste 2
        </CoreButton>
      </div>
    </main>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
