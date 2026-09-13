import { CURATED } from './data/profiles';
import type { CuratedProfile } from './data/profiles';
import { SECTION_DEFS, computeOverall, issuesFor } from './data/sections';
import type { SectionKey } from './data/sections';
import { INDUSTRIES } from './data/industries';
import { clamp, fnv1a, int, mulberry32, pick, sample } from './lib/random';
import type { ParsedUrl } from './lib/url';

export type Impact = 'High' | 'Medium' | 'Low';

export interface SectionScore {
  key: SectionKey;
  label: string;
  score: number;
  issues: string[];
}

export interface Fix {
  title: string;
  detail: string;
  impact: Impact;
}

export interface AnalysisResult {
  source: 'curated' | 'estimated';
  input: ParsedUrl;
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
}

/**
 * Core of the demo: deterministic analysis.
 * - Known sample-profile slugs -> curated, hand-written reports.
 * - Anything else -> a stable, seeded "estimate" so every URL produces a
 *   realistic, repeatable report. No network, no keys, no dead ends.
 */
export function analyze(input: ParsedUrl): AnalysisResult {
  const curated = CURATED.find((c) => c.slug === input.slug);
  return curated ? fromCurated(curated, input) : fromEstimated(input);
}

function labelOf(key: SectionKey): string {
  return SECTION_DEFS.find((d) => d.key === key)?.label ?? key;
}

function buildFixes(sections: SectionScore[]): Fix[] {
  const sorted = [...sections].sort((a, b) => a.score - b.score).slice(0, 3);
  const impacts: Impact[] = ['High', 'Medium', 'Low'];
  return sorted.map((s, i) => {
    const def = SECTION_DEFS.find((d) => d.key === s.key);
    return {
      title: def ? def.fixTitle : 'Improve this section',
      detail: def ? def.fixDetail : 'Bring this section in line with the rest of your profile.',
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
  }));
  return {
    source: 'curated',
    input,
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
  };
}

function fromEstimated(input: ParsedUrl): AnalysisResult {
  const rng = mulberry32(fnv1a(`${input.kind}|${input.slug}`));
  const industry = pick(rng, INDUSTRIES);
  const base = int(rng, 40, 72);

  const sections: SectionScore[] = SECTION_DEFS.map((d) => {
    const score = clamp(base + int(rng, -12, 14), 18, 95);
    return { key: d.key, label: d.label, score, issues: issuesFor(d.key, score, rng) };
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
    source: 'estimated',
    input,
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
  };
}
