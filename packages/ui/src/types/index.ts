export type Position =
  | "top"
  | "bottom"
  | "top left"
  | "top right"
  | "bottom left"
  | "bottom right";

export type VariantKey = "normal" | "outlined" | "link" | "simple" | "soft";
export type SizeKey = "sm" | "md" | "lg" | "xl";

export type BaseSelectOption = { value: string | number; label: string };

export type TransitionClasses = {
  enterActiveClass: string;
  enterFromClass: string;
  enterToClass: string;
  leaveActiveClass: string;
  leaveFromClass: string;
  leaveToClass: string;
};
