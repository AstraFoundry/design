import type { ComponentPropsWithoutRef } from "react";
import {
  iconButtonClasses,
  type ButtonSize,
  type ButtonVariant,
} from "./button-styles.js";

export interface IconButtonProps extends Omit<
  ComponentPropsWithoutRef<"button">,
  "aria-label"
> {
  /** Names the button for assistive technology; it shows no text. */
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/**
 * A round button showing only an icon, as its children. Like `Button`, it is
 * flat on the page and raised inside a raised layer.
 */
export function IconButton({
  label,
  variant = "secondary",
  size = "md",
  className,
  type = "button",
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={iconButtonClasses(variant, size, className)}
      {...rest}
    />
  );
}
