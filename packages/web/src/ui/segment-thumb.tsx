import type { CSSProperties } from "react";
import { cn } from "../lib/cn.js";

export interface SegmentThumbProps {
  /** The chosen segment, from 0; -1 hides the thumb. */
  index: number;
  /** How many segments the track holds. */
  count: number;
  className?: string;
}

/**
 * The one raised face of a track of equal segments. It slides to the
 * chosen segment on the spring, so the choice moves rather than blinks,
 * and settles like a detent. With reduced motion it jumps.
 */
export function SegmentThumb({ index, count, className }: SegmentThumbProps) {
  return (
    <span
      data-slot="thumb"
      aria-hidden="true"
      style={
        {
          "--index": String(Math.max(index, 0)),
          "--count": String(count),
        } as CSSProperties
      }
      className={cn(
        "segment-thumb material-thumb",
        "transition-[translate] duration-(--duration-indicator) ease-spring motion-reduce:transition-none",
        index < 0 && "opacity-0",
        className,
      )}
    />
  );
}
