"use client";

import { useRef, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "../lib/cn.js";

export interface SegmentedOption<V extends string = string> {
  value: V;
  /** The segment's text, and its accessible name when it shows only an icon. */
  label: string;
  icon?: ReactNode;
}

export interface SegmentedProps<V extends string = string> {
  options: readonly SegmentedOption<V>[];
  value: V;
  onValueChange: (value: V) => void;
  /** Names the group for assistive technology. */
  label: string;
  /** Shows each segment's icon alone, its label naming it. */
  iconOnly?: boolean;
  className?: string;
}

/**
 * A segmented control: a recessed track (a well) whose chosen segment is
 * the one raised face, as a switch between a few views. In a flat layer the
 * track is a flat fill and the chosen segment a flat solid one.
 *
 * It is a radio group: Tab reaches the chosen segment, and the arrows, Home
 * and End choose another. The track's 4px inset keeps its pills concentric.
 */
export function Segmented<V extends string>({
  options,
  value,
  onValueChange,
  label,
  iconOnly = false,
  className,
}: SegmentedProps<V>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const chosen = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );

  const choose = (index: number) => {
    const count = options.length;
    const next = ((index % count) + count) % count;
    onValueChange(options[next]!.value);
    refs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
    const step = {
      ArrowRight: rtl ? -1 : 1,
      ArrowLeft: rtl ? 1 : -1,
      ArrowDown: 1,
      ArrowUp: -1,
    }[event.key];
    if (step !== undefined) choose(chosen + step);
    else if (event.key === "Home") choose(0);
    else if (event.key === "End") choose(options.length - 1);
    else return;
    event.preventDefault();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn("material-well inline-flex gap-1 rounded-full p-1", className)}
    >
      {options.map((option, index) => {
        const selected = index === chosen;
        return (
          <button
            key={option.value}
            ref={(node) => {
              refs.current[index] = node;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={iconOnly ? option.label : undefined}
            tabIndex={selected ? 0 : -1}
            onClick={() => onValueChange(option.value)}
            onKeyDown={onKeyDown}
            className={cn(
              "inline-flex h-8 select-none items-center justify-center gap-1.5 rounded-full border border-transparent text-sm font-medium whitespace-nowrap",
              "transition-[background-color,color,box-shadow] duration-150 ease-out",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              "[&_svg]:size-4",
              iconOnly ? "w-10" : "px-3",
              selected
                ? "material-thumb text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {option.icon}
            {iconOnly ? null : option.label}
          </button>
        );
      })}
    </div>
  );
}
