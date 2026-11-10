import { cn } from "../lib/cn.js";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse";
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Primary and secondary take the material of their layer: flat on the page
 * and its chrome, raised inside a `Panel` or any `data-material="raised"`
 * layer (see tokens/material.css). Ghost has no face until hovered, and
 * inverse belongs to the always-dark substrate.
 */
const VARIANT: Record<ButtonVariant, string> = {
  primary: "material-face-primary text-primary-foreground",
  secondary: "material-face text-foreground",
  ghost:
    "border border-transparent text-muted-foreground hover:bg-flat-face-hover hover:text-foreground",
  inverse:
    "border border-substrate-edge bg-substrate-surface text-substrate-hi hover:bg-substrate-raised",
};

const SIZE: Record<ButtonSize, string> = {
  sm: "h-8 gap-1.5 px-3 text-sm",
  md: "h-10 gap-2 px-4 text-sm",
  lg: "h-12 gap-2 px-5 text-base",
};

/** Square sizes of the same heights, for buttons that show only an icon. */
const ICON_SIZE: Record<ButtonSize, string> = {
  sm: "size-8 [&_svg]:size-4",
  md: "size-10 [&_svg]:size-[18px]",
  lg: "size-12 [&_svg]:size-5",
};

const BASE = [
  "inline-flex shrink-0 select-none items-center justify-center rounded-full font-medium whitespace-nowrap",
  "transition-[background-color,color,box-shadow,scale] duration-150 ease-out active:scale-[0.97]",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  "disabled:pointer-events-none disabled:opacity-60",
];

/** Shared look for buttons and links that act as buttons. */
export function buttonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
) {
  return cn(BASE, VARIANT[variant], SIZE[size], className);
}

/** The look of a round button showing only an icon. */
export function iconButtonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
) {
  return cn(BASE, VARIANT[variant], ICON_SIZE[size], className);
}
