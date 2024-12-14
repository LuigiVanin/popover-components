<script setup lang="ts">
import { cn } from "@popover/tw-utils";
import { CoreButton, CorePopover } from "@popover/ui";
import { onMounted, ref } from "vue";

const showPopover = ref(false);

onMounted(() => {
  console.log(cn("p-5"));
});
</script>

<template>
  <div class="flex h-[200vh] w-full flex-col">
    <header class="bg-primary-500 h-16"></header>

    <main class="flex h-full flex-col gap-10 px-4 pt-10">
      <div
        class="shadow-soft hover:shadow-soft-active @container flex max-w-96 flex-col gap-2 rounded-lg border border-neutral-200 bg-neutral-100 p-5"
      >
        <h1 class="@xs:block hidden text-center">title</h1>
        <CoreButton
          variant="outlined"
          type="button"
          data-testid="uuid"
          @click="(e) => false"
        >
          Teste 1
        </CoreButton>
        <CoreButton class=""> Teste 2 </CoreButton>
      </div>
      <div class="wrapper">
        <CorePopover v-model="showPopover" position="bottom left">
          <CoreButton
            class="px-4 py-1"
            size="md"
            variant="soft"
            @click="() => (showPopover = !showPopover)"
          >
            Teste 3
          </CoreButton>

          <template #content>
            <div
              class="h-20 w-40 rounded-md border border-zinc-200 bg-neutral-50 shadow-lg"
            >
              abc
            </div>
          </template>
        </CorePopover>
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
