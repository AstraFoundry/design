"use client";

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import type { ComponentProps } from "react";
import { cn } from "../lib/cn.js";
import { disabled, focusRing, inkChecked } from "./styles.js";

export type CheckboxProps = ComponentProps<typeof BaseCheckbox.Root>;

/**
 * A checkbox. Unchecked, it is a field-faced square; checked or
 * indeterminate, it fills with ink and its mark draws in.
 */
export function Checkbox({ className, ...rest }: CheckboxProps) {
  return (
    <BaseCheckbox.Root
      className={cn(
        "material-field relative inline-flex size-[18px] shrink-0 items-center justify-center rounded-[5px]",
        "transition-[background-color,border-color,scale] duration-(--duration-press) ease-out active:scale-90",
        inkChecked,
        "data-indeterminate:border-foreground data-indeterminate:bg-foreground data-indeterminate:text-background",
        focusRing,
        disabled,
        className as string,
      )}
      {...rest}
    >
      <BaseCheckbox.Indicator
        keepMounted
        className="flex text-current data-unchecked:[&_path]:[stroke-dashoffset:14]"
        render={(props, state) => (
          <span {...props}>
            <svg viewBox="0 0 14 14" fill="none" aria-hidden className="size-3">
              {state.indeterminate ? (
                <path
                  d="M3 7h8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 7.5 5.75 10 11 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="14"
                  className="transition-[stroke-dashoffset] duration-(--duration-toggle) ease-out"
                />
              )}
            </svg>
          </span>
        )}
      />
    </BaseCheckbox.Root>
  );
}

export type CheckboxGroupProps = ComponentProps<typeof BaseCheckboxGroup>;

/** A column of checkboxes that share one value array. */
export function CheckboxGroup({ className, ...rest }: CheckboxGroupProps) {
  return (
    <BaseCheckboxGroup
      className={cn("flex flex-col items-start gap-2.5", className as string)}
      {...rest}
    />
  );
}

export type RadioGroupProps = ComponentProps<typeof BaseRadioGroup>;

/** A group of radios: Tab reaches the chosen one, the arrows choose. */
export function RadioGroup({ className, ...rest }: RadioGroupProps) {
  return (
    <BaseRadioGroup
      className={cn("flex flex-col items-start gap-2.5", className as string)}
      {...rest}
    />
  );
}

export type RadioProps = ComponentProps<typeof BaseRadio.Root>;

/** A radio: a field-faced circle that fills with ink around a light dot. */
export function Radio({ className, ...rest }: RadioProps) {
  return (
    <BaseRadio.Root
      className={cn(
        "material-field relative inline-flex size-[18px] shrink-0 items-center justify-center rounded-full",
        "transition-[background-color,border-color,scale] duration-(--duration-press) ease-out active:scale-90",
        inkChecked,
        focusRing,
        disabled,
        className as string,
      )}
      {...rest}
    >
      <BaseRadio.Indicator
        keepMounted
        className={cn(
          "size-1.5 rounded-full bg-background transition-[scale] duration-(--duration-toggle) ease-spring",
          "data-unchecked:scale-0",
        )}
      />
    </BaseRadio.Root>
  );
}

export interface SwitchProps extends ComponentProps<typeof BaseSwitch.Root> {
  size?: "sm" | "md";
}

const SWITCH = {
  sm: { root: "h-5 w-8", thumb: "size-4 data-checked:translate-x-3" },
  md: { root: "h-6 w-10", thumb: "size-5 data-checked:translate-x-4" },
} as const;

/**
 * A switch: a recessed track whose knob is a raised face. On, the track
 * fills with ink. The knob runs on the spring curve, so it overshoots a
 * hair and settles into its detent.
 */
export function Switch({ className, size = "md", ...rest }: SwitchProps) {
  return (
    <BaseSwitch.Root
      className={cn(
        "material-well group relative inline-flex shrink-0 items-center rounded-full p-0.5",
        "transition-[background-color,box-shadow] duration-(--duration-toggle) ease-out",
        "data-checked:bg-foreground data-checked:shadow-none",
        SWITCH[size].root,
        focusRing,
        disabled,
        className as string,
      )}
      {...rest}
    >
      <BaseSwitch.Thumb
        data-material="raised"
        className={cn(
          "material-thumb block rounded-full transition-[translate,width] duration-(--duration-toggle) ease-spring",
          "group-active:w-[calc(100%-1.5rem+2px)]",
          SWITCH[size].thumb,
        )}
      />
    </BaseSwitch.Root>
  );
}

export interface SliderProps extends ComponentProps<typeof BaseSlider.Root> {
  /** Names each thumb when there are two, as "Minimum" and "Maximum". */
  thumbLabels?: readonly string[];
}

/**
 * A slider: a recessed track filled with ink to the value, and raised
 * thumbs. Ink, not yellow: the value is a setting, not the result.
 */
export function Slider({
  className,
  thumbLabels,
  "aria-label": ariaLabel,
  ...rest
}: SliderProps) {
  const value = rest.value ?? rest.defaultValue;
  const count = Array.isArray(value) ? value.length : 1;
  return (
    <BaseSlider.Root className={cn("w-full touch-none", className as string)} {...rest}>
      <BaseSlider.Control className="flex h-6 w-full items-center data-disabled:opacity-50">
        <BaseSlider.Track className="material-well relative h-1.5 w-full rounded-full">
          <BaseSlider.Indicator className="rounded-full bg-foreground" />
          {Array.from({ length: count }, (_, index) => (
            <BaseSlider.Thumb
              key={index}
              index={index}
              aria-label={thumbLabels?.[index] ?? ariaLabel}
              data-material="raised"
              className={cn(
                "material-thumb size-5 rounded-full transition-[scale] duration-(--duration-press) ease-out",
                "active:scale-110 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring",
              )}
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
