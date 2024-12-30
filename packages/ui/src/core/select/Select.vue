<script
  lang="ts"
  setup
  generic="T extends BaseSelectOption"
>
import { cn } from "@popover/tw-utils";
import { ChevronDown } from "lucide-vue-next";
import { computed, ref } from "vue";

import { CorePopover } from "../../main";
import type { BaseSelectOption, Position, SizeKey } from "../../types/index";

type SelectProps = {
  options: T[];
  class?: string;
  contentClass?: string;
  position?: Position;
  modelValue: T | null;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  loading?: boolean;
  size?: SizeKey;
};

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [] as T[],
  class: "",
  contentClass: "",
  position: "bottom",
  placeholder: "Select an option",
  name: undefined,
  disabled: false,
  loading: false,
  size: "md",
});

const positionVariantTable: Record<Position, string> = {
  top: "mb-2",
  bottom: "mt-2",
  "bottom left": "mt-2",
  "bottom right": "mt-2",
  "top left": "mb-2",
  "top right": "mb-2",
};

const sizeVariantTable: Record<
  SizeKey,
  { wrapper: string; icon: number; options: string }
> = {
  sm: { wrapper: "h-7  text-sm px-2", icon: 16, options: "text-sm" },
  md: { wrapper: "h-9 text-base px-2", icon: 20, options: "text-base" },
  lg: { wrapper: "h-10 text-lg px-3", icon: 22, options: "text-base" },
  xl: { wrapper: "h-12  text-xl px-4", icon: 24, options: "text-lg" },
};

const show = ref(false);
const currentIndex = ref(0);

const inputRef = ref<HTMLInputElement | null>(null);

const positionVariant = computed(() => {
  return positionVariantTable[props.position || "bottom"];
});

const sizeVariant = computed(() => {
  return sizeVariantTable[props.size || "md"];
});

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

const selectItem = (index?: number) => {
  const currentItem = props.options[index ?? currentIndex.value];

  if (!currentItem) return;

  show.value = false;
  currentIndex.value = -1;
  emit("update:modelValue", currentItem);
  emit("change", currentItem);
  closePopover();
};

const onFocusinput = (event: FocusEvent) => {
  if (props.disabled || props.loading) return;
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
  currentIndex.value =
    (currentIndex.value + diff + props.options.length) % props.options.length;
};

const emit = defineEmits<{
  (e: "update:modelValue", event: T): void;
  (e: "focus", event: FocusEvent): void;
  (e: "blur", event: FocusEvent): void;
  (e: "change", event: T): void;
}>();
</script>

<template>
  <CorePopover
    v-bind="$attrs"
    :model-value="show"
    :class="cn('w-full', positionVariant)"
    :wrapper-class="
      cn(
        'group relative wrapper flex w-full cursor-pointer items-center gap-2 rounded-md border border-neutral-300 focus-within:shadow-md focus-within:border-primary-400 hover:border-primary-400 focus-within:shadow-primary-300',
        (props.disabled || props.loading) &&
          'opacity-80 cursor-not-allowed hover:border-neutral-300 focus-within:border-neutral-300 focus-within:shadow-md bg-neutral-50',
        sizeVariant.wrapper,
        props.class,
      )
    "
    :position="props.position"
    @click="onClickFocus"
  >
    <slot name="prefix">
      <span
        v-if="props.loading"
        :class="
          cn(
            'border-t-primary-400 h-4 w-4 animate-spin rounded-full border-2',
            'h-4 w-4',
          )
        "
      />
    </slot>
    <div>
      <slot name="value" :selected="modelValue">
        <template v-if="modelValue">
          {{ modelValue.label }}
        </template>
        <span v-else class="text-neutral-400">
          {{ props.placeholder }}
        </span>
      </slot>
    </div>
    <slot name="sufix" :active="show">
      <ChevronDown
        :size="sizeVariant.icon"
        :class="cn('ml-auto transition-all duration-300', show && 'rotate-180')"
      />
    </slot>
    <input
      ref="inputRef"
      type="text"
      aria-haspopup="listbox"
      role="combobox"
      aria-invalid="false"
      class="pointer-events-none absolute bottom-0 left-0 h-0 w-0 opacity-0"
      :name="props.name"
      :aria-expanded="show"
      :aria-controls="listboxId"
      :aria-activedescendant="activeDescendant"
      :value="modelValue?.value"
      :disabled="props.disabled || props.loading"
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
            'z-50 flex w-full flex-col gap-1 rounded-md border border-zinc-200 bg-white p-2 shadow-lg',
            sizeVariant.options,
            props.contentClass,
          )
        "
      >
        <div
          v-for="(item, index) in props.options"
          :id="String(item.value)"
          :key="item.value"
          role="option"
          :aria-selected="modelValue?.value === item.value"
          :class="
            cn(
              'flex cursor-pointer rounded-[4px] transition-all duration-200 hover:bg-zinc-100',
              currentIndex === index && 'bg-zinc-100',
              modelValue?.value === item.value && 'bg-primary-200',
              currentIndex === index &&
                modelValue?.value === item.value &&
                'bg-primary-100',
            )
          "
          @click="() => selectItem(index)"
        >
          <slot
            name="option"
            :item="item"
            :index="index"
            :is-selected="modelValue?.value === item.value"
            :is-current-index="currentIndex === index"
            :select-item="selectItem"
          >
            <span class="w-full px-3 py-1">
              {{ item.label }}
            </span>
          </slot>
        </div>
      </div>
    </template>
  </CorePopover>
</template>
