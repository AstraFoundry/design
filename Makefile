# Login and publish for @astrafoundry/design (packages/web).
# The package is published to GitHub Packages, not the public npm registry.
# The MyGo package (packages/mygo) is a Go module: it is released by pushing
# a packages/mygo/vX.Y.Z tag, with nothing to publish.
# Auth tokens stay in the user npm config. In Actions the token is
# GITHUB_TOKEN, which setup-node reads from the NODE_AUTH_TOKEN variable.
# Do not commit them.

NPM_REGISTRY := https://npm.pkg.github.com
NPM_SCOPE := @astrafoundry

.DEFAULT_GOAL := help
.PHONY: help login whoami check publish

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-14s %s\n", $$1, $$2}'

login: ## Log in to GitHub Packages for @astrafoundry
	npm login --scope=$(NPM_SCOPE) --registry=$(NPM_REGISTRY)

whoami: ## Show the user for GitHub Packages
	npm whoami --registry=$(NPM_REGISTRY)

check: ## Typecheck, lint, test and build the web package; vet and test the MyGo package
	pnpm check

# Local publishes keep npm's git checks. CI publishes from a tag checkout
# (GitHub Actions sets CI=true), so those checks are skipped there.
publish: ## Check, then publish @astrafoundry/design to GitHub Packages
	@npm whoami --registry=$(NPM_REGISTRY) || { \
		echo "Not logged in to $(NPM_REGISTRY). Run make login, or in Actions pass GITHUB_TOKEN as NODE_AUTH_TOKEN." >&2; \
		exit 1; \
	}
	$(MAKE) check
	pnpm --filter @astrafoundry/design publish --access public$(if $(CI), --no-git-checks,)
