#!/usr/bin/env node
// Fails when a component exported from @astrafoundry/design/ui has no
// documentation page in Chinese and English, or a page has no demo.
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const ui = fileURLToPath(new URL("../../../packages/web/src/ui/", import.meta.url));
const pages = fileURLToPath(new URL("../content/docs/components/", import.meta.url));

/** Each documented page and the exports it covers. */
const covers = {
  button: ["Button", "IconButton", "LinkButton"],
  toggle: ["Toggle"],
  "toggle-group": ["ToggleGroup"],
  segmented: ["Segmented"],
  toolbar: ["Toolbar"],
  kbd: ["Kbd"],
  spinner: ["Spinner"],
  field: ["Field", "Label"],
  form: ["Form", "Fieldset"],
  input: ["Input"],
  "input-group": ["InputGroup"],
  textarea: ["Textarea"],
  "number-field": ["NumberField"],
  "otp-field": ["OTPField"],
  checkbox: ["Checkbox", "CheckboxGroup"],
  "radio-group": ["RadioGroup", "Radio"],
  switch: ["Switch"],
  slider: ["Slider"],
  select: ["Select"],
  combobox: ["Combobox"],
  autocomplete: ["Autocomplete"],
  calendar: ["Calendar"],
  "date-picker": ["DatePicker"],
  popover: ["Popover"],
  tooltip: ["Tooltip"],
  "preview-card": ["PreviewCard"],
  menu: ["Menu"],
  "context-menu": ["ContextMenu"],
  menubar: ["Menubar"],
  dialog: ["Dialog"],
  "alert-dialog": ["AlertDialog"],
  drawer: ["Drawer", "Sheet"],
  toast: ["ToastProvider"],
  command: ["Command"],
  tabs: ["Tabs"],
  accordion: ["Accordion"],
  collapsible: ["Collapsible"],
  breadcrumb: ["Breadcrumb"],
  pagination: ["Pagination"],
  "navigation-menu": ["NavigationMenu"],
  sidebar: ["Sidebar"],
  "scroll-area": ["ScrollArea"],
  panel: ["Panel"],
  card: ["Card"],
  alert: ["Alert"],
  badge: ["Badge", "StatusDot"],
  avatar: ["Avatar"],
  progress: ["Progress", "Meter"],
  skeleton: ["Skeleton"],
  separator: ["Separator"],
  table: ["Table"],
  empty: ["Empty"],
};

/** Root components (no prefix of another export) the docs must cover. */
const SITE = new Set([
  "Brand",
  "BrandMark",
  "ChatMessage",
  "Container",
  "LocaleList",
  "LocaleSwitch",
  "Reveal",
  "SiteFooterShell",
  "SiteHeaderShell",
  "ActorAvatar",
]);
const sources = readdirSync(ui).filter((f) => /\.tsx$/.test(f));
const exported = new Set(
  sources.flatMap((f) =>
    [
      ...readFileSync(ui + f, "utf8").matchAll(
        /^export (?:function|const) ([A-Z][A-Za-z]+)/gm,
      ),
    ].map((m) => m[1]),
  ),
);
const roots = [...exported].filter(
  (name) =>
    !SITE.has(name) &&
    ![...exported].some((other) => other !== name && name.startsWith(other)),
);
const covered = new Set(Object.values(covers).flat());
const problems = [];
const isPart = (name) =>
  [...covered].some((c) => c.startsWith(name) || name.startsWith(c));
for (const name of roots)
  if (!covered.has(name) && !isPart(name))
    problems.push(`${name} has no documentation page`);
for (const slug of Object.keys(covers)) {
  for (const file of [`${slug}.mdx`, `${slug}.en.mdx`]) {
    if (!existsSync(pages + file)) problems.push(`components/${file} is missing`);
    else if (!readFileSync(pages + file, "utf8").includes("<Demo "))
      problems.push(`components/${file} has no demo`);
  }
}
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(
  `${roots.length} components, ${Object.keys(covers).length} pages in 2 languages`,
);
