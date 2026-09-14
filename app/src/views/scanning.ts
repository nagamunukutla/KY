import { icon } from '../components/icons';
import { escapeHtml } from '../lib/dom';
import { CHECKPOINTS } from '../data/sections';
import type { AnalysisResult } from '../analysis';

export function scanningHtml(r: AnalysisResult): string {
  // The steps must describe what actually happens. Real mode never contacts
  // LinkedIn, so it must not claim to fetch anything.
  const steps =
    r.mode === 'text'
      ? [
          'Parsing the text you pasted',
          'Extracting roles, bullets, skills and dates',
          `Running ${CHECKPOINTS}+ checkpoints`,
          `Searching for ${r.industry} keywords`,
          'Writing rewrites for your weakest sections',
          'Comparing against your previous audits',
          'Building your report',
        ]
      : [
          'Loading sample profile data',
          `Running ${CHECKPOINTS}+ checkpoints`,
          `Benchmarking against ${r.industry} peers`,
          'Finding missing keywords',
          'Writing your 3 priority fixes',
          'Building your report',
        ];
  return `<div class="grid min-h-screen place-items-center bg-slate-50 px-4">
  <div class="w-full max-w-md animate-pop rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
    <div class="flex items-center gap-3">
      <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">${icon('search', 'h-5 w-5')}</span>
      <div class="min-w-0">
        <p class="font-bold text-slate-900">Auditing ${escapeHtml(r.name)}</p>
        <p class="truncate text-xs text-slate-500">${escapeHtml(r.input.display)}</p>
      </div>
    </div>
    <ol class="mt-7 space-y-4">
      ${steps
        .map(
          (s) => `<li data-step data-state="pending" class="flex items-center gap-3">
          <span class="step-dot grid h-6 w-6 shrink-0 place-items-center rounded-full"></span>
          <span class="step-label text-sm">${s}</span>
        </li>`
        )
        .join('')}
    </ol>
    <div class="mt-7 h-1.5 overflow-hidden rounded-full bg-slate-100">
      <div data-progress class="h-full rounded-full bg-brand transition-all duration-300" style="width:0%"></div>
    </div>
  </div>
</div>`;
}

/** Animate the step list, then call onDone. ~3 seconds total. */
export function runScan(root: HTMLElement, onDone: () => void): void {
  const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-step]'));
  const bar = root.querySelector<HTMLElement>('[data-progress]');
  let i = 0;

  const tick = (): void => {
    if (i > 0) {
      const prev = steps[i - 1];
      if (prev) {
        prev.setAttribute('data-state', 'done');
        const dot = prev.querySelector<HTMLElement>('.step-dot');
        if (dot) dot.innerHTML = icon('check', 'h-3.5 w-3.5 text-white');
      }
    }
    if (i < steps.length) {
      steps[i]?.setAttribute('data-state', 'active');
      if (bar) bar.style.width = `${Math.round(((i + 1) / steps.length) * 100)}%`;
      i += 1;
      window.setTimeout(tick, 360 + (i % 2) * 140);
    } else {
      if (bar) bar.style.width = '100%';
      window.setTimeout(onDone, 500);
    }
  };

  window.setTimeout(tick, 250);
}
