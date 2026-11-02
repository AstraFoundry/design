"use client";

import { motion, type Transition } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { EASE_OUT } from "../lib/ease.js";
import { Backdrop, type BackdropId } from "./backdrop.js";

/** `--ease-spring` in tokens/theme.css: small things appearing. */
const EASE_SPRING = [0.34, 1.4, 0.64, 1] as const;

export interface TintChipContent {
  title: ReactNode;
  detail?: ReactNode;
}

export interface BackdropCardProps {
  backdrop: BackdropId;
  /** The glyph inside the solid mark tile, e.g. `<BrandMark />` (kept dark on the light tile in both modes). */
  mark: ReactNode;
  /** Wordmark text next to the tile. */
  wordmark: ReactNode;
  /** Heading level of the wordmark when it names the page or section. */
  wordmarkAs?: "h1" | "h2" | "p";
  /** The one solid surface of the card. */
  focus: ReactNode;
  /** Tint chip left of the focus surface; it bleeds off the left edge. */
  before?: TintChipContent;
  /** Tint chip right of the focus surface; it bleeds off the right edge. */
  after?: TintChipContent;
  /** Icon and short status under the focus surface. */
  status?: ReactNode;
  /** Bottom-left caption in muted light ink. */
  caption?: ReactNode;
  /** Draws the shared inset, the focus axis and numbered zones (1 mark, 2 focus, 3 status, 4 caption). */
  guides?: boolean;
  /**
   * Entrance state of the focus row. `true` (the default) renders the final
   * frame; pass `false` until the card is in view, then `true` to play once.
   */
  played?: boolean;
  priority?: boolean;
  sizes?: string;
  basePath?: string;
  className?: string;
}

const enter = (delay: number, ease: Transition["ease"] = EASE_OUT): Transition => ({
  duration: 0.55,
  ease,
  delay,
});

function Guide({ zone, className }: { zone: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute z-10 grid size-6 place-items-center rounded-full bg-primary font-mono text-xs font-medium text-primary-foreground tabular-nums shadow-2",
        className,
      )}
    >
      {zone}
    </span>
  );
}

function TintChip({
  content,
  align,
  className,
}: {
  content: TintChipContent;
  align: "start" | "end";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-52 shrink-0 flex-col justify-center gap-1 rounded-[20px] bg-substrate-tint px-5 py-4 sm:w-60",
        align === "end" ? "items-end text-right" : "items-start text-left",
        className,
      )}
    >
      <span className="text-base leading-snug text-substrate-tint-ink sm:text-lg">
        {content.title}
      </span>
      {content.detail ? (
        <span className="text-sm leading-snug text-substrate-tint-muted tabular-nums sm:text-base">
          {content.detail}
        </span>
      ) : null}
    </div>
  );
}

/**
 * The Sunbeam backdrop card: a motion-blurred photograph with a mark at the
 * top left, one solid focus surface flanked by tint chips that bleed off the
 * edges, a status line under it and a muted caption at the bottom left. The
 * mark and caption share one inset. The focus row is decorative (`inert`);
 * the wordmark and caption are real text.
 */
export function BackdropCard({
  backdrop,
  mark,
  wordmark,
  wordmarkAs: Wordmark = "p",
  focus,
  before,
  after,
  status,
  caption,
  guides = false,
  played = true,
  priority,
  sizes,
  basePath,
  className,
}: BackdropCardProps) {
  const state = played ? "in" : "out";
  return (
    <div
      className={cn(
        "relative isolate flex min-h-[520px] flex-col overflow-hidden rounded-3xl bg-substrate p-6 sm:min-h-[600px] sm:p-10 lg:rounded-[40px] lg:p-14",
        className,
      )}
    >
      <Backdrop id={backdrop} priority={priority} sizes={sizes} basePath={basePath} />
      {caption ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-scrim/55 to-transparent"
        />
      ) : null}

      {guides ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
          <div className="absolute inset-6 rounded-[10px] border border-dashed border-primary/80 sm:inset-10 lg:inset-14" />
          <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-primary/60" />
        </div>
      ) : null}

      <div className="relative flex items-center gap-4">
        {guides ? <Guide zone={1} className="-top-3 -left-3" /> : null}
        <span className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-substrate-focus shadow-2 sm:size-12 sm:rounded-[11px] [&_.brand-mark]:filter-none">
          {mark}
        </span>
        <Wordmark className="text-[28px] leading-none font-medium tracking-[-0.015em] text-substrate-hi sm:text-4xl">
          {wordmark}
        </Wordmark>
      </div>

      <div aria-hidden="true" inert className="relative my-auto py-10 lg:ml-[22%]">
        <div className="relative flex items-stretch gap-3">
          {before ? (
            <motion.div
              className="absolute inset-y-0 right-full mr-3 flex"
              initial={false}
              animate={state}
              variants={{ out: { opacity: 0, x: 32 }, in: { opacity: 1, x: 0 } }}
              transition={enter(0)}
            >
              <TintChip content={before} align="end" />
            </motion.div>
          ) : null}
          <motion.div
            className="relative w-[min(34rem,calc(100vw-6rem))] shrink-0 rounded-[22px] bg-substrate-focus px-6 py-5 text-lg leading-snug text-substrate-focus-ink shadow-5 sm:text-[22px]"
            initial={false}
            animate={state}
            variants={{
              out: { opacity: 0, x: 32, scale: 0.96 },
              in: { opacity: 1, x: 0, scale: 1 },
            }}
            transition={enter(0.12, EASE_SPRING)}
          >
            {guides ? <Guide zone={2} className="-top-3 -left-3" /> : null}
            {focus}
          </motion.div>
          {after ? (
            <motion.div
              className="flex"
              initial={false}
              animate={state}
              variants={{ out: { opacity: 0, x: 32 }, in: { opacity: 1, x: 0 } }}
              transition={enter(0.24)}
            >
              <TintChip content={after} align="start" />
            </motion.div>
          ) : null}
        </div>
        {status ? (
          <motion.div
            className="relative mt-4 flex items-center gap-2.5 text-base text-substrate-hi sm:text-lg"
            initial={false}
            animate={state}
            variants={{ out: { opacity: 0, y: 6 }, in: { opacity: 1, y: 0 } }}
            transition={enter(0.5)}
          >
            {guides ? <Guide zone={3} className="-top-3 -left-3" /> : null}
            {status}
          </motion.div>
        ) : null}
      </div>

      {caption ? (
        <div className="relative">
          {guides ? <Guide zone={4} className="-top-3 -left-3" /> : null}
          <p className="max-w-[40ch] text-xl leading-[1.35] text-pretty text-substrate-tint-muted sm:text-2xl lg:text-[28px]">
            {caption}
          </p>
        </div>
      ) : null}
    </div>
  );
}
