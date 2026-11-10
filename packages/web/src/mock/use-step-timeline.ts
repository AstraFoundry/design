"use client";

import { useReducedMotion } from "../beui/lib/hooks/use-reduced-motion.js";
import { useCallback, useEffect, useState } from "react";

export interface StepTimeline {
  /** Current step, from 0 (initial state) to `delays.length` (final state). */
  step: number;
  done: boolean;
  /** Restarts from step 0. */
  replay: () => void;
  /** Moves to `target` (clamped); the timeline keeps playing from there. */
  jump: (target: number) => void;
  /** The reader prefers reduced motion. */
  reduce: boolean;
}

/**
 * Drives a scripted demo through `delays.length + 1` steps. Step 0 is the
 * initial state; step `n` is reached `delays[n - 1]` ms after step `n - 1`.
 * Nothing advances until `running` is true (pair it with `useInViewOnce`).
 *
 * With reduced motion the timeline always reports the final step, so the
 * reader sees the finished state without animation and nothing is scheduled.
 */
export function useStepTimeline(
  delays: readonly number[],
  running: boolean,
): StepTimeline {
  const reduce = useReducedMotion() ?? false;
  const last = delays.length;
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!running || reduce || step >= last) return;
    const timer = window.setTimeout(() => setStep((value) => value + 1), delays[step]);
    return () => window.clearTimeout(timer);
  }, [delays, last, reduce, running, step]);

  const replay = useCallback(() => setStep(0), []);
  const jump = useCallback(
    (target: number) => setStep(Math.max(0, Math.min(target, last))),
    [last],
  );

  const current = reduce ? last : step;
  return { step: current, done: current >= last, replay, jump, reduce };
}
