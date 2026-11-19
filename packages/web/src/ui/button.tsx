import type { ComponentPropsWithoutRef } from "react";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./button-styles.js";
import { Spinner } from "./toggle.js";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Shows a spinner before the label and stops further presses while the
   * action runs. The label stays, so the button keeps its width.
   */
  loading?: boolean;
}

/** Native button with the same look as `LinkButton`. */
export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  loading = false,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses(variant, size, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <Spinner size={size === "lg" ? "md" : "sm"} /> : null}
      {children}
    </button>
  );
}
