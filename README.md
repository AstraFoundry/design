# Sunbeam

Sunbeam is the AstraFoundry design system: warm ink on paper, one yellow, photographs for atmosphere and solid surfaces for focus. This repository holds it for two platforms, built from one set of tokens:

| Package                          | Platform                                                                           | Install                                               |
| -------------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------- |
| [`packages/web`](packages/web)   | Web: Tailwind v4 tokens, React components, mock stages (`@astrafoundry/design`)    | `npm install @astrafoundry/design`                    |
| [`packages/mygo`](packages/mygo) | Native apps drawn by [MyGo](https://github.com/egoist/mygo) (Go package `sunbeam`) | `go get github.com/AstraFoundry/design/packages/mygo` |
| [`examples/`](examples)          | Taste examples that consume the web package; not published                         |                                                       |

`packages/web/tokens/sunbeam.json` is the single source of every token. `pnpm tokens:build` writes from it the web package's CSS, the skill's token tables, the DESIGN.md front matter and the Go package's `tokens_gen.go`, and `pnpm test` fails when any of them drifts. The specification, for people and coding agents, is the [Sunbeam skill](packages/web/skills/sunbeam/SKILL.md) and [DESIGN.md](packages/web/DESIGN.md).

## Materials: flat and raised

Every surface is one of two materials, and a layer has one of them:

- **Flat** — the page or window and its chrome. A control is a fill and nothing else: no edge, no gradient, no shadow.
- **Raised** — a layer that floats above them (a panel, popover, menu or dialog) and every control in it: a faint top-to-bottom gradient, a translucent 1px edge, a 1px highlight inside the top edge, and layered shadows. In dark mode the face is a lighter gray than the panel under it and the shadows are half black.

The material follows the layer, not the component: the same button is flat in a toolbar and raised in a panel. Inside a raised layer, a track of choices is recessed and the choice made is its one raised face. Corners nest concentrically and curve continuously where the platform can draw them. Both packages implement the same rules: `Panel`, `Button`, `IconButton` and `Segmented` on the web and in MyGo.

## Develop

```sh
pnpm install
pnpm check          # web: typecheck, lint, test, build; Go: gofmt, vet, test
pnpm tokens:build   # after editing packages/web/tokens/sunbeam.json
pnpm mygo:gallery   # open the MyGo gallery
```

Node.js 24, the pinned pnpm and Go 1.27 are required. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Release

- `@astrafoundry/design`: push a `vX.Y.Z` tag; the release workflow runs `make publish`.
- The Go module: push a `packages/mygo/vX.Y.Z` tag.

MIT licensed. Photographs and vendored beUI keep their own terms; see [packages/web/NOTICE.md](packages/web/NOTICE.md).
