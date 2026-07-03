# Torus Website

The official website for **Torus**, a Layer 7 Reverse Proxy and Edge API Gateway written in Go.

This repository contains the frontend application powering the Torus documentation, benchmark explorer, architecture pages, engineering journal, and project website.

---

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- MDX
- Apache ECharts
- Motion
- Storybook
- Vitest
- Playwright

---

## Getting Started

### Prerequisites

- Node.js LTS
- pnpm

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open:

```
http://localhost:3000
```

---

## Available Commands

| Command | Description |
|---------|-------------|
| `make dev` | Start development server |
| `make build` | Production build |
| `make lint` | Run ESLint |
| `make typecheck` | Run TypeScript checks |
| `make format` | Format source code |
| `make clean` | Remove generated files |

Or use pnpm directly:

```bash
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm format
```

---

## Project Structure

```
.
├── content/        # MDX content
├── data/           # Structured data (benchmarks, roadmap, etc.)
├── docs/           # Internal design documentation
├── public/         # Static assets
├── src/
│   ├── app/
│   ├── components/
│   ├── charts/
│   ├── diagrams/
│   ├── layouts/
│   └── ...
└── scripts/
```

---

## Development Principles

This repository follows a documentation-first and data-driven architecture.

- Documentation is written in MDX.
- Benchmark data is stored as structured datasets.
- Charts are generated from data rather than hardcoded values.
- UI components are designed specifically for technical documentation and engineering content.

---

## License

[MIT](LICENSE)
