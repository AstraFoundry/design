#!/usr/bin/env node
// Renders backdrop photographs for a site.
//
//   pnpm assets:build <outDir>                                 (in this repository)
//   astrafoundry-backdrops <outDir>                            (from a consuming package)
//
// For every `ready` entry in assets/backdrops.json it writes, under <outDir>/<id>/:
//   wide-1200.{avif,webp}  wide-2400.{avif,webp}  tall-900.{avif,webp}  desktop.jpg
// With --update-data (the package's own assets:build script) it also refreshes
// src/mock/backdrops.generated.ts (blur placeholder, dominant color, focal
// position) and `dominantColor` in the manifest. Consumers never pass it: the
// installed package is read-only and already ships that data.
//
// A ready entry whose original is missing or too small fails the build;
// `pending-source` entries are reported and skipped.
import {
  existsSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const WIDE_ASPECT = 1.62;
export const TALL_ASPECT = 2 / 3;
export const DESKTOP = { width: 800, height: 1000, maxBytes: 200 * 1024 };
export const WIDE_WIDTHS = [1200, 2400];
export const TALL_WIDTH = 900;
const PLACEHOLDER_WIDTH = 24;

const packageDir = fileURLToPath(new URL("..", import.meta.url));
const assetsDir = path.join(packageDir, "assets");
const manifestPath = path.join(assetsDir, "backdrops.json");
const generatedPath = path.join(packageDir, "src/mock/backdrops.generated.ts");

/** Largest crop of `aspect` inside the source, centered on the focal point. */
export function focalCrop(width, height, aspect, focal) {
  const cropWidth = width / height > aspect ? Math.round(height * aspect) : width;
  const cropHeight = width / height > aspect ? height : Math.round(width / aspect);
  const clamp = (value, max) => Math.min(Math.max(value, 0), max);
  const left = Math.round(clamp(focal.x * width - cropWidth / 2, width - cropWidth));
  const top = Math.round(clamp(focal.y * height - cropHeight / 2, height - cropHeight));
  return {
    left,
    top,
    width: cropWidth,
    height: cropHeight,
    focal: {
      x: (focal.x * width - left) / cropWidth,
      y: (focal.y * height - top) / cropHeight,
    },
  };
}

export class BackdropBuildError extends Error {
  name = "BackdropBuildError";
}

function fail(message) {
  throw new BackdropBuildError(message);
}

/**
 * Checks the manifest before any image work: unique ids, known statuses, and
 * an original on disk for every ready entry. Returns the ready entries.
 */
export function readyEntries(manifest, root = assetsDir) {
  const ids = new Set();
  const ready = [];
  for (const entry of manifest.backdrops) {
    if (ids.has(entry.id)) fail(`duplicate backdrop id "${entry.id}".`);
    ids.add(entry.id);
    if (entry.status === "pending-source") continue;
    if (entry.status !== "ready")
      fail(`backdrop "${entry.id}" has unknown status "${entry.status}".`);
    if (!existsSync(path.join(root, entry.source))) {
      fail(
        `backdrop "${entry.id}" is ready but its original ${entry.source} is missing. ` +
          `Add the file or set its status to "pending-source".`,
      );
    }
    ready.push(entry);
  }
  return ready;
}

function hex({ r, g, b }) {
  return `#${[r, g, b].map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

function percent(value) {
  return `${Math.round(value * 1000) / 10}%`;
}

async function loadSharp() {
  try {
    return (await import("sharp")).default;
  } catch {
    fail(
      "sharp is not installed. Add it as a dev dependency of the package running this script.",
    );
  }
}

async function renderEntry(sharp, entry, outDir) {
  const source = sharp(path.join(assetsDir, entry.source), { failOn: "error" }).rotate();
  const { width, height } = await source.metadata();
  const crop = (aspect) => focalCrop(width, height, aspect, entry.focalPoint);

  const wide = crop(WIDE_ASPECT);
  const tall = crop(TALL_ASPECT);
  const desktop = crop(DESKTOP.width / DESKTOP.height);
  if (wide.width < Math.max(...WIDE_WIDTHS)) {
    fail(
      `backdrop "${entry.id}": the wide crop is ${wide.width}px; it needs ${Math.max(...WIDE_WIDTHS)}px.`,
    );
  }
  if (tall.width < TALL_WIDTH || desktop.width < DESKTOP.width) {
    fail(
      `backdrop "${entry.id}": the original is too small for the tall or desktop crop.`,
    );
  }

  const dir = path.join(outDir, entry.id);
  mkdirSync(dir, { recursive: true });
  const extract = (region) =>
    source.clone().extract({
      left: region.left,
      top: region.top,
      width: region.width,
      height: region.height,
    });

  const variants = [
    ...WIDE_WIDTHS.map((target) => ({
      name: `wide-${target}`,
      region: wide,
      width: target,
    })),
    { name: `tall-${TALL_WIDTH}`, region: tall, width: TALL_WIDTH },
  ];
  for (const variant of variants) {
    const resized = extract(variant.region).resize({ width: variant.width });
    await resized
      .clone()
      .avif({ quality: 55, effort: 4 })
      .toFile(path.join(dir, `${variant.name}.avif`));
    await resized
      .clone()
      .webp({ quality: 78, effort: 5 })
      .toFile(path.join(dir, `${variant.name}.webp`));
  }

  const desktopImage = extract(desktop).resize({
    width: DESKTOP.width,
    height: DESKTOP.height,
  });
  let jpeg;
  for (let quality = 82; quality >= 50; quality -= 4) {
    jpeg = await desktopImage
      .clone()
      .jpeg({ quality, mozjpeg: true, progressive: true })
      .toBuffer();
    if (jpeg.length < DESKTOP.maxBytes) break;
  }
  if (jpeg.length >= DESKTOP.maxBytes) {
    fail(
      `backdrop "${entry.id}": desktop.jpg stays above ${DESKTOP.maxBytes} bytes even at quality 50.`,
    );
  }
  writeFileSync(path.join(dir, "desktop.jpg"), jpeg);

  const placeholder = await extract(wide)
    .resize({ width: PLACEHOLDER_WIDTH })
    .blur(1.2)
    .webp({ quality: 40 })
    .toBuffer();
  // The area average reads as the photo's overall tone; sharp's histogram
  // `dominant` picks the most frequent bin, which is near black for dark foliage.
  const [r = 0, g = 0, b = 0] = await source
    .clone()
    .resize({ width: 1, height: 1, fit: "fill" })
    .removeAlpha()
    .raw()
    .toBuffer();
  const dominant = { r, g, b };
  const wideHeights = WIDE_WIDTHS.map((target) => Math.round(target / WIDE_ASPECT));

  return {
    color: hex(dominant),
    data: {
      color: hex(dominant),
      placeholder: `data:image/webp;base64,${placeholder.toString("base64")}`,
      position: `${percent(wide.focal.x)} ${percent(wide.focal.y)}`,
      wide: WIDE_WIDTHS.map((target, index) => ({
        width: target,
        height: wideHeights[index],
      })),
      tall: { width: TALL_WIDTH, height: Math.round(TALL_WIDTH / TALL_ASPECT) },
    },
  };
}

function renderModule(images, manifest) {
  const credits = manifest.backdrops.map(
    ({ id, status, sourceUrl, author, license, usage }) => ({
      id,
      status,
      sourceUrl,
      author,
      license,
      usage,
    }),
  );
  return `// Generated by \`pnpm assets:build\` from assets/backdrops.json; do not edit.

export const backdropImages = ${JSON.stringify(images, null, 2)} as const;

export const backdropCredits = ${JSON.stringify(credits, null, 2)} as const;
`;
}

async function main() {
  const args = process.argv.slice(2);
  const updateData = args.includes("--update-data");
  const outArg = args.find((arg) => !arg.startsWith("-"));
  if (!outArg) {
    fail(
      "pass the output directory, e.g. `pnpm assets:build <outDir>` from the repository root.",
    );
  }
  const outDir = path.resolve(process.env.INIT_CWD ?? process.cwd(), outArg);
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const ready = readyEntries(manifest);
  const sharp = await loadSharp();

  const images = {};
  for (const entry of manifest.backdrops) {
    if (!ready.includes(entry)) {
      console.warn(`assets:build: skipping "${entry.id}" (pending-source).`);
      entry.dominantColor = null;
      continue;
    }
    const result = await renderEntry(sharp, entry, outDir);
    entry.dominantColor = result.color;
    images[entry.id] = result.data;
    console.log(`assets:build: ${entry.id} -> ${path.join(outDir, entry.id)}`);
  }

  if (updateData) {
    writeFileSync(
      manifestPath,
      await format(`${JSON.stringify(manifest, null, 2)}\n`, "json"),
    );
    writeFileSync(
      generatedPath,
      await format(renderModule(images, manifest), "typescript"),
    );
  }
}

/** Formats with the repository's Prettier config so generated files pass format:check. */
async function format(source, parser) {
  const prettier = await import("prettier").catch(() =>
    fail("--update-data needs prettier (install dependencies in this repository first)."),
  );
  const options = (await prettier.resolveConfig(packageDir)) ?? {};
  return prettier.format(source, { ...options, parser });
}

const isMain =
  process.argv[1] && fileURLToPath(import.meta.url) === realpathSync(process.argv[1]);
if (isMain) {
  try {
    await main();
  } catch (error) {
    if (!(error instanceof BackdropBuildError)) throw error;
    console.error(`assets:build: ${error.message}`);
    process.exit(1);
  }
}
