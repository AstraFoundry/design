import { render, renderHook } from "@testing-library/react";
import { renderToString } from "react-dom/server";
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
  // jsdom has no IntersectionObserver; Motion's useInView needs one to mount.
  globalThis.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  } as unknown as typeof IntersectionObserver;
});

const { useStepTimeline } = await import("../src/mock/use-step-timeline.js");
const { Reveal } = await import("../src/ui/reveal.js");
const { TextReveal } = await import("../src/beui/components/motion/text-reveal.js");

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

  it("settles hydrated TextReveal units in place and unblurred", async () => {
    // The server renders the full entrance state (the preference reads false
    // there), and hydration keeps it; the final state must undo all of it.
    const container = document.createElement("div");
    container.innerHTML = renderToString(<TextReveal text="Warm ink" blur={8} />);
    document.body.append(container);
    render(<TextReveal text="Warm ink" blur={8} />, { container, hydrate: true });
    await new Promise((resolve) => setTimeout(resolve, 400));
    const units = [...container.querySelectorAll<HTMLElement>("span.inline-block")];
    expect(units.length).toBeGreaterThan(0);
    for (const unit of units) {
      expect(unit.style.filter).not.toContain("blur(8px)");
      expect(unit.style.transform).not.toContain("40%");
    }
    container.remove();
  });
});
