// @vitest-environment node
import { fileURLToPath } from "node:url";
import { compile } from "@tailwindcss/node";
import { describe, expect, it } from "vitest";

const base = fileURLToPath(new URL("..", import.meta.url));

describe("styles.css", () => {
  it("compiles with Tailwind v4 and maps semantic utilities to tokens", async () => {
    const compiler = await compile('@import "tailwindcss";\n@import "./styles.css";\n', {
      base,
      onDependency: () => {},
    });
    const css = compiler.build([
      "bg-background",
      "text-muted-foreground",
      "bg-substrate-surface",
      "from-scrim/55",
      "shadow-5",
      "font-display",
      "rounded-2xl",
      "dark:bg-card",
    ]);
    expect(css).toContain("background-color: var(--background)");
    expect(css).toContain("color: var(--muted-foreground)");
    expect(css).toContain("color-mix(in oklab, var(--scrim) 55%, transparent)");
    expect(css).toContain("--tw-shadow: var(--shadow-5)");
    expect(css).toContain("font-family: var(--font-stack-display)");
    expect(css).toContain(":where(.dark, .dark *)");
    expect(css).toContain("--ink-900: hsl(22 14% 7%)");
    // On any element with `lang`, so a Japanese sample inside an English page gets the Japanese stack.
    expect(css).toContain(":lang(ja)");
    expect(css).not.toContain(":root:lang(");
  });

  it("builds the flat and raised materials from layer toggles", async () => {
    const compiler = await compile('@import "tailwindcss";\n@import "./styles.css";\n', {
      base,
      onDependency: () => {},
    });
    const built = compiler.build([
      "material-face",
      "material-face-primary",
      "material-thumb",
      "material-well",
      "material-panel",
      "rounded-continuous-tile",
      "hover:bg-flat-face-hover",
    ]);
    // Compare declarations with whitespace collapsed, however they are wrapped.
    const css = built.replace(/\s+/g, " ").replace(/\( /g, "(").replace(/ \)/g, ")");
    // A raised layer turns its toggles over; the page is flat.
    expect(css).toMatch(
      /:root, \[data-material="flat"\] \{ --when-flat: initial; --when-raised: ;/,
    );
    expect(css).toMatch(
      /\[data-material="raised"\] \{ --when-flat: ; --when-raised: initial;/,
    );
    expect(css).toContain(
      "box-shadow: var(--when-raised, inset 0 1px 0 var(--raised-highlight), var(--raised-shadow)) var(--when-flat, 0 0 #0000)",
    );
    expect(css).toContain(
      "background-color: var(--when-raised, var(--well-face)) var(--when-flat, var(--flat-face))",
    );
    expect(css).toContain(
      "box-shadow: inset 0 1px 0 var(--panel-highlight), var(--panel-shadow)",
    );
    // Continuous corners where the browser draws them, a quarter circle elsewhere.
    expect(css).toMatch(
      /\.rounded-continuous-tile \{ border-radius: 28px; @supports \(corner-shape: squircle\) \{ corner-shape: squircle; border-radius: calc\(28px \* 1\.5\);/,
    );
    expect(css).toContain("background-color: var(--flat-face-hover)");
    // Every material token the utilities read is defined for light and dark.
    for (const name of css.matchAll(/var\(--((?:raised|panel|well|flat)-[a-z-]+)\)/g)) {
      expect(css).toContain(`--${name[1]}: `);
    }
  });
});
