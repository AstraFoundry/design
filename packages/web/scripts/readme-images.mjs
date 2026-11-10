#!/usr/bin/env node
// Renders the README's mock UI images from the built components, with the
// package's own Tailwind CSS, in Chromium:
//   pnpm --filter @astrafoundry/design build
//   node scripts/readme-images.mjs [outDir]     (default: ../../docs/images)
// Each scene is written in light and dark. It needs Playwright with Chromium
// (`npx playwright install chromium`) and network access for Google Fonts.
// The MyGo images come from MyGo's own renderer instead:
//   SUNBEAM_SNAPSHOT=../../docs/images go test ./examples/gallery  (in packages/mygo)
import { mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { compile } from "@tailwindcss/node";
import {
  Bot,
  Clock,
  Contrast,
  Download,
  Folder,
  Image as ImageIcon,
  Inbox,
  Maximize,
  Megaphone,
  MessageCircle,
  Scan,
  Search,
  Share,
  Users,
  Workflow,
} from "lucide-react";
import { createElement as h, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const root = fileURLToPath(new URL("..", import.meta.url));
const outDir = path.resolve(process.argv[2] ?? path.join(root, "../../docs/images"));
const { Button, IconButton, Panel, Segmented } = await import(
  pathToFileURL(path.join(root, "dist/ui/index.js")).href
);

const photo = (id) => pathToFileURL(path.join(root, "assets/source", `${id}.jpg`)).href;
const noop = () => {};
const icon = (Icon, size = 16) =>
  h(Icon, { size, strokeWidth: 1.75, "aria-hidden": true });

// ---------------------------------------------------------------------------
// Scenes

/** A flat product window: chrome, sidebar and content, all on the page material. */
function AppWindow() {
  const nav = [
    [Inbox, "Inbox"],
    [Bot, "Agents"],
    [Megaphone, "Campaigns", true],
    [Users, "Audiences"],
    [Workflow, "Workflows"],
    [Folder, "Assets"],
  ];
  const facts = [
    ["Type", "Nurture"],
    ["Members", "1,284"],
    ["Created", "Jan 15, 2026"],
    ["Last updated", "Mar 12, 2026"],
  ];
  const rows = [
    ["Convert to lead", "Workflow"],
    ["Demo booked", "Workflow email"],
    ["Demo engagement", "Workflow"],
    ["Spring launch", "Landing page"],
  ];
  return h(
    "div",
    {
      className:
        "absolute top-14 left-14 flex h-[560px] w-[880px] flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-5",
    },
    // Title bar: flat controls on the window's chrome.
    h(
      "div",
      { className: "flex h-16 items-center gap-2 border-b border-border px-5" },
      h(
        "div",
        { className: "mr-4 flex gap-2" },
        ["", "", ""].map((_, i) =>
          h("span", { key: i, className: "size-3 rounded-full bg-muted-foreground/30" }),
        ),
      ),
      h(
        "span",
        { className: "flex items-center gap-2 text-sm text-muted-foreground" },
        icon(Folder, 15),
        "Campaigns",
        h("span", { className: "text-faint" }, "/"),
        h("span", { className: "text-foreground" }, "Nurture campaign"),
      ),
      h("span", { className: "grow" }),
      h(IconButton, { label: "Capture", size: "md" }, icon(Scan, 18)),
      h(Button, { variant: "secondary" }, icon(MessageCircle), "Chat"),
    ),
    h(
      "div",
      { className: "flex min-h-0 grow" },
      // Sidebar: a flat fill marks the current item.
      h(
        "nav",
        { className: "flex w-52 flex-col gap-0.5 border-r border-border p-3 text-sm" },
        h(
          "div",
          {
            className:
              "mb-2 flex h-9 items-center gap-2 rounded-full bg-flat-face px-3 text-muted-foreground",
          },
          icon(Search, 15),
          "Search",
        ),
        nav.map(([Icon, label, current]) =>
          h(
            "div",
            {
              key: label,
              className: `flex h-9 items-center gap-2.5 rounded-full px-3 ${
                current
                  ? "bg-flat-face text-foreground font-medium"
                  : "text-muted-foreground"
              }`,
            },
            icon(Icon, 16),
            label,
          ),
        ),
      ),
      // Content: cards in the flow stay flat, with hairlines.
      h(
        "main",
        { className: "flex grow flex-col gap-6 p-8" },
        h(
          "div",
          null,
          h(
            "h2",
            { className: "font-display text-3xl tracking-[-0.02em]" },
            "Nurture campaign",
          ),
          h(
            "p",
            { className: "mt-1 text-sm text-muted-foreground" },
            "Warm new sign-ups until they book a demo.",
          ),
        ),
        h(
          "div",
          {
            className:
              "grid grid-cols-4 gap-px overflow-hidden rounded-2xl border border-border bg-border",
          },
          facts.map(([label, value]) =>
            h(
              "div",
              { key: label, className: "bg-card px-4 py-3" },
              h(
                "div",
                { className: "flex items-center gap-1.5 text-xs text-muted-foreground" },
                label === "Last updated" ? icon(Clock, 12) : null,
                label,
              ),
              h("div", { className: "mt-1 text-sm font-medium tabular-nums" }, value),
            ),
          ),
        ),
        h(
          "div",
          {
            className: "overflow-hidden rounded-2xl border border-border bg-card text-sm",
          },
          h(
            "div",
            {
              className:
                "flex justify-between border-b border-border bg-muted/50 px-4 py-2 text-xs text-muted-foreground",
            },
            h("span", null, "Asset"),
            h("span", null, "Type"),
          ),
          rows.map(([name, type]) =>
            h(
              "div",
              {
                key: name,
                className:
                  "flex justify-between border-b border-border px-4 py-2.5 last:border-b-0",
              },
              h("span", null, name),
              h("span", { className: "text-muted-foreground" }, type),
            ),
          ),
        ),
      ),
    ),
  );
}

/** The raised capture panel of the reference: every control in it is raised. */
function CapturePanel({ className = "" }) {
  const shots = ["field", "telo", "gladiolus", "pink-motion", "brand-hero"];
  return h(
    Panel,
    { className: `flex w-[420px] flex-col gap-2 ${className}` },
    h(
      "div",
      { className: "flex gap-2" },
      h(IconButton, { label: "Full screen" }, icon(Maximize, 18)),
      h(Button, { variant: "secondary", className: "grow" }, "Capture in portrait mode"),
      h(IconButton, { label: "Download" }, icon(Download, 18)),
    ),
    h(
      "div",
      {
        className: "relative h-52 overflow-hidden rounded-[20px] bg-cover bg-center",
        style: { backgroundImage: `url(${photo("telo")})` },
      },
      h(
        "div",
        {
          className:
            "absolute inset-x-8 top-8 bottom-0 rounded-t-xl border border-border bg-background p-3 shadow-4",
        },
        h(
          "div",
          { className: "mb-3 flex gap-1.5" },
          [0, 1, 2].map((i) =>
            h("span", {
              key: i,
              className: "size-2 rounded-full bg-muted-foreground/30",
            }),
          ),
        ),
        h("div", { className: "mb-2 h-2.5 w-2/5 rounded-full bg-muted" }),
        h("div", { className: "mb-4 h-2 w-3/5 rounded-full bg-muted" }),
        h(
          "div",
          { className: "grid grid-cols-3 gap-2" },
          [0, 1, 2].map((i) =>
            h("div", {
              key: i,
              className: "h-14 rounded-lg border border-border bg-card",
            }),
          ),
        ),
      ),
    ),
    h(
      "div",
      { className: "flex items-center gap-3" },
      h(Segmented, {
        label: "Background",
        value: "image",
        onValueChange: noop,
        iconOnly: true,
        options: [
          { value: "theme", label: "Theme", icon: icon(Contrast) },
          { value: "image", label: "Image", icon: icon(ImageIcon) },
        ],
      }),
      h(
        "div",
        { className: "flex gap-2" },
        shots.map((id, i) =>
          h("div", {
            key: id,
            className: `h-8 w-11 rounded-lg bg-cover bg-center ${
              i === 1 ? "outline-2 outline-offset-2 outline-muted-foreground" : ""
            }`,
            style: { backgroundImage: `url(${photo(id)})` },
          }),
        ),
      ),
    ),
  );
}

function Hero() {
  return h(
    "div",
    {
      className: "relative h-[680px] w-[1200px] overflow-hidden bg-cover",
      style: { backgroundImage: `url(${photo("field")})`, backgroundPosition: "50% 60%" },
    },
    h(AppWindow),
    h(CapturePanel, { className: "absolute top-[188px] right-14" }),
  );
}

/** The same controls on the page and in a panel. */
function Controls() {
  return h(
    Fragment,
    null,
    h(Button, { variant: "ghost" }, "Ghost"),
    h(IconButton, { label: "Capture" }, icon(Scan, 18)),
    h(Button, { variant: "secondary" }, "Chat"),
    h(Button, null, icon(Share), "Share"),
    h(Segmented, {
      label: "Period",
      value: "day",
      onValueChange: noop,
      options: [
        { value: "day", label: "Day" },
        { value: "week", label: "Week" },
      ],
    }),
  );
}

function Caption({ title, detail }) {
  return h(
    "div",
    { className: "mt-5" },
    h("div", { className: "font-display text-2xl tracking-[-0.01em]" }, title),
    h("div", { className: "mt-1 font-mono text-xs text-muted-foreground" }, detail),
  );
}

function Materials() {
  return h(
    "div",
    {
      className:
        "grid w-[1200px] grid-cols-2 gap-6 bg-canvas bg-dot-grid p-10 text-foreground",
    },
    h(
      "div",
      { className: "rounded-tile border border-border bg-background p-8" },
      h(
        "div",
        { "data-material": "flat", className: "flex flex-wrap items-center gap-2" },
        h(Controls),
      ),
      h(Caption, {
        title: "Flat",
        detail: "the page and its chrome · a fill, no edge, no shadow",
      }),
    ),
    h(
      "div",
      { className: "rounded-tile border border-border bg-background p-8" },
      h(Panel, { className: "flex w-fit flex-wrap items-center gap-2" }, h(Controls)),
      h(Caption, {
        title: "Raised",
        detail: "a floating layer · gradient, hairline, highlight, shadow",
      }),
    ),
  );
}

function Tile({ title, detail, children, className = "" }) {
  return h(
    "div",
    {
      className: `flex flex-col justify-between rounded-tile border border-border bg-background p-7 ${className}`,
    },
    h("div", { className: "flex flex-wrap items-center gap-3" }, children),
    h(Caption, { title, detail }),
  );
}

function Components() {
  return h(
    "div",
    {
      className:
        "grid w-[1200px] grid-cols-3 gap-5 bg-canvas bg-dot-grid p-10 text-foreground",
    },
    h(
      Tile,
      {
        title: "Button",
        detail: "primary · secondary · ghost · sm md lg",
        className: "col-span-2",
      },
      h(Button, { size: "sm" }, "Small"),
      h(Button, null, "Primary"),
      h(Button, { size: "lg" }, "Large"),
      h(Button, { variant: "secondary" }, "Secondary"),
      h(Button, { variant: "ghost" }, "Ghost"),
    ),
    h(
      Tile,
      { title: "IconButton", detail: "named by label" },
      h(IconButton, { label: "Capture", size: "sm" }, icon(Scan, 16)),
      h(IconButton, { label: "Capture" }, icon(Scan, 18)),
      h(IconButton, { label: "Capture", size: "lg" }, icon(Scan, 20)),
    ),
    h(
      Tile,
      { title: "Segmented", detail: "a radio group in a well" },
      h(Segmented, {
        label: "View",
        value: "grid",
        onValueChange: noop,
        options: [
          { value: "list", label: "List" },
          { value: "grid", label: "Grid" },
          { value: "board", label: "Board" },
        ],
      }),
    ),
    h(
      Tile,
      {
        title: "Panel",
        detail: "a raised layer · concentric 28 − 8 = 20",
        className: "col-span-2",
      },
      h(
        Panel,
        { className: "flex items-center gap-2" },
        h(IconButton, { label: "Full screen" }, icon(Maximize, 18)),
        h(Button, { variant: "secondary" }, "Capture in portrait mode"),
        h(Segmented, {
          label: "Background",
          value: "image",
          onValueChange: noop,
          iconOnly: true,
          options: [
            { value: "theme", label: "Theme", icon: icon(Contrast) },
            { value: "image", label: "Image", icon: icon(ImageIcon) },
          ],
        }),
        h(Button, null, "Save"),
      ),
    ),
  );
}

// ---------------------------------------------------------------------------
// Render

const scenes = [
  { name: "hero", component: Hero, type: "jpeg" },
  { name: "materials", component: Materials, type: "png" },
  { name: "components", component: Components, type: "png" },
];

const require = createRequire(import.meta.url);
let playwright;
for (const from of [
  import.meta.url,
  pathToFileURL(path.join(process.execPath, "../../lib/node_modules/")).href,
  "file:///opt/node22/lib/node_modules/",
]) {
  try {
    playwright = createRequire(from)("playwright");
    break;
  } catch {
    // try the next place
  }
}
if (!playwright) {
  throw new Error(
    "readme-images needs Playwright with Chromium: npx playwright install chromium",
  );
}
void require;

const compiler = await compile('@import "tailwindcss";\n@import "./styles.css";\n', {
  base: root,
  onDependency: () => {},
});
const fonts =
  "https://fonts.googleapis.com/css2?family=Fraunces:opsz@9..144&family=IBM+Plex+Sans:wght@400;500&family=JetBrains+Mono&display=block";

mkdirSync(outDir, { recursive: true });
const browser = await playwright.chromium.launch();
try {
  for (const scene of scenes) {
    const body = renderToStaticMarkup(h(scene.component));
    const candidates = [...body.matchAll(/class="([^"]+)"/g)].flatMap((m) =>
      m[1].split(/\s+/),
    );
    const css = compiler.build(candidates);
    for (const mode of ["light", "dark"]) {
      const html = `<!doctype html><html lang="en" class="${mode}"><head><meta charset="utf-8">
<link rel="stylesheet" href="${fonts}"><style>${css}
body{margin:0;min-height:0;display:inline-block}</style></head><body>${body}</body></html>`;
      const file = path.join(tmpdir(), `sunbeam-${scene.name}-${mode}.html`);
      writeFileSync(file, html);
      const page = await browser.newPage({
        viewport: { width: 1200, height: 400 },
        deviceScaleFactor: 2,
      });
      await page.goto(pathToFileURL(file).href, { waitUntil: "networkidle" });
      await page.evaluate("document.fonts.ready");
      const target = await page.$("body > *");
      const out = path.join(
        outDir,
        `${scene.name}-${mode}.${scene.type === "jpeg" ? "jpg" : "png"}`,
      );
      await target.screenshot({
        path: out,
        type: scene.type,
        ...(scene.type === "jpeg" ? { quality: 86 } : {}),
      });
      await page.close();
      console.log(path.relative(process.cwd(), out));
    }
  }
} finally {
  await browser.close();
}
