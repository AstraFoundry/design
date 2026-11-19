import type { ComponentPropsWithoutRef } from "react";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./button-styles.js";
import { Spinner } from "./toggle.js";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Shows a spinner before the label and stops further presses while the
   * action runs. The label stays, so the button keeps its width, and the
   * button keeps the focus.
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
  onClick,
  ...rest
}: ButtonProps) {
  // While loading the button stays focusable (aria-disabled, not disabled),
  // so a keyboard user who pressed it keeps their place.
  return (
    <button
      type={type}
      className={buttonClasses(variant, size, className)}
      disabled={disabled}
      aria-disabled={loading || undefined}
      aria-busy={loading || undefined}
      onClick={(event) => {
        if (loading) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      }}
      {...rest}
    >
      {loading ? <Spinner size={size === "lg" ? "md" : "sm"} /> : null}
      {children}
    </button>
  );
}
