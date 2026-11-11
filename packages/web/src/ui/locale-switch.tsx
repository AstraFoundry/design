"use client";

import { Check, Languages } from "lucide-react";
import { useState } from "react";
import {
  MorphPopover,
  MorphPopoverContent,
  MorphPopoverTrigger,
} from "../beui/components/motion/popover-morph.js";
import { cn } from "../lib/cn.js";

export interface LocaleLink {
  /** Site locale key, e.g. `zh`. */
  locale: string;
  /** BCP 47 tag for `hreflang` and `lang`, e.g. `zh-CN`. */
  tag: string;
  /** The language's own name, e.g. `简体中文`. */
  name: string;
  /** The current page in that locale. */
  href: string;
  current: boolean;
}

export interface LocaleSwitchProps {
  /** Accessible name of the control, from the site's dictionary. */
  label: string;
  links: readonly LocaleLink[];
  className?: string;
}

/**
 * Each locale is its own document (with its own `<html lang>`), so options are
 * plain anchors and switching is a full page load.
 */
function LocaleOption({ link, className }: { link: LocaleLink; className: string }) {
  return (
    <a
      href={link.href}
      hrefLang={link.tag}
      lang={link.tag}
      aria-current={link.current ? "true" : undefined}
      className={className}
    >
      {link.name}
      {link.current ? <Check className="ml-auto size-4" aria-hidden="true" /> : null}
    </a>
  );
}

/**
 * Header control: a languages button that opens the list of locales in a
 * raised popover. Its 14px corners less the 6px inset give the rows' 8px.
 */
export function LocaleSwitch({ label, links, className }: LocaleSwitchProps) {
  const [open, setOpen] = useState(false);
  return (
    <MorphPopover open={open} onOpenChange={setOpen}>
      <MorphPopoverTrigger>
        <button
          type="button"
          aria-label={label}
          className={cn(
            "grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
            className,
          )}
        >
          <Languages className="size-4" aria-hidden="true" />
        </button>
      </MorphPopoverTrigger>
      <MorphPopoverContent className="w-44 p-1.5" radius={14}>
        <ul className="flex flex-col">
          {links.map((link) => (
            <li key={link.locale}>
              <LocaleOption
                link={link}
                className="flex items-center gap-2 rounded-[8px] px-3 py-2 text-sm text-foreground transition-colors hover:bg-flat-face-hover aria-[current]:font-medium"
              />
            </li>
          ))}
        </ul>
      </MorphPopoverContent>
    </MorphPopover>
  );
}

/** Inline locale list for mobile menus: flat faces, as the menu is on the page. */
export function LocaleList({ label, links, className }: LocaleSwitchProps) {
  return (
    <nav aria-label={label} className={className}>
      <ul className="flex flex-wrap gap-1.5">
        {links.map((link) => (
          <li key={link.locale}>
            <LocaleOption
              link={link}
              className="material-face flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground aria-[current]:font-medium aria-[current]:text-foreground"
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
