"use client";

import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { OTPField as BaseOTPField } from "@base-ui/react/otp-field";
import { Minus, Plus } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "../lib/cn.js";
import { fieldClasses } from "./styles.js";

export interface NumberFieldProps extends Omit<
  ComponentProps<typeof BaseNumberField.Root>,
  "children"
> {
  /** Names the decrement button. */
  decrementLabel: string;
  /** Names the increment button. */
  incrementLabel: string;
  placeholder?: string;
  "aria-label"?: string;
  size?: "sm" | "md" | "lg";
}

const SIZE = { sm: "h-8", md: "h-10", lg: "h-12 text-base" } as const;

/**
 * A number with stepper buttons on either side. Arrow keys step, Shift
 * steps by ten, and dragging the label scrubs when you wrap it in a Field.
 */
export function NumberField({
  className,
  decrementLabel,
  incrementLabel,
  placeholder,
  "aria-label": ariaLabel,
  size = "md",
  ...rest
}: NumberFieldProps) {
  const step = cn(
    "flex aspect-square h-full shrink-0 items-center justify-center rounded-md text-muted-foreground",
    "transition-[background-color,color,scale] duration-(--duration-press) ease-out",
    "hover:bg-flat-face-hover hover:text-foreground active:scale-90 data-disabled:opacity-40",
  );
  return (
    <BaseNumberField.Root className={cn("w-36", className as string)} {...rest}>
      <BaseNumberField.Group
        className={cn(
          fieldClasses,
          SIZE[size],
          "flex items-center p-1 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-1 has-[:focus-visible]:outline-ring",
        )}
      >
        <BaseNumberField.Decrement aria-label={decrementLabel} className={step}>
          <Minus aria-hidden className="size-3.5" />
        </BaseNumberField.Decrement>
        <BaseNumberField.Input
          aria-label={ariaLabel}
          placeholder={placeholder}
          className="h-full min-w-0 flex-1 bg-transparent text-center text-sm text-foreground tabular-nums outline-none"
        />
        <BaseNumberField.Increment aria-label={incrementLabel} className={step}>
          <Plus aria-hidden className="size-3.5" />
        </BaseNumberField.Increment>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  );
}

export interface OTPFieldProps extends Omit<
  ComponentProps<typeof BaseOTPField.Root>,
  "children"
> {
  /** Names each input after the first, which takes the field's label. */
  characterLabel: (index: number, length: number) => string;
  "aria-label"?: string;
  /** Put a hairline separator after this many characters, as 3 in 123–456. */
  groupSize?: number;
}

/** A one-time code: one square field per character, pasted or typed. */
export function OTPField({
  className,
  length,
  characterLabel,
  "aria-label": ariaLabel,
  groupSize,
  ...rest
}: OTPFieldProps) {
  return (
    <BaseOTPField.Root
      length={length}
      className={cn("flex items-center gap-2", className as string)}
      {...rest}
    >
      {Array.from({ length }, (_, index) => (
        <span key={index} className="contents">
          {groupSize && index > 0 && index % groupSize === 0 ? (
            <BaseOTPField.Separator className="h-px w-3 bg-border" />
          ) : null}
          <BaseOTPField.Input
            aria-label={index === 0 ? ariaLabel : characterLabel(index + 1, length)}
            className={cn(
              fieldClasses,
              "size-11 px-0 text-center font-mono text-lg tabular-nums caret-foreground",
              "transition-[scale,box-shadow] duration-(--duration-press) ease-spring focus:scale-105",
            )}
          />
        </span>
      ))}
    </BaseOTPField.Root>
  );
}
