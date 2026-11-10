---
version: alpha
name: Sunbeam
description: "AstraFoundry's design system: warm paper and ink, one vivid yellow for the single action or result, motion-blurred natural photographs under one solid focus surface, concentric corners, and motion that plays once and rests."
colors:
  yellow-100: "#fff3c2"
  yellow-300: "#ffda47"
  yellow-500: "#ffcc00"
  yellow-700: "#8a6700"
  ink-50: "#faf8f5"
  ink-100: "#efece6"
  ink-200: "#dfdad3"
  ink-300: "#c0b9af"
  ink-400: "#988f86"
  ink-500: "#6c6660"
  ink-700: "#38322e"
  ink-800: "#221e1b"
  ink-900: "#14110f"
  background: "{colors.ink-50}"
  foreground: "{colors.ink-900}"
  card: "#ffffff"
  card-foreground: "{colors.ink-900}"
  popover: "#ffffff"
  popover-foreground: "{colors.ink-900}"
  primary: "{colors.yellow-500}"
  primary-foreground: "{colors.ink-900}"
  secondary: "{colors.ink-100}"
  secondary-foreground: "{colors.ink-700}"
  muted: "{colors.ink-100}"
  muted-foreground: "{colors.ink-500}"
  accent: "{colors.yellow-100}"
  accent-foreground: "{colors.yellow-700}"
  border: "{colors.ink-200}"
  input: "{colors.ink-200}"
  ring: "{colors.yellow-500}"
  faint: "{colors.ink-400}"
  success: "#1f9e5e"
  danger: "#e03f1f"
  info: "#335ddb"
  canvas: "#f5f3ef"
  canvas-dot: "#cec8c0"
  scrim: "#14110f"
  image-outline: "#0000001a"
  dark-background: "#090706"
  dark-foreground: "{colors.ink-50}"
  dark-card: "{colors.ink-800}"
  dark-card-foreground: "{colors.ink-50}"
  dark-popover: "{colors.ink-800}"
  dark-popover-foreground: "{colors.ink-50}"
  dark-primary: "{colors.primary}"
  dark-primary-foreground: "{colors.primary-foreground}"
  dark-secondary: "{colors.ink-700}"
  dark-secondary-foreground: "{colors.ink-50}"
  dark-muted: "{colors.ink-700}"
  dark-muted-foreground: "{colors.ink-300}"
  dark-accent: "#382d0a"
  dark-accent-foreground: "{colors.yellow-300}"
  dark-border: "#322d29"
  dark-input: "#322d29"
  dark-ring: "{colors.ring}"
  dark-faint: "{colors.ink-400}"
  dark-success: "{colors.success}"
  dark-danger: "{colors.danger}"
  dark-info: "{colors.info}"
  dark-canvas: "#110f0d"
  dark-canvas-dot: "#38322e"
  dark-scrim: "{colors.scrim}"
  dark-image-outline: "#ffffff1a"
  substrate: "#0a0907"
  substrate-surface: "#161410"
  substrate-raised: "#1f1c16"
  substrate-line: "#2d2820"
  substrate-edge: "#3a342a"
  substrate-hi: "{colors.ink-50}"
  substrate-ink: "{colors.ink-200}"
  substrate-muted: "{colors.ink-400}"
  substrate-focus: "#ffffff"
  substrate-focus-ink: "{colors.ink-900}"
  substrate-tint: "#dac6b475"
  substrate-tint-ink: "{colors.ink-50}"
  substrate-tint-muted: "#f4f1ebb8"
typography:
  headline-display:
    fontFamily: "Fraunces, Iowan Old Style, serif"
    fontSize: "96px"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  headline-lg:
    fontFamily: "Fraunces, Iowan Old Style, serif"
    fontSize: "48px"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline-md:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body-lg:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label-md:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.5
  caption:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.4
  code-md:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  none: "0px"
  xs: "2px"
  sm: "4px"
  md: "6px"
  lg: "10px"
  xl: "14px"
  2xl: "18px"
  chip: "20px"
  focus: "22px"
  3xl: "24px"
  tile: "28px"
  stage: "40px"
  full: "9999px"
spacing:
  unit: "4px"
  hairline: "1px"
  tile-inset: "8px"
  card-inset-sm: "24px"
  card-inset-md: "40px"
  card-inset-lg: "56px"
components:
  page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.body-md}"
  page-dark:
    backgroundColor: "{colors.dark-background}"
    textColor: "{colors.dark-foreground}"
    typography: "{typography.body-md}"
  caption:
    backgroundColor: "{colors.background}"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.caption}"
  caption-dark:
    backgroundColor: "{colors.dark-background}"
    textColor: "{colors.dark-muted-foreground}"
    typography: "{typography.caption}"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.3xl}"
    padding: "24px"
  card-dark:
    backgroundColor: "{colors.dark-card}"
    textColor: "{colors.dark-card-foreground}"
    rounded: "{rounded.3xl}"
    padding: "24px"
  popover:
    backgroundColor: "{colors.popover}"
    textColor: "{colors.popover-foreground}"
    rounded: "{rounded.xl}"
    padding: "8px"
  popover-dark:
    backgroundColor: "{colors.dark-popover}"
    textColor: "{colors.dark-popover-foreground}"
    rounded: "{rounded.xl}"
    padding: "8px"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "0 20px"
    height: "40px"
  button-primary-dark:
    backgroundColor: "{colors.dark-primary}"
    textColor: "{colors.dark-primary-foreground}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "0 20px"
    height: "40px"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "0 20px"
    height: "40px"
  button-secondary-dark:
    backgroundColor: "{colors.dark-secondary}"
    textColor: "{colors.dark-secondary-foreground}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "0 20px"
    height: "40px"
  chip-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-foreground}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  chip-accent-dark:
    backgroundColor: "{colors.dark-accent}"
    textColor: "{colors.dark-accent-foreground}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  well:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.code-md}"
    rounded: "{rounded.md}"
    padding: "2px 6px"
  well-dark:
    backgroundColor: "{colors.dark-muted}"
    textColor: "{colors.dark-muted-foreground}"
    typography: "{typography.code-md}"
    rounded: "{rounded.md}"
    padding: "2px 6px"
  text-field:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    height: "40px"
    padding: "0 12px"
  text-field-dark:
    backgroundColor: "{colors.dark-card}"
    textColor: "{colors.dark-foreground}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    height: "40px"
    padding: "0 12px"
  text-field-border:
    backgroundColor: "{colors.input}"
    size: "1px"
  text-field-border-dark:
    backgroundColor: "{colors.dark-input}"
    size: "1px"
  divider:
    backgroundColor: "{colors.border}"
    height: "1px"
  divider-dark:
    backgroundColor: "{colors.dark-border}"
    height: "1px"
  focus-ring:
    backgroundColor: "{colors.ring}"
    size: "2px"
  focus-ring-dark:
    backgroundColor: "{colors.dark-ring}"
    size: "2px"
  figure-line:
    backgroundColor: "{colors.faint}"
    size: "1px"
  figure-line-dark:
    backgroundColor: "{colors.dark-faint}"
    size: "1px"
  status-success:
    textColor: "{colors.success}"
    size: "14px"
  status-success-dark:
    textColor: "{colors.dark-success}"
    size: "14px"
  status-danger:
    textColor: "{colors.danger}"
    size: "14px"
  status-danger-dark:
    textColor: "{colors.dark-danger}"
    size: "14px"
  status-info:
    textColor: "{colors.info}"
    size: "14px"
  status-info-dark:
    textColor: "{colors.dark-info}"
    size: "14px"
  canvas:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.foreground}"
  canvas-dark:
    backgroundColor: "{colors.dark-canvas}"
    textColor: "{colors.dark-foreground}"
  canvas-dot:
    backgroundColor: "{colors.canvas-dot}"
    size: "2px"
  canvas-dot-dark:
    backgroundColor: "{colors.dark-canvas-dot}"
    size: "2px"
  photo-scrim:
    backgroundColor: "{colors.scrim}"
  photo-scrim-dark:
    backgroundColor: "{colors.dark-scrim}"
  image-outline:
    backgroundColor: "{colors.image-outline}"
    size: "1px"
  image-outline-dark:
    backgroundColor: "{colors.dark-image-outline}"
    size: "1px"
  backdrop-card:
    backgroundColor: "{colors.substrate}"
    textColor: "{colors.substrate-hi}"
    typography: "{typography.headline-md}"
    rounded: "{rounded.stage}"
    padding: "{spacing.card-inset-lg}"
  backdrop-focus:
    backgroundColor: "{colors.substrate-focus}"
    textColor: "{colors.substrate-focus-ink}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.focus}"
    padding: "20px 24px"
  backdrop-chip:
    backgroundColor: "{colors.substrate-tint}"
    rounded: "{rounded.chip}"
    padding: "16px 20px"
  backdrop-chip-label:
    textColor: "{colors.substrate-tint-ink}"
    typography: "{typography.body-lg}"
  backdrop-caption:
    textColor: "{colors.substrate-tint-muted}"
    typography: "{typography.headline-md}"
  stage-panel:
    backgroundColor: "{colors.substrate-surface}"
    textColor: "{colors.substrate-ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.2xl}"
  stage-raised:
    backgroundColor: "{colors.substrate-raised}"
    textColor: "{colors.substrate-muted}"
    typography: "{typography.caption}"
    rounded: "{rounded.xl}"
  stage-line:
    backgroundColor: "{colors.substrate-line}"
    height: "1px"
  stage-edge:
    backgroundColor: "{colors.substrate-edge}"
    size: "1px"
---

# Sunbeam

<!-- The front matter is generated from tokens/sunbeam.json by `pnpm tokens:build`; edit the tokens there. The prose below is written by hand. -->

## Overview

Sunbeam is AstraFoundry's design system, used by astrafoundry.si, Lyra, Arion and Telo. It should feel calm, warm and exact: a product that does real work and shows it plainly.

- **Warm ink, one yellow.** Neutrals are warm ink. {colors.primary} marks the one primary action on a screen or the result of a scene, and nothing else.
- **Photographs, not gradients.** Atmosphere comes from motion-blurred natural photographs, never from gradients, glows or noise.
- **One solid focus.** On a photograph exactly one surface is solid; everything around it is tinted, muted or cut off by the edge.
- **Concentric corners.** A rounded thing inside a rounded thing uses inner radius = outer radius − inset.
- **Motion explains, then rests.** A scene plays once when it is seen, shows action then result, and stops on the result.

The full specification, with feature tiles, 3D demonstration figures and a review checklist, is the Sunbeam agent skill at https://astrafoundry.si/design/skill.

## Colors

Light mode is the default. Every semantic color has a `dark-` twin, and every component that changes in dark mode has a `-dark` variant; the twin aliases the light value where dark mode keeps it. Switch the whole set at once, never per component.

- **Ramps.** Two ramps carry every other color: yellow ({colors.yellow-100}, {colors.yellow-300}, {colors.yellow-500}, {colors.yellow-700}) and warm ink ({colors.ink-50}, {colors.ink-100}, {colors.ink-200}, {colors.ink-300}, {colors.ink-400}, {colors.ink-500}, {colors.ink-700}, {colors.ink-800}, {colors.ink-900}). Use the semantic names below, not the ramps.
- **Paper and ink.** {colors.background} is warm paper, {colors.foreground} warm ink. {colors.card} is solid content: panels, windows, mock product UI.
- **Yellow.** {colors.primary} fills the single primary action and marks a result; {colors.ring} is the focus ring. {colors.accent} with {colors.accent-foreground} is a quiet highlight, used sparingly.
- **Quiet.** {colors.secondary} and {colors.muted} fill wells and secondary controls; {colors.muted-foreground} carries leads and captions. {colors.border} and {colors.input} are 1px hairlines; {colors.faint} is the outline of drawn figures.
- **Status.** {colors.success}, {colors.danger} and {colors.info} color icons and dots only, never running text.
- **Substrate.** {colors.substrate} and its family are an always-dark backstage that does not change with the theme: behind demos, and for everything set on a photograph. {colors.substrate-focus} is the solid focus surface, white in both modes, with {colors.substrate-focus-ink}. {colors.substrate-tint} is the translucent chip beside it.
- **Scrim.** {colors.scrim} at up to 55% opacity, fading to transparent, is the only gradient, and only behind text on a photograph.

Never write physical colors in components, never use yellow for borders, badges or links, and never color a shadow.

## Typography

Fraunces for display, IBM Plex Sans for everything else, JetBrains Mono for code. Chinese and Japanese fall back to system faces (PingFang SC, Hiragino, Noto) and use no tracking on headings.

- **Headlines.** {typography.headline-display} and {typography.headline-lg} are Fraunces at weight 400, for page and section titles only. Never bold, never italic for emphasis. The display size scales with the viewport from 48px to 96px.
- **Headings and body.** {typography.headline-md} heads blocks; {typography.body-lg} is a lead in {colors.muted-foreground}; {typography.body-md} is running text; {typography.body-sm} is dense UI.
- **Labels and captions.** {typography.label-md} for buttons and controls, {typography.caption} for captions. Nothing is set below 12px.
- Numbers that change or line up use tabular figures. Titles are balanced, paragraphs pretty, at most about 65 characters a line. Sentence case, no exclamation marks, no emoji.

## Layout

Sizes come in steps of {spacing.unit}. Lines are {spacing.hairline}: separate cells with a one-pixel gap over {colors.border} rather than borders on each cell, so lines never double and corners never break.

A backdrop card keeps one inset for every zone: {spacing.card-inset-sm} on phones, {spacing.card-inset-md} from 640px, {spacing.card-inset-lg} from 1024px. The mark sits top-left at the inset, the focus row near the vertical middle, a status line under the focus surface, and the caption bottom-left at the same inset as the mark. Nothing is centered by default; compositions read left to right, top to bottom.

A feature tile insets its art panel by {spacing.tile-inset}.

## Elevation & Depth

Depth comes from warm, two-layer shadows keyed off ink rather than neutral black: a one-pixel contact shadow and a soft spread below it, stronger in dark mode. Five levels: 1 for controls and chips, 2 for popovers, 3 for raised cards, 4 for dialogs, 5 for a window or the focus surface floating on a photograph.

Surfaces come in two materials, and a layer has one of them. The page and the window's chrome are flat: a control there is a translucent fill with no edge, gradient or shadow. A layer that floats above them, a panel, popover, menu or dialog, is raised, and so is every control in it: a faint top-to-bottom gradient, a translucent one-pixel edge, a one-pixel white highlight inside the top edge, and a contact shadow with a soft one under it. Inside a raised layer a track of choices is recessed and the choice made is its one raised face. Its segments are all as wide as the widest, so that face keeps its size wherever the choice goes. In dark mode a raised face is a lighter gray than the panel under it and its shadows are half black. The material follows the layer, never the component: the same button is flat in a toolbar and raised in a panel.

No glass: no backdrop blur, no outer glows, no colored or gradient borders. A photograph is used as it is, without a tint, blur or vignette; choose a darker photograph rather than darkening a bright one.

## Shapes

Corners are soft and concentric. The scale runs from {rounded.none}, {rounded.xs} and {rounded.sm} for marks and code to {rounded.3xl} for cards; controls and chips are {rounded.full} pills. Feature-tile grids use {rounded.tile}; stage and backdrop cards use {rounded.3xl} below 1024px and {rounded.stage} above.

Inner radius = outer radius − inset: a {rounded.tile} card with an 8px inset holds a 20px panel. When the inset is larger than the outer radius, the inner element keeps its own radius.

## Components

The component tokens are recipes: color pairs, type and shape for the parts every Sunbeam page uses. Hairline and dot entries (`divider`, `text-field-border`, `focus-ring`, `canvas-dot`, `figure-line`, `stage-line`, `stage-edge`, `image-outline`) give the color of a line or dot of that size.

- **Buttons.** `button-primary` is the one yellow action on a screen; everything else is `button-secondary` or a quiet text button. Pressing scales to 0.97 over 150ms.
- **Cards and popovers.** `card` holds solid content; `popover` floats on shadow level 2.
- **Panels.** A panel is a raised layer with {rounded.tile} corners and an 8px inset, so the 40px pills inside it nest concentrically; its corners curve continuously where the platform can draw them.
- **Fields.** `text-field` is a solid field with a `text-field-border` hairline and a `focus-ring` on keyboard focus.
- **Backdrop card.** `backdrop-card` is a motion-blurred natural photograph (on {colors.substrate} until it loads) with one `backdrop-focus` surface, `backdrop-chip` neighbors that may bleed off the edges, and a `backdrop-caption`. Because the photograph does not change with the theme, these components have no dark variant.
- **Stage.** `stage-panel` and `stage-raised` build mock product UI on the dark substrate.
- **Feature tiles and figures.** Animated feature tiles and live 3D demonstration figures follow the Sunbeam skill, sections 6 and 7.

## Motion

Four curves: ease-out `cubic-bezier(.22, 1, .36, 1)` for anything entering or moving, a spring `cubic-bezier(.34, 1.4, .64, 1)` for small things appearing, ease-in-out `cubic-bezier(.65, 0, .35, 1)` for something already on screen changing shape, and a drawer curve `cubic-bezier(.32, .72, 0, 1)`. 150ms for hover and press, 200–300ms for popovers, 250–600ms per move, under about 3s per scene. Exits are faster than entrances. Animate transform, opacity and filter only. With reduced motion, show the final frame.

## Do's and Don'ts

- Do set a card on a motion-blurred natural photograph; don't fill it with an indigo-to-violet gradient or a glow.
- Do make one surface solid and quiet the rest with tint; don't frost every element with glass blur.
- Do set captions in muted light ink at the card inset, bottom left; don't center bold white text with a drop shadow.
- Do use inner radius = outer radius − inset; don't give nested elements the radius of their container.
- Do keep one material per layer, flat chrome and raised floating panels; don't raise one toolbar button while its neighbors stay flat.
- Do size the segments of a segmented control equally, to the widest, so the chosen pill keeps its size as the choice moves; don't let it grow and shrink with each label.
- Do spend yellow on the one primary action or result; don't use it for badges, borders, icons and links at once.
- Do play a scene once when it is seen and rest on the result; don't loop, bounce or pulse forever.
- Do show a real object as shaded solids with one part lit; don't draw a wireframe, or a glossy render with labels and arrows.
- Do keep WCAG AA contrast (4.5:1) for text; don't set status colors as running text.
