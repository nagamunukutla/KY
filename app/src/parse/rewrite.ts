import type { Industry } from '../data/industries';
import type { ParsedProfile } from './profile';
import { hasMetric } from './profile';
import type { SectionKey } from '../data/sections';

/**
 * Phase 2 — per-section rewrites.
 *
 * Deterministic templates built from facts extracted from the user's own text
 * (their role, their numbers, their keywords). No API key, no network, no
 * invented credentials — anything KY cannot know is left as an explicit
 * `[bracketed placeholder]` for the user to fill in.
 */

export interface Rewrite {
  key: SectionKey;
  title: string;
  before: string;
  after: string;
  why: string;
  /** True when the output still needs the user to fill in a placeholder. */
  needsEdit: boolean;
}

const PLACEHOLDER = /\[[^\]]+\]/;

function titleCase(s: string): string {
  return s.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
}

/** Best guess at the user's role: most recent job title, else a keyword-derived one. */
export function inferRole(p: ParsedProfile, industry: Industry): string {
  const first = p.experience[0];
  if (first?.title) {
    const cleaned = first.title
      .replace(/\s*(?:at|@)\s.*$/i, '')
      .replace(/\s*[-|].*$/, '')
      .trim();
    if (cleaned.length > 2 && cleaned.length < 70) return cleaned;
  }
  const fromHeadline = p.headline.split(/[|·•]/)[0]?.trim();
  if (fromHeadline && fromHeadline.length > 2 && fromHeadline.length < 60) return fromHeadline;
  return `${industry.label} professional`;
}

/** Strongest quantified fragment found anywhere in the paste — used as "proof". */
function bestProof(p: ParsedProfile): string | null {
  const bullets = p.experience.flatMap((e) => e.bullets);
  const withMetrics = bullets.filter(hasMetric);
  if (!withMetrics.length) return null;
  const ranked = [...withMetrics].sort((a, b) => {
    const pct = (s: string): number => (/%/.test(s) ? 1 : 0);
    return pct(b) - pct(a) || a.length - b.length;
  });
  const top = ranked[0];
  const m = top.match(/(?:[$€£¥₹]\s?\d[\d.,]*\s*(?:k|m|bn|mn)?|\b\d+(?:[.,]\d+)?\s*(?:%|x|k|m|bn)\b|\b\d[\d,]{1,}\+?)/i);
  return m ? m[0].trim() : null;
}

function niche(p: ParsedProfile, industry: Industry): string {
  const skills = p.skills.slice(0, 3).filter(Boolean);
  if (skills.length >= 2) return skills.slice(0, 2).map(titleCase).join(' & ');
  const hit = industry.keywords.find((k) => p.raw.toLowerCase().includes(k.toLowerCase()));
  return hit ?? `${industry.label}`;
}

export function rewriteHeadline(p: ParsedProfile, industry: Industry): Rewrite {
  const role = inferRole(p, industry);
  const proof = bestProof(p);
  const after = proof
    ? `${role} | ${niche(p, industry)} | ${proof} ${placeholderTail(p)}`.trim()
    : `${role} | ${niche(p, industry)} | [your strongest number]`;

  return {
    key: 'headline',
    title: 'Headline',
    before: p.headline || '(empty)',
    after,
    why: proof
      ? 'Role, niche and a real number — the three things recruiters search and scan for, using a result already in your profile.'
      : 'Role plus niche plus proof. Only the number is missing: take your single best result and put it here.',
    needsEdit: PLACEHOLDER.test(after),
  };
}

function placeholderTail(p: ParsedProfile): string {
  return p.headline.length > 0 ? '' : '';
}

export function rewriteAbout(p: ParsedProfile, industry: Industry): Rewrite {
  const role = inferRole(p, industry);
  const proof = bestProof(p);
  const years = p.yearsExperience && p.yearsExperience > 0 ? p.yearsExperience : null;
  const kws = industry.keywords.slice(0, 3).join(', ');

  const after = [
    years
      ? `I'm a ${role.toLowerCase()} with ${years} years in ${industry.label.toLowerCase()}, focused on ${niche(p, industry).toLowerCase()}.`
      : `I'm a ${role.toLowerCase()} focused on ${niche(p, industry).toLowerCase()} in ${industry.label.toLowerCase()}.`,
    proof
      ? `Most recently I delivered ${proof} — [what you changed, in one line].`
      : `[Your single best result, with the number that proves it.]`,
    `I work across ${kws}. ${p.skills.slice(3, 6).join(', ')}${p.skills.length > 6 ? ', and more.' : '.'}`,
    `[What you want next] — reach me at [your email] or send a message here.`,
  ].join('\n\n');

  return {
    key: 'about',
    title: 'About section',
    before: p.about ? truncate(p.about, 320) : '(empty)',
    after,
    why:
      'Four short paragraphs: who you are, the proof, the searchable keywords, and a call-to-action. ' +
      'Everything in brackets is a fact only you have — fill it in and delete the brackets.',
    needsEdit: true,
  };
}

export function rewriteBullets(p: ParsedProfile): Rewrite[] {
  const flat = p.experience.flatMap((e) =>
    e.bullets.map((b) => ({ role: e.title || 'your role', bullet: b, hasNum: hasMetric(b) }))
  );

  const targets = flat.filter((b) => !b.hasNum).slice(0, 2);
  if (!targets.length && flat.length) {
    targets.push(flat[0]);
  }

  return targets.map(({ role, bullet }, i) => {
    const verb = (bullet.match(/^[A-Za-z]+/) ?? [''])[0];
    const object = bullet
      .replace(/^[A-Za-z]+\s+/, '')
      .replace(/[.!?]+$/, '')
      .trim();
    const after = `${titleCase(verb || 'Led')} ${lower(object || '[the thing you changed]')} — [result] in [number + timeframe].`;

    return {
      key: 'experience' as SectionKey,
      title: `Experience bullet ${i + 1} · ${role}`,
      before: bullet,
      after,
      why:
        'Action + result + number. Recruiters skip duty bullets and stop on numbers; keeping your own verb makes it recognisably your work.',
      needsEdit: true,
    };
  });
}

export function rewriteSkills(p: ParsedProfile, industry: Industry): Rewrite {
  const missing = industry.keywords.filter((k) => !p.skills.some((s) => s.toLowerCase() === k.toLowerCase()));
  const keep = p.skills.slice(0, 10);
  const after = [...new Set([...industry.keywords.slice(0, 4), ...keep])].slice(0, 15).join(' · ');

  return {
    key: 'skills',
    title: 'Skills list',
    before: p.skills.length ? p.skills.slice(0, 10).join(' · ') : '(none found)',
    after,
    why: missing.length
      ? `The top 3 skills show on your profile card, so put the searched terms first. Missing today: ${missing.slice(0, 4).join(', ')}.`
      : 'Already well covered — reorder so the most-searched terms sit in the top 3 shown on your card.',
    needsEdit: false,
  };
}

export function buildRewrites(p: ParsedProfile, industry: Industry): Rewrite[] {
  const out: Rewrite[] = [rewriteHeadline(p, industry), rewriteAbout(p, industry), ...rewriteBullets(p)];
  out.push(rewriteSkills(p, industry));
  return out;
}

function truncate(s: string, n: number): string {
  return s.length > n ? `${s.slice(0, n).trimEnd()}…` : s;
}

function lower(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}
