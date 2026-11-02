import { cn } from "../lib/cn.js";

export interface BrandMarkProps {
  className?: string;
}

/**
 * The AstraFoundry four-point star. Decorative: pair it with visible text or
 * an accessible name on the surrounding link. The file is the organization
 * mark with the white field removed; `.dark .brand-mark` inverts it so the
 * black facets stay visible on the dark stage.
 */
export function BrandMark({ className }: BrandMarkProps) {
  return (
    <img
      src="/brand/mark.png"
      alt=""
      aria-hidden="true"
      draggable={false}
      className={cn("brand-mark size-6 shrink-0 object-contain", className)}
    />
  );
}

export interface BrandProps {
  /** The wordmark text, from the site's dictionary. */
  label: string;
  /** Hide the star, e.g. for the large footer wordmark. */
  hideMark?: boolean;
  className?: string;
  markClassName?: string;
  wordClassName?: string;
}

/** Star and wordmark set in the display face. */
export function Brand({
  label,
  hideMark = false,
  className,
  markClassName,
  wordClassName,
}: BrandProps) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-foreground", className)}>
      {hideMark ? null : <BrandMark className={markClassName} />}
      <span
        className={cn(
          "font-display text-xl leading-none font-normal tracking-[-0.01em] whitespace-nowrap",
          wordClassName,
        )}
      >
        {label}
      </span>
    </span>
  );
}
