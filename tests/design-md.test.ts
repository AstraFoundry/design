// @vitest-environment node
import { readFileSync } from "node:fs";
import path from "node:path";
import { lint } from "@google/design.md/linter";
import { describe, expect, it } from "vitest";
import { designMdColor, renderDesignMd } from "../scripts/tokens.mjs";

const read = (file: string) => readFileSync(path.join(__dirname, file), "utf8");
const designMd = read("../DESIGN.md");
const tokens = JSON.parse(read("../tokens/sunbeam.json")) as {
  rounded: Record<string, string>;
};

describe("DESIGN.md", () => {
  it("is generated from sunbeam.json", () => {
    expect(designMd).toBe(renderDesignMd(designMd, tokens));
  });

  it("passes the DESIGN.md linter without errors or warnings", () => {
    const report = lint(designMd);
    const problems = report.findings.filter((finding) => finding.severity !== "info");
    expect(problems).toEqual([]);
    expect(report.summary.errors).toBe(0);
  });

  it("writes colors as hex or token references", () => {
    expect(designMdColor("hsl(48 100% 50%)")).toBe("#ffcc00");
    expect(designMdColor("rgb(0 0 0 / 0.1)")).toBe("#0000001a");
    expect(designMdColor("var(--ink-900)")).toBe("{colors.ink-900}");
  });

  it("keeps the Tailwind radii of theme.css", () => {
    const theme = read("../tokens/theme.css");
    for (const [name, value] of Object.entries(tokens.rounded)) {
      const radius = new RegExp(`--radius-${name}: ([^;]+);`).exec(theme);
      if (radius) expect(radius[1]).toBe(value);
    }
    expect(theme).toContain("--radius-3xl: 24px;");
  });
});
