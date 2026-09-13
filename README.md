# KY — LinkedIn Profile Audit

**Phase 1 interactive demo** of a B2C product: paste any LinkedIn profile URL, get a benchmarked score (0–100) across 8 sections, keyword gaps, a headline rewrite, and the 3 priority fixes — in ~60 seconds, with no sign-up.

This build is designed to be **shared on LinkedIn**: a polished landing page plus a fully working in-browser demo, entirely client-side (no backend, no API keys, no auth).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build (dist/)
```

## What Phase 1 demos

- **Landing page** — hero, how-it-works, sample reports, what-we-audit, pricing, waitlist, FAQ.
- **Audit flow** — URL input → animated analysis steps → full report.
- **Report** — overall score dial, per-section scores with issues, radar chart, industry percentile, keyword gaps, headline before/after rewrite, and top-3 fixes ranked by impact.
- **Share loop** — *Share on LinkedIn* copies a ready-to-post summary (with the live link), *Copy report* copies the full text report, *Download PDF* prints the report.
- **Demo data model** — two hand-crafted sample profiles (Sarah, Michael) plus deterministic seeded estimates for *any* other URL, so the demo never dead-ends. Reports are clearly labelled "Phase 1 demo / sample-based".

## Tech

- **Vite + TypeScript (strict) + Tailwind CSS v4** — zero runtime dependencies.
- Charts (score dial, radar) are hand-rolled SVG — no chart library.
- 100% client-side: no network calls, works offline once loaded.
- All user-derived strings are HTML-escaped; scoring is deterministic (FNV-1a seed + mulberry32 PRNG), so the same URL always yields the same report.

## Project structure

```
src/
  app.ts                 # view switching + audit flow
  analysis.ts            # deterministic analysis engine (curated + estimated)
  data/
    sections.ts          # 8 audited sections, weights, issues, fixes
    industries.ts        # 8 industries: keywords + headline rewrites
    profiles.ts          # curated sample profiles (Sarah, Michael)
  components/
    charts.ts            # SVG score dial + radar chart
    icons.ts             # inline SVG icon set
  lib/                   # PRNG, URL parsing, DOM/clipboard helpers
  views/
    landing.ts           # marketing page + audit form
    scanning.ts          # animated analysis steps
    report.ts            # report view + share/copy/print actions
```

## Roadmap

- **Phase 1 (this build):** interactive demo — validate the product concept, shareable for LinkedIn.
- **Phase 2:** live audits of public profiles (Compliance-safe, no credentials), AI rewrites per section, keyword tracking + alerts, 1-page PDF reports, accounts + Stripe.
- **Phase 3:** team/agency features (candidate pipelines), browser extension, scoring history.

> Not affiliated with LinkedIn Corporation. Demo data is illustrative; no real profile data is read in Phase 1.
