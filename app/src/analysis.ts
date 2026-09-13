import { CURATED } from './data/profiles';
import type { CuratedProfile } from './data/profiles';
import { SECTION_DEFS, computeOverall, issuesFor } from './data/sections';
import type { SectionKey } from './data/sections';
import { INDUSTRIES } from './data/industries';
import type { Industry } from './data/industries';
import { clamp, fnv1a, int, mulberry32, pick, sample } from './lib/random';
import type { ParsedUrl } from './lib/url';
import { parseProfileText } from './parse/profile';
import type { Basis, ParsedProfile, ProfileFlags } from './parse/profile';
import { scoreProfile } from './parse/score';
import { detectIndustry, keywordReport, toCoverageInput } from './parse/keywords';
import type { KeywordReport } from './parse/keywords';
import { buildRewrites, inferRole } from './parse/rewrite';
import type { Rewrite } from './parse/rewrite';
import type { StoredAudit } from './lib/store';

export type Impact = 'High' | 'Medium' | 'Low';

export interface SectionScore {
  key: SectionKey;
  label: string;
  score: number;
  issues: string[];
  /** What went well — only available in real (text) mode. */
  wins: string[];
  basis: Basis;
  /** 0 when the section could not be read and is excluded from the overall. */
  weight: number;
}

export interface Fix {
  title: string;
  detail: string;
  impact: Impact;
}

export type AlertKind = 'up' | 'down' | 'keyword-lost' | 'keyword-won' | 'section-down';

export interface Alert {
  kind: AlertKind;
  text: string;
}

export interface Delta {
  overall: number;
  sections: { key: SectionKey; label: string; change: number }[];
  previousLabel: string;
  previousDate: string;
}

export interface AnalysisResult {
  /** `url-demo` = Phase 1 sample engine · `text` = Phase 2 real analysis. */
  mode: 'url-demo' | 'text';
  source: 'curated' | 'estimated' | 'pasted';
  input: ParsedUrl;
  /** Stable identity used to compare this profile against earlier runs. */
  profileKey: string;
  name: string;
  initials: string;
  role: string;
  industry: string;
  location: string;
  headline: string;
  overall: number;
  percentile: number;
  sections: SectionScore[];
  fixes: Fix[];
  keywords: string[];
  headlineFix: { before: string; after: string; why: string };
  summary: string;
  /** Phase 2 only. */
  keywordReport: KeywordReport | null;
  rewrites: Rewrite[];
  measuredCount: number;
  excluded: string[];
  signals: string[];
  parsed: ParsedProfile | null;
  alerts: Alert[];
  delta: Delta | null;
}

/**
 * Phase 1 demo engine: deterministic analysis for a pasted URL.
 * - Known sample-profile slugs -> curated, hand-written reports.
 * - Anything else -> a stable, seeded "estimate" so every URL produces a
 *   realistic, repeatable report. No network, no keys, no dead ends.
 */
export function analyze(input: ParsedUrl): AnalysisResult {
  const curated = CURATED.find((c) => c.slug === input.slug);
  const base = curated ? fromCurated(curated, input) : fromEstimated(input);
  return { ...base, keywordReport: null, rewrites: [], measuredCount: 8, excluded: [], signals: [], parsed: null, alerts: [], delta: null };
}

/**
 * Phase 2 real engine: score the text the user actually pasted.
 */
export function analyzeText(raw: string, flags: Partial<ProfileFlags> = {}, url = ''): AnalysisResult {
  const parsed = parseProfileText(raw, { flags });
  const detected = detectIndustry(raw);
  const industry = detected.industry;
  const scored = scoreProfile(parsed, industry);
  const tracked: string[] = [];
  const kw = keywordReport(toCoverageInput(parsed), industry, detected.confidence, tracked);

  const sections: SectionScore[] = scored.sections.map((s) => ({
    key: s.key,
    label: s.label,
    score: s.score,
    issues: s.issues,
    wins: s.wins,
    basis: s.basis,
    weight: s.weight,
  }));

  const role = inferRole(parsed, industry);
  const name = parsed.name || 'Your profile';
  const headlineRewrite = buildRewrites(parsed, industry)[0];
  const input: ParsedUrl = {
    raw: url || 'pasted profile text',
    kind: url ? 'linkedin' : 'other',
    slug: parsed.name ? parsed.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'pasted-profile',
    display: url || `${parsed.words.toLocaleString('en-GB')} words of pasted profile text`,
  };

  const percentile = clamp(scored.overall + Math.round((detected.confidence - 0.4) * 10), 4, 97);

  return {
    mode: 'text',
    source: 'pasted',
    input,
    profileKey: profileKeyFor(input, name),
    name,
    initials: initialsFor(name),
    role: parsed.experience[0]?.company ? `${role} · ${parsed.experience[0].company}` : role,
    industry: industry.label,
    location: parsed.location || '—',
    headline: parsed.headline || '(no headline found)',
    overall: scored.overall,
    percentile,
    sections,
    fixes: buildFixes(sections),
    keywords: kw.gaps.slice(0, 8),
    headlineFix: { before: headlineRewrite.before, after: headlineRewrite.after, why: headlineRewrite.why },
    summary: textSummary(parsed, scored, industry),
    keywordReport: kw,
    rewrites: buildRewrites(parsed, industry),
    measuredCount: scored.measuredCount,
    excluded: scored.excluded,
    signals: describeSignals(parsed),
    parsed,
    alerts: [],
    delta: null,
  };
}

export function profileKeyFor(input: ParsedUrl, name: string): string {
  const who = (name || input.slug).toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `${input.kind}:${who}`;
}

function initialsFor(name: string): string {
  const letters = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
  return letters || 'KY';
}

function textSummary(p: ParsedProfile, scored: ReturnType<typeof scoreProfile>, industry: Industry): string {
  const measured = scored.sections.filter((s) => s.basis !== 'unknown');
  const best = [...measured].sort((a, b) => b.score - a.score)[0];
  const worst = [...measured].sort((a, b) => a.score - b.score)[0];
  const metrics = p.metricCount;
  const bullets = p.bulletCount;

  const parts: string[] = [];
  parts.push(
    `Scored from your real text: ${p.words.toLocaleString('en-GB')} words, ${p.experience.length} role${p.experience.length === 1 ? '' : 's'}, ${bullets} bullet${bullets === 1 ? '' : 's'}.`
  );
  if (best && worst && best.key !== worst.key) {
    parts.push(`Strongest is ${best.label} (${best.score}/100); weakest is ${worst.label} (${worst.score}/100).`);
  }
  if (bullets > 0) {
    parts.push(
      metrics === 0
        ? `None of your ${bullets} bullets contain a number — that is usually the single biggest scoring leak.`
        : `${metrics} of ${bullets} bullets carry a number; the rest still read as duties.`
    );
  }
  if (scored.excluded.length) {
    parts.push(`${scored.excluded.join(' and ')} could not be read from text and were left out of the score.`);
  }
  parts.push(`Detected industry: ${industry.label}.`);
  return parts.join(' ');
}

function describeSignals(p: ParsedProfile): string[] {
  const out = [
    `${p.words.toLocaleString('en-GB')} words parsed`,
    `${p.aboutWords} words in About`,
    `${p.experience.length} roles`,
    `${p.bulletCount} bullets · ${p.metricCount} with numbers`,
    `${p.skills.length} skills`,
    `${p.education.length} education · ${p.certifications.length} certifications`,
    `${p.links.length} links`,
  ];
  if (p.yearsExperience !== null && p.yearsExperience > 0) out.push(`~${p.yearsExperience} years of history`);
  return out;
}

/** Compare this run against a previous saved audit of the same profile. */
export function computeDelta(result: AnalysisResult, prev: StoredAudit | null): Delta | null {
  if (!prev) return null;
  const sectionChanges = result.sections
    .filter((s) => s.basis !== 'unknown')
    .map((s) => {
      const before = prev.sections.find((ps) => ps.key === s.key);
      return { key: s.key, label: s.label, change: before ? s.score - before.score : 0 };
    })
    .filter((c) => c.change !== 0);

  return {
    overall: result.overall - prev.overall,
    sections: sectionChanges.sort((a, b) => Math.abs(b.change) - Math.abs(a.change)).slice(0, 5),
    previousLabel: prev.label,
    previousDate: new Date(prev.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
  };
}

/**
 * Phase 2.5 alerts: what changed since the last saved audit of this profile.
 */
export function computeAlerts(result: AnalysisResult, prev: StoredAudit | null, delta: Delta | null): Alert[] {
  if (!prev || !delta) return [];
  const alerts: Alert[] = [];

  if (delta.overall <= -3) {
    alerts.push({ kind: 'down', text: `Overall score dropped ${Math.abs(delta.overall)} points since ${delta.previousDate}` });
  } else if (delta.overall >= 3) {
    alerts.push({ kind: 'up', text: `Overall score up ${delta.overall} points since ${delta.previousDate}` });
  }

  // Compare case-insensitively, but report keywords in their original casing.
  const nowList = result.keywordReport ? result.keywordReport.covered : [];
  const prevDisplay = new Map(prev.covered.map((k) => [k.toLowerCase(), k]));
  const nowDisplay = new Map(nowList.map((k) => [k.toLowerCase(), k]));

  const lost = [...prevDisplay].filter(([k]) => !nowDisplay.has(k)).map(([, original]) => original);
  if (lost.length) {
    alerts.push({
      kind: 'keyword-lost',
      text: `Keyword${lost.length > 1 ? 's' : ''} no longer found on your profile: ${lost.slice(0, 3).join(', ')}`,
    });
  }

  const won = [...nowDisplay].filter(([k]) => !prevDisplay.has(k)).map(([, original]) => original);
  if (won.length) {
    alerts.push({ kind: 'keyword-won', text: `New keyword coverage: ${won.slice(0, 3).join(', ')}` });
  }

  const worst = delta.sections.filter((s) => s.change <= -8)[0];
  if (worst) {
    alerts.push({ kind: 'section-down', text: `${worst.label} fell ${Math.abs(worst.change)} points — worth a look before it compounds` });
  }

  return alerts;
}

/* ---------- Phase 1 sample engine (unchanged behaviour) ---------- */

function labelOf(key: SectionKey): string {
  return SECTION_DEFS.find((d) => d.key === key)?.label ?? key;
}

function weightOf(key: SectionKey): number {
  return SECTION_DEFS.find((d) => d.key === key)?.weight ?? 0;
}

function buildFixes(sections: SectionScore[]): Fix[] {
  const sorted = [...sections]
    .filter((s) => s.basis !== 'unknown')
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);
  const impacts: Impact[] = ['High', 'Medium', 'Low'];
  return sorted.map((s, i) => {
    const def = SECTION_DEFS.find((d) => d.key === s.key);
    return {
      title: def ? def.fixTitle : 'Improve this section',
      detail: s.issues[0] ?? (def ? def.fixDetail : 'Bring this section in line with the rest of your profile.'),
      impact: impacts[i],
    };
  });
}

function fromCurated(c: CuratedProfile, input: ParsedUrl): AnalysisResult {
  const sections: SectionScore[] = c.sections.map((s) => ({
    key: s.key,
    label: labelOf(s.key),
    score: s.score,
    issues: issuesFor(s.key, s.score),
    wins: [],
    basis: 'measured',
    weight: weightOf(s.key),
  }));
  return {
    mode: 'url-demo',
    source: 'curated',
    input,
    profileKey: profileKeyFor(input, c.name),
    name: c.name,
    initials: c.initials,
    role: `${c.role} · ${c.company}`,
    industry: c.industry,
    location: c.location,
    headline: c.headline,
    overall: computeOverall(sections),
    percentile: c.percentile,
    sections,
    fixes: buildFixes(sections),
    keywords: c.keywords,
    headlineFix: c.headlineFix,
    summary: c.summary,
    keywordReport: null,
    rewrites: [],
    measuredCount: 8,
    excluded: [],
    signals: [],
    parsed: null,
    alerts: [],
    delta: null,
  };
}

function fromEstimated(input: ParsedUrl): AnalysisResult {
  const rng = mulberry32(fnv1a(`${input.kind}|${input.slug}`));
  const industry = pick(rng, INDUSTRIES);
  const base = int(rng, 40, 72);

  const sections: SectionScore[] = SECTION_DEFS.map((d) => {
    const score = clamp(base + int(rng, -12, 14), 18, 95);
    return {
      key: d.key,
      label: d.label,
      score,
      issues: issuesFor(d.key, score, rng),
      wins: [],
      basis: 'measured' as Basis,
      weight: d.weight,
    };
  });

  const overall = computeOverall(sections);
  const percentile = clamp(overall + int(rng, -5, 7), 4, 96);
  const headlineFix = pick(rng, industry.headlines);
  const keywords = sample(rng, industry.keywords, 5);

  const sorted = [...sections].sort((a, b) => a.score - b.score);
  const worst = sorted[0];
  const best = sorted[sorted.length - 1];

  const letters = input.slug.replace(/[^a-z0-9]/g, '').slice(0, 2).toUpperCase();

  return {
    mode: 'url-demo',
    source: 'estimated',
    input,
    profileKey: profileKeyFor(input, 'your profile'),
    name: 'Your profile',
    initials: letters.length >= 2 ? letters : 'KY',
    role: `${industry.label} professional`,
    industry: industry.label,
    location: '—',
    headline: headlineFix.before,
    overall,
    percentile,
    sections,
    fixes: buildFixes(sections),
    keywords,
    headlineFix,
    summary: `A ${industry.label.toLowerCase()} profile with real signal to work with: strongest section is ${best.label} (${best.score}/100), weakest is ${worst.label} (${worst.score}/100). Closing the three lowest-scoring sections is usually the fastest route to a visibly better score.`,
    keywordReport: null,
    rewrites: [],
    measuredCount: 8,
    excluded: [],
    signals: [],
    parsed: null,
    alerts: [],
    delta: null,
  };
}
