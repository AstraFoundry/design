"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { EASE_OUT } from "../lib/ease.js";

export interface SiteHeaderShellProps {
  /** Home link with the brand; it needs its own accessible name. */
  brand: ReactNode;
  /** Desktop navigation (shown from `md`). Wrap it in a labelled `<nav>`. */
  nav?: ReactNode;
  /** Right-hand controls: locale, theme, account, primary action. */
  actions?: ReactNode;
  /**
   * Mobile menu panel. Receives `close` so links can dismiss the menu. When
   * omitted, no menu button is rendered.
   */
  mobileMenu?: (close: () => void) => ReactNode;
  /** Accessible names for the menu button. */
  menuLabels?: { open: string; close: string };
  className?: string;
}

/**
 * Sticky site header: transparent over the hero, a solid wash with a hairline
 * once the page scrolls or the mobile menu is open.
 */
export function SiteHeaderShell({
  brand,
  nav,
  actions,
  mobileMenu,
  menuLabels,
  className,
}: SiteHeaderShellProps) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const close = () => setMenuOpen(false);

  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 8));

  if (mobileMenu && !menuLabels) {
    throw new Error("SiteHeaderShell: `menuLabels` is required with `mobileMenu`.");
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color] duration-200",
        scrolled || menuOpen
          ? "border-border bg-background/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
        className,
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-6 px-5 sm:px-8">
        <div className="flex shrink-0 items-center">{brand}</div>
        {nav ? <div className="hidden md:block">{nav}</div> : null}
        <div className="ml-auto flex items-center gap-1">
          {actions}
          {mobileMenu && menuLabels ? (
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? menuLabels.close : menuLabels.open}
              className="grid size-9 place-items-center rounded-full text-foreground transition-colors hover:bg-muted md:hidden"
            >
              {menuOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          ) : null}
        </div>
      </div>

      {mobileMenu ? (
        <AnimatePresence initial={false}>
          {menuOpen ? (
            <motion.div
              id={menuId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className="overflow-hidden md:hidden"
            >
              <div className="px-5 pt-2 pb-4">{mobileMenu(close)}</div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      ) : null}
    </header>
  );
}
