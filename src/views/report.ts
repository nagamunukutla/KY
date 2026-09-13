import { icon } from '../components/icons';
import { radarSvg, scoreColor, scoreDial } from '../components/charts';
import { SECTION_DEFS } from '../data/sections';
import { copyText, escapeHtml, toast } from '../lib/dom';
import type { AnalysisResult, Fix } from '../analysis';

const IMPACT_CLS: Record<Fix['impact'], string> = {
  High: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
  Medium: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  Low: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
};

function barClass(score: number): string {
  if (score < 50) return 'bg-rose-500';
  if (score < 70) return 'bg-amber-500';
  return 'bg-emerald-500';
}

export function shareText(r: AnalysisResult): string {
  const link = window.location.href.split('#')[0];
  return [
    `Just scored my LinkedIn profile: ${r.overall}/100 with KY.`,
    '',
    `That's better than ${r.percentile}% of ${r.industry} profiles (Phase 1 demo data).`,
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
  const lines = [
    `KY Profile Audit — ${r.name}`,
    `Source: ${r.input.display} (${r.source === 'curated' ? 'sample profile' : 'demo estimate'})`,
    `Generated: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`,
    '',
    `Overall: ${r.overall}/100 — better than ${r.percentile}% of ${r.industry} profiles (demo benchmark)`,
    '',
    'Section scores:',
    ...r.sections.map((s) => `  - ${s.label}: ${s.score}/100${s.issues.length ? ` (${s.issues.join('; ')})` : ''}`),
    '',
    'Top 3 fixes:',
    ...r.fixes.map((f, i) => `${i + 1}. [${f.impact}] ${f.title} — ${f.detail}`),
    '',
    `Keyword gaps: ${r.keywords.join(', ')}`,
    '',
    'Headline:',
    `  Before: ${r.headlineFix.before}`,
    `  After:  ${r.headlineFix.after}`,
    '',
    'KY — LinkedIn Profile Audit (Phase 1 demo). Not affiliated with LinkedIn.',
  ];
  return lines.join('\n');
}

export function reportHtml(r: AnalysisResult): string {
  const overallCol = scoreColor(r.overall);
  const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const sourceNote =
    r.source === 'curated'
      ? 'Sample profile — Phase 1 demo data'
      : `Demo estimate for ${escapeHtml(r.input.display)} — sample-based data`;

  return `<div class="min-h-screen bg-slate-50">
  <header class="no-print sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
      <a href="#" data-home class="flex items-center gap-2.5">
        <span class="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-sky-400 text-xs font-black text-white">KY</span>
        <span class="font-extrabold tracking-tight text-white">KY</span>
      </a>
      <div class="flex items-center gap-3">
        <span class="hidden items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300 sm:inline-flex">
          ${icon('alert', 'h-3.5 w-3.5')} Phase 1 demo
        </span>
        <button data-action="restart" class="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark">
          ${icon('refresh', 'h-4 w-4')} New audit
        </button>
      </div>
    </div>
  </header>

  <main class="mx-auto max-w-6xl px-4 py-8">
    <p class="no-print text-xs text-slate-500">${sourceNote}. Generated ${date}. Not affiliated with LinkedIn.</p>

    <section class="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div class="flex flex-col gap-8 sm:flex-row sm:items-center">
        <div class="flex min-w-0 flex-1 items-center gap-4">
          <div class="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-brand/10 text-xl font-extrabold text-brand">${r.initials}</div>
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
            <p class="text-sm text-slate-500">of ${escapeHtml(r.industry)} profiles<br/>(demo benchmark)</p>
          </div>
        </div>
      </div>
      <p class="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">${escapeHtml(r.summary)}</p>
    </section>

    <div class="mt-6 grid items-start gap-6 lg:grid-cols-5">
      <div class="space-y-6 lg:col-span-3">
        ${sectionsCard(r)}
        ${keywordsCard(r)}
        ${headlineCard(r)}
      </div>
      <div class="space-y-6 lg:col-span-2">
        ${radarCard(r)}
        ${fixesCard(r)}
      </div>
    </div>

    <section class="no-print mt-8 flex flex-wrap gap-3">
      <button data-action="share" class="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark">
        ${icon('share', 'h-5 w-5')} Share on LinkedIn
      </button>
      <button data-action="copy" class="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-brand hover:text-brand">
        ${icon('copy', 'h-5 w-5')} Copy report
      </button>
      <button data-action="print" class="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-brand hover:text-brand">
        ${icon('download', 'h-5 w-5')} Download PDF
      </button>
    </section>
  </main>

  <footer class="no-print py-8 text-center text-xs text-slate-400">KY · Phase 1 demo · ${date}</footer>
</div>`;
}

function sectionsCard(r: AnalysisResult): string {
  return `<section class="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" style="animation-delay:0.05s">
  <h2 class="text-lg font-bold text-slate-900">Section scores</h2>
  <p class="mt-0.5 text-sm text-slate-500">8 sections · 120+ checkpoints</p>
  <div class="mt-5 space-y-5">
    ${r.sections
      .map((s) => {
        const def = SECTION_DEFS.find((d) => d.key === s.key);
        const col = scoreColor(s.score);
        return `<div class="flex items-start gap-3">
        <div class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500">${icon(def ? def.icon : 'target')}</div>
        <div class="min-w-0 flex-1">
          <div class="flex items-baseline justify-between gap-2">
            <p class="text-sm font-semibold text-slate-800">${escapeHtml(s.label)}</p>
            <p class="text-sm font-bold tabular-nums" style="color:${col}">${s.score}</p>
          </div>
          <div class="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
            <div class="bar-fill h-full rounded-full ${barClass(s.score)}" style="width:${s.score}%"></div>
          </div>
          ${
            s.issues.length
              ? `<p class="mt-1.5 text-xs leading-relaxed text-slate-500">${s.issues.map(escapeHtml).join(' · ')}</p>`
              : '<p class="mt-1.5 text-xs font-medium text-emerald-600">No major issues found here.</p>'
          }
        </div>
      </div>`;
      })
      .join('')}
  </div>
</section>`;
}

function keywordsCard(r: AnalysisResult): string {
  return `<section class="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" style="animation-delay:0.1s">
  <div class="flex items-center gap-2">
    <h2 class="text-lg font-bold text-slate-900">Keyword gaps</h2>
    <span class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">top ${r.keywords.length}</span>
  </div>
  <p class="mt-0.5 text-sm text-slate-500">Terms recruiters and clients search for in ${escapeHtml(r.industry)} — missing from this profile.</p>
  <div class="mt-4 flex flex-wrap gap-2">
    ${r.keywords
      .map(
        (k) => `<span class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">
        ${icon('x', 'h-3.5 w-3.5 text-rose-500')} ${escapeHtml(k)}</span>`
      )
      .join('')}
  </div>
  <p class="mt-4 text-xs text-slate-400">Tip: work these into your headline, About and top skills — 3–5 per week, not all at once.</p>
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
  return `<section class="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" style="animation-delay:0.1s">
  <h2 class="text-lg font-bold text-slate-900">Profile radar</h2>
  <p class="mt-0.5 text-sm text-slate-500">Where you're strong, where you leak impressions.</p>
  <div class="mt-2">${radarSvg(r.sections.map((s) => ({ label: s.label, value: s.score })))}</div>
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

/** Attach report-view handlers. onRestart returns the user to the landing page. */
export function wireReport(root: HTMLElement, r: AnalysisResult, onRestart: () => void): void {
  root.querySelectorAll<HTMLElement>('[data-action]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const a = btn.dataset.action;
      if (a === 'restart') {
        onRestart();
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
      }
    });
  });
  const home = root.querySelector<HTMLElement>('[data-home]');
  home?.addEventListener('click', (e) => {
    e.preventDefault();
    onRestart();
  });
}
