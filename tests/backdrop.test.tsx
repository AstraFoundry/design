import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Backdrop, BACKDROP_TALL_MEDIA } from "../src/mock/backdrop.js";
import { backdropCredits, backdropImages } from "../src/mock/backdrops.generated.js";
import { AppWindow } from "../src/mock/app-window.js";
import { DesktopWindow } from "../src/mock/desktop-window.js";
import manifest from "../assets/backdrops.json" with { type: "json" };

function parse(markup: string) {
  const host = document.createElement("div");
  host.innerHTML = markup;
  return host;
}

describe("Backdrop", () => {
  const host = parse(
    renderToStaticMarkup(<Backdrop id="field" basePath="/bg" priority />),
  );
  const root = host.firstElementChild as HTMLElement;
  const sources = [...host.querySelectorAll("source")];
  const img = host.querySelector("img") as HTMLImageElement;

  it("is decorative", () => {
    expect(root.getAttribute("aria-hidden")).toBe("true");
    expect(img.getAttribute("alt")).toBe("");
  });

  it("offers the portrait crop first, then the wide crop, AVIF before WebP", () => {
    expect(sources.map((source) => [source.type, source.media])).toEqual([
      ["image/avif", BACKDROP_TALL_MEDIA],
      ["image/webp", BACKDROP_TALL_MEDIA],
      ["image/avif", ""],
      ["image/webp", ""],
    ]);
    expect(sources[0]?.srcset).toBe("/bg/field/tall-900.avif");
    expect(sources[2]?.srcset).toBe(
      "/bg/field/wide-1200.avif 1200w, /bg/field/wide-2400.avif 2400w",
    );
    expect(sources[3]?.getAttribute("sizes")).toBe("100vw");
  });

  it("falls back to the small WebP with intrinsic size and priority hints", () => {
    expect(img.getAttribute("src")).toBe("/bg/field/wide-1200.webp");
    expect([img.getAttribute("width"), img.getAttribute("height")]).toEqual([
      "1200",
      "741",
    ]);
    expect(img.getAttribute("loading")).toBe("eager");
    expect(img.getAttribute("fetchpriority")).toBe("high");
  });

  it("paints the dominant color and blurred placeholder underneath", () => {
    const { color, placeholder } = backdropImages.field;
    expect(placeholder).toMatch(/^data:image\/webp;base64,/);
    expect(root.style.backgroundColor).not.toBe("");
    expect(root.getAttribute("style")).toContain(placeholder);
    expect(color).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("lazy-loads when not a priority", () => {
    const lazy = parse(renderToStaticMarkup(<Backdrop id="field" />));
    expect(lazy.querySelector("img")?.getAttribute("loading")).toBe("lazy");
    expect(lazy.querySelector("source")?.getAttribute("srcset")).toBe(
      "/backdrops/field/tall-900.avif",
    );
  });

  it("has generated data for exactly the ready manifest entries", () => {
    const ready = manifest.backdrops.filter((entry) => entry.status === "ready");
    expect(Object.keys(backdropImages).sort()).toEqual(
      ready.map((entry) => entry.id).sort(),
    );
    expect(backdropCredits.map((credit) => credit.id)).toEqual(
      manifest.backdrops.map((entry) => entry.id),
    );
  });
});

describe("mock windows", () => {
  it.each([
    [
      "AppWindow",
      <AppWindow label="Demo" title="Title" key="app">
        body
      </AppWindow>,
    ],
    [
      "DesktopWindow",
      <DesktopWindow label="Demo" title="Title" key="desktop">
        body
      </DesktopWindow>,
    ],
  ])("%s is one labelled image with inert contents", (_, element) => {
    const host = parse(renderToStaticMarkup(element));
    const frame = host.firstElementChild as HTMLElement;
    expect(frame.getAttribute("role")).toBe("img");
    expect(frame.getAttribute("aria-label")).toBe("Demo");
    expect(frame.firstElementChild?.hasAttribute("inert")).toBe(true);
    expect(frame.textContent).toContain("body");
  });
});
