// @vitest-environment node
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { goName, renderGoTokens, renderSunbeamCss, shadows } from "../scripts/tokens.mjs";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");
const tokens = JSON.parse(read("../tokens/sunbeam.json")) as Record<
  string,
  Record<string, string>
> & { material: { light: Record<string, string>; dark: Record<string, string> } };

describe("Sunbeam tokens", () => {
  it("sunbeam.css is generated from sunbeam.json", () => {
    expect(read("../tokens/sunbeam.css")).toBe(renderSunbeamCss(tokens));
  });

  it("the MyGo package's tokens are generated from sunbeam.json", () => {
    expect(read("../../mygo/sunbeam/tokens_gen.go")).toBe(renderGoTokens(tokens));
  });

  it("names Go tokens in Go's style, with size steps in capitals", () => {
    expect(goName("card-foreground")).toBe("CardForeground");
    expect(goName("2xl")).toBe("2XL");
    expect(goName("card-inset-sm")).toBe("CardInsetSM");
    expect(goName("shadow-1")).toBe("Shadow1");
  });

  it("reads every layer of a box-shadow, inset ones too", () => {
    expect(
      shadows("inset 0 1px 2px rgb(0 0 0 / 0.25), 0 2px 6px -1px hsl(0 0% 0% / 0.5)"),
    ).toEqual([
      { inset: true, x: 0, y: 1, blur: 2, spread: 0, color: "rgb(0 0 0 / 0.25)" },
      { inset: false, x: 0, y: 2, blur: 6, spread: -1, color: "hsl(0 0% 0% / 0.5)" },
    ]);
  });

  it("every material token has a light and a dark value, and the same names", () => {
    const light = Object.keys(tokens.material.light);
    const dark = Object.keys(tokens.material.dark);
    expect(dark.filter((name) => !light.includes(name))).toEqual([]);
    // Dark mode re-stages every material except the yellow faces, which keep the brand color.
    expect(light.filter((name) => !dark.includes(name))).toEqual([
      "raised-primary-from",
      "raised-primary-to",
    ]);
  });

  it("every var() reference resolves to a defined token", () => {
    const defined = new Set(
      [
        tokens.scales,
        tokens.substrate,
        tokens.light,
        tokens.dark,
        tokens.material.light,
        tokens.material.dark,
      ].flatMap((group) => Object.keys(group ?? {})),
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
