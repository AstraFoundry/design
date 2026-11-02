# Login and publish for @astrafoundry/design.
# Auth tokens stay in the user npm config, or in CI as NODE_AUTH_TOKEN.
# Do not commit them.

NPM_REGISTRY := https://registry.npmjs.org/
NPM_SCOPE := @astrafoundry

.DEFAULT_GOAL := help
.PHONY: help login whoami check publish

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-14s %s\n", $$1, $$2}'

login: ## Log in to the public npm registry for @astrafoundry
	npm login --scope=$(NPM_SCOPE) --registry=$(NPM_REGISTRY)

whoami: ## Show the npm user for the public registry
	npm whoami --registry=$(NPM_REGISTRY)

check: ## Typecheck, lint, test, and build
	pnpm check

# Local publishes keep npm's git checks. CI publishes from a tag checkout
# (GitHub Actions sets CI=true), so those checks are skipped there.
publish: ## Check, then publish @astrafoundry/design to npm
	@npm whoami --registry=$(NPM_REGISTRY) || { \
		echo "Not logged in to $(NPM_REGISTRY). Run make login, or set NODE_AUTH_TOKEN in CI." >&2; \
		exit 1; \
	}
	$(MAKE) check
	pnpm publish --access public$(if $(CI), --no-git-checks,)
