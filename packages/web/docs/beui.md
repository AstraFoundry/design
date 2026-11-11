# beUI components

The motion components come from [beUI](https://beui.dev), a shadcn-style registry of animated React components built on Motion. They are **vendored** (copied into the repository) under `src/beui/`, not installed as a package. They were migrated from `lyra-landing` (`frontend/src/shared/beui/`) with their local modifications intact.

## What is vendored

| Component                          | Typical use                                   |
| ---------------------------------- | --------------------------------------------- |
| `agents/message`, `message-bubble` | Chat rows in product demos (`ui/ChatMessage`) |
| `agents/prompt-input`              | Composer in demos                             |
| `agents/agent-activity`            | Agent tool and search activity in demos       |
| `agents/todo-list`                 | Agent plans in demos                          |
| `agents/tool-result`               | Terminal output in demos                      |
| `agents/code-block`                | Commands on install and self-host sections    |
| `motion/text-reveal`               | Hero headlines                                |
| `motion/text-shimmer`              | "Generating…" states                          |
| `motion/marquee`                   | Logo and runtime strips                       |
| `motion/bouncy-accordion`          | FAQ                                           |
| `motion/theme-toggle`              | Theme switch (needs `next-themes`)            |
| `motion/center-morph-modal`        | Dialogs                                       |
| `motion/input`                     | Form fields                                   |
| `motion/button` (`StatefulButton`) | Submit with loading state                     |
| `motion/popover-morph`             | Popovers (`ui/LocaleSwitch`)                  |
| `motion/otp-input`                 | Sign-in and authenticator codes               |
| `motion/checkbox`                  | Portal form checkboxes                        |

Their internal dependencies (`button`, `select`, `action-swap`, `lib/ease`, hooks, …) are vendored alongside. `agents/agent-code` and `agents/code-block` import `shiki`; `motion/theme-toggle` imports `next-themes`. Both are optional peer dependencies: install them only if you import those components.

Import a component by its path under `components/`:

```tsx
import { TextReveal } from "@astrafoundry/design/beui/motion/text-reveal";
import { StatefulButton } from "@astrafoundry/design/beui/motion/button";
```

## Rules

- Treat `src/beui/` as third-party code. It is excluded from ESLint (`eslint.config.js`) and Prettier (root `.prettierignore`), and may use physical colors or `dark:` internally. Do not copy those patterns into project code.
- Imports inside the folder are relative with `.js` specifiers (upstream uses `@/components/*` and `@/lib/*`), so the package compiles to plain ESM.
- beUI components read the semantic tokens directly (`var(--foreground)`, `bg-muted`, …). That is why the tokens in `tokens/sunbeam.css` are full color values rather than bare HSL triplets.
- The package's `tsconfig.json` does not enable `noUncheckedIndexedAccess`: upstream code does not type-check under it. A consuming app that enables it must not type-check this package's sources (it reads them through the package `exports`).

## Local modifications

Each modified file says so in a comment at its top. Upstream keeps English defaults; sites always pass their dictionary's text.

- **Reduced motion is read through `lib/hooks/use-reduced-motion.ts`, not Motion's `useReducedMotion`.** Motion's hook is `null` on the server and the real preference on the client's first render, so every component that branches markup or gesture props on it failed to hydrate for reduced-motion users. The local hook uses `useSyncExternalStore` with a `false` server snapshot: hydration matches the HTML, then the component re-renders with the preference. The package root exports it as `useReducedMotion`; use that one in project code too.
- `motion/button/base.tsx`, `motion/action-swap.tsx` and `motion/checkbox.tsx` always pass `whileTap`/`whileHover` and only drop the scale to 1 under reduced motion (toggling the prop made Motion add `tabindex` on one side only). `motion/button/stateful.tsx` renders the same per-letter markup with and without reduced motion and only swaps variants.
- `motion/otp-input.tsx` requires `aria-label`, has no English `<title>`, submits through an optional `name`, and uses `text-success` / `border-foreground/40` instead of `emerald-*` / `border-border-strong`.
- `motion/checkbox.tsx` has no English `<title>` and submits `"on"` through an optional `name` while checked.

- `motion/popover-morph.tsx` is a raised Sunbeam layer: its panel carries `data-material="raised"` and `material-panel`, and its drop shadow is the warm outer part of `--panel-shadow` (half black in the dark) instead of a neutral black one.
- `motion/theme-toggle.tsx` takes its accessible labels as props so copy stays in the dictionary.
- `agents/code-block.tsx` takes `labels` (status and copy-button text); `agents/tool-result.tsx` takes `statusLabel`; `agents/todo-list.tsx` takes `labels` (list name, progress, item status); activity tool items take `actionLabel`.
- `motion/text-reveal.tsx` treats a zero-width space (U+200B) as a break between units, like a space. Chinese and Japanese headlines mark their phrase boundaries with it. Under reduced motion its units still end at `y: 0` and no blur, with no movement: the HTML carries the entrance state until hydration ends, so the final state resets it.
  - **Breaking change versus upstream:** text that contains U+200B now splits there. Strings that carried a zero-width space for another reason will animate as separate units, and the space itself is not rendered.
- `motion/center-morph-modal.tsx` is a raised Sunbeam layer: the dialog carries `data-material="raised"` and `material-panel`, its close button is a `material-face`, its shadow is warm (half black in the dark), and its backdrop is the ink `--scrim` at 25% with no blur.
- `motion/center-morph-modal.tsx` is controlled-only (no built-in trigger), takes its close and backdrop labels as props, returns focus to the element that opened it, lets tall content scroll, and runs its focus effect only on open and close (upstream re-ran it on every parent render, which moved focus back to the first field while typing).

## Adding a component

1. Fetch the component source (the beUI MCP `get_component`, or `npx shadcn add @beui/<slug>` in a scratch project).
2. Copy the component and any missing dependencies into `src/beui/` with the same relative paths.
3. Rewrite `@/components/…` and `@/lib/…` imports to relative paths ending in `.js`.
4. Add npm dependencies it lists to `package.json` (as optional peer dependencies when only a few components need them).
5. Wrap it in a component (in `ui/`, or in the consuming site) that passes copy from the dictionary, and record any local change here and at the top of the file.
