<p align="center">
  <img src="/brand/toolatlas/wordmark.svg" alt="ToolAtlas" height="72" />
</p>

# ToolAtlas — AI Tools Finder

Map the AI landscape. ToolAtlas helps you find the right AI tools fast with powerful fuzzy search, keyboard‑friendly command palette, and an interactive category/tag map.

## Features

- Fast fuzzy search (MiniSearch) with inline autocomplete and Cmd/Ctrl+K command palette
- Browse tools with category chips and URL‑synced filters
- Tool detail pages with rich metadata and quick links
- Interactive “Atlas” map to explore categories, tools, and tags
- Responsive, dark‑first design with accessible components

## Tech Stack

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS v4
- MiniSearch (local fuzzy search), `cmdk` (command palette), `lucide-react` (icons)
- `react-force-graph-2d` for the Atlas map

## Local Development

Prerequisites: Node 18+ (or 20+ recommended)

```bash
npm install
npm run dev
# open http://localhost:3000
```

Production build:

```bash
npm run build && npm start
```

## Tool Data Model (what information to collect)

Each tool entry lives in `data/tools.json` and follows this TypeScript interface:

```ts
export type Pricing = 'free' | 'freemium' | 'paid' | 'open-source'
export type Category =
  | 'Writing' | 'Image Generation' | 'Programming' | 'Research' | 'Productivity'
  | 'Marketing' | 'Education' | 'Customer Support' | 'Video' | 'Audio' | 'Agents' | 'Other'

export interface Tool {
  id: string                     // stable unique id (e.g., vendor or canonical slug)
  name: string                   // display name (e.g., "ChatGPT")
  slug: string                   // kebab-case unique route id (e.g., "chatgpt")
  shortDescription: string       // ≤ 140 chars; shows in cards and lists
  description: string            // full description for the detail page
  categories: Category[]         // one or more categories
  tags: string[]                 // keywords (3–10 recommended)
  pricing: Pricing               // free/freemium/paid/open-source
  websiteUrl: string             // canonical website/landing page
  signupUrl?: string             // direct signup/onboarding url
  logoUrl?: string               // square logo (prefer local /public path)
  screenshots?: string[]         // optional screenshots (paths or urls)
  verified?: boolean             // mark if verified by maintainers
  featured?: boolean             // show in featured lists
  upvotes?: number               // popularity score
  rating?: number                // 0–5 average rating
  addedAt: string                // ISO date string (e.g., 2024-01-01T00:00:00.000Z)
  models?: string[]              // optional model names (e.g., GPT‑4o, Claude, Llama)
}
```

### Minimum required fields

- id, name, slug
- shortDescription, description
- categories, tags
- pricing, websiteUrl
- addedAt (ISO date)

### Recommended optional fields

- logoUrl (use an asset under `/public/brand/...` when possible)
- verified, featured, upvotes, rating
- signupUrl, screenshots[], models[]

## Add or Update a Tool

1. Edit `data/tools.json` and append/update a `Tool` entry.
2. Ensure `slug` is unique, kebab‑case, and stable.
3. Prefer local paths for `logoUrl`/screenshots placed under `public/`.
4. Keep `shortDescription` ≤ 140 characters.
5. Commit with a descriptive message (e.g., `feat(data): add Midjourney tool`).

## Search API

- Route: `POST /api/search`
- Body: `{ q?: string, category?: string, pricing?: string, tags?: string[] }`
- Response: `{ results: Tool[] }`

## Keyboard Shortcuts

- Cmd/Ctrl + K: Open the global command palette

## Contributing

Contributions are welcome! We’re open to issues and pull requests for:

- New tools and data quality improvements
- UI/UX polish, accessibility, performance
- New filters, rankings, analytics, integrations

Guidelines:

- Open an issue describing the change and motivation
- Keep edits focused and include screenshots for UI changes
- Follow the existing code style (TypeScript, React, Tailwind)
- Ensure `npm run build` passes and the app runs locally

## Roadmap

- Background indexing in a Web Worker
- Optional backend search (Algolia/Meilisearch) with analytics
- Admin UI for tool submissions (zod + react‑hook‑form)
- Bookmarks/collections and comparisons
- Sitemaps, JSON‑LD (SoftwareApplication)

---

Maintained by the community. Have an idea or found an issue? Please open an issue — we’d love your feedback and contributions.
