import type { ComponentProps } from "react";
import { cn } from "@astrafoundry/design";

/**
 * Running text of a docs page in Sunbeam's type: Plex Sans body at 16/1.7,
 * medium headings, hairline tables, ink links with a hairline underline.
 * Prose is content, so nothing in it takes a material.
 */
export function Prose({ className, ...rest }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "max-w-none text-[15px] leading-[1.75] text-foreground",
        "[&>*:first-child]:mt-0",
        "[&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:scroll-mt-20 [&_h2]:text-xl [&_h2]:font-medium [&_h2]:tracking-tight [&_h2]:text-balance",
        "[&_h3]:mt-10 [&_h3]:mb-3 [&_h3]:scroll-mt-20 [&_h3]:text-base [&_h3]:font-medium",
        "[&_p]:my-4 [&_p]:text-pretty",
        "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1.5 [&_li]:pl-1 [&_li::marker]:text-faint",
        "[&_strong]:font-medium [&_strong]:text-foreground",
        "[&_a:not([data-card])]:font-medium [&_a:not([data-card])]:underline [&_a:not([data-card])]:decoration-border [&_a:not([data-card])]:underline-offset-4 [&_a:not([data-card])]:transition-colors hover:[&_a:not([data-card])]:decoration-foreground",
        "[&_:not(pre)>code]:rounded-md [&_:not(pre)>code]:bg-muted [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-[0.85em]",
        "[&_hr]:my-10 [&_hr]:border-border",
        className,
      )}
      {...rest}
    />
  );
}
