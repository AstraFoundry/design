// @vitest-environment node
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { renderSunbeamCss } from "../scripts/tokens.mjs";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");
const tokens = JSON.parse(read("../tokens/sunbeam.json")) as Record<
  string,
  Record<string, string>
>;

describe("Sunbeam tokens", () => {
  it("sunbeam.css is generated from sunbeam.json", () => {
    expect(read("../tokens/sunbeam.css")).toBe(renderSunbeamCss(tokens));
  });

  it("every var() reference resolves to a defined token", () => {
    const defined = new Set(
      [tokens.scales, tokens.substrate, tokens.light, tokens.dark].flatMap((group) =>
        Object.keys(group ?? {}),
      ),
    );
    for (const name of ["font-stack-display", "font-stack-sans", "font-stack-mono"]) {
      defined.add(name);
    }
    const sources = [
      read("../tokens/sunbeam.css"),
      read("../tokens/theme.css"),
      read("../tokens/base.css"),
    ].join("\n");
    const referenced = [...sources.matchAll(/var\(--([a-z0-9-]+)(?=[,)])/g)].map(
      (m) => m[1],
    );
    const themeLocal = new Set(["duration", "gap"]);
    const missing = referenced.filter(
      (name) => !defined.has(name!) && !themeLocal.has(name!),
    );
    expect(missing).toEqual([]);
  });

  it("dark mode only re-stages tokens that light mode defines", () => {
    const light = Object.keys(tokens.light ?? {});
    expect(
      Object.keys(tokens.dark ?? {}).filter((name) => !light.includes(name)),
    ).toEqual([]);
  });
});
