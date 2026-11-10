import type { ElementType, ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { Container } from "./container.js";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: readonly FooterLink[];
}

export interface SiteFooterShellProps {
  brand: ReactNode;
  tagline?: ReactNode;
  columns: readonly FooterColumn[];
  /** Bottom line: copyright, photo credits, legal links. */
  legal?: ReactNode;
  /** Full-width artwork beneath the navigation and legal line. */
  illustration?: ReactNode;
  /** Optional wrapper for the copyright and illustration. */
  lowerAs?: ElementType;
  /** Oversized decorative wordmark under the footer; rendered `aria-hidden`. */
  watermark?: ReactNode;
  /** Link component for internal routes. Defaults to a plain anchor. */
  linkAs?: ElementType;
  className?: string;
}

export function SiteFooterShell({
  brand,
  tagline,
  columns,
  legal,
  illustration,
  lowerAs: LowerSection = "div",
  watermark,
  linkAs: LinkComponent = "a",
  className,
}: SiteFooterShellProps) {
  return (
    <footer className={cn("overflow-hidden border-t border-border", className)}>
      <Container size="wide" className="grid gap-12 pt-16 pb-10 md:grid-cols-[1.2fr_2fr]">
        <div className="flex flex-col gap-3">
          {brand}
          {tagline ? (
            <p className="max-w-xs text-sm text-muted-foreground">{tagline}</p>
          ) : null}
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-medium text-foreground">{column.title}</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <LinkComponent
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </LinkComponent>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <LowerSection>
        {legal ? (
          <Container size="wide">
            <div className="py-6 text-sm text-muted-foreground">{legal}</div>
          </Container>
        ) : null}

        {illustration}

        {watermark ? (
          <div
            aria-hidden="true"
            className="pointer-events-none px-[0.08em] pb-[0.08em] text-center font-display text-[clamp(6rem,24vw,22rem)] leading-[1.15] whitespace-nowrap text-muted select-none"
          >
            {watermark}
          </div>
        ) : null}
      </LowerSection>
    </footer>
  );
}
