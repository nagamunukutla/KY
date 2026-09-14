import { icon } from '../components/icons';
import { scoreColor, trendSvg } from '../components/charts';
import type { TrendPoint } from '../components/charts';
import { escapeHtml, toast } from '../lib/dom';
import { clearAudits, deleteAudit, exportCsv, exportJson, download, listAudits, listTracked, addTracked, removeTracked, getAccount } from '../lib/store';
import type { StoredAudit } from '../lib/store';

export interface HistoryHandlers {
  onBack: () => void;
}

function when(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function longWhen(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function modeBadge(a: StoredAudit): string {
  return a.mode === 'text'
    ? '<span class="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-200">Real</span>'
    : '<span class="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700 ring-1 ring-amber-200">Demo</span>';
}

export function historyHtml(): string {
  const audits = listAudits();
  const tracked = listTracked();
  const account = getAccount();

  // Trend for whichever profile has the most runs.
  const counts = new Map<string, number>();
  for (const a of audits) counts.set(a.profileKey, (counts.get(a.profileKey) ?? 0) + 1);
  const topKey = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
  const series = topKey
    ? audits
        .filter((a) => a.profileKey === topKey)
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    : [];
  const points: TrendPoint[] = series.map((a) => ({ label: a.label, value: a.overall, when: when(a.createdAt) }));

  return `<div class="min-h-screen bg-slate-50">
  <header class="sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur">
    <div class="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
      <button type="button" data-back class="inline-flex items-center gap-2 text-sm font-semibold text-white">
        ${icon('arrowRight', 'h-4 w-4 rotate-180')} Back
      </button>
      <div class="flex items-center gap-2.5">
        <span class="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-sky-400 text-xs font-black text-white">KY</span>
        <span class="font-extrabold tracking-tight text-white">Audit history</span>
      </div>
      <div class="flex items-center gap-2">
        <button type="button" data-export="csv" class="hidden rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10 sm:inline-flex">CSV</button>
        <button type="button" data-export="json" class="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10">Export</button>
      </div>
    </div>
  </header>

  <main class="mx-auto max-w-5xl px-4 py-8">
    <p class="text-xs text-slate-500">
      ${account ? `Account: ${escapeHtml(account.name || account.email)} · ` : ''}Stored in this browser only. Nothing is uploaded.
    </p>

    ${audits.length === 0 ? emptyState() : ''}

    ${
      points.length >= 2
        ? `<section class="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="flex flex-wrap items-baseline justify-between gap-2">
        <h2 class="text-lg font-bold text-slate-900">Score trend</h2>
        <p class="text-sm text-slate-500">${escapeHtml(series[0].label)} · ${series.length} audits</p>
      </div>
      <p class="mt-0.5 text-sm text-slate-500">${deltaLine(series)}</p>
      <div class="mt-4">${trendSvg(points)}</div>
    </section>`
        : ''
    }

    ${trackedCard(tracked)}

    ${
      audits.length
        ? `<section class="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="flex items-center justify-between gap-3">
        <h2 class="text-lg font-bold text-slate-900">Saved audits</h2>
        <button type="button" data-clear class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition hover:text-rose-600">
          ${icon('trash', 'h-3.5 w-3.5')} Clear all
        </button>
      </div>
      <ul class="mt-4 divide-y divide-slate-100">
        ${audits.map(auditRow).join('')}
      </ul>
    </section>`
        : ''
    }
  </main>
</div>`;
}

function deltaLine(series: StoredAudit[]): string {
  const first = series[0];
  const last = series[series.length - 1];
  const change = last.overall - first.overall;
  const word = change > 0 ? 'up' : change < 0 ? 'down' : 'flat';
  return `First audit ${first.overall} → latest ${last.overall} — ${word} ${Math.abs(change)} point${Math.abs(change) === 1 ? '' : 's'} across ${series.length} runs.`;
}

function emptyState(): string {
  return `<section class="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
  <span class="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand">${icon('history', 'h-6 w-6')}</span>
  <h2 class="mt-4 text-lg font-bold text-slate-900">No audits saved yet</h2>
  <p class="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
    Run an audit and choose <em>Save to history</em> on the report. Your score, keyword coverage and section scores are
    kept in this browser so the next run can show you what changed.
  </p>
</section>`;
}

function auditRow(a: StoredAudit): string {
  const col = scoreColor(a.overall);
  return `<li class="flex flex-wrap items-center gap-3 py-3.5">
  <div class="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-sm font-extrabold" style="background:${col}1a;color:${col}">${a.overall}</div>
  <div class="min-w-0 flex-1">
    <p class="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-900">
      ${escapeHtml(a.label)} ${modeBadge(a)}
    </p>
    <p class="truncate text-xs text-slate-500">${escapeHtml(a.industry)} · ${longWhen(a.createdAt)} · ${escapeHtml(a.source)}</p>
    ${a.gaps.length ? `<p class="mt-1 truncate text-xs text-slate-400">Gaps: ${escapeHtml(a.gaps.slice(0, 5).join(', '))}</p>` : ''}
  </div>
  <button type="button" data-delete="${a.id}" class="shrink-0 rounded-lg p-2 text-slate-300 transition hover:bg-rose-50 hover:text-rose-600" title="Delete this audit">
    ${icon('trash', 'h-4 w-4')}
  </button>
</li>`;
}

function trackedCard(tracked: string[]): string {
  return `<section class="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
  <h2 class="text-lg font-bold text-slate-900">Tracked keywords</h2>
  <p class="mt-0.5 text-sm text-slate-500">
    Terms you want to rank for. Every audit checks whether each one still appears on your profile, and alerts you if it
    disappears.
  </p>
  <form id="tracked-form" class="mt-4 flex gap-2">
    <label class="sr-only" for="tracked-input">Keyword</label>
    <input id="tracked-input" type="text" placeholder="e.g. Lifecycle Marketing"
      class="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"/>
    <button type="submit" class="inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark">
      ${icon('plus', 'h-4 w-4')} Track
    </button>
  </form>
  <div class="mt-4 flex flex-wrap gap-2">
    ${
      tracked.length
        ? tracked
            .map(
              (k) => `<span class="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand/5 py-1.5 pl-3 pr-1.5 text-sm font-medium text-brand">
        ${escapeHtml(k)}
        <button type="button" data-untrack="${escapeHtml(k)}" class="grid h-5 w-5 place-items-center rounded-full transition hover:bg-brand/15" title="Stop tracking">
          ${icon('x', 'h-3 w-3')}
        </button>
      </span>`
            )
            .join('')
        : '<p class="text-sm text-slate-400">Nothing tracked yet — add the terms recruiters should find you for.</p>'
    }
  </div>
</section>`;
}

export function wireHistory(root: HTMLElement, h: HistoryHandlers): void {
  root.querySelector<HTMLElement>('[data-back]')?.addEventListener('click', h.onBack);

  root.querySelectorAll<HTMLElement>('[data-export]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const kind = btn.dataset.export;
      if (!listAudits().length) {
        toast('Nothing to export yet — run an audit first.');
        return;
      }
      const stamp = new Date().toISOString().slice(0, 10);
      if (kind === 'csv') {
        download(`ky-audits-${stamp}.csv`, exportCsv(), 'text/csv');
        toast('CSV downloaded');
      } else {
        download(`ky-audits-${stamp}.json`, exportJson(), 'application/json');
        toast('JSON downloaded');
      }
    });
  });

  root.querySelectorAll<HTMLElement>('[data-delete]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.delete;
      if (!id) return;
      deleteAudit(id);
      rerender(root, h);
      toast('Audit deleted');
    });
  });

  root.querySelector<HTMLElement>('[data-clear]')?.addEventListener('click', () => {
    clearAudits();
    rerender(root, h);
    toast('History cleared');
  });

  const form = root.querySelector<HTMLFormElement>('#tracked-form');
  const input = root.querySelector<HTMLInputElement>('#tracked-input');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = input?.value.trim() ?? '';
    if (!v) return;
    addTracked(v);
    if (input) input.value = '';
    rerender(root, h);
    toast(`Tracking "${v}"`);
  });

  root.querySelectorAll<HTMLElement>('[data-untrack]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const k = btn.dataset.untrack;
      if (!k) return;
      removeTracked(k);
      rerender(root, h);
    });
  });
}

function rerender(root: HTMLElement, h: HistoryHandlers): void {
  const parent = root.parentElement;
  if (!parent) return;
  root.innerHTML = historyHtml();
  wireHistory(root, h);
}
