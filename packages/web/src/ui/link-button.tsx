import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./button-styles.js";

export type LinkButtonProps<C extends ElementType = "a"> = {
  /**
   * The link component to render, e.g. the site's locale-aware `next/link`
   * wrapper. Defaults to a plain anchor.
   */
  as?: C;
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<C>, "as" | "href" | "className" | "children">;

/** A link styled as a button. */
export function LinkButton<C extends ElementType = "a">({
  as,
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: LinkButtonProps<C>) {
  const Component: ElementType = as ?? "a";
  return (
    <Component href={href} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </Component>
  );
}
