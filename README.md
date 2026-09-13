# KY — LinkedIn Profile Audit

Score any LinkedIn profile in about a minute: paste the text, get a benchmarked score (0–100) across 8
sections, real keyword coverage, rewrites for your weakest sections, and a score history that shows
whether your edits actually worked.

**100% client-side.** No backend, no API keys, no auth, no network calls. Your profile text is parsed
and scored in your own browser; audits and keyword tracking live in local storage. Nothing is uploaded,
and KY never asks for your LinkedIn password.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173 (serves the app/ source)
npm run test     # engine + view tests (node:test, bundled by Vite)
npm run check    # tests + type-check + production build
npm run pages    # type-check + build + publish to repo root (GitHub Pages)
```

## Two ways in

| Mode | What it scores | Label |
| --- | --- | --- |
| **Paste profile text** | The text you actually paste — real parsing, real scores | `Real analysis` |
| **Profile URL** | Curated/seeded sample data, so you can explore the report without pasting anything | `Demo data` |

Both are free and clearly labelled in the UI. The URL tab exists only so the demo never dead-ends.

### Getting your profile text

Open your LinkedIn profile → `Ctrl/Cmd + A` → `Ctrl/Cmd + C` → paste. Or use
*More → Save to PDF* and paste the text out of the PDF. Rough formatting is fine; the parser is
tolerant of layout differences.

Photo, banner, custom URL, Featured and posting recency cannot be read from text, so the form has five
optional checkboxes for them. **Unchecked sections are excluded from the score and the remaining
weights are re-normalised** — KY does not guess at things it cannot see.

## What shipped

### Phase 1 — the demo
Landing page, audit flow, 8-section report, radar chart, industry percentile, keyword gaps, headline
rewrite, share/copy/PDF loop, and two curated sample profiles plus seeded estimates for any other URL.

### Phase 2 — real analysis
- **Real profile parsing** (`app/src/parse/profile.ts`) — name, headline, location, About, roles,
  bullets, dates, education, certifications, skills and links, extracted from pasted text.
- **Real scoring** (`app/src/parse/score.ts`) — every number derives from a signal found in the text:
  word-count bands, bullet density, the share of bullets carrying a number, date recency, keyword
  coverage. Each section reports its `basis` (`measured` / `partial` / `unknown`) plus what it got right.
- **Real keyword coverage** (`app/src/parse/keywords.ts`) — industry detection by term frequency, then
  every industry term is searched for in the paste and reported with the sections it appears in. A
  "gap" is a term genuinely absent, not a random sample.
- **Per-section rewrites** (`app/src/parse/rewrite.ts`) — headline, About, the weakest experience
  bullets and the skills list, assembled from facts in your own text. Deterministic templates, no API
  key and nothing invented: unknown facts appear as `[bracketed placeholders]`.
- **1-page PDF report** — `Download PDF` prints a dedicated one-page A4 summary, not a screenshot of
  the app.

### Phase 2.5 — the tracking layer
- **Audit history** with a hand-rolled SVG trend line (`app/src/views/history.ts`).
- **Keyword tracking with alerts** — track the terms you want to rank for; each audit checks whether
  they still appear and warns you when one drops off.
- **What changed** — a delta strip on every repeat audit, plus alerts for score drops, section drops
  and lost/gained keyword coverage.
- **Export** — CSV and JSON of every saved run.
- **Waitlist and demo account** — persisted locally. There is no server, so nothing is sent anywhere.

> Pro is a **preview, not a product**: billing is not connected, and the Pro features are unlocked so
> they can be evaluated. The plan modal says so explicitly rather than faking a checkout.

## Tech

- **Vite + TypeScript (strict) + Tailwind CSS v4** — zero runtime dependencies.
- Charts (score dial, radar, trend) are hand-rolled SVG — no chart library.
- Scoring is deterministic: the same input always produces the same report. The Phase 1 URL mode seeds
  its estimates with FNV-1a + mulberry32.
- All user-derived strings are HTML-escaped (there is a test for it).
- Tests run under `node:test`; `scripts/run-tests.mjs` bundles `tests/*.test.ts` with Vite first, so no
  test framework needs installing.

## Deploying (GitHub Pages)

GitHub Pages for this repo is in **branch-deploy** mode and serves the `main` branch root.
The published site is committed at the repo root (`index.html`, `assets/`, `favicon.svg`):

1. Make changes in `app/`
2. Run `npm run pages` — rebuilds and copies the site to the repo root
3. Commit the root `index.html`, `assets/` and `favicon.svg` and push to `main`
4. Pages rebuilds automatically (~1 minute)

Source layout: the Vite app lives in `app/` (`root: 'app'`, `base: './'` so the site
works under the `/KY/` sub-path). `dist/` is scratch output — never commit it.

## Project structure

```
index.html, assets/, favicon.svg   # PUBLISHED site (built output, served by GitHub Pages)
app/                               # Vite source (root: 'app')
  index.html
  src/
    app.ts                 # view switching + audit flow + history persistence
    analysis.ts            # analysis engine: demo (URL) and real (text) modes, deltas, alerts
    parse/
      profile.ts           # pasted text -> structured profile (roles, bullets, dates, skills)
      score.ts             # real per-section scoring from extracted signals
      keywords.ts          # industry detection + real keyword coverage
      rewrite.ts           # deterministic per-section rewrites
    data/
      sections.ts          # 8 audited sections, weights, issues, fixes
      industries.ts        # 8 industries: keywords + headline rewrites
      profiles.ts          # curated sample profiles (Sarah, Michael)
    components/
      charts.ts            # SVG score dial + radar chart + score trend
      icons.ts             # inline SVG icon set
    lib/
      store.ts             # local storage: audits, tracked keywords, waitlist, account, export
      dom.ts, random.ts, url.ts
    views/
      landing.ts           # marketing page + tabbed audit form
      scanning.ts          # animated analysis steps (wording differs per mode)
      report.ts            # report view + coverage + rewrites + print page
      history.ts           # saved audits, trend line, keyword tracking, export
      plan.ts              # Pro plan + demo account modal
tests/                     # engine + view tests (node:test)
scripts/
  run-tests.mjs            # bundles tests/*.test.ts with Vite, runs node --test
  sync-pages.mjs           # copies dist/ to the repo root
dist/                      # scratch build output (git-ignored)
```

## Roadmap

- **Phase 1:** interactive demo — shipped.
- **Phase 2:** real analysis of pasted profile text, per-section rewrites, 1-page PDF — shipped.
- **Phase 2.5:** audit history, score trends, keyword tracking with alerts, export — shipped.
- **Phase 3:** hosted accounts + Stripe, weekly automated re-audits with email alerts, team/agency
  features (candidate pipelines), browser extension.

### Compliance

KY does not scrape LinkedIn, does not use the LinkedIn API and never asks for credentials. Real
analysis only ever runs on text the user supplies themselves. The URL tab is labelled demo mode and
scores sample data. Not affiliated with LinkedIn Corporation.
