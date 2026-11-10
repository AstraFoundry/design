---
name: sunbeam
description: Sunbeam, the AstraFoundry design system. Use when building, reviewing or theming any interface, landing page, product demo, feature grid or illustration for AstraFoundry (astrafoundry.si, Lyra, Arion, Telo) or anything meant to look like them. Covers tokens, type, materials, motion-blurred backdrop cards and the layout of elements on them, animated feature tiles, 3D demonstration figures such as onboarding illustrations, motion, copy, and a do/don't checklist for review.
---

# Sunbeam

Sunbeam is quiet, warm and precise. Warm ink on paper, one yellow, photographs for atmosphere and solid surfaces for focus. The public reference is <https://astrafoundry.si/design>; this file is the same specification in one page.

## 0. Before you build

- Read the project first and build the way it already does (React, Tailwind, plain CSS, Go UI). Do not add an animation or UI library the project does not use.
- If the project depends on `@astrafoundry/design`, use it: `styles.css` for tokens, `Backdrop`, `FloatingStage`, `AppWindow`, `useInViewOnce`, `useStepTimeline`, `Button`, `IconButton`, `LinkButton`, `Panel`, `Segmented`. A MyGo app uses `github.com/AstraFoundry/design/packages/mygo/sunbeam` for the same tokens and components. Otherwise copy the token values from section 2.
- Every color is a token. No physical colors (`#fff`, `zinc-500`, `bg-white`) and no `dark:` branches in components; light and dark live in the token layer.
- Every user-facing string comes from the project's dictionary. Art and mock UI carry no untranslated copy.

## 1. Principles

1. **Warm ink, one yellow.** Neutrals are warm ink (hue 22–40). Yellow `--yellow-500` marks the one primary action on a screen or the result of a scene, nothing else.
2. **Photographs, not gradients.** Atmosphere comes from motion-blurred natural photographs. Never indigo-to-violet washes, mesh gradients, noise blobs or glows.
3. **One solid focus.** On a photograph, exactly one surface is solid and crisp. Everything around it is quieter: tinted, muted or cut off by the edge.
4. **Concentric corners.** A rounded thing inside a rounded thing uses `inner radius = outer radius − inset`.
5. **Hairlines and soft warm shadows.** 1 px lines in `--border`; shadows are two layers keyed off ink-900, never neutral black, never colored.
6. **Motion explains, then rests.** A scene plays once when it is seen, shows action → result, and stops on the result.
7. **Say it once.** No copy that repeats a title, icon or state. No kickers over headings.

## 2. Tokens

Values are generated from `tokens/sunbeam.json` (the single source). Scales and substrate are mode-invariant; semantic and art tokens change in dark mode (the `.dark` class on `<html>`). The same tokens, with type, radii, spacing and component recipes, ship as a standard DESIGN.md at https://astrafoundry.si/design.md; every component pair in it meets WCAG AA contrast.

<!-- tokens:start -->

**Scales**

| Token          | Value              |
| -------------- | ------------------ |
| `--yellow-100` | `hsl(48 100% 88%)` |
| `--yellow-300` | `hsl(48 100% 64%)` |
| `--yellow-500` | `hsl(48 100% 50%)` |
| `--yellow-700` | `hsl(45 100% 27%)` |
| `--ink-50`     | `hsl(40 30% 97%)`  |
| `--ink-100`    | `hsl(38 22% 92%)`  |
| `--ink-200`    | `hsl(36 16% 85%)`  |
| `--ink-300`    | `hsl(34 12% 72%)`  |
| `--ink-400`    | `hsl(32 8% 56%)`   |
| `--ink-500`    | `hsl(30 6% 40%)`   |
| `--ink-600`    | `hsl(28 8% 30%)`   |
| `--ink-700`    | `hsl(26 10% 20%)`  |
| `--ink-800`    | `hsl(24 12% 12%)`  |
| `--ink-900`    | `hsl(22 14% 7%)`   |

**Substrate (always dark, mode-invariant)**

| Token                    | Value                    |
| ------------------------ | ------------------------ |
| `--substrate`            | `hsl(40 17.6% 3.3%)`     |
| `--substrate-surface`    | `hsl(40 15.8% 7.5%)`     |
| `--substrate-raised`     | `hsl(40 17% 10.4%)`      |
| `--substrate-line`       | `hsl(37 17% 15.1%)`      |
| `--substrate-edge`       | `hsl(38 16% 19.6%)`      |
| `--substrate-hi`         | `var(--ink-50)`          |
| `--substrate-ink`        | `var(--ink-200)`         |
| `--substrate-muted`      | `var(--ink-400)`         |
| `--substrate-focus`      | `hsl(0 0% 100%)`         |
| `--substrate-focus-ink`  | `var(--ink-900)`         |
| `--substrate-tint`       | `hsl(28 34% 78% / 0.46)` |
| `--substrate-tint-ink`   | `var(--ink-50)`          |
| `--substrate-tint-muted` | `hsl(36 30% 94% / 0.72)` |

**Semantic**

| Token                    | Light                                                                 | Dark                                                           |
| ------------------------ | --------------------------------------------------------------------- | -------------------------------------------------------------- |
| `--background`           | `var(--ink-50)`                                                       | `hsl(22 18% 3%)`                                               |
| `--foreground`           | `var(--ink-900)`                                                      | `var(--ink-50)`                                                |
| `--card`                 | `hsl(0 0% 100%)`                                                      | `var(--ink-800)`                                               |
| `--card-foreground`      | `var(--ink-900)`                                                      | `var(--ink-50)`                                                |
| `--popover`              | `hsl(0 0% 100%)`                                                      | `var(--ink-800)`                                               |
| `--popover-foreground`   | `var(--ink-900)`                                                      | `var(--ink-50)`                                                |
| `--primary`              | `var(--yellow-500)`                                                   | same                                                           |
| `--primary-foreground`   | `var(--ink-900)`                                                      | same                                                           |
| `--secondary`            | `var(--ink-100)`                                                      | `var(--ink-700)`                                               |
| `--secondary-foreground` | `var(--ink-700)`                                                      | `var(--ink-50)`                                                |
| `--muted`                | `var(--ink-100)`                                                      | `var(--ink-700)`                                               |
| `--muted-foreground`     | `var(--ink-500)`                                                      | `var(--ink-300)`                                               |
| `--accent`               | `var(--yellow-100)`                                                   | `hsl(45 70% 13%)`                                              |
| `--accent-foreground`    | `var(--yellow-700)`                                                   | `var(--yellow-300)`                                            |
| `--border`               | `var(--ink-200)`                                                      | `hsl(26 10% 18%)`                                              |
| `--input`                | `var(--ink-200)`                                                      | `hsl(26 10% 18%)`                                              |
| `--ring`                 | `var(--yellow-500)`                                                   | same                                                           |
| `--faint`                | `var(--ink-400)`                                                      | `var(--ink-400)`                                               |
| `--success`              | `hsl(150 67% 37%)`                                                    | same                                                           |
| `--danger`               | `hsl(10 76% 50%)`                                                     | same                                                           |
| `--info`                 | `hsl(225 70% 53%)`                                                    | same                                                           |
| `--canvas`               | `hsl(40 24% 95%)`                                                     | `hsl(24 14% 6%)`                                               |
| `--canvas-dot`           | `hsl(34 12% 78%)`                                                     | `hsl(26 10% 20%)`                                              |
| `--scrim`                | `hsl(22 14% 7%)`                                                      | same                                                           |
| `--image-outline`        | `rgb(0 0 0 / 0.1)`                                                    | `rgb(255 255 255 / 0.1)`                                       |
| `--shadow-1`             | `0 1px 0 rgb(20 18 14 / 0.04), 0 1px 2px rgb(20 18 14 / 0.06)`        | `0 1px 0 rgb(0 0 0 / 0.3), 0 1px 2px rgb(0 0 0 / 0.4)`         |
| `--shadow-2`             | `0 1px 0 rgb(20 18 14 / 0.04), 0 4px 10px -2px rgb(20 18 14 / 0.08)`  | `0 1px 0 rgb(0 0 0 / 0.3), 0 4px 10px -2px rgb(0 0 0 / 0.5)`   |
| `--shadow-3`             | `0 2px 0 rgb(20 18 14 / 0.04), 0 10px 24px -4px rgb(20 18 14 / 0.1)`  | `0 2px 0 rgb(0 0 0 / 0.3), 0 10px 24px -4px rgb(0 0 0 / 0.55)` |
| `--shadow-4`             | `0 4px 0 rgb(20 18 14 / 0.04), 0 20px 48px -8px rgb(20 18 14 / 0.14)` | `0 4px 0 rgb(0 0 0 / 0.3), 0 20px 48px -8px rgb(0 0 0 / 0.6)`  |
| `--shadow-5`             | `0 8px 0 rgb(20 18 14 / 0.04), 0 32px 64px -12px rgb(20 18 14 / 0.2)` | `0 8px 0 rgb(0 0 0 / 0.3), 0 32px 64px -12px rgb(0 0 0 / 0.7)` |

**Art (feature-tile scenes)**

| Token                 | Light                                   | Dark                                |
| --------------------- | --------------------------------------- | ----------------------------------- |
| `--art-cell`          | `var(--card)`                           | `hsl(24 10% 8.5%)`                  |
| `--art-cell-hover`    | `hsl(40 20% 97.5%)`                     | `hsl(24 10% 10%)`                   |
| `--art-panel`         | `hsl(40 24% 97.6%)`                     | `hsl(24 10% 11%)`                   |
| `--art-panel-hover`   | `hsl(40 16% 95.6%)`                     | `hsl(24 10% 12.5%)`                 |
| `--art-ring`          | `rgb(20 18 14 / 0.07)`                  | `rgb(255 255 255 / 0.06)`           |
| `--art-ring-hover`    | `rgb(20 18 14 / 0.09)`                  | `rgb(255 255 255 / 0.08)`           |
| `--art-texture`       | `rgb(20 18 14 / 0.055)`                 | `rgb(255 255 255 / 0.04)`           |
| `--art-bar`           | `var(--ink-100)`                        | `hsl(26 8% 18%)`                    |
| `--art-bar-strong`    | `var(--ink-200)`                        | `hsl(26 8% 24%)`                    |
| `--art-data`          | `var(--ink-300)`                        | `hsl(30 6% 36%)`                    |
| `--art-window`        | `hsl(0 0% 100%)`                        | `hsl(24 9% 15%)`                    |
| `--art-window-ring`   | `rgb(20 18 14 / 0.06)`                  | `rgb(255 255 255 / 0.06)`           |
| `--art-window-shadow` | `0 8px 20px -10px rgb(20 18 14 / 0.25)` | `0 8px 20px -10px rgb(0 0 0 / 0.6)` |
| `--art-strip`         | `hsl(38 20% 94%)`                       | `hsl(24 10% 10.5%)`                 |
| `--art-field`         | `hsl(40 22% 95.5%)`                     | `hsl(24 9% 18%)`                    |
| `--art-accent`        | `var(--yellow-500)`                     | `var(--yellow-500)`                 |
| `--art-accent-ink`    | `var(--yellow-700)`                     | `var(--yellow-300)`                 |
| `--art-ink`           | `var(--ink-900)`                        | `var(--ink-50)`                     |
| `--art-glyph`         | `var(--ink-500)`                        | `var(--ink-300)`                    |

**Figure (3D demonstration figures; mix amounts, 0–1)**

| Token             | Light  | Dark   |
| ----------------- | ------ | ------ |
| `--figure-shade`  | `0.16` | `0.5`  |
| `--figure-well`   | `0.1`  | `0.5`  |
| `--figure-halo`   | `0.08` | `0.22` |
| `--figure-lift`   | `0`    | `0.05` |
| `--figure-soften` | `0`    | `0.35` |

**Material (flat and raised surfaces; see Materials)**

| Token                        | Light                                                                                                           | Dark                                                                                                 |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `--flat-face`                | `rgb(20 18 14 / 0.05)`                                                                                          | `rgb(255 255 255 / 0.07)`                                                                            |
| `--flat-face-hover`          | `rgb(20 18 14 / 0.08)`                                                                                          | `rgb(255 255 255 / 0.1)`                                                                             |
| `--flat-face-pressed`        | `rgb(20 18 14 / 0.11)`                                                                                          | `rgb(255 255 255 / 0.13)`                                                                            |
| `--flat-thumb`               | `hsl(0 0% 100%)`                                                                                                | `hsl(26 6% 24%)`                                                                                     |
| `--raised-face-from`         | `hsl(0 0% 100%)`                                                                                                | `hsl(30 4% 29%)`                                                                                     |
| `--raised-face-to`           | `hsl(40 12% 95%)`                                                                                               | `hsl(30 4% 23.5%)`                                                                                   |
| `--raised-face-pressed`      | `hsl(40 10% 93.5%)`                                                                                             | `hsl(30 4% 21.5%)`                                                                                   |
| `--raised-edge`              | `rgb(20 18 14 / 0.08)`                                                                                          | `rgb(0 0 0 / 0.42)`                                                                                  |
| `--raised-highlight`         | `rgb(255 255 255 / 0.95)`                                                                                       | `rgb(255 255 255 / 0.15)`                                                                            |
| `--raised-shadow`            | `0 1px 1px rgb(20 18 14 / 0.04), 0 2px 6px -1px rgb(20 18 14 / 0.08)`                                           | `0 1px 1px rgb(0 0 0 / 0.2), 0 2px 6px -1px rgb(0 0 0 / 0.45)`                                       |
| `--raised-shadow-pressed`    | `0 1px 1px rgb(20 18 14 / 0.04)`                                                                                | `0 1px 1px rgb(0 0 0 / 0.2)`                                                                         |
| `--raised-primary-from`      | `hsl(48 100% 60%)`                                                                                              | same                                                                                                 |
| `--raised-primary-to`        | `hsl(46 100% 49%)`                                                                                              | same                                                                                                 |
| `--raised-primary-edge`      | `rgb(110 70 0 / 0.16)`                                                                                          | `rgb(0 0 0 / 0.35)`                                                                                  |
| `--raised-primary-highlight` | `rgb(255 255 255 / 0.5)`                                                                                        | `rgb(255 255 255 / 0.4)`                                                                             |
| `--panel-face-from`          | `hsl(40 14% 97.6%)`                                                                                             | `hsl(30 3% 22.5%)`                                                                                   |
| `--panel-face-to`            | `hsl(40 10% 95.8%)`                                                                                             | `hsl(30 3% 20.5%)`                                                                                   |
| `--panel-edge`               | `rgb(20 18 14 / 0.07)`                                                                                          | `rgb(0 0 0 / 0.4)`                                                                                   |
| `--panel-highlight`          | `rgb(255 255 255 / 0.8)`                                                                                        | `rgb(255 255 255 / 0.12)`                                                                            |
| `--panel-shadow`             | `0 1px 2px rgb(20 18 14 / 0.06), 0 12px 32px -8px rgb(20 18 14 / 0.16), 0 32px 64px -16px rgb(20 18 14 / 0.14)` | `0 1px 2px rgb(0 0 0 / 0.3), 0 12px 32px -8px rgb(0 0 0 / 0.5), 0 32px 64px -16px rgb(0 0 0 / 0.45)` |
| `--well-face`                | `rgb(20 18 14 / 0.055)`                                                                                         | `rgb(255 255 255 / 0.06)`                                                                            |
| `--well-shadow`              | `inset 0 1px 2px rgb(20 18 14 / 0.06)`                                                                          | `inset 0 1px 2px rgb(0 0 0 / 0.25)`                                                                  |

<!-- tokens:end -->

Tailwind v4 utilities map 1:1: `bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground`, `border-border`, `bg-primary`, `bg-substrate`, `text-substrate-hi`, `bg-substrate-focus`, `bg-substrate-tint`, `shadow-1` … `shadow-5`.

## 3. Typography

| Role    | Family             | Weight  | Size / leading                    | Tracking |
| ------- | ------------------ | ------- | --------------------------------- | -------- |
| Hero    | Fraunces (display) | 400     | clamp(3rem, 7vw, 6rem) / 0.98     | −0.03em  |
| Title   | Fraunces           | 400     | 36–48px / 1.05                    | −0.02em  |
| Heading | IBM Plex Sans      | 500     | 20–24px / 1.3                     | −0.01em  |
| Lead    | IBM Plex Sans      | 400     | 18–20px / 1.6, `muted-foreground` | 0        |
| Body    | IBM Plex Sans      | 400     | 16px / 1.6                        | 0        |
| Small   | IBM Plex Sans      | 400–500 | 14px / 1.5                        | 0        |
| Caption | IBM Plex Sans      | 400     | 12–13px / 1.4 (12px is the floor) | 0        |
| Code    | JetBrains Mono     | 400     | 13–14px / 1.6                     | 0        |

- Display serif is for page and section titles only, at weight 400. Never bold it, never italicize for emphasis.
- Numbers that change or line up use `tabular-nums`.
- Chinese and Japanese fall back to system faces by `<html lang>` (PingFang SC / Hiragino / Noto). Headings in zh and ja use 0 tracking; Japanese breaks with `word-break: auto-phrase`.
- `text-balance` on titles, `text-pretty` on paragraphs, at most ~65ch per line.

## 4. Materials

**Radii** — `xs 2`, `sm 4`, `md 6`, `lg 10`, `xl 14`, `2xl 18`, `3xl 24` px; pills are fully rounded. Stage cards are 24px below 1024px wide and 40px above. Tile grids are 28px.

**Concentric rule** — inner radius = outer radius − inset. A 28px card with an 8px inset holds a 20px panel; a 40px card with a 24px inset holds a 16px element. When the inset is larger than the outer radius, the inner element keeps its own radius.

**Lines** — 1px `--border`. Separate cells with a 1px gap over the border color, not with per-cell borders, so lines never double and corners never break.

**Shadows** — `shadow-1` controls and chips, `shadow-2` popovers, `shadow-3` raised cards, `shadow-4` dialogs, `shadow-5` a window or the focus surface floating on a photograph.

**Surfaces**

| Surface    | Use                                                             |
| ---------- | --------------------------------------------------------------- |
| background | The page. Warm paper in light, warm near-black in dark.         |
| card       | Solid content: panels, windows, mock product UI.                |
| focus      | The one solid surface on a photograph. White in both modes.     |
| muted      | Wells, hover fills, inline code.                                |
| substrate  | Always dark backstage behind demos when no photo is licensed.   |
| tint       | Secondary chips set on a photograph. Translucent fill, no blur. |

Forbidden: `backdrop-filter` glass, outer glows, colored or gradient borders, gradient text, colored shadows. Two gradients exist: the ink scrim (`--scrim` at ≤ 55% fading to transparent) under text on a photograph, and the faint top-to-bottom face of the raised material below (one hue, a few percent of lightness).

**Flat and raised** — A layer has one material, and everything in it takes that material. Material follows elevation, not the component: the same button is flat in a toolbar and raised in a panel.

|                  | Flat                                                                                 | Raised                                                                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Where            | The page and the window's chrome: title bars, toolbars, sidebars, cards in the flow. | A layer floating above them (panel, popover, menu, dialog, HUD) and every control inside it.                                                                   |
| Control face     | One fill, `--flat-face` (translucent ink). No edge, no shadow, no gradient.          | `--raised-face-from` → `--raised-face-to` top to bottom, a 1px translucent `--raised-edge`, a 1px `--raised-highlight` inside the top edge, `--raised-shadow`. |
| Hover / press    | `--flat-face-hover` / `--flat-face-pressed`.                                         | The gradient's foot lightens / the face goes solid `--raised-face-pressed` and drops to `--raised-shadow-pressed`. Both scale to 0.97.                         |
| Track of choices | `--flat-face`; the choice made is a solid `--flat-thumb`.                            | Recessed: `--well-face` with `--well-shadow`; the choice made is the one raised face in it, the others have no face.                                           |
| The layer itself | No surface of its own, or a `card` with a hairline.                                  | `--panel-face-*` gradient, `--panel-edge`, `--panel-highlight`, three-layer `--panel-shadow`; `tile` radius with an 8px inset.                                 |
| Dark mode        | Translucent white fills.                                                             | Faces a lighter gray than the panel under them, near-black edges, a white highlight at about 15%, half-black shadows.                                          |

1. Never mix materials in one layer. A flat part inside a panel opens a flat layer of its own.
2. Raise controls and floating layers only: never text, content, page cards or a whole window. Images, previews and thumbnails take no material; a chosen thumbnail shows a ring at an offset, not a face.
3. A raised layer's corners are concentric with its controls: `tile` 28px − 8px inset = 20px, the radius of a 40px pill. They curve continuously where the platform draws it (`corner-shape: squircle` on the web, macOS in MyGo); pills stay pills.
4. In the dark, a face is lighter than what it sits on and its shadow is darker. A darker face, or a light glow, reads as a hole.
5. A layer may take the other scheme from the page, as a dark panel over a light page: give the panel its own scheme rather than restyling its controls.
6. A selection that moves keeps its shape. The segments of a segmented control, and the items of any set whose chosen one carries a thumb or pill, are all as wide as the widest, so the raised face never resizes or shifts its balance as the choice moves. Lengthen the narrow labels' room, not the wide labels' text.

On the web: `Panel`, or `data-material="raised"` on any layer, and the `material-face`, `material-face-primary`, `material-thumb`, `material-well`, `material-panel` and `rounded-continuous-*` utilities; `Button`, `IconButton` and `Segmented` follow their layer. In MyGo: `sunbeam.Panel`, `sunbeam.Layer`, and `sunbeam.Face`, `PrimaryFace`, `Thumb`, `Well` and `PanelSurface` for elements of your own.

## 5. Backdrop cards

A backdrop card is a rounded card whose base is a motion-blurred natural photograph, with a few interface elements laid out on it. It is the signature surface of Sunbeam: heroes, product demos, social cards, feature highlights.

**The photograph**

- Natural subjects (flowers, foliage, grass, night sky) with real camera motion: pans, swirls, long exposures. Never a stock gradient, never AI-generated abstraction, never a screenshot.
- From the backdrop manifest (`packages/web/assets/backdrops.json`): licensed, credited, rendered to AVIF and WebP, never hotlinked. The dominant color and a blur placeholder show until it loads.
- Used as is: no tint layer, no blur filter, no vignette. Choose a darker photo instead of darkening a bright one; add the ink scrim only behind text.

**Anatomy** (one inset `p` shared by every zone: 24px on phones, 48–64px from 1024px)

1. **Mark** — top-left at `p`. A 40–48px `substrate-focus` tile (radius ≈ 22% of its size) holding the dark glyph, then the wordmark in `substrate-hi`, sans 500, 28–36px.
2. **Focus row** — a single horizontal row near the vertical middle (45–55%). It holds exactly one solid surface: `bg-substrate-focus`, `text-substrate-focus-ink` (white and ink in both modes, because the photograph does not change with the theme), radius 20–24px, `shadow-5`, body text 18–22px. The neighbors on either side are tint chips (`substrate-tint` fill, `substrate-tint-ink` label, `substrate-tint-muted` second line, radius 16–20px, same height as the solid surface). Chips may bleed off the left or right edge to show that the row continues.
3. **Status** — directly under the solid surface, aligned to its left edge, 12–16px below it: a small line icon and a short present-tense status in `substrate-hi` (a shimmer while working is allowed).
4. **Caption** — bottom-left at `p`, the same left edge as the mark. Sans 400, 24–32px, leading 1.35, `substrate-tint-muted`, at most two lines and ~40ch.

**Rules**

- One solid surface per card. Never two white bubbles, never a card inside the card.
- The mark and the caption share the left inset. The focus row may start at its own column, but bleeding chips ignore the inset entirely.
- Nothing is centered by default; the composition reads left to right, top to bottom.
- No buttons inside the art. Real actions sit outside the card or below the caption as real controls.
- Art is decorative or one image: `inert`, `aria-hidden` or `role="img"` with an `aria-label`. Real headings and captions stay real text.

## 6. Feature tiles

A feature grid where every tile carries a tiny animated scene that shows what the feature does.

**Grid** — one card, radius 28px, cells separated by 1px hairlines (a 1px grid gap over `--border`), a faint `--border` ring and `shadow-1`. Cells use `--art-cell`.

**Art panel** — inset 8px from the cell edge, radius 20px (28 − 8). Fill `--art-panel`, inner ring `box-shadow: inset 0 0 0 1px var(--art-ring)`, texture `repeating-linear-gradient(-45deg, var(--art-texture) 0 1px, transparent 1px 7px)`. The scene sits centered, about 126 × 118px.

**Scene parts** — abstract wireframes only: no screenshots, no real text, at most one small icon where something must be recognized.

- Text bars: body 4px tall, radius 2px, `--art-bar`; heading 5px, `--art-bar-strong`; widths vary between 34 and 92px.
- Mini windows and cards: `--art-window`, radius 9px, `box-shadow: 0 0 0 1px var(--art-window-ring), var(--art-window-shadow)`. Tab strip 20px tall in `--art-strip`; tabs 16px with 6px top corners, the active tab in `--art-window`; favicons 10px.
- Inner surfaces such as fields and charts: `--art-field`. Secondary data: `--art-data`. Accent `--art-accent` (yellow) is used only on the result.

**Icon chip** — top-left of each tile, 32px, radius 10px, 1px `--border`, `--card` fill, `shadow-1`, a line glyph in `--art-glyph`.

**Text** — title in sans 500 16px `--art-ink`, one line of description in `muted-foreground`. Both outside the art.

**Scene motion** — one idea per tile in 2–4 moves (click → a window opens; change here → the other side syncs). Movement `cubic-bezier(.22,1,.36,1)`, appearing `cubic-bezier(.34,1.4,.64,1)`, 250–600ms per move, the whole scene done in about 3s. When the tile plays, the chip glyph redraws stroke by stroke, then rests solid.

**Playback**

- Resting styles are the final frame. Keyframes only say where things come from (`animation-fill-mode: both`), so reduced motion shows the result and an interrupted play never jumps.
- The art panel fades in (opacity, `translateY(6px)`, `scale(.97)` to none) the first time its tile plays.
- Play once in view: at about 70% visible, wait ~200ms, then play. Tiles that enter together start ~250ms apart in reading order. Stop on the final frame.
- One `data-played` attribute drives every animation in a tile. To replay: remove it, force a reflow, add it back.
- Hover (mouse only) or keyboard focus replays: blur the final frame out over ~160ms (`blur(6px)`, opacity 0), restart under the blur, clear it. Never restart a play that has not finished.
- Hover: the cell goes to `--art-cell-hover`, the panel to `--art-panel-hover` with `--art-ring-hover`, the chip grows 32 → 36px from its top-left corner and its glyph turns `--art-ink`.
- Touch: a tap follows the tile's link; nothing depends on hover.
- `prefers-reduced-motion: reduce`: no animation, final frame.
- Art is `aria-hidden`; translatable text stays outside it. Check light, dark, first play, hover replay, keyboard focus, reduced motion and phone width in a real browser.

## 7. Demonstration figures (3D)

A demonstration figure is a live 3D drawing of a real object that shows the reader what to do, such as Arion's onboarding laptop that turns round, opens its lid and closes in on the dictation key. It takes the place of the backdrop photograph in a step's art pane, one figure per step.

| Step          | Object             | Subject                 | Own move on arrival         | Response                                        |
| ------------- | ------------------ | ----------------------- | --------------------------- | ----------------------------------------------- |
| Dictation key | Laptop             | The chosen key          | Lid opens to 112°           | Select: the camera glides; press: the key sinks |
| Microphone    | Desk microphone    | Level meter on the base | Capsule tilts up 30°        | Live level                                      |
| Model         | Cartridge and dock | Light bar on the dock   | Cartridge seats in its slot | Progress                                        |
| Accessibility | Padlock            | Shackle                 | None                        | Two states: open and shut                       |

Pick the object the step is about (a key, a microphone). When the step has no object of its own, as a permission does, use one familiar object whose single motion is the outcome, such as a padlock that opens.

**Drawing** (the Anatomy skill's kit rules; Arion ports them in `ui/shared/iso`)

- Model the real object in world units of about a millimetre, with its real proportions and the platform's real layout (fn, ⌘ and ⌥ on a Mac keyboard; Alt, Menu and Ctrl on Windows). Engraved legends only where the real part carries one. No labels, arrows, callouts or dimension lines in the drawing.
- Camera: azimuth 45° and elevation 30° by default; look higher (Arion's laptop: 32° and 40°) to see into something open. Fit the whole object with 16px to spare on each side before closing in.
- Solids, not wireframes: every face filled in paper (`--card`), sides shaded by how they face a light from the viewer's left, mixed toward `--scrim` by `--figure-shade` and lighter on top. Tones step in twelfths, so a turning solid never jumps between shades.
- One outline in `--faint` where a face turns away, a crease in `--border` where a top meets a side. Lines are 0.6px in the overview and 1px once the camera has closed in.
- Paint back to front by depth. Parts that can be in front of or behind each other (the lid and the keys) swap order by which face of the lid shows.
- A soft contact halo under the base: two faint rings of `--scrim` at `--figure-halo`.
- At most one lit part, the subject. A lit material (a key, a shackle) mixes its top 24% toward `--primary` and its sides 30%, with its edge and legend in `--accent-foreground`. A part that emits light (a meter, a progress bar) shows `--primary` itself and lights only as far as its value; unlit, it is a recess. Everything else stays in paper and ink; screens use `--substrate`.
- Round parts are drawn as round: a cylinder is a prism of many sides, and a bent bar (a shackle) is its centre line stroked at the bar's projected width, outlined, with a lit band moved toward the light. Rings round a cylinder (a grille) draw only their half that faces the viewer.

**Choreography**

- Every arrival uses the same three slots, each a cubic ease-in-out of about one second: turn to face the reader (250–1350ms), the object's own move (650–1650ms), close in on the subject (1000–2100ms). Done by 2.1s, then it rests. The laptop turns 180° because its back hides the keyboard; a small object turns 90°. A figure without a move of its own leaves the middle slot empty rather than inventing one.
- Close in only as far as the subject needs: the laptop until one key pitch spans 46px, the microphone and dock by 1.1–1.4×, and a figure whose subject is the whole object (the padlock) only re-centres. The overview and the resting pose both keep the whole object and its halo in the pane, including where a moving part ends up.
- Zoom evenly in scale ratio (interpolate the logarithm of the scale), and move the focus from the overview to the subject with the zoom.
- Choosing another subject glides the camera to it (420ms, no overshoot) while pulling back to 78% of the zoom and closing in again (out by 180ms with an ease-out, back by 620ms with an ease-in-out).
- Feedback is physical: a press sinks the subject by its real travel, 80ms down with an ease-out, held to 480ms, back up by 700ms; its top darkens a quarter of the way toward its edge while down.
- Parts meet along their real axis: a cartridge comes straight down into its slot, a lid turns on its hinge. No overshoot.

**Responses.** Each step answers the reader with one physical response.

- Select: the camera glides to the new subject (above).
- Press: the subject sinks by its real travel (above).
- Live level: a meter lights whole segments, never part of one, rising within 40ms and falling over 240ms so speech reads and silence settles. An open microphone keeps its first segment lit. Nothing moves without input: no idle breathing.
- Progress: a light bar fills in proportion to what has arrived, easing to each new amount over 240ms and never moving back. Full means done, and then it holds still.
- Two states: the moving part travels its real path, first out of its seat (the shackle rises 10mm in 160ms with an ease-out), then round its pivot (180° in 420ms with an ease-in-out), and back along the same path in reverse. Switching mid-way continues from where the part is.
- Reduced motion shows the final pose at once, and a two-state part jumps to its state. A live level and progress are information, so they still show. The text beside the figure never moves while it animates.

**Rendering and access**

- Draw only when the pose changes; a figure at rest costs nothing.
- Native (MyGo): rasterize on the CPU into one bitmap, never one path per face (each path takes an atlas mask that text shares). Web: one `<canvas>`, device ratio capped at 2. Aim for under 10ms a frame at 2×.
- The figure is one image with a label that names what it shows. Every control (key picker, replay, press) sits outside it.

## 8. Motion

| Token           | Curve                            | Use                                         |
| --------------- | -------------------------------- | ------------------------------------------- |
| `--ease-out`    | `cubic-bezier(.22, 1, .36, 1)`   | Anything entering or moving.                |
| `--ease-spring` | `cubic-bezier(.34, 1.4, .64, 1)` | Small things appearing (chips, bubbles).    |
| `--ease-in-out` | `cubic-bezier(.65, 0, .35, 1)`   | Something already on screen changing shape. |
| `--ease-drawer` | `cubic-bezier(.32, .72, 0, 1)`   | Sheets and drawers.                         |

- 150ms for hover and press (`scale(.97)` on press), 200–300ms for popovers, 250–600ms per scene move, under ~3s per scene.
- Play when seen, once. Rest on the result. Loops are only for real waiting (a shimmer while working).
- Exits are faster than entrances. Animate `transform`, `opacity` and `filter` only.
- Reduced motion shows the final frame and hides replay buttons.

## 9. Copy

- Sentence case. No exclamation marks, no emoji, no "not just X — it's Y".
- Titles say what it is; a lead adds what the title cannot. Never both say the same thing.
- The brand is "AstraFoundry", one word, in every language.
- Status lines are short and present tense ("Working…", "Synced").

## 10. Do and don't

| Do                                                                  | Don't                                                        |
| ------------------------------------------------------------------- | ------------------------------------------------------------ |
| Set the card on a motion-blurred natural photograph.                | Fill it with an indigo-to-violet gradient or a glow.         |
| Make one surface solid; quiet the rest with tint.                   | Frost every element with glass blur.                         |
| Set captions in muted light ink at the card inset, bottom-left.     | Center bold white text with a drop shadow.                   |
| Use inner radius = outer radius − inset.                            | Give nested elements the same radius as their container.     |
| Keep one material per layer: flat chrome, raised floating panels.   | Raise a toolbar button while its neighbors stay flat.        |
| Size the segments of a choice equally, to the widest.               | Let the selected pill grow and shrink with each label.       |
| Spend yellow on the one primary action or result.                   | Use yellow for badges, borders, icons and links at once.     |
| Play a scene once when it is seen and rest on the result.           | Loop, bounce or pulse forever.                               |
| Show a real object as shaded solids with one part lit.              | Draw a wireframe, or a glossy render with labels and arrows. |
| Move a figure's part along its real path, or light it by real data. | Fake a state with a glow, a spinner or an idle loop.         |

## 11. Review checklist

1. Any physical color, `dark:` branch, glass blur, glow, gradient text or colored shadow? Replace with tokens or remove.
2. More than one yellow element on the screen? Keep the primary action only.
3. On a photograph: exactly one solid surface? Mark and caption on the same inset? Text over a bright area has the ink scrim?
4. Nested corners concentric? Each layer one material, flat on the page and raised only where it floats, with dark faces lighter than what they sit on?
5. Every animation: plays once in view, rests on the final frame, honors reduced motion, uses the Sunbeam curves?
6. A 3D figure: a real object at real proportions, solids painted back to front, at most one lit part, the three arrival slots done by 2.1s, one physical response, controls outside the drawing?
7. Every string from the dictionary, none repeating a title or icon?
8. Checked in light and dark, at phone width, with keyboard focus visible?
