#!/usr/bin/env node
// Renders tokens/sunbeam.css, the token tables of the Sunbeam skill
// (skills/sunbeam/SKILL.md), the front matter of DESIGN.md and the MyGo
// package's tokens (../mygo/sunbeam/tokens_gen.go) from tokens/sunbeam.json.
//   node scripts/tokens.mjs          write all four
//   node scripts/tokens.mjs --check  exit 1 when any is out of date
import { readFileSync, realpathSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const jsonPath = fileURLToPath(new URL("../tokens/sunbeam.json", import.meta.url));
const cssPath = fileURLToPath(new URL("../tokens/sunbeam.css", import.meta.url));
const skillPath = fileURLToPath(new URL("../skills/sunbeam/SKILL.md", import.meta.url));
const designMdPath = fileURLToPath(new URL("../DESIGN.md", import.meta.url));
const goPath = fileURLToPath(
  new URL("../../mygo/sunbeam/tokens_gen.go", import.meta.url),
);

const START = "<!-- tokens:start -->";
const END = "<!-- tokens:end -->";

/** Markdown tables of every token, placed between the skill's token markers. */
export function renderTokenTables(tokens) {
  const code = (value) => `\`${value}\``;
  const pad = (rows) => {
    const widths = rows[0].map((_, column) =>
      Math.max(3, ...rows.map((row) => row[column].length)),
    );
    const line = (row) =>
      `| ${row.map((cell, column) => cell.padEnd(widths[column])).join(" | ")} |`;
    const rule = `| ${widths.map((width) => "-".repeat(width)).join(" | ")} |`;
    return [line(rows[0]), rule, ...rows.slice(1).map(line)].join("\n");
  };
  const single = (title, entries) =>
    `**${title}**\n\n${pad([
      ["Token", "Value"],
      ...Object.entries(entries).map(([name, value]) => [code(`--${name}`), code(value)]),
    ])}`;
  const modes = (title, names, light = tokens.light, dark = tokens.dark) =>
    `**${title}**\n\n${pad([
      ["Token", "Light", "Dark"],
      ...names.map((name) => [
        code(`--${name}`),
        code(light[name]),
        name in dark ? code(dark[name]) : "same",
      ]),
    ])}`;
  const names = Object.keys(tokens.light);
  return [
    single("Scales", tokens.scales),
    single("Substrate (always dark, mode-invariant)", tokens.substrate),
    modes(
      "Semantic",
      names.filter((name) => !name.startsWith("art-") && !name.startsWith("figure-")),
    ),
    modes(
      "Art (feature-tile scenes)",
      names.filter((name) => name.startsWith("art-")),
    ),
    modes(
      "Figure (3D demonstration figures; mix amounts, 0–1)",
      names.filter((name) => name.startsWith("figure-")),
    ),
    modes(
      "Material (flat and raised surfaces; see Materials)",
      Object.keys(tokens.material.light),
      tokens.material.light,
      tokens.material.dark,
    ),
  ].join("\n\n");
}

export function renderSkill(skill, tokens) {
  const start = skill.indexOf(START);
  const end = skill.indexOf(END);
  if (start < 0 || end < start) throw new Error(`SKILL.md needs ${START} and ${END}`);
  return `${skill.slice(0, start + START.length)}\n\n${renderTokenTables(tokens)}\n\n${skill.slice(end)}`;
}

/** Semantic colors that DESIGN.md carries: not shadows, art or figure amounts. */
const isUiColor = (name) => !/^(shadow|art|figure)-/.test(name);

/** `hsl()`, `rgb()` or `var(--x)` as a DESIGN.md color: `#rrggbb[aa]` or `{colors.x}`. */
export function designMdColor(value, prefix = "") {
  const reference = /^var\(--([a-z0-9-]+)\)$/.exec(value);
  if (reference) return `{colors.${prefix}${reference[1]}}`;
  const hsl = /^hsl\(([\d.]+) ([\d.]+)% ([\d.]+)%(?: \/ ([\d.]+))?\)$/.exec(value);
  const rgb = /^rgb\(([\d.]+) ([\d.]+) ([\d.]+)(?: \/ ([\d.]+))?\)$/.exec(value);
  let channels;
  let alpha;
  if (hsl) {
    const [h, s, l] = [Number(hsl[1]), Number(hsl[2]) / 100, Number(hsl[3]) / 100];
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
    channels = [f(0), f(8), f(4)].map((c) => c * 255);
    alpha = hsl[4];
  } else if (rgb) {
    channels = [rgb[1], rgb[2], rgb[3]].map(Number);
    alpha = rgb[4];
  } else throw new Error(`Cannot write "${value}" as a DESIGN.md color`);
  const hex = (n) => Math.round(n).toString(16).padStart(2, "0");
  const opacity = alpha === undefined ? "" : hex(Number(alpha) * 255);
  return `#${channels.map(hex).join("")}${opacity}`;
}

/**
 * The DESIGN.md colors: every semantic color, its `dark-` twin (an alias of
 * the light value where dark mode keeps it), the substrate, and the scale
 * steps those use. Values stay aliases where sunbeam.json aliases them.
 */
export function designMdColors(tokens) {
  const names = Object.keys(tokens.light).filter(isUiColor);
  const semantic = Object.fromEntries(
    names.map((name) => [name, designMdColor(tokens.light[name])]),
  );
  const dark = Object.fromEntries(
    names.map((name) => [
      `dark-${name}`,
      name in tokens.dark ? designMdColor(tokens.dark[name]) : `{colors.${name}}`,
    ]),
  );
  const substrate = Object.fromEntries(
    Object.entries(tokens.substrate).map(([name, value]) => [name, designMdColor(value)]),
  );
  const used = new Set(
    [...Object.values(semantic), ...Object.values(dark), ...Object.values(substrate)]
      .map((value) => /^\{colors\.(.+)\}$/.exec(value)?.[1])
      .filter(Boolean),
  );
  const scales = Object.fromEntries(
    Object.entries(tokens.scales)
      .filter(([name]) => used.has(name))
      .map(([name, value]) => [name, designMdColor(value)]),
  );
  return { ...scales, ...semantic, ...dark, ...substrate };
}

/**
 * The components with their dark twins: a `-dark` copy of each component that
 * uses a color dark mode changes, pointing at the `dark-` colors.
 */
export function designMdComponents(tokens) {
  const modal = new Set(Object.keys(tokens.light).filter(isUiColor));
  const out = {};
  for (const [name, properties] of Object.entries(tokens.components)) {
    out[name] = properties;
    let changed = false;
    const twin = Object.fromEntries(
      Object.entries(properties).map(([key, value]) => {
        const color = typeof value === "string" && /^\{colors\.(.+)\}$/.exec(value);
        if (!color || !modal.has(color[1])) return [key, value];
        changed = true;
        return [key, `{colors.dark-${color[1]}}`];
      }),
    );
    if (changed) out[`${name}-dark`] = twin;
  }
  return out;
}

/** A small YAML writer for the DESIGN.md front matter: maps, strings, numbers. */
function yaml(value, depth = 0) {
  const indent = "  ".repeat(depth);
  const scalar = (v) => {
    if (typeof v === "number") return String(v);
    // Quote anything YAML could read as something else: refs, hex, commas, leading digits.
    return /^[a-z][a-z0-9 .-]*$/i.test(v) && !/^(true|false|null|yes|no|on|off)$/i.test(v)
      ? v
      : JSON.stringify(v);
  };
  return Object.entries(value)
    .map(([key, v]) =>
      v !== null && typeof v === "object"
        ? `${indent}${key}:\n${yaml(v, depth + 1)}`
        : `${indent}${key}: ${scalar(v)}`,
    )
    .join("\n");
}

export function renderDesignMdFrontMatter(tokens) {
  return `---\n${yaml({
    version: "alpha",
    name: "Sunbeam",
    description:
      "AstraFoundry's design system: warm paper and ink, one vivid yellow for the single action or result, motion-blurred natural photographs under one solid focus surface, concentric corners, and motion that plays once and rests.",
    colors: designMdColors(tokens),
    typography: tokens.typography,
    rounded: tokens.rounded,
    spacing: tokens.spacing,
    components: designMdComponents(tokens),
  })}\n---\n`;
}

/** DESIGN.md with its front matter rendered and its hand-written body kept. */
export function renderDesignMd(designMd, tokens) {
  const match = /^---\n(?:[\s\S]*?\n)?---\n/.exec(designMd);
  if (!match) throw new Error("DESIGN.md needs a front matter block");
  return renderDesignMdFrontMatter(tokens) + designMd.slice(match[0].length);
}

export function renderSunbeamCss(tokens) {
  // One declaration per line; a list longer than Prettier's 90 columns wraps
  // as Prettier wraps it, packing its comma-separated layers into lines.
  const declaration = (name, value) => {
    const line = `  --${name}: ${value};`;
    const layers = value.split(/,(?![^(]*\))\s*/);
    if (line.length <= 90 || layers.length < 2) return line;
    const lines = [];
    for (const layer of layers) {
      const last = lines.length - 1;
      if (last >= 0 && `    ${lines[last]}, ${layer},`.length <= 90)
        lines[last] += `, ${layer}`;
      else lines.push(layer);
    }
    return `  --${name}:\n${lines.map((l) => `    ${l}`).join(",\n")};`;
  };
  const block = (entries) =>
    Object.entries(entries)
      .map(([name, value]) => declaration(name, value))
      .join("\n");

  return `/*
 * Sunbeam tokens. Generated from sunbeam.json by \`pnpm tokens:build\`; do not edit.
 *
 * Tokens are full color values (not bare HSL triplets) so vendored beUI
 * components that read \`var(--foreground)\` directly keep working. Scales and
 * the substrate (an always-dark backstage surface) are mode-invariant; only
 * \`.dark\` re-stages the semantic aliases, shadows and materials, and
 * \`.light\` brings light mode back inside a dark part. Shadows are warm and
 * two-layered, keyed off ink-900 rather than neutral black.
 */

:root,
.light {
  color-scheme: light;

  /* Scales */
${block(tokens.scales)}

  /* Substrate */
${block(tokens.substrate)}

  /* Semantic */
${block(tokens.light)}

  /* Material */
${block(tokens.material.light)}
}

.dark {
  color-scheme: dark;

${block(tokens.dark)}

${block(tokens.material.dark)}
}
`;
}

/** kebab-case to an exported Go name; size steps (sm, 2xl) stay upper case. */
export function goName(name) {
  return name
    .split("-")
    .map((part) =>
      /^\d*(xs|sm|md|lg|xl)$/.test(part)
        ? part.toUpperCase()
        : part.charAt(0).toUpperCase() + part.slice(1),
    )
    .join("");
}

/** A CSS color as 8-bit sRGB channels and alpha, resolving var() through `lookup`. */
export function rgba(value, lookup) {
  const reference = /^var\(--([a-z0-9-]+)\)$/.exec(value);
  if (reference) {
    const target = lookup(reference[1]);
    if (target === undefined) throw new Error(`Unknown token in "${value}"`);
    return rgba(target, lookup);
  }
  const hex = designMdColor(value);
  const byte = (i) => parseInt(hex.slice(i, i + 2), 16);
  return { r: byte(1), g: byte(3), b: byte(5), a: hex.length > 7 ? byte(7) : 255 };
}

const isColor = (value) => /^(hsl|rgb|var)\(/.test(value);
const isNumber = (value) => /^-?[\d.]+$/.test(value);

/** CSS box-shadow layers: [{ inset, x, y, blur, spread, color }]. */
export function shadows(value) {
  const layers = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i <= value.length; i++) {
    const ch = value[i];
    if (ch === "(") depth++;
    else if (ch === ")") depth--;
    else if ((ch === "," && depth === 0) || i === value.length) {
      layers.push(value.slice(start, i).trim());
      start = i + 1;
    }
  }
  return layers.map((layer) => {
    const match =
      /^(inset )?(-?[\d.]+)(?:px)? (-?[\d.]+)(?:px)?(?: (-?[\d.]+)(?:px)?)?(?: (-?[\d.]+)(?:px)?)? (.+)$/.exec(
        layer,
      );
    if (!match) throw new Error(`Cannot read the shadow "${layer}"`);
    const [, inset, x, y, blur = "0", spread = "0", color] = match;
    return { inset: Boolean(inset), x: +x, y: +y, blur: +blur, spread: +spread, color };
  });
}

/**
 * Go source of the MyGo package's tokens (packages/mygo/sunbeam/tokens_gen.go).
 * Every field and declaration carries its own comment line, so gofmt has
 * nothing to align and the output is stable without running it.
 */
export function renderGoTokens(tokens) {
  const base = { ...tokens.scales, ...tokens.substrate };
  const light = { ...tokens.light, ...tokens.material.light };
  const dark = { ...light, ...tokens.dark, ...tokens.material.dark };
  const goColor = ({ r, g, b, a }) => `ui.Color{R: ${r}, G: ${g}, B: ${b}, A: ${a}}`;
  const num = (n) => String(+n.toFixed(4));
  const goValue = (value, lookup) => {
    if (isColor(value)) return goColor(rgba(value, lookup));
    if (isNumber(value)) return num(+value);
    return `[]Shadow{${shadows(value)
      .map(
        (s) =>
          `{X: ${num(s.x)}, Y: ${num(s.y)}, Blur: ${num(s.blur)}, Spread: ${num(s.spread)}, Color: ${goColor(rgba(s.color, lookup))}${s.inset ? ", Inset: true" : ""}}`,
      )
      .join(", ")}}`;
  };
  const goType = (value) =>
    isColor(value) ? "ui.Color" : isNumber(value) ? "float32" : "[]Shadow";
  const lookupIn = (mode) => (name) => mode[name] ?? base[name];
  const px = (value) => {
    const match = /^(-?[\d.]+)px$/.exec(value);
    if (!match) throw new Error(`Cannot read the length "${value}"`);
    return num(+match[1]);
  };
  const out = [
    "// Code generated by packages/web/scripts/tokens.mjs from packages/web/tokens/sunbeam.json. DO NOT EDIT.",
    "",
    "package sunbeam",
    "",
    'import "github.com/egoist/mygo/ui"',
    "",
    "// Palette holds one mode of Sunbeam's semantic, art, figure and material",
    "// tokens. Each field's comment names its CSS custom property.",
    "type Palette struct {",
  ];
  for (const [name, value] of Object.entries(light)) {
    out.push(`\t// --${name}`, `\t${goName(name)} ${goType(value)}`);
  }
  out.push("}", "");
  for (const [fn, mode, label] of [
    ["lightPalette", light, "light"],
    ["darkPalette", dark, "dark"],
  ]) {
    out.push(
      `// ${fn} returns the ${label} mode.`,
      `func ${fn}() *Palette {`,
      "\tp := new(Palette)",
    );
    for (const [name, value] of Object.entries(mode)) {
      out.push(`\tp.${goName(name)} = ${goValue(value, lookupIn(mode))}`);
    }
    out.push("\treturn p", "}", "");
  }
  for (const [name, value] of Object.entries(base)) {
    out.push(`// ${goName(name)} is --${name}: ${value}.`);
    out.push(`var ${goName(name)} = ${goValue(value, (n) => base[n])}`, "");
  }
  for (const [name, value] of Object.entries(tokens.rounded)) {
    out.push(`// Radius${goName(name)} is the ${name} radius, in DIPs.`);
    out.push(`const Radius${goName(name)} float32 = ${px(value)}`, "");
  }
  for (const [name, value] of Object.entries(tokens.spacing)) {
    out.push(`// Space${goName(name)} is the ${name} spacing, in DIPs.`);
    out.push(`const Space${goName(name)} float32 = ${px(value)}`, "");
  }
  for (const [name, style] of Object.entries(tokens.typography)) {
    const families = style.fontFamily
      .split(",")
      .map((family) => JSON.stringify(family.trim()));
    const tracking = style.letterSpacing ? num(parseFloat(style.letterSpacing)) : "0";
    out.push(`// Type${goName(name)} is the ${name} text style.`);
    out.push(
      `var Type${goName(name)} = TextStyle{Families: []string{${families.join(", ")}}, Size: ${px(style.fontSize)}, Weight: ${style.fontWeight}, LineHeight: ${num(style.lineHeight)}, LetterSpacing: ${tracking}}`,
      "",
    );
  }
  return `${out.join("\n").trimEnd()}\n`;
}

const isMain =
  process.argv[1] && fileURLToPath(import.meta.url) === realpathSync(process.argv[1]);
if (isMain) {
  const tokens = JSON.parse(readFileSync(jsonPath, "utf8"));
  const css = renderSunbeamCss(tokens);
  const skill = renderSkill(readFileSync(skillPath, "utf8"), tokens);
  const designMd = renderDesignMd(readFileSync(designMdPath, "utf8"), tokens);
  const go = renderGoTokens(tokens);
  if (process.argv.includes("--check")) {
    const current = (path) => {
      try {
        return readFileSync(path, "utf8");
      } catch {
        return undefined;
      }
    };
    const stale = [
      [cssPath, css, "tokens/sunbeam.css"],
      [skillPath, skill, "skills/sunbeam/SKILL.md"],
      [designMdPath, designMd, "DESIGN.md"],
      [goPath, go, "../mygo/sunbeam/tokens_gen.go"],
    ].filter(([path, expected]) => current(path) !== expected);
    for (const [, , name] of stale)
      console.error(`${name} is out of date. Run \`pnpm tokens:build\`.`);
    if (stale.length > 0) process.exit(1);
  } else {
    writeFileSync(cssPath, css);
    writeFileSync(skillPath, skill);
    writeFileSync(designMdPath, designMd);
    writeFileSync(goPath, go);
  }
}
