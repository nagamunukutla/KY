import { icon } from '../components/icons';
import { getAccount, setAccount } from '../lib/store';
import { toast } from '../lib/dom';

/**
 * Pro plan + demo account.
 *
 * Deliberately honest: this build has no server and no payment provider, so
 * nothing here pretends to charge anyone. "Pro" simply unlocks the tracking
 * features that already run locally, and the account is a name stored in the
 * visitor's own browser.
 */

const PRO_FEATURES = [
  'Score history with a trend line across every run',
  'Keyword tracking — alerts when a term drops off your profile',
  '"What changed since your last audit" diff on each report',
  'Unlimited saved audits, plus CSV and JSON export',
];

const NOT_INCLUDED = [
  'Hosted accounts — your data stays in this browser',
  'Weekly automated re-audits and email alerts',
  'Stripe billing — no payment provider is connected',
  'Team and agency features (Phase 3)',
];

export function openPlanModal(): void {
  const account = getAccount();
  const el = document.createElement('div');
  el.id = 'plan-modal';
  el.className = 'fixed inset-0 z-50 grid place-items-center bg-ink/60 p-4 backdrop-blur-sm';
  el.innerHTML = `<div role="dialog" aria-modal="true" aria-labelledby="plan-title" class="animate-pop w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
  <div class="flex items-start justify-between gap-4 border-b border-slate-100 bg-slate-50 p-6">
    <div>
      <p class="text-xs font-bold uppercase tracking-wider text-amber-600">Phase 2.5 preview</p>
      <h2 id="plan-title" class="mt-1 text-xl font-extrabold text-slate-900">KY Pro</h2>
      <p class="mt-1 text-sm text-slate-500">$12 / month early bird — not chargeable in this build.</p>
    </div>
    <button type="button" data-close class="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700" aria-label="Close">
      ${icon('x', 'h-5 w-5')}
    </button>
  </div>

  <div class="max-h-[60vh] overflow-y-auto p-6">
    <h3 class="text-sm font-bold text-slate-900">What Pro adds</h3>
    <ul class="mt-3 space-y-2 text-sm text-slate-600">
      ${PRO_FEATURES.map((f) => `<li class="flex items-start gap-2.5">${icon('check', 'h-4 w-4 mt-0.5 shrink-0 text-emerald-600')} ${f}</li>`).join('')}
    </ul>

    <h3 class="mt-6 text-sm font-bold text-slate-900">Not in this build</h3>
    <ul class="mt-3 space-y-2 text-sm text-slate-500">
      ${NOT_INCLUDED.map((f) => `<li class="flex items-start gap-2.5">${icon('x', 'h-4 w-4 mt-0.5 shrink-0 text-slate-300')} ${f}</li>`).join('')}
    </ul>

    <div class="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <h3 class="text-sm font-bold text-slate-900">${account ? 'Your demo account' : 'Create a demo account'}</h3>
      <p class="mt-1 text-xs leading-relaxed text-slate-500">
        ${
          account
            ? `Signed in locally as ${account.name || account.email}. No password, no server — the name lives in this browser.`
            : 'A name and email, kept in your browser. There is no login, no password and no verification email.'
        }
      </p>
      ${
        account
          ? `<button type="button" data-signout class="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-rose-300 hover:text-rose-600">
        ${icon('logout', 'h-3.5 w-3.5')} Sign out of the demo account
      </button>`
          : `<form id="account-form" class="mt-3 flex flex-col gap-2 sm:flex-row">
        <label class="sr-only" for="account-name">Name</label>
        <input id="account-name" type="text" placeholder="Your name" class="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"/>
        <label class="sr-only" for="account-email">Email</label>
        <input id="account-email" type="email" placeholder="you@example.com" class="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"/>
        <button type="submit" class="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark">Save</button>
      </form>`
      }
    </div>
  </div>

  <div class="flex items-center justify-between gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
    <p class="text-xs text-slate-400">Pro features are already unlocked in this preview.</p>
    <button type="button" data-close class="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">Close</button>
  </div>
</div>`;

  document.body.appendChild(el);
  wire(el);
}

function wire(el: HTMLElement): void {
  const close = (): void => el.remove();

  el.querySelectorAll<HTMLElement>('[data-close]').forEach((b) => b.addEventListener('click', close));
  el.addEventListener('click', (e) => {
    if (e.target === el) close();
  });

  el.querySelector<HTMLElement>('[data-signout]')?.addEventListener('click', () => {
    setAccount(null);
    toast('Demo account cleared from this browser');
    close();
  });

  const form = el.querySelector<HTMLFormElement>('#account-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = el.querySelector<HTMLInputElement>('#account-name')?.value.trim() ?? '';
    const email = el.querySelector<HTMLInputElement>('#account-email')?.value.trim() ?? '';
    if (!name && !email) {
      toast('Add a name or an email first.');
      return;
    }
    setAccount({ name, email, plan: 'pro', createdAt: new Date().toISOString() });
    toast('Saved to this browser — Pro is unlocked');
    close();
  });
}
