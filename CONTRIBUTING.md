# Contributing taste

This repository is the AstraFoundry design system. `@astrafoundry/design` is the versioned package. Change the source here; do not paste tokens or components into a product site.

## Tokens

Edit `tokens/sunbeam.json`, then regenerate the CSS, the skill tables and the DESIGN.md front matter:

```sh
pnpm tokens:build
pnpm test
```

`pnpm test` fails if those generated files drift, and if DESIGN.md contrast falls below WCAG AA.

## Components

Shared presentation components go in `src/ui`. Mock stages go in `src/mock`. Vendored beUI stays in `src/beui`; follow [`docs/beui.md`](docs/beui.md) when adding one.

Components take every label through props. They use semantic utilities (`bg-background`, `text-foreground`) and do not write `dark:` or physical colors. `src/beui` is the exception, because it is third-party code.

## Examples

Add a folder under `examples/` that depends on `@astrafoundry/design` and renders one idea: a token pairing, a component, or a small scene. `examples/taste` is the pattern. Examples are not published to npm.

Keep example copy in the example's props or its own README. Do not add product marketing strings to the package.

## Checks

```sh
pnpm install
pnpm check
```

Node.js 24 and the pinned pnpm are required.
