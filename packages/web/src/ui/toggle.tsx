"use client";

import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import type { ComponentProps, ComponentPropsWithoutRef } from "react";
import { cn } from "../lib/cn.js";
import { buttonClasses, type ButtonSize } from "./button-styles.js";
import { focusRing } from "./styles.js";

export interface SpinnerProps extends ComponentPropsWithoutRef<"span"> {
  /** Announces the wait. Without it the spinner is decoration. */
  label?: string;
  size?: "sm" | "md" | "lg";
}

const SPINNER = { sm: "size-3.5", md: "size-4", lg: "size-6" } as const;

/**
 * A ring that turns while something real is in progress: the one loop
 * Sunbeam allows. Under reduced motion it holds still.
 */
export function Spinner({ label, size = "md", className, ...rest }: SpinnerProps) {
  return (
    <span
      data-slot="spinner"
      role={label ? "status" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("inline-flex shrink-0", SPINNER[size], className)}
      {...rest}
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        className="size-full animate-spin [animation-duration:700ms] motion-reduce:animate-none"
        aria-hidden
      >
        <circle
          cx="8"
          cy="8"
          r="6.25"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="1.5"
        />
        <path
          d="M14.25 8A6.25 6.25 0 0 0 8 1.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export type KbdProps = ComponentPropsWithoutRef<"kbd">;

/** A key or shortcut, as it is printed on the keyboard. */
export function Kbd({ className, ...rest }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-[5px] px-1 font-sans text-[11px] font-medium text-muted-foreground",
        "bg-flat-face shadow-[inset_0_-1px_0_var(--border)]",
        className,
      )}
      {...rest}
    />
  );
}

export interface ToggleProps extends ComponentProps<typeof BaseToggle> {
  size?: ButtonSize;
}

const TOGGLE_SIZE = {
  sm: "h-8 min-w-8 px-2 [&_svg]:size-4",
  md: "h-10 min-w-10 px-2.5 [&_svg]:size-[18px]",
  lg: "h-12 min-w-12 px-3 [&_svg]:size-5",
} as const;

/**
 * A button that stays pressed: no face until hovered; pressed, it takes
 * the thumb face of its layer, like a chosen segment.
 */
export function Toggle({ className, size = "md", ...rest }: ToggleProps) {
  return (
    <BaseToggle
      className={cn(
        "inline-flex shrink-0 select-none items-center justify-center gap-1.5 rounded-full border border-transparent text-sm font-medium text-muted-foreground",
        "transition-[background-color,color,box-shadow,scale] duration-(--duration-press) ease-out active:scale-[0.97]",
        "hover:bg-flat-face-hover hover:text-foreground",
        "data-pressed:material-thumb data-pressed:text-foreground",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        focusRing,
        TOGGLE_SIZE[size],
        className as string,
      )}
      {...rest}
    />
  );
}

export type ToggleGroupProps = ComponentProps<typeof BaseToggleGroup>;

/**
 * A set of toggles in one recessed track. Its items are all as wide as the
 * widest, so a pressed face keeps its size wherever it moves.
 */
export function ToggleGroup({ className, ...rest }: ToggleGroupProps) {
  return (
    <BaseToggleGroup
      className={cn(
        "material-well inline-grid shrink-0 auto-cols-fr grid-flow-col gap-1 rounded-full p-1",
        className as string,
      )}
      {...rest}
    />
  );
}

export type ToggleGroupItemProps = ComponentProps<typeof BaseToggle>;

export function ToggleGroupItem({ className, ...rest }: ToggleGroupItemProps) {
  return (
    <BaseToggle
      className={cn(
        "inline-flex h-8 select-none items-center justify-center gap-1.5 rounded-full border border-transparent px-3 text-sm font-medium whitespace-nowrap text-muted-foreground",
        "transition-[background-color,color,box-shadow] duration-(--duration-press) ease-out",
        "hover:text-foreground data-pressed:material-thumb data-pressed:text-foreground",
        "data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:size-4",
        focusRing,
        className as string,
      )}
      {...rest}
    />
  );
}

export type ToolbarProps = ComponentProps<typeof BaseToolbar.Root>;

/**
 * A row of controls in a window's chrome. A toolbar is flat wherever it
 * sits: inside a raised panel it opens a flat layer of its own.
 */
export function Toolbar({ className, ...rest }: ToolbarProps) {
  return (
    <BaseToolbar.Root
      data-material="flat"
      className={cn(
        "flex items-center gap-1 rounded-full data-[orientation=vertical]:flex-col",
        className as string,
      )}
      {...rest}
    />
  );
}

export interface ToolbarButtonProps extends ComponentProps<typeof BaseToolbar.Button> {
  size?: ButtonSize;
}

export function ToolbarButton({ className, size = "sm", ...rest }: ToolbarButtonProps) {
  return (
    <BaseToolbar.Button
      className={buttonClasses("ghost", size, className as string)}
      {...rest}
    />
  );
}

export function ToolbarSeparator({
  className,
  ...rest
}: ComponentProps<typeof BaseToolbar.Separator>) {
  return (
    <BaseToolbar.Separator
      className={cn(
        "mx-1 h-5 w-px shrink-0 bg-border data-[orientation=horizontal]:mx-0 data-[orientation=horizontal]:my-1 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-5",
        className as string,
      )}
      {...rest}
    />
  );
}

export const ToolbarGroup = BaseToolbar.Group;
export const ToolbarLink = BaseToolbar.Link;
