import { render, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Motion reads the media query once, on first use; set it before anything imports motion.
vi.hoisted(() => {
  window.matchMedia = (query: string) =>
    ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
});

const { useStepTimeline } = await import("../src/mock/use-step-timeline.js");
const { Reveal } = await import("../src/ui/reveal.js");

describe("prefers-reduced-motion", () => {
  it("shows the final step at once, even before the demo is in view", () => {
    const { result } = renderHook(() => useStepTimeline([400, 800], false));
    expect(result.current).toMatchObject({ step: 2, done: true, reduce: true });
  });

  it("schedules no timers", () => {
    vi.useFakeTimers();
    renderHook(() => useStepTimeline([400, 800], true));
    expect(vi.getTimerCount()).toBe(0);
    vi.useRealTimers();
  });

  it("renders Reveal content in place, without an entrance state", () => {
    const { getByText } = render(
      <Reveal className="lead">
        <p>content</p>
      </Reveal>,
    );
    const wrapper = getByText("content").parentElement;
    expect(wrapper?.className).toBe("lead");
    expect(wrapper?.getAttribute("style")).toBeNull();
  });
});
