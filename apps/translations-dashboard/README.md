# Translations Dashboard

Real-time translations management dashboard built with the [Sanity App SDK](https://www.sanity.io/docs/app-sdk). Shows translation coverage, gaps, and stale documents across all locales — and lets you trigger AI translations to fill gaps or update stale content.

## Quick Start

```bash
# From the monorepo root — env vars are read from the root .env.local
pnpm install
pnpm bootstrap
pnpm dev
```

The dashboard opens at [localhost:3334](http://localhost:3334).

## Tech Stack

| Layer      | Technology                         |
| ---------- | ---------------------------------- |
| Framework  | React 19, TypeScript               |
| Sanity SDK | `@sanity/sdk`, `@sanity/sdk-react` |
| UI         | `@sanity/ui`, Tailwind CSS v4      |
| Routing    | React Router v7                    |
| Charts     | Recharts                           |
| Tables     | TanStack Table                     |

## What It Does

### Dashboard Route (`/`)

Summary view: status cards showing translation counts by state, a coverage heatmap across locales, stale documents needing attention, and recent translation activity.

### Translations Route (`/translations`)

Action view: fill coverage gaps with AI translation, filter documents by status, or select specific gaps to address. Supports batch operations across multiple documents and locales.

## Architecture

The dashboard is powered by a single GROQ query (`useTranslationAggregateData`) that fetches the full translation corpus. Seven pure derived hooks process this data into chart-ready shapes using `useMemo` — one real-time subscription, no polling.

```
useTranslationAggregateData (useQuery → single GROQ fetch)
  ├── useTranslationSummary
  ├── useStatusBreakdown
  ├── useCoverageMatrix
  ├── useGapDocuments
  ├── useRecentChanges
  ├── useStaleDocuments
  └── useStatusFilteredDocuments
```

Three focused contexts compose in a provider chain:

```
TranslationConfigProvider (languages, config, client)
  └── SelectionProvider (selected documents, types, batch mode)
        └── TranslationProgressProvider (translation progress, creation status)
```

For detailed SDK patterns and intentional guideline deviations, see [ARCHITECTURE.md](../../packages/translations-dashboard/ARCHITECTURE.md).

## Project Structure

This app is a thin shell. The dashboard UI lives in the shared `@starter/translations-dashboard-ui` package (`packages/translations-dashboard`), which the Studio also mounts as a **Translations** tool (`studio/lib/translationsDashboardTool.tsx`).

```
apps/translations-dashboard/src/
├── App.tsx                    SanityApp (own login) + BrowserRouter around the shared dashboard
├── App.css                    Tailwind (with preflight) for the standalone app
└── SanityUI.tsx               Sanity UI theme

packages/translations-dashboard/src/
├── TranslationsDashboard.tsx  Dashboard root — contexts, error boundary, routes
├── routes/
│   ├── DashboardRoute.tsx     Summary view
│   └── TranslationsRoute.tsx  Action view
├── contexts/                  Provider chain (config, selection, progress, Studio URL)
├── hooks/                     Data + action hooks
├── components/                UI components, charts, document views
├── queries/                   GROQ projection strings
├── lib/                       Translation execution, metadata ops
├── types/                     TypeScript interfaces
├── consts/                    Document type lists, status constants
└── tool.css                   Tailwind for the Studio tool (no preflight reset)
```

Hosts supply the SDK provider, router and Sanity UI theme. The app uses `SanityApp` with its own login and a `BrowserRouter`. The Studio tool reuses the Studio's login through `SDKStudioContext` and a `MemoryRouter`.

## Deploying

Deploy the dashboard (`pnpm bootstrap` already wrote your organization ID to `.env`):

```sh
pnpm --filter @starter/translations-dashboard exec sanity deploy
```

To make "Open in Studio" links point to your production Studio:

```sh
echo 'SANITY_STUDIO_URL=https://your-studio.sanity.studio' >> .env.local
```
