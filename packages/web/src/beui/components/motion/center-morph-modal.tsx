"use client";
// beui.dev/components/motion/center-morph-modal
// Local changes: the backdrop and close-button accessible labels are required
// props so copy stays in the project's dictionary; the content scrolls when it
// is taller than the viewport; the focus effect runs only on open/close (the
// upstream version re-ran on every parent render and stole focus while typing);
// the dialog is a raised Sunbeam layer with a warm shadow over an unblurred
// ink scrim.

import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "../../lib/hooks/use-reduced-motion.js";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { EASE_OUT } from "../../lib/ease.js";
import { PresenceGate } from "../../lib/presence-gate.js";
import { cn } from "../../lib/utils.js";

type CenterMorphModalContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentId: string;
};

const CenterMorphModalContext = createContext<CenterMorphModalContextValue | null>(null);

function useCenterMorphModalContext(component: string) {
  const context = useContext(CenterMorphModalContext);
  if (!context) {
    throw new Error(`${component} must be used within <CenterMorphModal>`);
  }
  return context;
}

export interface CenterMorphModalProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Controlled modal whose surface unfolds outward from its exact center. */
export function CenterMorphModal({ children, open, onOpenChange }: CenterMorphModalProps) {
  const id = useId();
  const setOpen = useCallback((next: boolean) => onOpenChange(next), [onOpenChange]);

  const value = useMemo<CenterMorphModalContextValue>(
    () => ({ open, setOpen, contentId: `${id}-content` }),
    [id, open, setOpen],
  );

  return (
    <CenterMorphModalContext.Provider value={value}>{children}</CenterMorphModalContext.Provider>
  );
}

export interface CenterMorphModalContentProps {
  children: ReactNode;
  /** Accessible name announced by screen readers. */
  ariaLabel: string;
  ariaDescribedBy?: string;
  /** Close on Escape or backdrop press. Default true. */
  dismissible?: boolean;
  closeButtonLabel: string;
  backdropLabel: string;
  className?: string;
  backdropClassName?: string;
}

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const CENTER_FOLDED_CLIP = "inset(48% 48% 48% 48% round 30px)";
const CENTER_OPEN_CLIP = "inset(0% 0% 0% 0% round 30px)";

const CENTER_UNFOLD_EASE = [0.2, 0, 0.2, 1] as const;
const CENTER_UNFOLD_TRANSITION = {
  duration: 0.43,
  ease: CENTER_UNFOLD_EASE,
} as const;

function getFocusableElements(root: HTMLElement | null) {
  if (!root) return [];
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => element.tabIndex >= 0,
  );
}

export function CenterMorphModalContent({
  children,
  ariaLabel,
  ariaDescribedBy,
  dismissible = true,
  closeButtonLabel,
  backdropLabel,
  className,
  backdropClassName,
}: CenterMorphModalContentProps) {
  const context = useCenterMorphModalContext("CenterMorphModalContent");
  const reduce = useReducedMotion() ?? false;
  const panelRef = useRef<HTMLDivElement>(null);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setPortalTarget(document.body));
    return () => cancelAnimationFrame(frame);
  }, []);

  const { open, setOpen } = context;
  // The latest setter, read by the key handler. Keeping it out of the effect's
  // dependencies means the effect runs only when the dialog opens or closes;
  // re-running it on every parent render would steal focus while typing.
  const setOpenRef = useRef(setOpen);
  useEffect(() => {
    setOpenRef.current = setOpen;
  }, [setOpen]);

  useEffect(() => {
    if (!open) return;

    // Whatever had focus when the dialog opened (usually its trigger) gets it
    // back on close, however the dialog was opened.
    const returnTarget =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrame = requestAnimationFrame(() => {
      const [firstFocusable] = getFocusableElements(panelRef.current);
      (firstFocusable ?? panelRef.current)?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && dismissible) {
        event.preventDefault();
        setOpenRef.current(false);
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = getFocusableElements(panelRef.current);
      if (focusable.length === 0) {
        event.preventDefault();
        panelRef.current?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      returnTarget?.focus();
    };
  }, [open, dismissible]);

  if (!portalTarget) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <PresenceGate>
          {({ isPresent, gate }) => (
            <>
              <motion.button
                type="button"
                aria-label={backdropLabel}
                tabIndex={-1}
                disabled={!dismissible}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                {...gate}
                transition={{ duration: reduce ? 0.1 : 0.28, ease: EASE_OUT }}
                onClick={() => setOpen(false)}
                className={cn(
                  "pointer-events-auto fixed inset-0 z-[100] h-full w-full cursor-default bg-scrim/25",
                  backdropClassName,
                )}
              />

              <div
                inert={!isPresent}
                className="pointer-events-none fixed inset-4 z-[100] flex items-center justify-center overflow-y-auto [filter:drop-shadow(0_2px_4px_rgb(20_18_14/0.06))_drop-shadow(0_20px_40px_rgb(20_18_14/0.18))] dark:[filter:drop-shadow(0_2px_4px_rgb(0_0_0/0.3))_drop-shadow(0_20px_40px_rgb(0_0_0/0.55))]"
              >
                <div className="flex max-h-full w-full flex-col items-center py-8">
                  <motion.div
                    ref={panelRef}
                    id={context.contentId}
                    role="dialog"
                    aria-modal="true"
                    aria-label={ariaLabel}
                    aria-describedby={ariaDescribedBy}
                    tabIndex={-1}
                    initial={
                      reduce
                        ? { opacity: 0, clipPath: CENTER_OPEN_CLIP }
                        : { opacity: 1, clipPath: CENTER_FOLDED_CLIP }
                    }
                    animate={{ opacity: 1, clipPath: CENTER_OPEN_CLIP }}
                    exit={
                      reduce
                        ? { opacity: 0, clipPath: CENTER_OPEN_CLIP }
                        : { opacity: 1, clipPath: CENTER_FOLDED_CLIP }
                    }
                    {...gate}
                    transition={
                      reduce ? { duration: 0.14, ease: EASE_OUT } : CENTER_UNFOLD_TRANSITION
                    }
                    data-material="raised"
                    className={cn(
                      "material-panel pointer-events-auto relative w-full max-w-[26rem] origin-center overflow-hidden rounded-[30px] will-change-[clip-path]",
                      className,
                    )}
                  >
                    {children}

                    <motion.button
                      type="button"
                      aria-label={closeButtonLabel}
                      onClick={() => setOpen(false)}
                      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{
                        opacity: 0,
                        scale: reduce ? 1 : 0.88,
                        transition: { duration: 0.1, ease: EASE_OUT },
                      }}
                      transition={{
                        delay: reduce ? 0 : 0.16,
                        duration: reduce ? 0.12 : 0.2,
                        ease: EASE_OUT,
                      }}
                      className="material-face absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-[background-color,color,box-shadow] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </>
          )}
        </PresenceGate>
      ) : null}
    </AnimatePresence>,
    portalTarget,
  );
}
