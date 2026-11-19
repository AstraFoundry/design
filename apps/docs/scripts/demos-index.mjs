#!/usr/bin/env node
// Writes demos/index.ts: one import per demos/**/*.tsx, keyed by its path.
//   node scripts/demos-index.mjs          write
//   node scripts/demos-index.mjs --check  exit 1 when it is out of date
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const dir = fileURLToPath(new URL("../demos", import.meta.url));
const walk = (d) =>
  readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? walk(join(d, e.name))
      : e.name.endsWith(".tsx")
        ? [join(d, e.name)]
        : [],
  );
const names = walk(dir)
  .map((f) => relative(dir, f).replace(/\.tsx$/, ""))
  .sort();
const ident = (n) => n.replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
const out = [
  'import type { ComponentType } from "react";',
  ...names.map((n) => `import ${ident(n)} from "./${n}";`),
  "",
  "/** Every demo, by its path under demos/. Regenerate with scripts/demos-index.mjs. */",
  "export const demos: Record<string, ComponentType> = {",
  ...names.map((n) => `  "${n}": ${ident(n)},`),
  "};",
  "",
].join("\n");
const path = join(dir, "index.ts");
if (process.argv.includes("--check")) {
  if (readFileSync(path, "utf8") !== out) {
    console.error("demos/index.ts is out of date. Run node scripts/demos-index.mjs.");
    process.exit(1);
  }
} else writeFileSync(path, out);
