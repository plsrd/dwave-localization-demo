# D-Wave Demo: Agentic Localization

Demo built from the Agentic Localization starter for D-Wave.

- **Sanity project:** `krm54zrd` (dataset `dwave-localization`)
- **Locales:** English (`en-US`, source) and Japanese (`ja-JP`)
- **Glossary:** D-Wave product terminology. Do-not-translate: D-Wave, Leap, Advantage2, Advantage, Ocean, Zephyr, Pegasus. Approved JA terms: 量子アニーリング, 量子ビット, ハイブリッドソルバー, 最適化. Forbidden: "quantum supremacy", "magic"
- **Style guide:** Japanese, formal (です/ます), product names kept in Latin script
- **Content:** 8 AI-generated articles on quantum annealing, Advantage2, Ocean SDK, and Japanese manufacturing and logistics. Authors are fictional. `article-advantage2-launch` has a stale Japanese translation set up for the stale-detection demo

Run `pnpm dev`: Studio on :3333 (the translations dashboard is the **Translations** tool inside it), frontend on :3000. The standalone dashboard app is optional and runs on :3334 if you start it.

**Editing in context:** the Studio's **Presentation** tool previews the frontend and supports click-to-edit on articles. It needs `SANITY_API_READ_TOKEN` (Viewer) in `.env`, and `http://localhost:3000` / `http://localhost:3333` as CORS origins with credentials on the project.

**Slugs are per language.** Each translation has its own slug, so the frontend resolves the sibling slug through `translation.metadata` when the language switcher lands on a path from another language.

Demo content lives in `studio/scripts/seed/` (`briefs.ts`, `metadata.ts`). Regenerate it with `pnpm --filter studio generate-sample-data`, then import it with `pnpm --filter studio exec sanity dataset import sample-data.ndjson production --replace`.

---

# Agentic Localization Starter

Make AI translation match your brand voice and terminology standards.

Without structured context, AI translates "Releases" as "Veröffentlichungen" in German — but it's a product name that should stay in English. This starter stores glossaries, style guides, and locale rules as structured Sanity documents, assembles them into prompts at translation time, and includes an eval framework that proves the quality impact.

## What you get

- **Translation metadata as content** — Glossaries, style guides, and locale rules are Sanity documents that content teams manage in the Studio
- **Automated stale detection** — Serverless functions mark translations stale on publish, run AI analysis on what changed, and pre-translate affected fields
- **Translation pane and inspector** — Studio UI for reviewing translation status, applying pre-translations, and triggering new translations
- **Translations dashboard** — Real-time overview of coverage, gaps, and stale documents across all locales (Sanity App SDK, mounted in the Studio as the Translations tool and also runnable standalone)
- **Localized frontend** — Next.js app with path-based i18n routing, locale switcher, and fallback content
- **Quality evals** — Translate with and without context, measure the delta with deterministic checks and an LLM judge

## Getting started

**Prerequisites:** Node.js (>=20.19 or >=22.12), pnpm, a [Sanity account](https://www.sanity.io/get-started)

### 1. Create the project

```sh
pnpm create sanity@latest --template sanity-labs/starters/agentic-localization --package-manager pnpm
```

This prompts you to select (or create) a Sanity project and dataset, then writes your `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` to `.env`. All workspaces in the monorepo read from this single file — prefix mappings at the bottom resolve the values to each workspace's expected env var names.

> **Cloning manually?** Copy `.env.example` to `.env` and fill in your project ID and dataset from [sanity.io/manage](https://www.sanity.io/manage).

### 2. Install and bootstrap

```sh
cd your-project
pnpm bootstrap
```

`pnpm bootstrap` consolidates env files, resolves the organization ID, deploys the blueprint (CORS, dataset, robot token, serverless functions), deploys the schema, generates types, seeds locale documents, and imports sample content.

<details>
<summary>Running bootstrap steps manually</summary>

```sh
# 1. Consolidate env — copy .env.example to .env if it doesn't exist, fill in project ID and dataset
cp .env.example .env

# 2. Resolve organization ID — find it at sanity.io/manage → project settings
# Uncomment SANITY_STUDIO_ORGANIZATION_ID in .env and set it to your org ID

# 3. Deploy blueprint (CORS, dataset, robot token, serverless functions)
pnpm --filter @starter/functions build
pnpm exec sanity blueprints init --stack-name production --project-id <your-project-id>
pnpm exec sanity blueprints deploy

# 4. Deploy schema
pnpm --filter studio exec sanity schema deploy

# 5. Generate types
pnpm --filter studio exec sanity schema extract
pnpm --filter studio exec sanity typegen generate

# 6. Seed locale documents
pnpm --filter studio exec sanity migration run seed-locales --no-dry-run --no-confirm

# 7. Import sample content
pnpm --filter studio exec sanity dataset import sample-data.ndjson <your-dataset> --replace
```

</details>

### 3. Start developing

```sh
pnpm dev
```

Opens the Studio at [localhost:3333](http://localhost:3333), the translations dashboard at [localhost:3334](http://localhost:3334), and the Next.js frontend at [localhost:3000](http://localhost:3000).

> **Frontend env:** The frontend inherits `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` from the root `.env` automatically. Add a `SANITY_API_READ_TOKEN` (create a Viewer token at [sanity.io/manage](https://www.sanity.io/manage) → API → Tokens, or `pnpm exec sanity tokens add "Frontend read token" --role=viewer`). It is required for draft preview in Presentation and for private datasets, and is only used server-side.

## How it works

1. **Define metadata** in the Studio: locales, glossaries (approved translations, do-not-translate terms, forbidden terms), and style guides (formality, tone, audience instructions per locale)
2. **Assemble prompt**: `assembleStyleGuide()` converts structured metadata into an instruction string; `filterGlossaryByContent()` prunes to relevant terms
3. **Translate**: `buildTranslateParams()` packages everything for the [Agent Actions Translate API](https://www.sanity.io/docs/agent-actions), including protected phrases extracted from do-not-translate entries
4. **Evaluate**: translate with and without context, score with deterministic checks and an LLM judge, compare the quality delta

Only glossary entries whose terms appear in the source document are injected (content-aware filtering), so prompts stay focused.

## Project structure

```
sanity.blueprint.ts              Infrastructure-as-code: dataset, CORS, robot token, functions
functions/                       Serverless automation (Sanity Functions)
  mark-translations-stale.ts       Detects source changes, flags affected translations
  analyze-stale-translations.ts    AI-analyzes what changed, pre-translates affected fields
studio/                          Sanity Studio workspace
  lib/translationsDashboardTool.tsx  Mounts the dashboard as the Translations tool
  schemaTypes/                     Article, person, topic, tag schemas
  migrations/                      Deterministic locale seeding
packages/l10n/                   Core plugin: schemas, prompt assembly, UI, evals
  src/schemas/                     Locale, glossary, style guide, entry types
  src/core/                        Pure utilities for serverless (zero React)
  src/translations/                Translation pane, inspector, hooks
  evals/                           Quality evals: with-context vs without-context scoring
packages/translations-dashboard/ Dashboard UI shared by the Studio tool and the standalone app
apps/translations-dashboard/     Standalone shell for the dashboard (Sanity App SDK)
apps/frontend/                   Next.js frontend with path-based i18n routing, draft mode, Visual Editing
```

## Deploying

Deploy in this order, because the Studio build bakes in the frontend URL.

**1. Frontend** (any Next.js host, for example Vercel with the project root set to `apps/frontend`). Set:

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `krm54zrd` |
| `NEXT_PUBLIC_SANITY_DATASET` | `dwave-localization` |
| `SANITY_API_READ_TOKEN` | Viewer token (server-side only) |
| `NEXT_PUBLIC_SANITY_STUDIO_URL` | Deployed Studio URL, used for click-to-edit links |

**2. Studio.** Set `SANITY_STUDIO_PREVIEW_URL` to the deployed frontend URL, then:

```sh
pnpm --filter studio exec sanity deploy
```

**3. CORS.** Add the frontend and Studio URLs as origins with credentials:

```sh
pnpm --filter studio exec sanity cors add https://your-frontend.example --credentials
```

**4. Functions** (stale detection) are managed by the blueprint. The blueprint config in `.sanity/` is local and gitignored, so a fresh clone needs its own stack:

```sh
pnpm --filter @starter/functions build
pnpm exec sanity blueprints init --stack-name dwave-localization --project-id krm54zrd
pnpm exec sanity blueprints deploy
```

The dataset in `sanity.blueprint.ts` is declared `public` to match the live dataset. Change `aclMode` there only if you also give the frontend a browser token.

**Optional: standalone dashboard app.** The dashboard already ships inside the Studio, so you only need this for a separate URL. It needs `SANITY_STUDIO_ORGANIZATION_ID` in `.env`:

```sh
pnpm --filter @starter/translations-dashboard exec sanity deploy
```

To make "Open in Studio" links in the standalone dashboard point to your deployed Studio, set `SANITY_STUDIO_URL=https://your-studio.sanity.studio` in `.env`.

## Tests and evals

```sh
pnpm test                    # Unit tests (schema, prompt assembly, locale utils)
pnpm --filter l10n eval      # Model evals — requires sanity login, consumes AI credits
```

## Learn more

- [Sanity Agent Actions](https://www.sanity.io/docs/agent-actions) — Translate API reference
- [`@sanity/document-internationalization`](https://github.com/sanity-io/plugins/tree/main/plugins/@sanity/document-internationalization) — Document-level i18n plugin
- [docs/I18N_RESEARCH.md](docs/I18N_RESEARCH.md) — Gap analysis between enterprise TMSes and AI translation agents
