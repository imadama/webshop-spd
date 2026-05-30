# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**SmartPowerDeals** — a Medusa v2 webshop (electronics & smart-home products for the Netherlands and Belgium). Dutch is the primary language for product/UI copy, README and inline docs; code identifiers and commit messages are in English.

It is a **pnpm + Turbo monorepo** with two apps:

| App | Package name | Stack | Port |
| --- | --- | --- | --- |
| `apps/backend` | `@dtc/backend` | Medusa v2 (Node 20) headless commerce + admin dashboard | `9000` (admin at `:9000/app`) |
| `apps/storefront` | `@dtc/storefront` | Next.js 15 (App Router) + React 19 storefront | `8000` |

> Note: the `@dtc/*` package names and the root package `name` (`webshop-printing`) are leftovers from the template this was bootstrapped from. Don't rename them casually — Turbo filters (`--filter=@dtc/backend`) and Dockerfiles depend on them.

Supporting infra (Postgres 16, Redis 7, MinIO/S3) runs via `docker-compose.yml`. Payments go through **Mollie**, transactional email through **SMTP** (nodemailer). Production deploys to **Coolify** (see `DEPLOY.md`).

## Commands

All commands run from the repo root unless noted. Requires **Node ≥20**, **pnpm 10.16.1**, **Docker**.

```bash
pnpm install            # install all workspaces
pnpm infra:up           # start postgres + redis + minio (detached)
pnpm infra:down         # stop them
pnpm infra:logs         # tail container logs

pnpm dev                # backend + storefront together (turbo)
pnpm backend:dev        # backend only
pnpm storefront:dev     # storefront only
pnpm build              # production build of both apps
pnpm lint               # turbo lint (only the storefront has a lint task)
pnpm test               # turbo test (only the backend has tests)
```

### First-time setup (after `pnpm infra:up`)

```bash
cd apps/backend
pnpm exec medusa db:migrate                                   # run migrations
pnpm exec medusa user --email admin@example.com --password change-me
```

Seed data lives in `apps/backend/src/migration-scripts/initial-data-seed.ts` (creates an EUR Region); run it from the root with `pnpm backend:seed`. (The root `backend:seed` script maps to `turbo seed --filter=@dtc/backend`.)

Then create a **Publishable API Key** in the admin (`Settings → Publishable API Keys`) and put it in `apps/storefront/.env.local` as `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_...`, then restart the storefront. The storefront cannot fetch regions/products without it.

### Backend tests

The backend uses Jest (via `@swc/jest`) with three test types selected by the `TEST_TYPE` env var. Run them **from `apps/backend`**:

```bash
pnpm test:unit                 # **/src/**/__tests__/**/*.unit.spec.ts
pnpm test:integration:http     # **/integration-tests/http/*.spec.ts
pnpm test:integration:modules  # **/src/modules/*/__tests__/**/*.ts
```

Run a single test by appending Jest args, e.g.:

```bash
cd apps/backend
TEST_TYPE=unit NODE_OPTIONS=--experimental-vm-modules pnpm exec jest path/to/file.unit.spec.ts -t "test name"
```

The storefront has no test suite — only `next lint` (run `pnpm --filter @dtc/storefront lint`).

## Local service ports (non-standard on purpose)

Ports are deliberately offset to avoid clashing with another local project ("Popify") on the default ports:

- Postgres `5433` (→ container 5432), Redis `6380` (→ 6379), MinIO API `9200` (→ 9000), MinIO console `9201` (→ 9001, login `minioadmin`/`minioadmin`).
- The `medusa-files` bucket is auto-created (public-read) by the `minio-bucket-init` one-shot container.

## Environment variables

`.env.example` is the canonical reference. There are **two separate env files**: `apps/backend/.env` and `apps/storefront/.env.local`. Key cross-cutting ones:

- `REVALIDATE_SECRET` **must match** on both sides — the backend calls the storefront's revalidation endpoint with it.
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL` is the public/browser backend URL; `MEDUSA_BACKEND_URL` (if set) is used for **server-side** storefront calls so they can use an internal Docker URL and avoid hairpin NAT in production.
- Mollie: `MOLLIE_API_KEY`, `MOLLIE_REDIRECT_URL` (no country code — middleware adds it), `MOLLIE_WEBHOOK_URL` (use ngrok for local dev).

## Architecture

### Backend (`apps/backend`)

Medusa v2 app. Everything is wired in `medusa-config.ts`: Postgres + Redis-backed cache / event bus / workflow engine, S3 file storage, and two **custom providers**:

- **`src/modules/mollie/`** — Mollie payment provider (registered under `Modules.PAYMENT`, id `mollie`).
- **`src/modules/notification-smtp/`** — SMTP email notification provider (registered under `Modules.NOTIFICATION`, id `smtp`, channel `email`).

Other backend extension points follow standard Medusa conventions (each dir has a `README.md`):

- `src/api/` — custom routes. Notably `src/api/store/payment/mollie/webhook/route.ts` (Mollie status callbacks), plus `admin/custom` and `store/custom`.
- `src/subscribers/` — event listeners: `product-revalidate.ts` and `order-placed.ts` trigger storefront revalidation / email when Medusa emits events.
- `src/migration-scripts/initial-data-seed.ts` — seed data.
- `src/admin/` — admin dashboard customizations (Vite-based).
- `src/jobs/`, `src/workflows/`, `src/links/` — currently scaffolding.

Build output lands in `.medusa/` (server bundle + admin build); it is excluded from the pnpm workspace.

### Storefront (`apps/storefront`)

Next.js 15 App Router storefront talking to the backend via `@medusajs/js-sdk` (configured in `src/lib/config.ts`).

- **Country-aware routing**: all pages live under a `[countryCode]` segment with `(main)` and `(checkout)` route groups. `src/middleware.ts` resolves the country (URL segment → Cloudflare `cf.country` → Vercel `x-vercel-ip-country` → `NEXT_PUBLIC_DEFAULT_REGION`, default `nl`) by fetching `/store/regions` from the backend, and 307-redirects paths missing a country code. It uses plain `fetch` (not the SDK) because it runs on the Edge, with a 4s timeout and graceful fallback to an empty region map.
- **Feature modules** in `src/modules/` (one folder per area): `home`, `products`, `categories`, `collections`, `store`, `cart`, `checkout`, `order`, `account`, `shipping`, `layout`, `common`, `skeletons`.
- **Server data layer** in `src/lib/data/` (`products`, `cart`, `orders`, `customer`, `regions`, `payment`, …) — server-side functions/actions wrapping the Medusa SDK. Utilities live in `src/lib/util/`.
- Product pages force **dynamic rendering** (Next.js 15 SSG compatibility fix — see git history).

### Checkout / payment flow

Cart → checkout → Mollie redirect → customer returns to `/{countryCode}/order/mollie-return` → backend confirms via the Mollie webhook at `/store/payment/mollie/webhook`. Order/price/product changes in the backend fire subscribers that revalidate the affected storefront pages using `REVALIDATE_SECRET`.

## Conventions & gotchas

- **Prices are stored as whole currency units (euros), NOT cents.** `src/lib/util/money.ts`'s `convertToLocale` passes the amount straight to `Intl.NumberFormat` with **no `/100`**. A previous attempt to divide by 100 was reverted — do not reintroduce cent↔euro conversion in display code.
- **Storefront formatting**: Prettier with `semi: false` (no semicolons); ESLint extends `next/core-web-vitals` + `next/typescript` and ignores `_`-prefixed unused vars/args/caught-errors.
- **Custom Medusa providers** extend the framework abstract classes and are registered in `medusa-config.ts` by `resolve` path + `id` + `options` (options come from env vars). Add new providers the same way.
- TypeScript everywhere; React 19 on the storefront, React 18 in the backend admin (pinned separately — note the root pnpm override forcing `@types/react@19.0.5`).

## Deploy (Coolify)

`DEPLOY.md` is the source of truth. Highlights: each app has its own `Dockerfile` (`apps/backend/Dockerfile`, `apps/storefront/Dockerfile`) built from the repo root; the **backend Dockerfile runs `medusa db:migrate` automatically on every container start**, so migrations ship with each redeploy. Deploy order matters — backend must be live first because the storefront build needs the publishable key. The storefront Dockerfile bakes `NEXT_PUBLIC_MEDUSA_BACKEND_URL`, `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`, and `NEXT_PUBLIC_BASE_URL` as build args.
