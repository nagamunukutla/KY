import { INDUSTRIES } from '../data/industries';
import type { Industry } from '../data/industries';
import type { SectionKey } from '../data/sections';
import { contains } from './score';

/**
 * Phase 2 — real keyword coverage.
 *
 * Phase 1 sampled five random industry terms and called them "gaps". This
 * actually searches the pasted text for every industry term and reports where
 * each one appears, so a gap is a term genuinely absent from the profile.
 */

export interface KeywordHit {
  keyword: string;
  found: boolean;
  where: SectionKey[];
  /** Tracked keywords come from the user, not the industry list. */
  tracked: boolean;
}

export interface KeywordReport {
  industry: Industry;
  confidence: number;
  coverage: KeywordHit[];
  gaps: string[];
  covered: string[];
}

const SECTION_ORDER: SectionKey[] = ['headline', 'about', 'experience', 'education', 'skills', 'activity', 'media', 'presence'];

/** Score every industry against the text; the best match wins. */
export function detectIndustry(text: string): { industry: Industry; confidence: number } {
  let best = INDUSTRIES[0];
  let bestScore = -1;

  for (const ind of INDUSTRIES) {
    let score = 0;
    for (const k of ind.keywords) {
      // Count occurrences rather than mere presence — repeated terms win.
      const re = new RegExp(`\\b${escapeRe(k)}\\b`, 'gi');
      const m = text.match(re);
      score += m ? Math.min(m.length, 4) : 0;
    }
    if (score > bestScore) {
      bestScore = score;
      best = ind;
    }
  }

  const maxPossible = best.keywords.length * 4;
  return { industry: best, confidence: maxPossible > 0 ? Math.min(1, bestScore / Math.max(8, maxPossible / 2)) : 0 };
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export interface CoverageInput {
  headline: string;
  about: string;
  experience: string;
  education: string;
  skills: string;
  activity: string;
  media: string;
  presence: string;
}

export function keywordReport(
  input: CoverageInput,
  industry: Industry,
  confidence: number,
  tracked: readonly string[] = []
): KeywordReport {
  const terms: { keyword: string; tracked: boolean }[] = [
    ...tracked.map((k) => ({ keyword: k, tracked: true })),
    ...industry.keywords.filter((k) => !tracked.some((t) => t.toLowerCase() === k.toLowerCase())).map((k) => ({ keyword: k, tracked: false })),
  ];

  const coverage: KeywordHit[] = terms.map(({ keyword, tracked: isTracked }) => {
    const where = SECTION_ORDER.filter((key) => contains(input[key], keyword));
    return { keyword, found: where.length > 0, where, tracked: isTracked };
  });

  return {
    industry,
    confidence,
    coverage,
    gaps: coverage.filter((c) => !c.found).map((c) => c.keyword),
    covered: coverage.filter((c) => c.found).map((c) => c.keyword),
  };
}

/** Build the per-section text blocks a keyword search runs against. */
export function toCoverageInput(p: {
  headline: string;
  about: string;
  experience: { title: string; company: string; bullets: string[] }[];
  education: string[];
  certifications: string[];
  skills: string[];
  activityBlock: string;
  links: string[];
  flags: { customUrl: boolean | null };
}): CoverageInput {
  return {
    headline: p.headline,
    about: p.about,
    experience: p.experience.map((e) => `${e.title} ${e.company} ${e.bullets.join(' ')}`).join(' '),
    education: [...p.education, ...p.certifications].join(' '),
    skills: p.skills.join(' '),
    activity: p.activityBlock,
    media: p.links.join(' '),
    presence: p.flags.customUrl === true ? 'custom public url vanity url' : '',
  };
}
