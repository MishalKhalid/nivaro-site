# Nivaro: marketing site

Nivaro is a wearable wristband plus companion app that senses likely nicotine-use moments and craving windows, and answers with calming haptic pulses to help people cut down and quit. This repo is the single-page marketing site.

Built with Next.js 14 (App Router), TypeScript (strict), Tailwind CSS, Framer Motion, lucide-react, react-hook-form + zod.

## Run it locally

Requires **Node.js 18.17+** (20 or 22 recommended).

```bash
# 1. install (pnpm preferred, npm also works)
pnpm install          # or: npm install

# 2. optional: copy env vars
cp .env.example .env.local

# 3. start the dev server
pnpm dev              # or: npm run dev
```

Open **http://localhost:3000**.

Production build locally:

```bash
pnpm build && pnpm start
```

Checks: `pnpm lint`, `pnpm typecheck`, `pnpm build`.

## Deploy to Vercel

1. Push to GitHub and import the repo in Vercel (framework is auto-detected).
2. Set env vars: `NEXT_PUBLIC_SITE_URL` (e.g. `https://nivaro.pk`) and `WAITLIST_STORAGE`.
3. Add your domain under Project → Settings → Domains.
4. **Before going live, switch waitlist storage** (see below). Local JSON does not persist on Vercel.

## Where to edit things

| What | File |
|---|---|
| Statistics + sources | `src/data/stats.ts` |
| FAQ (also feeds FAQPage JSON-LD) | `src/data/faq.ts` |
| Hero, how it works, demo, app, trust, waitlist, footer copy | `src/data/site.ts` |
| Feature cards | `src/data/features.ts` |
| Audience tabs | `src/data/audience.ts` |
| Roadmap | `src/data/roadmap.ts` |
| Colors / tokens | `src/app/globals.css` (`:root`) **and** `tailwind.config.ts` (mirrored as hex so opacity modifiers like `bg-teal/15` work) |

## Waitlist storage

`/api/waitlist` validates with the shared zod schema (`src/lib/waitlist-schema.ts`), strips control characters, rate-limits per IP (5/min, in memory), silently drops honeypot submissions, and writes through the interface in `src/lib/waitlist-storage.ts`.

- `WAITLIST_STORAGE=local` (default): appends to `data/waitlist.json`. **Development only.** Vercel's filesystem is read-only/ephemeral, so entries would be lost.
- `supabase`: fill in the `TODO(supabase)` stub. Create a `waitlist` table with a unique `email` column, add `@supabase/supabase-js`, set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
- `sheets`: fill in the `TODO(sheets)` stub using the Sheets API `values.append` with a service account (`GOOGLE_SHEETS_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_KEY`).

Swapping is a one-file change. The in-memory rate limiter is per-instance; use a shared store (e.g. Upstash Redis) in production. Emails are masked in dev logs and nothing personal is logged in production.

## Stat verification checklist

These are public-health figures. **Every one must be checked against its primary source before launch.** Source URLs are empty and marked `// TODO(verify)` in `src/data/stats.ts` until confirmed. Numbers were not changed from the brief.

| Stat | Source (as given in brief) | URL | Verified |
|---|---|---|---|
| 22.7M adults currently use tobacco | GATS Pakistan 2024 | _TBD_ | - [ ] |
| 16.1% of 15+ use tobacco | GATS Pakistan 2024 | _TBD_ | - [ ] |
| ~164,000 deaths per year | **Source not specified in brief** | _TBD_ | - [ ] |
| Rs 1.8 trillion (~$6.6B) annual economic loss | **Source not specified in brief** | _TBD_ | - [ ] |
| 5.9% of women, up 1.7 points since 2014 | GATS Pakistan 2024 | _TBD_ | - [ ] |
| 2014: 19.1% (23.9M adults) | GATS Pakistan 2014 | _TBD_ | - [ ] |
| 2024: 16.1% (22.7M adults) | GATS Pakistan 2024 | _TBD_ | - [ ] |
| Quit attempts / provider advice declined slightly | GATS 2014 vs 2024 | _TBD_ | - [ ] |
| Independent estimates of 29–31M users | **Source not specified in brief** | _TBD_ | - [ ] |
| "Released June 2026" date in source line | GATS Pakistan 2024 | _TBD_ | - [ ] |

## Lighthouse (mobile, local production build)

| Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|
| 93 | 100 | 100 | 100 |

CLS 0, TBT 130 ms. Simulated LCP was 3.0 s on a local machine with Lighthouse's slow-4G throttling; re-measure on the deployed Vercel URL (CDN + compression usually improves this). The LCP element is the hero headline, which renders without waiting on animation.

## Accessibility notes

Skip link, semantic landmarks, one `h1`, `aria-labelledby` on every section, visible teal focus rings, 44px+ touch targets, mobile menu with focus trap and Escape, roving-tabindex audience tabs (arrow keys, Home/End), accordion with `aria-expanded`/`aria-controls`, demo announces state with `aria-live`, form errors wired via `aria-invalid`/`aria-describedby`. With `prefers-reduced-motion`, pulses, parallax, magnetic hover, cursor glow, reveals and count-ups are all disabled and every element is visible.

## Assumptions

- **Fonts are self-hosted** from `@fontsource-variable/*` via `next/font/local` instead of `next/font/google`, so builds never depend on reaching Google Fonts. Same families: Space Grotesk, Inter, JetBrains Mono.
- 3D (react-three-fiber) was skipped; the wristband is SVG + CSS, per the brief's default.
- Large stats use compact suffixes (`22.7M`, `Rs 1.8T`) with the full value shown underneath for clarity.
- The investor CTA scrolls to the waitlist with `audience=investor` pre-selected (rather than a `mailto:`).
- Contact emails in `src/data/site.ts` are placeholders (`*.example`).
- `/privacy` and `/terms` are placeholder pages stating the policies will be published before launch.
- Social links are `#` placeholders with descriptive `aria-label`s.
- The hero notification and app preview are labelled as examples / illustrative sample data.

## Open TODOs before launch

- [ ] Verify every stat and add source URLs (table above).
- [ ] Implement Supabase or Google Sheets storage and set `WAITLIST_STORAGE`.
- [ ] Shared rate limiter for production.
- [ ] Publish real Privacy and Terms pages.
- [ ] Replace placeholder emails and social links.
- [ ] Re-run Lighthouse on the deployed URL.
