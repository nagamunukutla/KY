import { icon } from '../components/icons';
import { scoreDial, scoreColor } from '../components/charts';
import { CURATED } from '../data/profiles';
import { CHECKPOINTS, SECTION_DEFS, computeOverall } from '../data/sections';
import { escapeHtml, toast } from '../lib/dom';

export function landingHtml(): string {
  return `${navHtml()}
  <main>
    ${heroHtml()}
    ${auditHtml()}
    ${howHtml()}
    ${samplesHtml()}
    ${sectionsHtml()}
    ${pricingHtml()}
    ${waitlistHtml()}
    ${faqHtml()}
  </main>
  ${footerHtml()}`;
}

function logoMark(): string {
  return `<span class="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-sky-400 text-white text-xs font-black tracking-tight">KY</span>`;
}

function navHtml(): string {
  return `<header class="no-print sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur">
  <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
    <a href="#top" class="flex items-center gap-2.5">
      ${logoMark()}
      <span class="text-lg font-extrabold tracking-tight text-white">KY</span>
      <span class="mt-1 hidden text-[11px] font-semibold uppercase tracking-wider text-slate-400 sm:inline">LinkedIn Profile Audit</span>
    </a>
    <nav class="hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex">
      <a class="transition hover:text-white" href="#how">How it works</a>
      <a class="transition hover:text-white" href="#samples">Sample reports</a>
      <a class="transition hover:text-white" href="#pricing">Pricing</a>
      <a class="transition hover:text-white" href="#faq">FAQ</a>
    </nav>
    <a href="#audit" class="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark">
      Audit my profile ${icon('arrowRight', 'h-4 w-4')}
    </a>
  </div>
</header>`;
}

function miniBar(label: string, value: number): string {
  const col = scoreColor(value);
  const cls = value < 50 ? 'bg-rose-500' : value < 70 ? 'bg-amber-500' : 'bg-emerald-500';
  return `<div>
  <div class="flex items-center justify-between text-xs">
    <span class="font-medium text-slate-300">${label}</span>
    <span class="font-bold tabular-nums" style="color:${col}">${value}</span>
  </div>
  <div class="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
    <div class="h-full rounded-full ${cls}" style="width:${value}%"></div>
  </div>
</div>`;
}

function heroHtml(): string {
  const mock = `<div class="relative animate-rise" style="animation-delay:0.15s">
  <div class="max-w-sm rounded-2xl border border-white/10 bg-ink-soft/80 p-6 shadow-2xl shadow-black/40 backdrop-blur">
    <div class="flex items-center gap-4">
      <div class="relative h-[120px] w-[120px] shrink-0">
        ${scoreDial(87, 120, 10)}
        <div class="absolute inset-0 grid place-items-center">
          <span class="text-3xl font-extrabold text-white">87</span>
        </div>
      </div>
      <div class="min-w-0">
        <p class="text-sm font-semibold text-white">Profile score</p>
        <p class="mt-1 text-xs leading-relaxed text-slate-400">Top 13% of Software<br/>profiles this month</p>
      </div>
    </div>
    <div class="mt-5 space-y-3">
      ${miniBar('Headline', 78)}
      ${miniBar('Experience', 92)}
      ${miniBar('Activity', 58)}
    </div>
    <div class="mt-5 flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-3 py-2">
      ${icon('zap', 'h-4 w-4 shrink-0 text-emerald-400')}
      <p class="text-xs font-medium text-emerald-300">Top fix: post or comment 2x a week</p>
    </div>
  </div>
  <div class="absolute -bottom-5 -left-5 hidden animate-rise items-center gap-2.5 rounded-xl bg-white px-4 py-3 shadow-xl sm:flex" style="animation-delay:0.35s">
    ${icon('trendUp', 'h-5 w-5 text-emerald-600')}
    <div>
      <p class="text-sm font-bold leading-none text-slate-900">+23 pts</p>
      <p class="mt-0.5 text-[11px] text-slate-500">after 30 days</p>
    </div>
  </div>
</div>`;

  return `<section id="top" class="relative overflow-hidden bg-ink text-white">
  <div class="hero-glow absolute inset-0"></div>
  <div class="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-24 pt-16 sm:pt-20 lg:grid-cols-2 lg:pt-24">
    <div class="animate-rise">
      <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-200">
        ${icon('sparkles', 'h-3.5 w-3.5 text-sky-400')} Phase 1 demo &middot; Free &middot; No sign-up
      </span>
      <h1 class="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
        Your LinkedIn profile,<br/>
        <span class="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">scored in 60 seconds.</span>
      </h1>
      <p class="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
        KY audits your headline, About, experience, skills and activity across ${CHECKPOINTS}+ checkpoints, benchmarks you against your industry — and hands you the 3 fixes that matter most.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href="#audit" class="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-dark">
          Audit my profile — it's free ${icon('arrowRight', 'h-5 w-5')}
        </a>
        <a href="#samples" class="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10">
          See a sample report
        </a>
      </div>
      <dl class="mt-10 grid max-w-md grid-cols-3 gap-4">
        <div>
          <dt class="text-2xl font-extrabold text-white">${CHECKPOINTS}+</dt>
          <dd class="mt-1 text-xs text-slate-400">checkpoints</dd>
        </div>
        <div>
          <dt class="text-2xl font-extrabold text-white">8</dt>
          <dd class="mt-1 text-xs text-slate-400">sections audited</dd>
        </div>
        <div>
          <dt class="text-2xl font-extrabold text-white">Free</dt>
          <dd class="mt-1 text-xs text-slate-400">in Phase 1</dd>
        </div>
      </dl>
    </div>
    ${mock}
  </div>
</section>`;
}

function sampleChip(slug: string, name: string, label: string, score: number): string {
  const col = scoreColor(score);
  return `<button type="button" data-sample="${slug}" class="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand hover:text-brand">
  <span class="grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold" style="background:rgba(10,102,194,.12);color:#0a66c2">${escapeHtml(name.slice(0, 2).toUpperCase())}</span>
  ${escapeHtml(name)}
  <span class="rounded-full px-2 py-0.5 text-xs font-bold" style="background:rgba(100,116,139,.1);color:${col}">${score}</span>
  <span class="hidden text-slate-400 sm:inline">${escapeHtml(label)}</span>
</button>`;
}

function auditHtml(): string {
  return `<section id="audit" class="bg-white py-20 sm:py-24">
  <div class="mx-auto max-w-3xl animate-rise px-4 text-center">
    <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Paste a profile. Get your report.</h2>
    <p class="mt-3 text-lg text-slate-600">No login, no sign-up. In Phase 1 every audit runs on realistic sample data.</p>
    <form id="audit-form" class="mt-8 flex flex-col gap-3 sm:flex-row" novalidate>
      <label class="sr-only" for="profile-url">LinkedIn profile URL</label>
      <div class="relative flex-1 text-left">
        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">${icon('link', 'h-5 w-5')}</span>
        <input id="profile-url" name="profile-url" type="text" inputmode="url" autocomplete="off"
          placeholder="https://www.linkedin.com/in/your-profile"
          class="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-12 pr-4 text-slate-900 transition placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"/>
      </div>
      <button type="submit" class="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-semibold text-white transition hover:bg-brand-dark">
        ${icon('search', 'h-5 w-5')} Run free audit
      </button>
    </form>
    <p id="audit-error" class="mt-3 hidden text-sm font-medium text-rose-600"></p>
    <div class="mt-6 flex flex-wrap items-center justify-center gap-2.5">
      <span class="text-sm font-medium text-slate-500">Or try a sample:</span>
      ${sampleChip('sarah-mitchell-marketing', 'Sarah Mitchell', 'Marketing', 56)}
      ${sampleChip('michael-chen-swe', 'Michael Chen', 'Software', 79)}
    </div>
    <p class="mt-4 text-xs text-slate-400">Any URL works in demo mode — results are sample-based, not your real data.</p>
  </div>
</section>`;
}

function stepCard(num: string, iconName: Parameters<typeof icon>[0], title: string, body: string): string {
  return `<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
  <div class="flex items-center gap-3">
    <span class="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">${icon(iconName, 'h-5 w-5')}</span>
    <span class="text-sm font-bold text-slate-400">Step ${num}</span>
  </div>
  <h3 class="mt-4 text-lg font-bold text-slate-900">${title}</h3>
  <p class="mt-2 text-sm leading-relaxed text-slate-600">${body}</p>
</div>`;
}

function howHtml(): string {
  return `<section id="how" class="bg-slate-50 py-20 sm:py-24">
  <div class="mx-auto max-w-6xl px-4">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">How it works</h2>
      <p class="mt-3 text-lg text-slate-600">Three steps. No account, no LinkedIn login, nothing to install.</p>
    </div>
    <div class="mt-12 grid gap-6 md:grid-cols-3">
      ${stepCard('1', 'search', 'Paste the profile URL', 'Send KY any LinkedIn profile — yours, a candidate, a client. Public information only, and in Phase 1, demo data.')}
      ${stepCard('2', 'zap', `Runs ${CHECKPOINTS}+ checkpoints`, 'Headline, About, experience, education, skills, activity, media and presence — each scored 0–100 against industry benchmarks.')}
      ${stepCard('3', 'target', 'Get your 3 priority fixes', 'A benchmarked overall score, your keyword gaps, and the highest-impact changes — written so you can act on them today.')}
    </div>
  </div>
</section>`;
}

function sampleCardHtml(slug: string): string {
  const c = CURATED.find((x) => x.slug === slug);
  if (!c) return '';
  const overall = computeOverall(c.sections);
  const weakest = [...c.sections].sort((a, b) => a.score - b.score).slice(0, 2);
  const weakestChips = weakest
    .map((s) => {
      const def = SECTION_DEFS.find((d) => d.key === s.key);
      const col = scoreColor(s.score);
      return `<span class="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">${escapeHtml(def ? def.label : s.key)} <span style="color:${col}">${s.score}</span></span>`;
    })
    .join('');
  return `<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
  <div class="flex items-center gap-4">
    <div class="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand/10 font-bold text-brand">${c.initials}</div>
    <div class="min-w-0 flex-1">
      <p class="font-bold text-slate-900">${escapeHtml(c.name)}</p>
      <p class="text-sm text-slate-500">${escapeHtml(c.role)} · ${escapeHtml(c.company)}</p>
    </div>
    <div class="relative h-16 w-16 shrink-0">
      ${scoreDial(overall, 64, 6)}
      <div class="absolute inset-0 grid place-items-center">
        <span class="text-sm font-extrabold" style="color:${scoreColor(overall)}">${overall}</span>
      </div>
    </div>
  </div>
  <p class="mt-4 text-sm text-slate-600">Better than <strong class="text-slate-900">${c.percentile}%</strong> of ${escapeHtml(c.industry)} profiles</p>
  <div class="mt-3 flex flex-wrap gap-2">${weakestChips}</div>
  <button type="button" data-sample-view="${c.slug}" class="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand py-2.5 font-semibold text-brand transition hover:bg-brand hover:text-white">
    View full report ${icon('arrowRight', 'h-4 w-4')}
  </button>
</div>`;
}

function samplesHtml(): string {
  return `<section id="samples" class="bg-white py-20 sm:py-24">
  <div class="mx-auto max-w-6xl px-4">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Sample reports</h2>
      <p class="mt-3 text-lg text-slate-600">Two realistic profiles. One underperforms, one nearly peaks — see exactly what KY points out in each.</p>
    </div>
    <div class="mt-12 grid gap-6 md:grid-cols-2">
      ${sampleCardHtml('sarah-mitchell-marketing')}
      ${sampleCardHtml('michael-chen-swe')}
    </div>
  </div>
</section>`;
}

function sectionsHtml(): string {
  const cards = SECTION_DEFS.map(
    (d) => `<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div class="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">${icon(d.icon, 'h-5 w-5')}</div>
    <h3 class="mt-3 font-bold text-slate-900">${escapeHtml(d.label)}</h3>
    <p class="mt-1.5 text-sm leading-relaxed text-slate-600">${escapeHtml(d.desc)}</p>
  </div>`
  );
  return `<section class="bg-slate-50 py-20 sm:py-24">
  <div class="mx-auto max-w-6xl px-4">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">What we audit</h2>
      <p class="mt-3 text-lg text-slate-600">Eight sections, ${CHECKPOINTS}+ checkpoints — everything a recruiter or client scans in the first 60 seconds.</p>
    </div>
    <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      ${cards.join('')}
    </div>
  </div>
</section>`;
}

function pricingHtml(): string {
  return `<section id="pricing" class="bg-white py-20 sm:py-24">
  <div class="mx-auto max-w-6xl px-4">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Pricing</h2>
      <p class="mt-3 text-lg text-slate-600">Phase 1 is completely free. Pro lands in Phase 2 with an early-bird price.</p>
    </div>
    <div class="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
      <div class="rounded-2xl border-2 border-brand bg-white p-7 shadow-sm">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-slate-900">Free</h3>
          <span class="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">Phase 1</span>
        </div>
        <p class="mt-2 text-sm text-slate-500">Everything you need to see exactly how your profile is read.</p>
        <p class="mt-5 text-4xl font-extrabold text-slate-900">$0<span class="text-base font-medium text-slate-400"> / forever</span></p>
        <ul class="mt-6 space-y-3 text-sm text-slate-600">
          ${['Full 8-section audit', 'Industry benchmark & percentile', 'Keyword gap analysis', '3 priority fixes, written for action', 'Shareable report (copy, PDF, LinkedIn post)'].map(
            (f) => `<li class="flex items-start gap-2.5">${icon('check', 'h-4 w-4 shrink-0 text-emerald-600')} ${f}</li>`
          ).join('')}
        </ul>
        <a href="#audit" class="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-brand py-3 font-semibold text-white transition hover:bg-brand-dark">Run your free audit</a>
      </div>
      <div class="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-slate-900">Pro</h3>
          <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">Phase 2</span>
        </div>
        <p class="mt-2 text-sm text-slate-500">For job hunters, founders and recruiters who audit regularly.</p>
        <p class="mt-5 text-4xl font-extrabold text-slate-900">$12<span class="text-base font-medium text-slate-400"> / month early bird</span></p>
        <ul class="mt-6 space-y-3 text-sm text-slate-600">
          ${['Live audits of real public profiles', 'AI rewrites for every section', 'Weekly re-audits & score tracking', 'Keyword tracking with alerts', '1-page PDF report, resume-ready'].map(
            (f) => `<li class="flex items-start gap-2.5">${icon('check', 'h-4 w-4 shrink-0 text-brand')} ${f}</li>`
          ).join('')}
        </ul>
        <a href="#waitlist" class="mt-7 inline-flex w-full items-center justify-center rounded-xl border border-slate-300 py-3 font-semibold text-slate-700 transition hover:border-brand hover:text-brand">Join the waitlist</a>
      </div>
    </div>
  </div>
</section>`;
}

function waitlistHtml(): string {
  return `<section id="waitlist" class="bg-ink py-16 text-white sm:py-20">
  <div class="mx-auto max-w-2xl px-4 text-center">
    <h2 class="text-3xl font-extrabold tracking-tight">Be first when live audits ship</h2>
    <p class="mt-3 text-lg text-slate-300">Phase 2 adds real profile analysis, AI rewrites and weekly tracking. Waitlist members get early access and 3 months free.</p>
    <form id="waitlist-form" class="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row" novalidate>
      <label class="sr-only" for="waitlist-email">Email address</label>
      <input id="waitlist-email" type="email" placeholder="you@example.com"
        class="w-full flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"/>
      <button type="submit" class="rounded-xl bg-sky-500 px-6 py-3 font-semibold text-ink transition hover:bg-sky-400">Join waitlist</button>
    </form>
  </div>
</section>`;
}

function faqItem(q: string, a: string): string {
  return `<details class="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
  <summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900 [&::-webkit-details-marker]:hidden">
    ${q}
    <span class="shrink-0 text-slate-400 transition-transform group-open:rotate-180">${icon('chevronDown', 'h-5 w-5')}</span>
  </summary>
  <p class="mt-3 text-sm leading-relaxed text-slate-600">${a}</p>
</details>`;
}

function faqHtml(): string {
  return `<section id="faq" class="bg-slate-50 py-20 sm:py-24">
  <div class="mx-auto max-w-3xl px-4">
    <div class="text-center">
      <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">FAQ</h2>
    </div>
    <div class="mt-10 space-y-4">
      ${faqItem(
        'Is this using my real profile data?',
        'Not yet. Phase 1 is a demonstration build: every audit runs on realistic, sample-based data so you can explore the full experience end-to-end. Live analysis of public profiles arrives in Phase 2.'
      )}
      ${faqItem(
        'How is the score calculated?',
        `Each of the 8 sections is scored 0–100 against ${CHECKPOINTS}+ checkpoints (length, keywords, quantified results, recency, media, visual polish). The overall score is a weighted blend — experience and headline weigh most, because that's what recruiters read first.`
      )}
      ${faqItem(
        'Is KY affiliated with LinkedIn?',
        'No. KY is an independent, unofficial tool. We never ask for your LinkedIn credentials, and Phase 1 reads no real data at all.'
      )}
      ${faqItem(
        'When does Phase 2 ship?',
        'Phase 2 adds live audits of public profiles, AI rewrites for every section, keyword tracking with alerts, and 1-page PDF reports. Waitlist members get early access and 3 months free.'
      )}
      ${faqItem(
        'What is Phase 1 for?',
        'Showing the product, validating the flow and gathering feedback: a shareable demo you can try in 60 seconds, without an account. That is exactly what you are using right now.'
      )}
    </div>
  </div>
</section>`;
}

function footerHtml(): string {
  return `<footer class="bg-ink py-12 text-slate-400">
  <div class="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center">
    <div class="flex items-center gap-2.5">
      ${logoMark()}
      <span class="text-lg font-extrabold tracking-tight text-white">KY</span>
    </div>
    <p class="max-w-md text-sm">LinkedIn profile intelligence for job hunters, founders and the people hiring them.</p>
    <p class="max-w-md text-xs text-slate-500">
      Phase 1 demo — not affiliated with LinkedIn Corporation. Demo data is illustrative and no real profile data is read.
    </p>
    <p class="text-xs text-slate-600">© 2026 KY</p>
  </div>
</footer>`;
}

/** Attach all landing-page handlers. */
export function wireLanding(root: HTMLElement, onAudit: (raw: string) => void): void {
  const form = root.querySelector<HTMLFormElement>('#audit-form');
  const input = root.querySelector<HTMLInputElement>('#profile-url');
  const err = root.querySelector<HTMLElement>('#audit-error');

  if (form && input && err) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = input.value.trim();
      if (!v) {
        err.textContent = 'Paste a LinkedIn profile URL first.';
        err.classList.remove('hidden');
        input.focus();
        return;
      }
      err.classList.add('hidden');
      onAudit(v);
    });
  }

  root.querySelectorAll<HTMLElement>('[data-sample]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const c = CURATED.find((x) => x.slug === (btn.dataset.sample ?? ''));
      if (!c) return;
      if (input) input.value = c.url;
      onAudit(c.url);
    });
  });

  root.querySelectorAll<HTMLElement>('[data-sample-view]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const c = CURATED.find((x) => x.slug === (btn.dataset.sampleView ?? ''));
      if (c) onAudit(c.url);
    });
  });

  const wl = root.querySelector<HTMLFormElement>('#waitlist-form');
  const wlEmail = root.querySelector<HTMLInputElement>('#waitlist-email');
  if (wl && wlEmail) {
    wl.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = wlEmail.value.trim();
      if (!v.includes('@')) {
        toast('Enter a valid email first (demo — nothing is sent).');
        wlEmail.focus();
        return;
      }
      toast("You're on the waitlist 🎉 (demo — nothing is sent)");
      wlEmail.value = '';
    });
  }
}
