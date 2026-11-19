import { cn } from "../lib/cn.js";

/**
 * Class lists shared by Sunbeam's controls. Every color is a semantic token,
 * every material comes from the layer (see tokens/material.css), and every
 * duration is a motion token.
 */

/** The keyboard focus ring: 2px of the ring color, offset from the edge. */
export const focusRing =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

/** Disabled controls fade and stop taking the pointer. */
export const disabled =
  "data-disabled:pointer-events-none data-disabled:opacity-50 disabled:pointer-events-none disabled:opacity-50";

/** The look of a text field: its layer's field material, 40px, 10px corners. */
export const fieldClasses = cn(
  "material-field w-full min-w-0 rounded-lg px-3 text-sm text-foreground",
  "placeholder:text-muted-foreground/80",
  "transition-[box-shadow,background-color] duration-(--duration-press) ease-out",
  "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring outline-none",
  "aria-invalid:outline-2 aria-invalid:outline-offset-1 aria-invalid:outline-danger",
  "data-invalid:outline-2 data-invalid:outline-offset-1 data-invalid:outline-danger",
  disabled,
);

/**
 * A floating raised layer for menus, lists and popovers: the panel material
 * at popover radius, an 4px inset so 32px rows nest concentrically
 * (14px − 4px = 10px), and Sunbeam's popup motion.
 */
export const popupClasses = cn(
  "material-panel popup-motion rounded-continuous-xl p-1 text-sm text-foreground outline-none",
);

/** A row in a menu, list or listbox: 32px, 10px corners, a flat hover fill. */
export const itemClasses = cn(
  "relative flex h-8 cursor-default select-none items-center gap-2 rounded-lg px-2.5 text-sm text-foreground outline-none",
  "data-highlighted:bg-flat-face-hover",
  "data-disabled:pointer-events-none data-disabled:opacity-50",
  "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
);

/** Small grey text that labels a group of items. */
export const groupLabelClasses =
  "px-2.5 pt-2 pb-1 text-xs font-medium text-muted-foreground";

/** A hairline between groups of items. */
export const separatorClasses = "-mx-1 my-1 h-px bg-border";

/**
 * Checked choices are ink: a filled ink face with a light mark. Yellow stays
 * for the one primary action on the screen.
 */
export const inkChecked =
  "data-checked:border-foreground data-checked:bg-foreground data-checked:text-background";
