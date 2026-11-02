import type { ReactNode } from "react";
import { cn } from "../lib/cn.js";
import { Backdrop, type BackdropId } from "./backdrop.js";

export type StageScrim = "none" | "top" | "bottom";

export interface FloatingStageProps {
  backdrop: BackdropId;
  /** Ink gradient for text set over the photo. Mocks themselves need none. */
  scrim?: StageScrim;
  priority?: boolean;
  basePath?: string;
  sizes?: string;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
}

const SCRIM: Record<Exclude<StageScrim, "none">, string> = {
  top: "inset-x-0 top-0 h-1/2 bg-linear-to-b from-scrim/55 to-transparent",
  bottom: "inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-scrim/55 to-transparent",
};

/**
 * A rounded stage where mock UI floats on a soft photograph. The photo is the
 * only texture: no glass, glow or colored gradients on top of it.
 */
export function FloatingStage({
  backdrop,
  scrim = "none",
  priority,
  basePath,
  sizes,
  className,
  contentClassName,
  children,
}: FloatingStageProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-3xl bg-muted px-3 pt-10 pb-20 sm:px-10 sm:pt-16 lg:px-20",
        className,
      )}
    >
      <Backdrop id={backdrop} priority={priority} basePath={basePath} sizes={sizes} />
      {scrim === "none" ? null : (
        <div
          aria-hidden="true"
          className={cn("pointer-events-none absolute", SCRIM[scrim])}
        />
      )}
      <div className={cn("relative mx-auto max-w-5xl", contentClassName)}>{children}</div>
    </div>
  );
}
