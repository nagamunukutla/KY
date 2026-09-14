import { SECTION_DEFS } from '../data/sections';
import type { SectionKey } from '../data/sections';
import type { Industry } from '../data/industries';
import { clamp } from '../lib/random';
import { basisFor, hasCta, hasFirstPerson, isWeakHeadline } from './profile';
import type { Basis, ParsedProfile } from './profile';

/**
 * Phase 2 — real scoring.
 *
 * Unlike the Phase 1 demo estimate, every number here is derived from signals
 * actually found in the pasted text. Sections that a text paste cannot prove
 * (photo, banner, posting cadence) are marked `unknown`, excluded from the
 * overall score, and the remaining weights are re-normalised so the result is
 * still a fair 0–100.
 */

export interface SectionSignal {
  key: SectionKey;
  label: string;
  score: number;
  basis: Basis;
  issues: string[];
  wins: string[];
  weight: number;
}

export interface ScoredProfile {
  sections: SectionSignal[];
  /** Weighted score over the sections that could actually be read. */
  overall: number;
  measuredCount: number;
  excluded: string[];
}

interface Acc {
  score: number;
  issues: string[];
  wins: string[];
}

const acc = (): Acc => ({ score: 0, issues: [], wins: [] });

function add(a: Acc, pts: number, win?: string, issue?: string): void {
  a.score += pts;
  if (win) a.wins.push(win);
  if (issue) a.issues.push(issue);
}

/** Case-insensitive, punctuation-tolerant containment. */
export function contains(haystack: string, needle: string): boolean {
  const norm = (s: string): string => s.toLowerCase().replace(/[^a-z0-9+#.\s]/g, ' ').replace(/\s+/g, ' ');
  return norm(haystack).includes(norm(needle));
}

function coverage(text: string, keywords: readonly string[]): number {
  if (!keywords.length) return 0;
  return keywords.filter((k) => contains(text, k)).length / keywords.length;
}

function scoreHeadline(p: ParsedProfile, industry: Industry): Acc {
  const a = acc();
  const h = p.headline.trim();
  if (!h) {
    a.issues.push('No headline found in the pasted text');
    return a;
  }
  const len = h.length;

  if (len < 25) add(a, 8, undefined, 'Headline is very short — LinkedIn gives you 220 characters');
  else if (len < 45) add(a, 18, undefined, 'Headline is short for the space available');
  else if (len <= 160) add(a, 30, 'Headline length uses the space well');
  else add(a, 20, undefined, 'Headline is near the 220-character limit and may truncate in search results');

  if (/[|·•‖]| – | — | \/ /.test(h)) add(a, 20, 'Clear "Role | Niche | Proof" structure');
  else a.issues.push('No structure — separate role, niche and proof with "|"');

  if (/\d/.test(h)) add(a, 20, 'Headline contains a number — proof recruiters remember');
  else a.issues.push('No number or measurable result in the headline');

  if (isWeakHeadline(h)) a.issues.push('Reads as a job-seeking status ("looking for…"), not a value proposition');
  else add(a, 15, 'Headline sells an outcome rather than a job search');

  const hits = industry.keywords.filter((k) => contains(h, k)).length;
  if (hits === 0) a.issues.push(`None of the ${industry.label} keywords recruiters search appear here`);
  else add(a, Math.min(15, hits * 8), `${hits} searchable ${industry.label} keyword${hits > 1 ? 's' : ''} in the headline`);

  return a;
}

function scoreAbout(p: ParsedProfile, industry: Industry): Acc {
  const a = acc();
  const w = p.aboutWords;
  if (w === 0) {
    a.issues.push('No About section found in the pasted text');
    return a;
  }

  if (w < 60) add(a, 8, undefined, `About is only ${w} words — aim for 150–250`);
  else if (w < 120) add(a, 20, undefined, `About is ${w} words — a little thin for the story you can tell`);
  else if (w <= 280) add(a, 35, `About is ${w} words — the sweet spot recruiters actually read`);
  else if (w <= 420) add(a, 24, undefined, `About runs to ${w} words — trim to keep it scannable`);
  else add(a, 14, undefined, `About is ${w} words — far too long; most readers stop at ~300`);

  if (hasFirstPerson(p.about)) add(a, 10, 'Written in the first person');
  else a.issues.push('Written in the third person — reads like a job description, not a person');

  if (/\d/.test(p.about) && hasMetricish(p.about)) add(a, 15, 'About contains quantified proof');
  else a.issues.push('No measurable result in the About section');

  if (hasCta(p.about)) add(a, 15, 'About ends with a call-to-action');
  else a.issues.push('No call-to-action — tell readers what to do next');

  const cov = coverage(p.about, industry.keywords);
  add(a, Math.round(cov * 15));
  if (cov < 0.15) a.issues.push('About is missing the keywords recruiters search for');

  const paras = p.about.split(/\s{2,}|\n/).filter((s) => s.trim().length > 40).length;
  if (paras >= 2) add(a, 10, 'Broken into readable paragraphs');
  else a.issues.push('About is one unbroken block of text');

  return a;
}

function hasMetricish(text: string): boolean {
  return /\b(?:\d+(?:[.,]\d+)?\s*%|[$€£¥₹]\s?\d|\b\d+x\b|\b\d+(?:k|m|bn)\b)/i.test(text);
}

function scoreExperience(p: ParsedProfile, industry: Industry): Acc {
  const a = acc();
  const entries = p.experience;
  if (!entries.length) {
    a.issues.push('No experience entries found in the pasted text');
    return a;
  }

  const n = entries.length;
  if (n === 1) add(a, 10, undefined, 'Only one role listed — add earlier roles for depth');
  else if (n <= 4) add(a, 20, `${n} roles listed`);
  else add(a, 14, undefined, `${n} roles listed — consider grouping older roles`);

  const avgBullets = p.bulletCount / n;
  if (avgBullets < 1) add(a, 5, undefined, 'Roles average under one bullet each');
  else if (avgBullets < 2) add(a, 14, undefined, 'Roles average fewer than 2 bullets');
  else if (avgBullets <= 5) add(a, 25, `Roles average ${avgBullets.toFixed(1)} bullets`);
  else add(a, 18, undefined, 'Some roles carry too many bullets to be scanned');

  const metricShare = p.bulletCount ? p.metricCount / p.bulletCount : 0;
  if (metricShare === 0) add(a, 0, undefined, `${p.bulletCount} bullets and none contain a number — the biggest leak`);
  else if (metricShare < 0.3) add(a, 12, undefined, `Only ${Math.round(metricShare * 100)}% of bullets are quantified`);
  else if (metricShare < 0.6) add(a, 22, `${Math.round(metricShare * 100)}% of bullets carry a number`);
  else add(a, 30, `${Math.round(metricShare * 100)}% of bullets are quantified`);

  const current = new Date().getFullYear();
  const latest = Math.max(0, ...entries.map((e) => e.year ?? 0));
  if (!latest) a.issues.push('No dates on your roles — recruiters cannot see recency');
  else if (current - latest <= 1) add(a, 15, 'Most recent role is current');
  else if (current - latest <= 3) add(a, 8, undefined, `Most recent listed role is from ${latest}`);
  else add(a, 2, undefined, `Most recent listed role is from ${latest} — add your current one`);

  const cov = coverage(entries.map((e) => `${e.title} ${e.company} ${e.bullets.join(' ')}`).join(' '), industry.keywords);
  add(a, Math.round(cov * 10));
  if (cov < 0.2) a.issues.push(`Target ${industry.label} keywords are missing from your bullets`);

  return a;
}

function scoreEducation(p: ParsedProfile): Acc {
  const a = acc();
  const items = [...p.education, ...p.certifications];
  if (!items.length) {
    a.issues.push('No education, certification or course listed');
    return a;
  }

  add(a, 40, `${items.length} education or certification ${items.length > 1 ? 'entries' : 'entry'} listed`);

  const hasDegree = p.education.some((e) => /\b(?:b\.?a\.?|b\.?sc\.?|m\.?a\.?|m\.?sc\.?|m\.?b\.?a\.?|ph\.?d\.?|bachelor|master|doctorate|diploma|degree)\b/i.test(e));
  if (hasDegree) add(a, 25, 'A degree is listed');
  else a.issues.push('No degree listed — if you have one, add it');

  const hasSchool = p.education.some((e) => /\b(?:university|college|institute|school|polytechnic|academy)\b/i.test(e));
  if (hasSchool) add(a, 15, 'Institution named');
  else a.issues.push('Education entries do not name a school or institution');

  if (p.certifications.length) add(a, 20, `${p.certifications.length} certification${p.certifications.length > 1 ? 's' : ''} or course${p.certifications.length > 1 ? 's' : ''} listed`);
  else a.issues.push('No certifications or courses — a 10-minute fix that reinforces positioning');

  const hasYear = items.some((e) => /\b(?:19|20)\d{2}\b/.test(e));
  if (hasYear) add(a, 10, 'Years included');
  else a.issues.push('No years on your education entries');

  return a;
}

function scoreSkills(p: ParsedProfile, industry: Industry): Acc {
  const a = acc();
  const n = p.skills.length;
  if (n === 0) {
    a.issues.push('No skills found in the pasted text');
    return a;
  }

  if (n < 5) add(a, 10, undefined, `Only ${n} skills listed — add up to 15`);
  else if (n < 10) add(a, 25, undefined, `${n} skills listed — you can list up to 15`);
  else if (n <= 20) add(a, 40, `${n} skills listed`);
  else add(a, 30, undefined, `${n} skills listed — dilution hides your top 3`);

  const hits = industry.keywords.filter((k) => p.skills.some((s) => contains(s, k) || contains(k, s)));
  const cov = hits.length / industry.keywords.length;
  add(a, Math.round(cov * 40));
  if (cov < 0.25) a.issues.push(`Only ${hits.length} of ${industry.keywords.length} in-demand ${industry.label} terms appear in your skills`);
  else add(a, 0, `${hits.length} in-demand ${industry.label} terms in your skills`);

  const avgLen = p.skills.reduce((s, x) => s + x.length, 0) / n;
  if (avgLen < 10) add(a, 10, 'Skills are specific terms rather than vague adjectives');
  else if (avgLen <= 26) add(a, 20, 'Skills read as specific, searchable terms');
  else add(a, 8, undefined, 'Some skills read as full sentences rather than searchable terms');

  return a;
}

function scoreActivity(p: ParsedProfile): Acc {
  const a = acc();
  const flagged = p.flags.active90;
  const hasBlock = p.activityBlock.length > 0;

  if (flagged === null && !hasBlock) {
    a.issues.push('Activity could not be read from the pasted text — confirm on your profile');
    return a;
  }

  if (flagged === true) add(a, 45, 'Posted or commented in the last 90 days');
  else if (flagged === false) a.issues.push('No posts or comments in the last 90 days — dormant profiles rank lower');
  else add(a, 20);

  if (hasBlock) {
    const yr = p.lastActivityYear ?? 0;
    const age = new Date().getFullYear() - yr;
    if (age <= 1) add(a, 30, 'Activity is recent');
    else add(a, 10, undefined, `Most recent activity is from ${yr}`);
    add(a, 25, 'Activity section is populated');
  } else {
    add(a, 15);
    a.issues.push('No activity section in the paste — recency is a ranking factor');
  }

  return a;
}

function scoreMedia(p: ParsedProfile): Acc {
  const a = acc();
  const featured = p.flags.featured;
  if (featured === null && p.links.length === 0) {
    a.issues.push('Media could not be read from the pasted text');
    return a;
  }

  if (featured === true) add(a, 45, 'Featured section is set up');
  else if (featured === false) a.issues.push('No Featured section — it is the most-scrolled block on your profile');
  else add(a, 20);

  const links = p.links.length;
  if (links === 0) a.issues.push('No links to work, projects or writing in the paste');
  else if (links <= 2) add(a, 30, `${links} link${links > 1 ? 's' : ''} to your work`);
  else if (links <= 5) add(a, 55, `${links} links to your work`);
  else add(a, 40, undefined, `${links} links — a few strong ones beat many weak ones`);

  return a;
}

function scorePresence(p: ParsedProfile): Acc {
  const a = acc();
  const { photo, banner, customUrl } = p.flags;
  if (photo === null && banner === null && customUrl === null) {
    a.issues.push('Visual presence cannot be read from pasted text');
    return a;
  }
  if (photo === true) add(a, 45, 'Professional photo in place');
  else if (photo === false) a.issues.push('No professional photo — the cheapest win on this list');
  if (banner === true) add(a, 30, 'Custom banner in place');
  else if (banner === false) a.issues.push('Banner is the default grey block — wasted prime space');
  if (customUrl === true) add(a, 25, 'Custom public URL');
  else if (customUrl === false) a.issues.push('No custom public URL');
  return a;
}

const SCORERS: Record<SectionKey, (p: ParsedProfile, industry: Industry) => Acc> = {
  headline: scoreHeadline,
  about: scoreAbout,
  experience: scoreExperience,
  education: scoreEducation,
  skills: scoreSkills,
  activity: scoreActivity,
  media: scoreMedia,
  presence: scorePresence,
};

export function scoreProfile(p: ParsedProfile, industry: Industry): ScoredProfile {
  const basis = basisFor(p);

  const sections: SectionSignal[] = SECTION_DEFS.map((def) => {
    const b = basis[def.key];
    if (b === 'unknown') {
      return {
        key: def.key,
        label: def.label,
        score: 0,
        basis: b,
        issues: [`Not readable from pasted text — ${def.label.toLowerCase()} needs your live profile`],
        wins: [],
        weight: 0,
      };
    }
    const res = SCORERS[def.key](p, industry);
    return {
      key: def.key,
      label: def.label,
      score: Math.round(clamp(res.score, 0, 100)),
      basis: b,
      issues: res.issues,
      wins: res.wins,
      weight: def.weight,
    };
  });

  const measured = sections.filter((s) => s.basis !== 'unknown');
  const weightSum = measured.reduce((sum, s) => sum + s.weight, 0);
  const overall = weightSum > 0 ? Math.round(measured.reduce((sum, s) => sum + s.score * s.weight, 0) / weightSum) : 0;

  return {
    sections,
    overall,
    measuredCount: measured.length,
    excluded: sections.filter((s) => s.basis === 'unknown').map((s) => s.label),
  };
}
