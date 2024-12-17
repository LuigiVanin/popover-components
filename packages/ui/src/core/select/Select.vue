<script
  lang="ts"
  setup
  generic="T extends { value: string | number; label: string }"
>
import { cn } from "@popover/tw-utils";
import { ref } from "vue";

import { CorePopover } from "../../main";
import type { Position } from "../../types/index";

const show = ref(false);

type SelectProps = {
  options: T[];
  class?: string;
  wrapperClass?: string;
  position?: Position;
  modelValue: T | null;
  placeholder?: string;
};

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [] as T[],
  class: "",
  wrapperClass: "",
  position: "bottom",
  placeholder: "Select an option",
});
</script>

<template>
  <CorePopover
    v-model="show"
    :wrapper-class="cn('relative', props.wrapperClass)"
    :position="props.position"
  >
    <div class="wrapper">
      <slot name="prefix" />
      <div>
        <template v-if="modelValue">
          {{ modelValue.label }}
        </template>
        <span v-else class="text-neutral-400">
          {{ props.placeholder }}
        </span>
      </div>
      <slot name="sufix" />
      <input
        type="text"
        aria-hidden="true"
        aria-invalid="false"
        tabindex="-1"
        :value="modelValue?.value"
        class="pointer-events-none absolute bottom-0 left-0 w-full opacity-0"
      />
    </div>

    <template #content>
      <div
        :class="
          cn(
            'flex w-full flex-col rounded-md border border-zinc-200 bg-neutral-50 shadow-lg',
            props.class,
          )
        "
      >
        <slot
          v-for="item in props.options"
          :key="item.value"
          name="item"
          :item="item"
        />
      </div>
    </template>
  </CorePopover>
</template>
