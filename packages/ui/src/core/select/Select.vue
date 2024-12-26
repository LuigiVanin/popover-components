<script
  lang="ts"
  setup
  generic="T extends { value: string | number; label: string }"
>
import { cn } from "@popover/tw-utils";
import { ChevronDown } from "lucide-vue-next";
import { computed, ref } from "vue";

import { CorePopover } from "../../main";
import type { Position } from "../../types/index";

const show = ref(false);
const currentIndex = ref(0);

const inputRef = ref<HTMLInputElement | null>(null);

const listboxId = computed(
  () => `listbox-${Math.random().toString(36).substr(2, 9)}`,
);
const activeDescendant = computed(() => {
  const value = props.options[currentIndex.value]?.value;
  if (typeof value === "number") {
    return value.toString();
  }

  return value ?? null;
});

type SelectProps = {
  // TODO: add disabled, loading and size props (maybe variant)
  // TODO: improve position prop usage
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
  // create an logic to handle a parameter that can be an index or the item itself, where the current item
  const currentItem = props.options[index ?? currentIndex.value];

  if (!currentItem) return;

  show.value = false;
  currentIndex.value = -1;
  emit("update:modelValue", currentItem);
  emit("change", currentItem);
  closePopover();
};

const onFocusinput = (event: FocusEvent) => {
  show.value = true;
  emit("focus", event);
};

const onBlurInput = (event: FocusEvent) => {
  show.value = false;
  emit("blur", event);
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
  focus: (event: FocusEvent) => true,
  blur: (event: FocusEvent) => true,
  change: (event: T) => true,
});
</script>

<template>
  <CorePopover
    class="mt-2 w-full"
    v-bind="$attrs"
    :model-value="show"
    :wrapper-class="
      cn(
        'relative wrapper flex w-full cursor-pointer items-center gap-2 rounded-md border border-neutral-300 px-2 py-1 focus-within:shadow-md focus-within:border-primary-400 hover:border-primary-400 focus-within:shadow-primary-300',
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
    <slot name="sufix" :active="show">
      <ChevronDown
        :size="20"
        :class="cn('ml-auto transition-all duration-300', show && 'rotate-180')"
      />
    </slot>
    <input
      ref="inputRef"
      type="text"
      aria-haspopup="listbox"
      role="combobox"
      :aria-expanded="show"
      :aria-controls="listboxId"
      :aria-activedescendant="activeDescendant"
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
        :id="listboxId"
        role="listbox"
        :class="
          cn(
            'flex w-full flex-col gap-1 rounded-md border border-zinc-200 bg-white p-2 shadow-lg',
            props.contentClass,
          )
        "
      >
        <!-- TODO: Give less control to the end user -->
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
            :id="String(item.value)"
            role="option"
            :aria-selected="modelValue?.value === item.value"
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
