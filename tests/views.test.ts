/**
 * Render tests for the view layer.
 *
 * The view modules build HTML strings, so they can run in Node with a stub
 * localStorage and no browser. These catch runtime failures that the type
 * checker cannot: undefined property access, a bad template, a store read that
 * throws. Run with `npm run test`.
 */
import assert from 'node:assert/strict';
import { before, test } from 'node:test';

import { landingHtml } from '../app/src/views/landing';
import { reportHtml, reportText, shareText } from '../app/src/views/report';
import { historyHtml } from '../app/src/views/history';
import { scanningHtml } from '../app/src/views/scanning';
import { trendSvg } from '../app/src/components/charts';
import { analyze, analyzeText } from '../app/src/analysis';
import { parseProfileUrl } from '../app/src/lib/url';
import { newAuditId, saveAudit, addTracked, listAudits, setAccount } from '../app/src/lib/store';

const SAMPLE = `Alex Morgan
Senior Product Manager | B2B SaaS | +38% activation
Lisbon, Portugal

About
I'm a product manager with 9 years in B2B SaaS, focused on onboarding.

Most recently I lifted activation by 38% in two quarters.

I work across Product Strategy, A/B Testing and SQL. Let's talk — alex@example.com.

Experience

Senior Product Manager
Acme Cloud
Jan 2021 - Present
• Led onboarding redesign that increased activation by 38%
• Cut time-to-first-value from 14 days to 3 days

Product Manager
Northwind
Mar 2018 - Dec 2020
• Grew weekly active users from 12k to 31k

Education

MSc Human-Computer Interaction
University of Lisbon
2016 - 2018

Skills
Product Strategy, A/B Testing, SQL, Roadmapping, Product Discovery, Figma`;

function installLocalStorage(): void {
  const map = new Map<string, string>();
  (globalThis as unknown as { localStorage: unknown }).localStorage = {
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => {
      map.set(k, String(v));
    },
    removeItem: (k: string) => {
      map.delete(k);
    },
    clear: () => map.clear(),
  };
}

/** Fails if a template leaked an undefined value into the markup. */
function assertNoLeaks(html: string, label: string): void {
  for (const bad of ['undefined', 'NaN', '[object Object]']) {
    assert.equal(html.includes(bad), false, `${label} leaked "${bad}" into the markup`);
  }
}

before(() => {
  installLocalStorage();
  // shareText() builds the live link from window.location.
  (globalThis as unknown as { window: unknown }).window = {
    location: { href: 'https://nagamunukutla.github.io/KY/#report' },
  };
});

/* ---------------- landing ---------------- */

test('landing renders both audit modes and the Phase 2 copy', () => {
  const html = landingHtml();
  assertNoLeaks(html, 'landing');
  assert.ok(html.includes('data-tab="paste"'), 'paste tab present');
  assert.ok(html.includes('data-tab="url"'), 'url tab present');
  assert.ok(html.includes('id="paste-form"'));
  assert.ok(html.includes('id="audit-form"'));
  for (const flag of ['photo', 'banner', 'customUrl', 'featured', 'active90']) {
    assert.ok(html.includes(`data-flag="${flag}"`), `flag ${flag} present`);
  }
  assert.ok(html.includes('Phase 2'), 'hero no longer says Phase 1 demo');
  assert.equal(html.includes('Phase 1 demo &middot;'), false);
  assert.ok(html.includes('data-open-history'), 'history entry point in nav');
  assert.ok(html.includes('data-open-plan'), 'plan entry point in pricing');
});

/* ---------------- scanning ---------------- */

test('scanning steps never claim to fetch LinkedIn in real mode', () => {
  const real = scanningHtml(analyzeText(SAMPLE));
  assert.equal(real.includes('Fetching public profile data'), false);
  assert.ok(real.includes('Parsing the text you pasted'));

  const demo = scanningHtml(analyze(parseProfileUrl('https://www.linkedin.com/in/sarah-mitchell-marketing')));
  assert.ok(demo.includes('Loading sample profile data'));
});

/* ---------------- report ---------------- */

test('real-mode report renders coverage, rewrites and the print page', () => {
  const r = analyzeText(SAMPLE);
  const html = reportHtml(r);
  assertNoLeaks(html, 'real report');
  assert.ok(html.includes('Real analysis'));
  assert.ok(html.includes('Keyword coverage'));
  assert.ok(html.includes('Rewrites'));
  assert.ok(html.includes('print-only'), 'one-page print layout present');
  assert.ok(html.includes('Save to history'));
  assert.ok(html.includes(String(r.overall)));
  assert.ok(html.includes('not scored'), 'unscorable sections are labelled, not faked');
});

test('demo-mode report keeps the Phase 1 layout and is labelled as demo', () => {
  const r = analyze(parseProfileUrl('https://www.linkedin.com/in/sarah-mitchell-marketing'));
  const html = reportHtml(r);
  assertNoLeaks(html, 'demo report');
  assert.ok(html.includes('Demo data'));
  assert.ok(html.includes('Keyword gaps'));
  assert.ok(html.includes('Headline, rewritten'));
  assert.equal(html.includes('Keyword coverage'), false);
});

test('user-supplied text is escaped everywhere it is rendered', () => {
  const hostile = SAMPLE.replace(
    'Alex Morgan',
    '<img src=x onerror=alert(1)> <script>alert("xss")</script>'
  );
  const html = reportHtml(analyzeText(hostile));
  assert.equal(html.includes('<script>'), false, 'script tag must be escaped');
  assert.equal(html.includes('<img src=x'), false, 'img tag must be escaped');
  assert.ok(html.includes('&lt;script&gt;'), 'escaped form present instead');
});

test('report text and share text are complete', () => {
  const r = analyzeText(SAMPLE);
  const text = reportText(r);
  assert.ok(text.includes('Overall:'));
  assert.ok(text.includes('Section scores:'));
  assert.ok(text.includes('Keywords found'));
  assert.ok(text.includes('Rewrites:'));
  assert.equal(text.includes('undefined'), false);

  const share = shareText(r);
  assert.ok(share.includes(`${r.overall}/100`));
  assert.ok(share.includes('#LinkedIn'));
  assert.ok(share.includes('https://nagamunukutla.github.io/KY/'), 'share link points at the live site');
  assert.equal(share.includes('#report'), false, 'the hash is stripped from the shared link');
});

/* ---------------- history ---------------- */

test('history shows an empty state, then a trend once there are two runs', () => {
  const empty = historyHtml();
  assertNoLeaks(empty, 'empty history');
  assert.ok(empty.includes('No audits saved yet'));
  assert.equal(empty.includes('Score trend'), false);

  const r = analyzeText(SAMPLE);
  const base = {
    profileKey: r.profileKey,
    label: r.name,
    source: r.input.display,
    industry: r.industry,
    mode: 'text' as const,
    percentile: r.percentile,
    sections: r.sections.filter((s) => s.basis !== 'unknown').map((s) => ({ key: s.key, score: s.score })),
    covered: r.keywordReport?.covered ?? [],
    gaps: r.keywordReport?.gaps ?? [],
  };

  saveAudit({ ...base, id: newAuditId(), overall: 52, createdAt: new Date(Date.now() - 864e5).toISOString() });
  saveAudit({ ...base, id: newAuditId(), overall: r.overall, createdAt: new Date().toISOString() });

  const html = historyHtml();
  assertNoLeaks(html, 'history');
  assert.ok(html.includes('Score trend'), 'trend section appears with 2 runs');
  assert.ok(html.includes('<svg'), 'trend chart rendered');
  assert.ok(html.includes('Saved audits'));
  assert.equal(html.includes('No audits saved yet'), false);
});

test('tracked keywords and the demo account appear on the history page', () => {
  addTracked('Lifecycle Marketing');
  setAccount({ name: 'Alex Morgan', email: 'alex@example.com', plan: 'pro', createdAt: new Date().toISOString() });
  const html = historyHtml();
  assert.ok(html.includes('Lifecycle Marketing'));
  assert.ok(html.includes('Alex Morgan'));
  assert.ok(html.includes('data-untrack'));
  setAccount(null);
});

test('the stored audit round-trips through local storage', () => {
  const audits = listAudits();
  assert.ok(audits.length >= 2);
  assert.equal(audits[0].mode, 'text');
  assert.ok(audits[0].sections.length > 0);
});

/* ---------------- chart ---------------- */

test('trend chart needs two points and refuses to draw a fake line', () => {
  assert.equal(trendSvg([]), '');
  assert.equal(trendSvg([{ label: 'a', value: 50, when: '1 Jan' }]), '');
  const svg = trendSvg([
    { label: 'a', value: 40, when: '1 Jan' },
    { label: 'b', value: 65, when: '8 Jan' },
    { label: 'c', value: 61, when: '15 Jan' },
  ]);
  assert.ok(svg.includes('<svg'));
  assert.ok(svg.includes('40') && svg.includes('65'));
  assert.equal(svg.includes('undefined'), false);
});
