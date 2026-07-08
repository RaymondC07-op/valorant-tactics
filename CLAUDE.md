# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev              # Start dev server (Turbopack)
npm run build            # Production build → out/
npm run lint             # ESLint
npm run check-updates    # Check valorant-api.com for new agents/maps

# Image pipelines
npx tsx scripts/optimize-images.ts    # PNG → WebP conversion + compression
npx tsx scripts/download-images.ts    # Download agent/map images from valorant-api.com
npx tsx scripts/download-callouts.ts  # Download callout maps from Liquipedia
npx tsx scripts/merge-compositions.ts # Restructure composition JSONs (one-off utility)
```

## Architecture

**Static export** (`output: "export"` in Next.js config). The entire site is pre-rendered to `out/` at build time — no SSR, no API routes, no runtime data fetching. Deploy targets: Vercel (current) or Cloudflare Pages (`wrangler.toml` provided).

### Content layer (file-driven)

All content lives in `content/` as files read at build time via `fs`:

| Directory | Format | Loaded by |
|-----------|--------|-----------|
| `content/maps/*.mdx` | YAML frontmatter + markdown body | `lib/content.ts` |
| `content/compositions/*.json` | JSON matching `MapComposition` type | `lib/content.ts` |
| `content/agents/agents.json` | JSON array of `Agent` | `lib/content.ts` (server) / `lib/agent-data.ts` (client) |

`lib/content.ts` uses `import "server-only"` — it calls `fs` directly and cannot be imported from client components. For client-side agent data, use `lib/agent-data.ts` which imports the JSON statically.

### MDX parsing pipeline

1. `parseFrontmatter()` — custom YAML frontmatter parser (handles flat key:value, YAML list syntax `- "item"`, and inline arrays `[a, b]`)
2. `parseTacticSections()` — splits raw markdown body by H2/H3 into `TacticChapter[]` for the accordion UI
3. `MapContentRenderer` — renders individual chapter markdown via `react-markdown` + `remark-gfm` + `rehype-raw`

### Client/server boundary

- **Server components** (default): all `page.tsx`, `layout.tsx`, content loading
- **Client components** (`"use client"`): any component with `useState`, `useEffect`, event handlers, or browser APIs. Specifically: `TacticAccordion`, `CompositionTable` (CompCard), `AgentPill`, `CalloutImage`, `Header`, `FilteredMapsClient`, `AgentGridClient`, `MapSidebar`
- `MapContentRenderer` is client-only because `react-markdown` requires a client context

### Page structure

```
/                   → HeroSection + RotationStatus + QuickNav
/maps               → FilteredMapsClient → MapGrid → MapCard
/maps/[slug]        → Hero banner + CalloutImage + TacticAccordion + MapSidebar + CompositionTable
/compositions       → All maps with their unified compositions (one grid per map)
/agents             → AgentGridClient (filter by role)
/about              → Static markdown page
```

## Design system

**Tactical HUD aesthetic** defined in `app/globals.css`:

- CSS custom properties: `--color-valorant-red` (#FF4655), `--color-valorant-dark` (#0F1923), `--color-valorant-light` (#ECE8E1), `--color-valorant-gold` (#D4AF37), `--color-valorant-blue` (#1EA5C8), `--color-valorant-green` (#7CBA3D)
- Chinese font stack: Geist → Microsoft YaHei → PingFang SC → Noto Sans SC
- Signature elements: `.corner-brackets` (pseudo-element corner accents on hover), `.pulse-dot` (animated indicator), `.scan-line` (horizontal scanning line animation), `@keyframes fade-up` (staggered entrance animations)
- All border-radius: `rounded-sm` (consistent sharp-edged tactical look)
- All images: WebP format (see scripts/optimize-images.ts)

## Key patterns

- **Chinese content handling**: JSON string values with double-quotes must use Unicode curly quotes `""` not ASCII `"` to avoid parse errors. MDX frontmatter is UTF-8 throughout.
- **Dynamic imports**: `TacticAccordion` is lazy-loaded via `next/dynamic` because `react-markdown` + plugins are ~314KB uncompressed. The page HTML contains pre-rendered content so users see tactics immediately; the JS loads async for interactivity.
- **Image error handling**: `AgentPill` and `CalloutImage` use `useState(false)` + `onError` → fallback to text initials or placeholder. Images use `loading="lazy"`.
- **Static params**: Map detail pages use `generateStaticParams()` returning all map slugs. No `dynamicParams`.
- **Metadata**: Every page exports `Metadata` with `title` (using layout template `"%s - 无畏契约战术手册"`), `description`, and `openGraph`.

## Data update workflow

When new agents or maps are added to Valorant:
1. `npm run check-updates` — diffs valorant-api.com against local data
2. `npx tsx scripts/download-images.ts` — downloads new agent/map images
3. `npx tsx scripts/optimize-images.ts` — converts to WebP
4. Manually add `content/maps/<new-map>.mdx` and `content/compositions/<new-map>.json`
