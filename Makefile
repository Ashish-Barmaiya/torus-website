.PHONY: dev build lint typecheck format format-check test clean

dev:
	pnpm dev

build:
	pnpm build

lint:
	pnpm lint

typecheck:
	pnpm typecheck

format:
	pnpm format

format-check:
	pnpm format:check

test:
	pnpm test

clean:
	rm -rf .next
	rm -rf node_modules
