<script
  lang="ts"
  setup
  generic="T extends { value: string | number; label: string }"
>
import { cn } from "@popover/tw-utils";
import { ChevronDown } from "lucide-vue-next";
import { ref } from "vue";

import { CorePopover } from "../../main";
import type { Position } from "../../types/index";

const show = ref(false);
const currentIndex = ref(0);

const inputRef = ref<HTMLInputElement | null>(null);

type SelectProps = {
  options: T[];
  class?: string;
  contentClass?: string;
  position?: Position;
  modelValue: T | null;
  placeholder?: string;
};

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [] as T[],
  class: "",
  contentClass: "",
  position: "bottom",
  placeholder: "Select an option",
});

const selectItem = (index?: number) => {
  const currentItem = props.options[index ?? currentIndex.value];

  if (!currentItem) return;

  show.value = false;
  currentIndex.value = -1;
  emit("update:modelValue", currentItem);
  closePopover();
};

const onFocusinput = () => {
  show.value = true;
};

const onBlurInput = () => {
  show.value = false;
};

const onClickFocus = (event: MouseEvent) => {
  event.stopPropagation();
  if (document.activeElement !== inputRef.value) {
    inputRef.value?.focus();
  }
};

const closePopover = () => {
  show.value = false;
  inputRef.value?.blur();
};

const currentIndexChange = (diff: number) => {
  // apply the diff to the current index and when it gets to the length of the options prop, it goes back to 0
  currentIndex.value =
    (currentIndex.value + diff + props.options.length) % props.options.length;
};

const emit = defineEmits({
  "update:modelValue": (event: T) => true,
});
</script>

<template>
  <CorePopover
    class="mt-2 w-full"
    :model-value="show"
    :wrapper-class="
      cn(
        'relative wrapper flex w-full cursor-pointer items-center gap-2 rounded-md border border-neutral-300 px-2 py-1 focus-within:shadow-md focus-within:border-primary-400 focus-within:shadow-primary-200',
        props.class,
      )
    "
    :position="props.position"
    @click="onClickFocus"
  >
    <slot name="prefix" />
    <div>
      <template v-if="modelValue">
        {{ modelValue.label }}
      </template>
      <span v-else class="text-neutral-400">
        {{ props.placeholder }}
      </span>
    </div>
    <slot name="sufix">
      <ChevronDown
        :size="20"
        :class="cn('ml-auto transition-all duration-100', show && 'rotate-180')"
      />
    </slot>
    <input
      ref="inputRef"
      type="text"
      aria-invalid="false"
      class="pointer-events-none absolute bottom-0 left-0 h-0 w-0 opacity-0"
      :value="modelValue?.value"
      @focus="onFocusinput"
      @blur="onBlurInput"
      @keydown.esc="closePopover"
      @keydown.up="currentIndexChange(-1)"
      @keydown.down="currentIndexChange(1)"
      @keydown.enter="() => selectItem()"
    />
    <template #content>
      <div
        :class="
          cn(
            'flex w-full flex-col gap-1 rounded-md border border-zinc-200 bg-white p-2 shadow-lg',
            props.contentClass,
          )
        "
      >
        <slot
          v-for="(item, index) in props.options"
          :key="item.value"
          name="item"
          :item="item"
          :index="index"
          :active="modelValue?.value === item.value"
          :current-index="currentIndex === index"
          :select-item="selectItem"
          @click="() => selectItem(index)"
        >
          <div
            :class="
              cn(
                'cursor-pointer rounded-[4px] px-3 py-1 transition-all duration-200 hover:bg-zinc-100',
                currentIndex === index && 'bg-zinc-100',
                modelValue?.value === item.value && 'bg-primary-200',
                currentIndex === index &&
                  modelValue?.value === item.value &&
                  'bg-primary-100',
              )
            "
            @click="() => selectItem(index)"
          >
            {{ item.label }}
          </div>
        </slot>
      </div>
    </template>
  </CorePopover>
</template>
