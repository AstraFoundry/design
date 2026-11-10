# Contributing taste

This repository is the AstraFoundry design system, Sunbeam, for two platforms: `packages/web` is the versioned npm package `@astrafoundry/design`, and `packages/mygo` is the Go module for native apps drawn by [MyGo](https://github.com/egoist/mygo). Change the source here; do not paste tokens or components into a product site or app.

## Tokens

Edit `packages/web/tokens/sunbeam.json`, then regenerate the CSS, the skill tables, the DESIGN.md front matter and the Go tokens (`packages/mygo/sunbeam/tokens_gen.go`):

```sh
pnpm tokens:build
pnpm test
```

`pnpm test` fails if those generated files drift, and if DESIGN.md contrast falls below WCAG AA.

## Components

Web components go in `packages/web/src/ui`; mock stages in `packages/web/src/mock`. Vendored beUI stays in `packages/web/src/beui`; follow [`docs/beui.md`](packages/web/docs/beui.md) when adding one.

A component that both platforms have keeps the same name, the same rules and the same tokens in each: `Button`, `IconButton`, `Panel` and `Segmented` are in `packages/web/src/ui` and in `packages/mygo/sunbeam`. Add or change it in both, and keep the materials rule: flat on the page and its chrome, raised in a floating layer.

Components take every label through props (in Go, through arguments). Web components use semantic utilities (`bg-background`, `text-foreground`) and do not write `dark:` or physical colors; Go components take colors from `sunbeam.Colors(c)`. `src/beui` is the exception, because it is third-party code.

## Examples

Add a folder under `examples/` that depends on `@astrafoundry/design` and renders one idea: a token pairing, a component, or a small scene. `examples/taste` is the pattern. Examples are not published to npm.

Keep example copy in the example's props or its own README. Do not add product marketing strings to the package.

## Checks

```sh
pnpm install
pnpm check
```

`pnpm check` typechecks, lints, tests and builds the web package, then gofmt-checks, vets and tests the Go module. Node.js 24, the pinned pnpm and Go 1.27 (the version `packages/mygo/go.mod` names; `GOTOOLCHAIN=auto` fetches it) are required.
