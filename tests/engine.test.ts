/**
 * Functional tests for the Phase 2 analysis engine.
 *
 * Run with `npm run test`. The runner (scripts/run-tests.mjs) bundles this file
 * with Vite and executes it under node:test, so there is no test framework to
 * install. These exercise the real code path used by the app:
 * parseProfileText -> scoreProfile -> keywordReport -> buildRewrites.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { parseProfileText, hasMetric, isWeakHeadline, hasCta, hasFirstPerson } from '../app/src/parse/profile';
import { detectIndustry, keywordReport, toCoverageInput } from '../app/src/parse/keywords';
import { inferRole } from '../app/src/parse/rewrite';
import { analyze, analyzeText, computeAlerts, computeDelta } from '../app/src/analysis';
import { parseProfileUrl } from '../app/src/lib/url';
import type { StoredAudit } from '../app/src/lib/store';

const STRONG = `Alex Morgan
Senior Product Manager | B2B SaaS | +38% activation
Lisbon, Portugal
500+ connections

About
I'm a product manager with 9 years in B2B SaaS, focused on onboarding and activation.

Most recently I led the redesign of our onboarding flow and lifted activation by 38% in two quarters.

I work across Product Strategy, A/B Testing, SQL and Lifecycle Marketing. Let's talk — reach me at alex@example.com.

Experience

Senior Product Manager
Acme Cloud
Jan 2021 - Present
• Led onboarding redesign that increased activation by 38% in two quarters
• Cut time-to-first-value from 14 days to 3 days across 4,000 accounts
• Shipped a lifecycle email programme that grew trial-to-paid conversion by 22%
• Ran 40+ A/B tests on pricing and packaging

Product Manager
Northwind
Mar 2018 - Dec 2020
• Owned the analytics roadmap; grew weekly active users from 12k to 31k
• Launched self-serve onboarding, reducing sales-assisted setups by 60%

Education

MSc Human-Computer Interaction
University of Lisbon
2016 - 2018

BSc Computer Science
University of Porto
2013 - 2016

Certifications
Product Analytics Certification, 2022

Skills
Product Strategy, A/B Testing, SQL, Lifecycle Marketing, Roadmapping, Stakeholder Management, Product Discovery, Figma, Data Analysis, Customer Research`;

const WEAK = `Jamie Doe
Marketing enthusiast looking for new opportunities
Manchester

About
Passionate marketing professional with experience in various areas of marketing and social media.

Experience

Marketing Assistant
Some Agency
2020 - 2023
• Responsible for social media
• Helped with campaigns

Education
Marketing diploma`;

const sectionOf = (r: ReturnType<typeof analyzeText>, key: string): number =>
  r.sections.find((s) => s.key === key)?.score ?? -1;

/* ---------------- parser ---------------- */

test('parser extracts name, headline and location', () => {
  const p = parseProfileText(STRONG);
  assert.equal(p.name, 'Alex Morgan');
  assert.equal(p.headline, 'Senior Product Manager | B2B SaaS | +38% activation');
  assert.equal(p.location, 'Lisbon, Portugal');
});

test('parser splits experience into roles with bullets', () => {
  const p = parseProfileText(STRONG);
  assert.equal(p.experience.length, 2);
  assert.equal(p.experience[0].title, 'Senior Product Manager');
  assert.equal(p.experience[0].company, 'Acme Cloud');
  assert.equal(p.experience[0].dates, 'Jan 2021 - Present');
  assert.equal(p.experience[0].bullets.length, 4);
  assert.equal(p.experience[0].metricBullets, 4, 'every Acme bullet carries a number');
  assert.equal(p.experience[1].bullets.length, 2);
});

test('parser counts metrics in bullets', () => {
  const p = parseProfileText(STRONG);
  assert.equal(p.bulletCount, 6);
  assert.equal(p.metricCount, 6);

  const weak = parseProfileText(WEAK);
  assert.equal(weak.bulletCount, 2);
  assert.equal(weak.metricCount, 0, 'duty bullets contain no numbers');
});

test('tenure uses the earliest year across roles, not the latest per role', () => {
  const p = parseProfileText(STRONG);
  const expected = new Date().getFullYear() - 2018;
  assert.equal(p.yearsExperience, expected);
});

test('hasMetric detects numbers, currency and action verbs', () => {
  assert.equal(hasMetric('Grew revenue by 22%'), true);
  assert.equal(hasMetric('Saved $1.2M in infra spend'), true);
  assert.equal(hasMetric('Reduced churn from 8% to 3%'), true);
  assert.equal(hasMetric('Ran 40+ A/B tests on pricing and packaging'), true, 'a bare count is still proof');
  assert.equal(hasMetric('Managed 5 direct reports'), true);
  assert.equal(hasMetric('Responsible for social media'), false);
  assert.equal(hasMetric('Helped with campaigns'), false);
});

test('skills and education are parsed separately', () => {
  const p = parseProfileText(STRONG);
  assert.ok(p.skills.length >= 10, `expected >=10 skills, got ${p.skills.length}`);
  assert.ok(p.skills.includes('SQL'));
  assert.ok(p.education.some((e) => /MSc/.test(e)));
  assert.equal(p.certifications.length, 1);
});

test('inline "About:" on one line is still captured', () => {
  const p = parseProfileText('Sam Lee\nAnalyst\nAbout: I build models that cut fraud by 30%.\n');
  assert.ok(p.aboutWords > 5, `about words: ${p.aboutWords}`);
});

/* ---------------- scoring ---------------- */

test('a strong paste scores well above a weak paste', () => {
  const strong = analyzeText(STRONG);
  const weak = analyzeText(WEAK);
  assert.ok(strong.overall > 70, `strong overall was ${strong.overall}`);
  assert.ok(weak.overall < 55, `weak overall was ${weak.overall}`);
  assert.ok(strong.overall - weak.overall >= 25);
});

test('sections that a text paste cannot prove are excluded, not scored zero', () => {
  const r = analyzeText(STRONG);
  const presence = r.sections.find((s) => s.key === 'presence');
  assert.equal(presence?.basis, 'unknown');
  // STRONG has no Activity block, no links and no visual flags, so three
  // sections are genuinely unprovable from text alone.
  assert.deepEqual(r.excluded.sort(), ['Activity', 'Media & featured', 'Visual presence'].sort());
  assert.equal(r.measuredCount, 5);
  assert.equal(r.overall > 0, true, 'an excluded section must not zero the score');

  // Weights are re-normalised, so a 0-weight section cannot drag the total down.
  const measured = r.sections.filter((s) => s.basis !== 'unknown');
  const sum = measured.reduce((a, s) => a + s.weight, 0);
  assert.ok(Math.abs(sum - 0.72) < 0.001, `remaining weights sum to ${sum}`);
});

test('answering the visual/behavioural checkboxes scores all 8 sections', () => {
  const r = analyzeText(STRONG, {
    photo: true,
    banner: true,
    customUrl: true,
    featured: true,
    active90: true,
  });
  assert.equal(r.measuredCount, 8);
  assert.deepEqual(r.excluded, []);
  const sum = r.sections.reduce((a, s) => a + s.weight, 0);
  assert.ok(Math.abs(sum - 1) < 0.001, `all weights should sum to 1, got ${sum}`);
});

test('visual flags move presence from unknown to a real score', () => {
  const without = analyzeText(STRONG);
  const withFlags = analyzeText(STRONG, { photo: true, banner: true, customUrl: true });
  assert.equal(without.excluded.includes('Visual presence'), true);
  assert.equal(withFlags.excluded.includes('Visual presence'), false);
  assert.equal(sectionOf(withFlags, 'presence'), 100);

  const none = analyzeText(STRONG, { photo: false, banner: false, customUrl: false });
  assert.equal(sectionOf(none, 'presence'), 0);
});

test('unquantified bullets are called out explicitly', () => {
  const weak = analyzeText(WEAK);
  const exp = weak.sections.find((s) => s.key === 'experience');
  assert.ok(exp?.issues.some((i) => /none contain a number/i.test(i)), JSON.stringify(exp?.issues));
});

test('headline scoring rewards structure and punishes job-seeking phrasing', () => {
  const strong = analyzeText(STRONG);
  const weak = analyzeText(WEAK);
  assert.ok(sectionOf(strong, 'headline') > 80);
  assert.ok(sectionOf(weak, 'headline') < 50);
  assert.equal(isWeakHeadline('Marketing enthusiast looking for new opportunities'), true);
  assert.equal(isWeakHeadline('Senior PM | B2B SaaS | +38% activation'), false);
});

test('About scoring rewards first person, proof, structure and a CTA', () => {
  const strong = analyzeText(STRONG);
  const about = strong.sections.find((s) => s.key === 'about');
  assert.ok(about?.score ?? 0 > 80, `about score ${about?.score}`);
  assert.ok(about?.wins.some((w) => /call-to-action/i.test(w)));
  assert.equal(hasCta("Let's talk — reach me at a@b.com"), true);
  assert.equal(hasFirstPerson("I'm a product manager"), true);
  assert.equal(hasFirstPerson('Alex is a product manager'), false);
});

test('scoring is deterministic for identical input', () => {
  const a = analyzeText(STRONG);
  const b = analyzeText(STRONG);
  assert.equal(a.overall, b.overall);
  assert.deepEqual(a.sections, b.sections);
  assert.deepEqual(a.keywords, b.keywords);
});

/* ---------------- industry + keywords ---------------- */

test('industry detection picks the best matching vertical', () => {
  assert.equal(detectIndustry(STRONG).industry.label, 'Product');
  assert.equal(detectIndustry('I run SEO, GA4, email marketing and CRO testing for DTC brands').industry.label, 'Marketing');
});

test('keyword report distinguishes real coverage from real gaps', () => {
  const p = parseProfileText(STRONG);
  const { industry, confidence } = detectIndustry(STRONG);
  const kw = keywordReport(toCoverageInput(p), industry, confidence);
  const covered = new Set(kw.covered);
  assert.ok(covered.has('A/B Testing'), 'A/B Testing is in the paste and must be covered');
  assert.ok(kw.gaps.length > 0, 'some industry terms must be missing');
  const hit = kw.coverage.find((c) => c.keyword === 'A/B Testing');
  assert.ok(hit?.where.includes('skills'));
});

test('tracked keywords are merged ahead of the industry list', () => {
  const p = parseProfileText(STRONG);
  const { industry, confidence } = detectIndustry(STRONG);
  const kw = keywordReport(toCoverageInput(p), industry, confidence, ['SQL', 'Pricing Strategy']);
  assert.equal(kw.coverage[0].keyword, 'SQL');
  assert.equal(kw.coverage[0].tracked, true);
  assert.equal(kw.coverage[0].found, true);
  assert.equal(kw.coverage[1].keyword, 'Pricing Strategy');
  assert.equal(kw.coverage[1].found, false);
});

/* ---------------- rewrites ---------------- */

test('rewrites are built from facts in the paste and flag what needs editing', () => {
  const r = analyzeText(STRONG);
  assert.ok(r.rewrites.length >= 4, `expected headline, about, bullets and skills; got ${r.rewrites.length}`);
  const keys = r.rewrites.map((x) => x.key);
  assert.ok(keys.includes('headline'));
  assert.ok(keys.includes('about'));
  assert.ok(keys.includes('experience'));
  assert.ok(keys.includes('skills'));

  const headline = r.rewrites.find((x) => x.key === 'headline');
  assert.ok(headline?.after.includes('Senior Product Manager'), `headline rewrite: ${headline?.after}`);
  assert.ok(headline?.after.includes('|'));
  assert.equal(headline?.needsEdit, false, 'a real number was found, so no placeholder');

  const about = r.rewrites.find((x) => x.key === 'about');
  assert.match(about?.after ?? '', /\[[^\]]+\]/, 'About rewrite must mark unknown facts as placeholders');
  assert.equal(about?.needsEdit, true);
});

test('the headline rewrite falls back to a placeholder when no number exists', () => {
  const r = analyzeText(WEAK);
  const headline = r.rewrites.find((x) => x.key === 'headline');
  assert.match(headline?.after ?? '', /\[your strongest number\]/);
  assert.equal(headline?.needsEdit, true);
});

test('only duty bullets are rewritten into action + result + number', () => {
  const r = analyzeText(WEAK);
  const bulletRewrites = r.rewrites.filter((x) => x.key === 'experience');
  assert.equal(bulletRewrites.length, 2);
  assert.ok(bulletRewrites.every((b) => /\[result\] in \[number \+ timeframe\]/.test(b.after)));
});

test('inferRole prefers the most recent job title', () => {
  const p = parseProfileText(STRONG);
  const { industry } = detectIndustry(STRONG);
  assert.equal(inferRole(p, industry), 'Senior Product Manager');
});

/* ---------------- history, delta, alerts ---------------- */

function storedResult(r: ReturnType<typeof analyzeText>, id: string): StoredAudit {
  return {
    id,
    profileKey: r.profileKey,
    label: r.name,
    source: r.input.display,
    industry: r.industry,
    mode: 'text',
    overall: r.overall,
    percentile: r.percentile,
    sections: r.sections.filter((s) => s.basis !== 'unknown').map((s) => ({ key: s.key, score: s.score })),
    covered: r.keywordReport?.covered ?? [],
    gaps: r.keywords,
    createdAt: new Date(Date.now() - 7 * 864e5).toISOString(),
  };
}

test('delta reports the score and per-section change vs the previous run', () => {
  const now = analyzeText(STRONG);
  const prev = storedResult(now, 'prev');
  prev.overall = now.overall - 12;
  const target = prev.sections.find((s) => s.key === 'skills');
  if (target) target.score -= 20;

  const delta = computeDelta(now, prev);
  assert.ok(delta);
  assert.equal(delta?.overall, 12);
  assert.equal(delta?.sections[0].key, 'skills');
  assert.equal(delta?.sections[0].change, 20);
});

test('no previous run means no delta and no alerts', () => {
  const now = analyzeText(STRONG);
  assert.equal(computeDelta(now, null), null);
  assert.deepEqual(computeAlerts(now, null, null), []);
});

test('alerts fire on score drops and on lost keyword coverage', () => {
  const now = analyzeText(STRONG);
  const prev = storedResult(now, 'prev');
  prev.overall = now.overall + 9;
  prev.covered = [...(now.keywordReport?.covered ?? []), 'Pricing Strategy'];

  const delta = computeDelta(now, prev);
  const alerts = computeAlerts(now, prev, delta);
  assert.ok(alerts.some((a) => a.kind === 'down'), JSON.stringify(alerts));
  assert.ok(alerts.some((a) => a.kind === 'keyword-lost' && a.text.includes('Pricing Strategy')));
});

test('a score improvement raises an "up" alert', () => {
  const now = analyzeText(STRONG);
  const prev = storedResult(now, 'prev');
  prev.overall = now.overall - 14;
  prev.covered = now.keywordReport?.covered ?? [];
  const alerts = computeAlerts(now, prev, computeDelta(now, prev));
  assert.ok(alerts.some((a) => a.kind === 'up' && a.text.includes('14')));
});

/* ---------------- Phase 1 path must keep working ---------------- */

test('the Phase 1 URL engine still produces a full 8-section report', () => {
  const r = analyze(parseProfileUrl('https://www.linkedin.com/in/sarah-mitchell-marketing'));
  assert.equal(r.source, 'curated');
  assert.equal(r.mode, 'url-demo');
  assert.equal(r.sections.length, 8);
  assert.equal(r.name, 'Sarah Mitchell');
  assert.equal(r.overall, 56);
  assert.equal(r.measuredCount, 8);
  assert.equal(r.keywordReport, null);
});

test('unknown URLs still get a deterministic estimate', () => {
  const a = analyze(parseProfileUrl('https://www.linkedin.com/in/anyone-at-all'));
  const b = analyze(parseProfileUrl('https://www.linkedin.com/in/anyone-at-all'));
  assert.equal(a.source, 'estimated');
  assert.deepEqual(a.sections, b.sections);
  assert.equal(a.overall, b.overall);
});
