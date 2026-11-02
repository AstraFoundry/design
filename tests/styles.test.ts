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
});
