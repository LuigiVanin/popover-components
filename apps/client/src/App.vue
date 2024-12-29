<script setup lang="ts">
import { cn } from "@popover/tw-utils";
import { CoreButton, CorePopover, CoreSelect } from "@popover/ui";
import { Coffee } from "lucide-vue-next";
import { onMounted, ref } from "vue";

const showPopover = ref(false);
const option = ref(null);

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
          @click="() => false"
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
              <span class="bg-red-300"> abc </span>
            </div>
          </template>
        </CorePopover>
      </div>

      <CoreSelect
        v-model="option"
        class="w-64"
        position="top"
        :options="[
          {
            label: 'Teste de valor 1',
            value: 'teste',
          },
          {
            label: 'Teste de valor 2',
            value: 'teste 2',
          },
          {
            label: 'Teste de valor 3',
            value: 'teste 3',
          },
        ]"
      />

      <CoreSelect
        v-model="option"
        class="h-9 w-64 py-0"
        :options="[
          {
            label: 'Teste de valor 1',
            value: 'teste',
          },
          {
            label: 'Teste de valor 2',
            value: 'teste 2',
          },
          {
            label: 'Teste de valor 3',
            value: 'teste 3',
          },
        ]"
      >
        <template #prefix>
          <div
            class="flex h-full items-center border-r border-neutral-300 pr-2"
          >
            <Coffee :size="20" />
          </div>
        </template>
        <template #option="{ item, index, isSelected }">
          <span
            :class="
              cn(
                'w-full px-3 py-1',
                isSelected &&
                  'bg-primary-200 text-primary-500 rounded-[5px] font-semibold',
              )
            "
            >{{ index + 1 }}-{{ item.label }}</span
          >
        </template>
      </CoreSelect>
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
