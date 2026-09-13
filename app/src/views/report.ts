import { icon } from '../components/icons';
import { radarSvg, scoreColor, scoreDial } from '../components/charts';
import { SECTION_DEFS } from '../data/sections';
import { copyText, escapeHtml, toast } from '../lib/dom';
import { listAudits } from '../lib/store';
import type { AnalysisResult, Fix } from '../analysis';

const IMPACT_CLS: Record<Fix['impact'], string> = {
  High: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
  Medium: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  Low: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
};

const ALERT_CLS: Record<AnalysisResult['alerts'][number]['kind'], string> = {
  up: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  down: 'border-rose-200 bg-rose-50 text-rose-800',
  'keyword-lost': 'border-amber-200 bg-amber-50 text-amber-800',
  'keyword-won': 'border-emerald-200 bg-emerald-50 text-emerald-800',
  'section-down': 'border-amber-200 bg-amber-50 text-amber-800',
};

export interface ReportHandlers {
  onRestart: () => void;
  onHistory: () => void;
  onSave: (r: AnalysisResult) => void;
}

function barClass(score: number): string {
  if (score < 50) return 'bg-rose-500';
  if (score < 70) return 'bg-amber-500';
  return 'bg-emerald-500';
}

export function shareText(r: AnalysisResult): string {
  const link = window.location.href.split('#')[0];
  const mode = r.mode === 'text' ? '' : ' (demo data)';
  return [
    `Just scored my LinkedIn profile: ${r.overall}/100 with KY${mode}.`,
    '',
    `That's better than ${r.percentile}% of ${r.industry} profiles.`,
    '',
    'The 3 fixes KY flagged:',
    ...r.fixes.map((f, i) => `${i + 1}. ${f.title}`),
    '',
    `Try it free: ${link}`,
    '',
    '#LinkedIn #PersonalBrand #CareerGrowth',
  ].join('\n');
}

export function reportText(r: AnalysisResult): string {
  const mode = r.mode === 'text' ? 'real analysis of pasted text' : 'demo estimate';
  const lines = [
    `KY Profile Audit — ${r.name}`,
    `Source: ${r.input.display} (${mode})`,
    `Generated: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`,
    '',
    `Overall: ${r.overall}/100 — better than ${r.percentile}% of ${r.industry} profiles`,
  ];

  if (r.excluded.length) {
    lines.push(`Scored from ${r.measuredCount} of 8 sections (not readable from text: ${r.excluded.join(', ')})`);
  }
  if (r.signals.length) {
    lines.push(`Parsed: ${r.signals.join(' · ')}`);
  }

  lines.push(
    '',
    'Section scores:',
    ...r.sections.map(
      (s) =>
        `  - ${s.label}: ${s.basis === 'unknown' ? 'not scored' : `${s.score}/100`}${s.issues.length ? ` (${s.issues.join('; ')})` : ''}`
    ),
    '',
    'Top 3 fixes:',
    ...r.fixes.map((f, i) => `${i + 1}. [${f.impact}] ${f.title} — ${f.detail}`)
  );

  if (r.keywordReport) {
    lines.push('', `Keywords found (${r.keywordReport.covered.length}): ${r.keywordReport.covered.join(', ') || 'none'}`);
    lines.push(`Keyword gaps (${r.keywordReport.gaps.length}): ${r.keywordReport.gaps.join(', ') || 'none'}`);
  } else {
    lines.push('', `Keyword gaps: ${r.keywords.join(', ')}`);
  }

  if (r.rewrites.length) {
    lines.push('', 'Rewrites:');
    for (const w of r.rewrites) {
      lines.push(`  ${w.title}`);
      lines.push(`    Before: ${w.before.replace(/\n/g, ' ')}`);
      lines.push(`    After:  ${w.after.replace(/\n/g, ' ')}`);
    }
  } else {
    lines.push('', 'Headline:', `  Before: ${r.headlineFix.before}`, `  After:  ${r.headlineFix.after}`);
  }

  lines.push('', 'KY — LinkedIn Profile Audit. Not affiliated with LinkedIn.');
  return lines.join('\n');
}

export function reportHtml(r: AnalysisResult): string {
  const overallCol = scoreColor(r.overall);
  const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const isReal = r.mode === 'text';
  const saved = listAudits().length;

  const sourceNote = isReal
    ? `Real analysis of the text you pasted — ${escapeHtml(r.input.display)}`
    : r.source === 'curated'
      ? 'Sample profile — demo data, not your profile'
      : `Demo estimate for ${escapeHtml(r.input.display)} — sample-based data`;

  return `<div class="min-h-screen bg-slate-50">
  <header class="no-print sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
      <a href="#" data-home class="flex items-center gap-2.5">
        <span class="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-sky-400 text-xs font-black text-white">KY</span>
        <span class="font-extrabold tracking-tight text-white">KY</span>
      </a>
      <div class="flex items-center gap-2 sm:gap-3">
        ${
          isReal
            ? `<span class="hidden items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 sm:inline-flex">
          ${icon('check', 'h-3.5 w-3.5')} Real analysis
        </span>`
            : `<span class="hidden items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300 sm:inline-flex">
          ${icon('alert', 'h-3.5 w-3.5')} Demo data
        </span>`
        }
        <button data-action="history" class="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
          ${icon('history', 'h-4 w-4')} <span class="hidden sm:inline">History${saved ? ` (${saved})` : ''}</span>
        </button>
        <button data-action="restart" class="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark">
          ${icon('refresh', 'h-4 w-4')} <span class="hidden sm:inline">New audit</span>
        </button>
      </div>
    </div>
  </header>

  <main class="screen-only mx-auto max-w-6xl px-4 py-8">
    <p class="no-print text-xs text-slate-500">${sourceNote}. Generated ${date}. Not affiliated with LinkedIn.</p>

    ${alertsCard(r)}

    <section class="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div class="flex flex-col gap-8 sm:flex-row sm:items-center">
        <div class="flex min-w-0 flex-1 items-center gap-4">
          <div class="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-brand/10 text-xl font-extrabold text-brand">${escapeHtml(r.initials)}</div>
          <div class="min-w-0">
            <h1 class="truncate text-2xl font-extrabold text-slate-900">${escapeHtml(r.name)}</h1>
            <p class="truncate text-slate-600">${escapeHtml(r.role)}</p>
            <p class="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
              <span class="inline-flex items-center gap-1.5">${icon('globe', 'h-4 w-4')} ${escapeHtml(r.industry)}</span>
              <span class="inline-flex items-center gap-1.5">${icon('mapPin', 'h-4 w-4')} ${escapeHtml(r.location)}</span>
            </p>
          </div>
        </div>
        <div class="flex items-center gap-6">
          <div class="relative h-[170px] w-[170px] shrink-0">
            ${scoreDial(r.overall, 170, 14)}
            <div class="absolute inset-0 grid place-items-center">
              <div class="text-center">
                <span class="text-5xl font-extrabold tabular-nums" style="color:${overallCol}">${r.overall}</span>
                <span class="mt-1 block text-xs font-medium text-slate-400">out of 100</span>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <p class="text-sm font-semibold text-slate-900">Better than ${r.percentile}%</p>
            <p class="text-sm text-slate-500">of ${escapeHtml(r.industry)} profiles</p>
            ${
              isReal && r.excluded.length
                ? `<p class="mt-2 text-xs text-slate-400">Scored from ${r.measuredCount} of 8 sections</p>`
                : ''
            }
          </div>
        </div>
      </div>

      ${deltaStrip(r)}

      <p class="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">${escapeHtml(r.summary)}</p>

      ${
        r.signals.length
          ? `<div class="mt-4 flex flex-wrap gap-2">
        ${r.signals
          .map(
            (s) =>
              `<span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">${escapeHtml(s)}</span>`
          )
          .join('')}
      </div>`
          : ''
      }
    </section>

    <div class="mt-6 grid items-start gap-6 lg:grid-cols-5">
      <div class="space-y-6 lg:col-span-3">
        ${sectionsCard(r)}
        ${r.keywordReport ? keywordCoverageCard(r) : keywordsCard(r)}
        ${r.rewrites.length ? rewritesCard(r) : headlineCard(r)}
      </div>
      <div class="space-y-6 lg:col-span-2">
        ${radarCard(r)}
        ${fixesCard(r)}
        ${r.excluded.length ? excludedCard(r) : ''}
      </div>
    </div>

    <section class="no-print mt-8 flex flex-wrap gap-3">
      <button data-action="share" class="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark">
        ${icon('share', 'h-5 w-5')} Share on LinkedIn
      </button>
      <button data-action="save" class="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-brand hover:text-brand">
        ${icon('history', 'h-5 w-5')} Save to history
      </button>
      <button data-action="copy" class="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-brand hover:text-brand">
        ${icon('copy', 'h-5 w-5')} Copy report
      </button>
      <button data-action="print" class="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-brand hover:text-brand">
        ${icon('download', 'h-5 w-5')} Download PDF
      </button>
    </section>
  </main>

  <footer class="no-print py-8 text-center text-xs text-slate-400">KY · ${isReal ? 'Phase 2 real analysis' : 'demo data'} · ${date}</footer>

  ${printSummary(r)}
</div>`;
}

function alertsCard(r: AnalysisResult): string {
  if (!r.alerts.length) return '';
  return `<section class="no-print animate-rise mt-4 space-y-2">
  ${r.alerts
    .map(
      (a) => `<div class="flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium ${ALERT_CLS[a.kind]}">
      <span class="mt-0.5 shrink-0">${icon(a.kind === 'up' || a.kind === 'keyword-won' ? 'trendUp' : 'bell', 'h-4 w-4')}</span>
      <span>${escapeHtml(a.text)}</span>
    </div>`
    )
    .join('')}
</section>`;
}

function deltaStrip(r: AnalysisResult): string {
  const d = r.delta;
  if (!d) return '';
  const up = d.overall > 0;
  const flat = d.overall === 0;
  const cls = flat ? 'text-slate-500' : up ? 'text-emerald-600' : 'text-rose-600';
  const arrow = flat ? '\u2192' : up ? '\u2191' : '\u2193';

  const moves = d.sections.length
    ? d.sections
        .map((s) => {
          const c = s.change > 0 ? 'text-emerald-600' : 'text-rose-600';
          return `<span class="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
        ${escapeHtml(s.label)} <span class="${c}">${s.change > 0 ? '+' : ''}${s.change}</span></span>`;
        })
        .join('')
    : '<span class="text-xs text-slate-400">No individual section moved.</span>';

  return `<div class="mt-6 rounded-xl border border-slate-200 bg-white p-4">
  <p class="flex flex-wrap items-baseline gap-2 text-sm">
    <span class="font-bold ${cls}">${arrow} ${up ? '+' : ''}${d.overall} points</span>
    <span class="text-slate-500">vs your audit on ${escapeHtml(d.previousDate)}</span>
  </p>
  <div class="mt-2.5 flex flex-wrap gap-2">${moves}</div>
</div>`;
}

function sectionsCard(r: AnalysisResult): string {
  return `<section class="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" style="animation-delay:0.05s">
  <h2 class="text-lg font-bold text-slate-900">Section scores</h2>
  <p class="mt-0.5 text-sm text-slate-500">
    ${r.mode === 'text' ? `8 sections · ${r.measuredCount} scored from your text` : '8 sections · 120+ checkpoints'}
  </p>
  <div class="mt-5 space-y-5">
    ${r.sections
      .map((s) => {
        const def = SECTION_DEFS.find((d) => d.key === s.key);
        const col = scoreColor(s.score);
        const unknown = s.basis === 'unknown';
        return `<div class="flex items-start gap-3">
        <div class="grid h-9 w-9 shrink-0 place-items-center rounded-lg ${unknown ? 'bg-slate-50 text-slate-300' : 'bg-slate-100 text-slate-500'}">${icon(def ? def.icon : 'target')}</div>
        <div class="min-w-0 flex-1">
          <div class="flex items-baseline justify-between gap-2">
            <p class="text-sm font-semibold text-slate-800">${escapeHtml(s.label)}</p>
            ${
              unknown
                ? '<p class="text-xs font-semibold text-slate-400">not scored</p>'
                : `<p class="text-sm font-bold tabular-nums" style="color:${col}">${s.score}</p>`
            }
          </div>
          ${
            unknown
              ? ''
              : `<div class="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
            <div class="bar-fill h-full rounded-full ${barClass(s.score)}" style="width:${s.score}%"></div>
          </div>`
          }
          ${
            s.issues.length
              ? `<p class="mt-1.5 text-xs leading-relaxed text-slate-500">${s.issues.map(escapeHtml).join(' · ')}</p>`
              : unknown
                ? ''
                : '<p class="mt-1.5 text-xs font-medium text-emerald-600">No major issues found here.</p>'
          }
          ${
            s.wins.length
              ? `<p class="mt-1 flex flex-wrap gap-1.5">${s.wins
                  .slice(0, 3)
                  .map(
                    (w) =>
                      `<span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">${icon('check', 'h-3 w-3')} ${escapeHtml(w)}</span>`
                  )
                  .join('')}</p>`
              : ''
          }
        </div>
      </div>`;
      })
      .join('')}
  </div>
</section>`;
}

function keywordCoverageCard(r: AnalysisResult): string {
  const kw = r.keywordReport;
  if (!kw) return '';
  const pct = kw.coverage.length ? Math.round((kw.covered.length / kw.coverage.length) * 100) : 0;

  const chip = (k: (typeof kw.coverage)[number]): string => {
    const star = k.tracked ? icon('star', 'h-3 w-3 text-amber-500') : '';
    return k.found
      ? `<span class="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-800" title="Found in: ${k.where.map(escapeHtml).join(', ')}">
      ${icon('check', 'h-3.5 w-3.5 text-emerald-600')} ${star} ${escapeHtml(k.keyword)}</span>`
      : `<span class="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-800">
      ${icon('x', 'h-3.5 w-3.5 text-rose-500')} ${star} ${escapeHtml(k.keyword)}</span>`;
  };

  return `<section class="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" style="animation-delay:0.1s">
  <div class="flex flex-wrap items-center justify-between gap-2">
    <h2 class="text-lg font-bold text-slate-900">Keyword coverage</h2>
    <span class="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">${kw.covered.length}/${kw.coverage.length} found · ${pct}%</span>
  </div>
  <p class="mt-0.5 text-sm text-slate-500">
    Every ${escapeHtml(kw.industry.label)} term recruiters search, actually searched for in the text you pasted.
  </p>

  ${
    kw.gaps.length
      ? `<p class="mt-4 text-xs font-bold uppercase tracking-wide text-rose-500">Missing (${kw.gaps.length})</p>
  <div class="mt-2 flex flex-wrap gap-2">${kw.coverage.filter((c) => !c.found).map(chip).join('')}</div>`
      : '<p class="mt-4 rounded-lg bg-emerald-50 p-3 text-sm font-medium text-emerald-700">Every tracked term is present.</p>'
  }

  ${
    kw.covered.length
      ? `<p class="mt-5 text-xs font-bold uppercase tracking-wide text-emerald-600">Found (${kw.covered.length})</p>
  <div class="mt-2 flex flex-wrap gap-2">${kw.coverage.filter((c) => c.found).map(chip).join('')}</div>`
      : ''
  }

  <p class="mt-4 text-xs text-slate-400">
    ${icon('star', 'h-3 w-3 inline text-amber-500')} = a keyword you track. Add them on the History page to get alerted if one drops off.
  </p>
</section>`;
}

function rewritesCard(r: AnalysisResult): string {
  return `<section class="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" style="animation-delay:0.15s">
  <div class="flex flex-wrap items-center justify-between gap-2">
    <h2 class="text-lg font-bold text-slate-900">Rewrites</h2>
    <span class="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-bold text-brand">built from your own text</span>
  </div>
  <p class="mt-0.5 text-sm text-slate-500">
    Template rewrites assembled from facts KY found in your paste — no invented credentials. Fill the
    <span class="rounded bg-slate-100 px-1 font-mono text-xs">[brackets]</span> and delete them.
  </p>
  <div class="mt-5 space-y-5">
    ${r.rewrites
      .map(
        (w, i) => `<div class="rounded-xl border border-slate-200 p-4">
      <div class="flex items-center justify-between gap-3">
        <p class="text-sm font-bold text-slate-900">${escapeHtml(w.title)}</p>
        ${
          w.needsEdit
            ? `<span class="shrink-0 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700 ring-1 ring-amber-200">needs your input</span>`
            : `<span class="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-200">ready to use</span>`
        }
      </div>
      <p class="mt-3 text-xs font-semibold uppercase tracking-wide text-rose-400">Before</p>
      <p class="mt-1 rounded-lg bg-rose-50 p-3 text-sm leading-relaxed text-slate-700">${escapeHtml(w.before)}</p>
      <p class="mt-3 text-xs font-semibold uppercase tracking-wide text-emerald-600">After</p>
      <p class="mt-1 whitespace-pre-line rounded-lg bg-emerald-50 p-3 text-sm font-medium leading-relaxed text-slate-900">${escapeHtml(w.after)}</p>
      <div class="mt-3 flex items-start justify-between gap-3">
        <p class="text-xs leading-relaxed text-slate-500">${escapeHtml(w.why)}</p>
        <button data-action="copy-rewrite" data-index="${i}" class="no-print shrink-0 rounded-lg border border-slate-300 bg-white p-2 text-slate-600 transition hover:border-brand hover:text-brand" title="Copy this rewrite">
          ${icon('copy', 'h-3.5 w-3.5')}
        </button>
      </div>
    </div>`
      )
      .join('')}
  </div>
</section>`;
}

function excludedCard(r: AnalysisResult): string {
  return `<section class="animate-rise rounded-2xl border border-dashed border-slate-300 bg-white p-5 shadow-sm" style="animation-delay:0.2s">
  <h2 class="text-sm font-bold text-slate-900">${r.excluded.length} sections were not scored</h2>
  <p class="mt-1.5 text-xs leading-relaxed text-slate-500">
    ${escapeHtml(r.excluded.join(', '))} cannot be read from pasted text. KY left them out of your score rather than
    guessing — tick the boxes on the audit form to include them.
  </p>
</section>`;
}

/** Phase 1 keyword-gaps card, used when there is no real keyword report. */
function keywordsCard(r: AnalysisResult): string {
  return `<section class="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" style="animation-delay:0.1s">
  <div class="flex items-center gap-2">
    <h2 class="text-lg font-bold text-slate-900">Keyword gaps</h2>
    <span class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">top ${r.keywords.length}</span>
  </div>
  <p class="mt-0.5 text-sm text-slate-500">Terms recruiters and clients search for in ${escapeHtml(r.industry)}.</p>
  <div class="mt-4 flex flex-wrap gap-2">
    ${r.keywords
      .map(
        (k) => `<span class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">
        ${icon('x', 'h-3.5 w-3.5 text-rose-500')} ${escapeHtml(k)}</span>`
      )
      .join('')}
  </div>
  <p class="mt-4 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-500">
    Demo mode shows sample gaps. Paste your profile text for a real keyword check against your own words.
  </p>
</section>`;
}

function headlineCard(r: AnalysisResult): string {
  return `<section class="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" style="animation-delay:0.15s">
  <h2 class="text-lg font-bold text-slate-900">Headline, rewritten</h2>
  <p class="mt-0.5 text-sm text-slate-500">The single highest-impact change on your profile.</p>
  <div class="mt-4 space-y-3">
    <div class="flex items-start gap-3 rounded-xl border border-rose-100 bg-rose-50 p-4">
      <span class="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-rose-100 text-rose-600">${icon('x', 'h-3.5 w-3.5')}</span>
      <div class="min-w-0">
        <p class="text-xs font-semibold uppercase tracking-wide text-rose-400">Before</p>
        <p class="mt-1 text-sm text-slate-700">${escapeHtml(r.headlineFix.before)}</p>
      </div>
    </div>
    <div class="flex justify-center">${icon('arrowRight', 'h-5 w-5 rotate-90 text-slate-300')}</div>
    <div class="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
      <span class="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-600">${icon('check', 'h-3.5 w-3.5')}</span>
      <div class="min-w-0 flex-1">
        <p class="text-xs font-semibold uppercase tracking-wide text-emerald-600">After</p>
        <p class="mt-1 text-sm font-semibold text-slate-900">${escapeHtml(r.headlineFix.after)}</p>
      </div>
      <button data-action="copy-headline" class="no-print shrink-0 rounded-lg border border-emerald-300 bg-white p-1.5 text-emerald-700 transition hover:bg-emerald-100" title="Copy this headline">
        ${icon('copy', 'h-3.5 w-3.5')}
      </button>
    </div>
    <div class="rounded-lg border border-slate-100 bg-slate-50 p-3.5 text-sm leading-relaxed text-slate-600">
      <span class="font-semibold text-slate-800">Why it works:</span> ${escapeHtml(r.headlineFix.why)}
    </div>
  </div>
</section>`;
}

function radarCard(r: AnalysisResult): string {
  const items = r.sections
    .filter((s) => s.basis !== 'unknown')
    .map((s) => ({ label: s.label, value: s.score }));
  return `<section class="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" style="animation-delay:0.1s">
  <h2 class="text-lg font-bold text-slate-900">Profile radar</h2>
  <p class="mt-0.5 text-sm text-slate-500">Where you're strong, where you leak impressions.</p>
  <div class="mt-2">${radarSvg(items)}</div>
</section>`;
}

function fixesCard(r: AnalysisResult): string {
  return `<section class="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" style="animation-delay:0.15s">
  <h2 class="text-lg font-bold text-slate-900">Your top 3 fixes</h2>
  <p class="mt-0.5 text-sm text-slate-500">Ranked by impact on your overall score.</p>
  <div class="mt-4 space-y-3">
    ${r.fixes
      .map(
        (f, i) => `<div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div class="flex items-center justify-between gap-3">
          <p class="text-sm font-bold text-slate-900"><span class="mr-1.5 text-slate-400">${i + 1}.</span>${escapeHtml(f.title)}</p>
          <span class="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${IMPACT_CLS[f.impact]}">${f.impact}</span>
        </div>
        <p class="mt-1.5 text-sm leading-relaxed text-slate-600">${escapeHtml(f.detail)}</p>
      </div>`
      )
      .join('')}
  </div>
</section>`;
}

/**
 * One-page A4 summary, shown only when printing. The screen layout is hidden
 * so "Download PDF" produces a single clean page rather than the whole app.
 */
function printSummary(r: AnalysisResult): string {
  const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const scored = r.sections.filter((s) => s.basis !== 'unknown');
  const gaps = r.keywordReport ? r.keywordReport.gaps : r.keywords;
  const headlineRewrite = r.rewrites.find((w) => w.key === 'headline');

  return `<div class="print-only">
  <div class="print-head">
    <div>
      <h1 class="print-name">${escapeHtml(r.name)}</h1>
      <p class="print-sub">${escapeHtml(r.role)} · ${escapeHtml(r.industry)} · ${escapeHtml(r.location)}</p>
    </div>
    <div class="print-score">
      <span class="print-score-num" style="color:${scoreColor(r.overall)}">${r.overall}</span>
      <span class="print-score-of">/100 · top ${100 - r.percentile}%</span>
    </div>
  </div>
  <p class="print-meta">
    ${r.mode === 'text' ? 'Real analysis of pasted profile text' : 'Demo data'} · ${date} ·
    ${r.mode === 'text' ? `${r.measuredCount} of 8 sections scored` : '8 sections scored'} · KY Profile Audit
  </p>

  <div class="print-grid">
    <div>
      <h2 class="print-h">Section scores</h2>
      <table class="print-table">
        ${scored
          .map(
            (s) => `<tr><td>${escapeHtml(s.label)}</td><td class="print-num">${s.score}</td><td class="print-bar"><span style="width:${s.score}%;background:${scoreColor(s.score)}"></span></td></tr>`
          )
          .join('')}
      </table>
      ${r.excluded.length ? `<p class="print-note">Not scored (not readable from text): ${escapeHtml(r.excluded.join(', '))}</p>` : ''}

      <h2 class="print-h">Top 3 fixes</h2>
      <ol class="print-list">
        ${r.fixes.map((f) => `<li><strong>${escapeHtml(f.title)}</strong> — ${escapeHtml(f.detail)}</li>`).join('')}
      </ol>
    </div>

    <div>
      <h2 class="print-h">Keyword gaps</h2>
      <p class="print-chips">${gaps.length ? gaps.map(escapeHtml).join(' · ') : 'None — full coverage.'}</p>
      ${
        r.keywordReport
          ? `<p class="print-note">Found: ${escapeHtml(r.keywordReport.covered.join(', ') || 'none')}</p>`
          : ''
      }

      <h2 class="print-h">Headline</h2>
      <p class="print-before">${escapeHtml(headlineRewrite ? headlineRewrite.before : r.headlineFix.before)}</p>
      <p class="print-after">${escapeHtml(headlineRewrite ? headlineRewrite.after : r.headlineFix.after)}</p>
      <p class="print-note">${escapeHtml(headlineRewrite ? headlineRewrite.why : r.headlineFix.why)}</p>

      ${
        r.rewrites.filter((w) => w.key === 'about').length
          ? `<h2 class="print-h">About — skeleton</h2>
      <p class="print-pre">${escapeHtml(r.rewrites.find((w) => w.key === 'about')!.after)}</p>`
          : ''
      }
    </div>
  </div>

  <p class="print-foot">Generated by KY — LinkedIn Profile Audit. Not affiliated with LinkedIn Corporation.</p>
</div>`;
}

/** Attach report-view handlers. */
export function wireReport(root: HTMLElement, r: AnalysisResult, h: ReportHandlers): void {
  root.querySelectorAll<HTMLButtonElement>('[data-action]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const a = btn.dataset.action;
      if (a === 'restart') {
        h.onRestart();
      } else if (a === 'history') {
        h.onHistory();
      } else if (a === 'save') {
        h.onSave(r);
        toast('Saved to this browser — the next audit will show what changed');
        btn.textContent = 'Saved to history';
        btn.disabled = true;
        btn.classList.add('opacity-60');
      } else if (a === 'share') {
        const ok = await copyText(shareText(r));
        toast(ok ? 'Copied — paste it straight into LinkedIn' : 'Copy failed — select the text manually');
      } else if (a === 'copy') {
        const ok = await copyText(reportText(r));
        toast(ok ? 'Full report copied to clipboard' : 'Copy failed');
      } else if (a === 'print') {
        window.print();
      } else if (a === 'copy-headline') {
        const ok = await copyText(r.headlineFix.after);
        toast(ok ? 'Headline copied' : 'Copy failed');
      } else if (a === 'copy-rewrite') {
        const idx = Number(btn.dataset.index);
        const w = r.rewrites[idx];
        if (!w) return;
        const ok = await copyText(w.after);
        toast(ok ? 'Rewrite copied' : 'Copy failed');
      }
    });
  });

  const home = root.querySelector<HTMLElement>('[data-home]');
  home?.addEventListener('click', (e) => {
    e.preventDefault();
    h.onRestart();
  });
}
