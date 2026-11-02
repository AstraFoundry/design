import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useStepTimeline } from "../src/mock/use-step-timeline.js";

const DELAYS = [400, 800, 200] as const;

/** Each step schedules the next one after React commits, so advance one act per step. */
function advanceSteps(...durations: number[]) {
  for (const ms of durations) {
    act(() => {
      vi.advanceTimersByTime(ms);
    });
  }
}

describe("useStepTimeline", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("stays on the initial step until it is running", () => {
    const { result } = renderHook(() => useStepTimeline(DELAYS, false));
    act(() => {
      vi.advanceTimersByTime(5_000);
    });
    expect(result.current.step).toBe(0);
    expect(result.current.done).toBe(false);
    expect(result.current.reduce).toBe(false);
  });

  it("advances each step after its delay and stops at the last one", () => {
    const { result } = renderHook(() => useStepTimeline(DELAYS, true));
    act(() => {
      vi.advanceTimersByTime(399);
    });
    expect(result.current.step).toBe(0);
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current.step).toBe(1);
    act(() => {
      vi.advanceTimersByTime(800);
    });
    expect(result.current.step).toBe(2);
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toMatchObject({ step: 3, done: true });
    expect(vi.getTimerCount()).toBe(0);
  });

  it("starts when running turns true", () => {
    const { result, rerender } = renderHook(
      ({ running }) => useStepTimeline(DELAYS, running),
      {
        initialProps: { running: false },
      },
    );
    rerender({ running: true });
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(result.current.step).toBe(1);
  });

  it("replays from the start and keeps playing after a clamped jump", () => {
    const { result } = renderHook(() => useStepTimeline(DELAYS, true));
    advanceSteps(...DELAYS);
    expect(result.current.done).toBe(true);

    act(() => result.current.replay());
    expect(result.current.step).toBe(0);
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(result.current.step).toBe(1);

    act(() => result.current.jump(99));
    expect(result.current.step).toBe(3);
    act(() => result.current.jump(-1));
    expect(result.current.step).toBe(0);
    act(() => result.current.jump(2));
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current.step).toBe(3);
  });
});
