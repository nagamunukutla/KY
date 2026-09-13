import type { SectionKey } from '../data/sections';

/**
 * Phase 2 — real profile parsing.
 *
 * Compliance-safe by design: the user pastes text they already have (their own
 * profile via "Save to PDF"/copy, or any public profile they opened themselves).
 * KY never scrapes, never asks for credentials and makes zero network calls.
 */

export type Basis = 'measured' | 'partial' | 'unknown';

export interface ExpEntry {
  title: string;
  company: string;
  dates: string;
  bullets: string[];
  metricBullets: number;
  /** Most recent year in this entry — used for recency. */
  year: number | null;
  /** Earliest year in this entry — used for total tenure. */
  firstYear: number | null;
}

/** Visual / behavioural facts a text paste cannot prove. `null` = not stated. */
export interface ProfileFlags {
  photo: boolean | null;
  banner: boolean | null;
  customUrl: boolean | null;
  featured: boolean | null;
  active90: boolean | null;
}

export interface ParsedProfile {
  raw: string;
  name: string;
  headline: string;
  location: string;
  about: string;
  experience: ExpEntry[];
  education: string[];
  skills: string[];
  certifications: string[];
  links: string[];
  activityBlock: string;
  flags: ProfileFlags;
  /** Whole-text word count — used for keyword coverage denominators. */
  words: number;
  aboutWords: number;
  bulletCount: number;
  metricCount: number;
  lastActivityYear: number | null;
  yearsExperience: number | null;
}

const BULLET_RE = /^\s*(?:[•·◦▪*+‣]|[-–—]{1,2})\s+/;
const YEAR_RE = /\b(?:19|20)\d{2}\b/g;
const DATE_LINE_RE =
  /\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+(?:19|20)\d{2}\b|\b(?:19|20)\d{2}\s*(?:-|–|—|to)\s*(?:present|now|current|(?:19|20)\d{2})\b|\b\d{1,2}\s*(?:yrs?|years?)\b/i;
const WEAK_HEADLINE_RE =
  /\b(?:looking for|seeking|open to|enthusiast|passionate about|aspiring|new opportunities|unemployed|helping (?:companies|businesses) grow)\b/i;

export { WEAK_HEADLINE_RE };

interface HeaderRule {
  key: 'about' | 'experience' | 'education' | 'skills' | 'certifications' | 'featured' | 'activity';
  re: RegExp;
}

const HEADER_RULES: HeaderRule[] = [
  { key: 'about', re: /^(?:about|summary|profile\s+summary|overview|professional\s+summary)\s*[:.]?\s*$/i },
  {
    key: 'experience',
    re: /^(?:experience|work\s+experience|employment(?:\s+history)?|positions?|professional\s+experience)\s*[:.]?\s*$/i,
  },
  { key: 'education', re: /^(?:education|academics?|academic\s+background)\s*[:.]?\s*$/i },
  { key: 'skills', re: /^(?:skills|top\s+skills|core\s+(?:competencies|skills)|skills\s*(?:&|and)\s*endorsements)\s*[:.]?\s*$/i },
  {
    key: 'certifications',
    re: /^(?:licen[sc]es?\s*(?:&|and)?\s*certifications?|certifications?|courses?|test\s*scores)\s*[:.]?\s*$/i,
  },
  { key: 'featured', re: /^(?:featured|projects?|publications?|honors?\s*(?:&|and)?\s*awards?|volunteering)\s*[:.]?\s*$/i },
  { key: 'activity', re: /^(?:activity|posts?|articles?|all\s+star\s+sections)\s*[:.]?\s*$/i },
];

/** Does this line look like a LinkedIn section header on its own line? */
function matchHeader(line: string): HeaderRule['key'] | null {
  const t = line.trim();
  if (!t || t.length > 40) return null;
  for (const rule of HEADER_RULES) {
    if (rule.re.test(t)) return rule.key;
  }
  return null;
}

const ACTION_RE =
  /\b(?:increas|reduc|cut|grew|grown|grow|improv|boost|lift|rais|lower|sav|deliver|launch|led|lead|built|build|shipp|optimi|automat|scal|doubl|tripled|expand|shorten|accelerat|onboard\w*d|ran|run|migrat|consolidat|negoti|recruit\w*d|hired|trained)\w*/i;

export function hasMetric(line: string): boolean {
  // Currency, percentages, multipliers and magnitudes are always proof.
  if (/(?:[$€£¥₹]\s?\d)|(?:\b\d+(?:[.,]\d+)?\s*(?:%|percent|x|×|k|m|bn|mn|mm|q|pt|pts|bps)\b)/i.test(line)) return true;
  if (!/\d/.test(line)) return false;
  // A number attached to an action verb: "grew weekly actives from 12k to 31k".
  if (ACTION_RE.test(line)) return true;
  // A bare count of things: "Ran 40+ A/B tests", "5 direct reports".
  return /\b\d[\d,.]*\+?\s+[A-Za-z]/.test(line);
}

function countWords(s: string): number {
  const m = s.trim().match(/[A-Za-zÀ-ÿ0-9''-]+/g);
  return m ? m.length : 0;
}

function years(text: string): number[] {
  const m = text.match(YEAR_RE);
  if (!m) return [];
  return [...new Set(m.map((y) => Number(y)))].filter((y) => y >= 1950 && y <= new Date().getFullYear() + 1);
}

function isBullet(line: string): boolean {
  return BULLET_RE.test(line);
}

/** Split the pasted text into a header block plus named section blocks. */
function splitSections(raw: string): { head: string[]; blocks: Record<string, string[]> } {
  const lines = raw.replace(/\r\n?/g, '\n').split('\n');
  const blocks: Record<string, string[]> = {};
  const head: string[] = [];
  let current: string[] = head;

  for (const line of lines) {
    const key = matchHeader(line);
    if (key) {
      current = blocks[key] ?? (blocks[key] = []);
      continue;
    }
    // Inline form: "About: I help ..." on one line.
    const inline = line.match(/^\s*(about|summary|experience|education|skills|certifications|featured|activity)\s*[:]\s*(.+)$/i);
    if (inline) {
      const key2 = inline[1].toLowerCase() as HeaderRule['key'];
      const target = blocks[key2] ?? (blocks[key2] = []);
      target.push(inline[2]);
      current = target;
      continue;
    }
    current.push(line);
  }
  return { head, blocks };
}

/** Non-empty, de-duplicated, trimmed lines. */
function contentLines(arr: string[]): string[] {
  return arr.map((l) => l.trim()).filter((l) => l.length > 0);
}

function looksLikeName(line: string): boolean {
  const t = line.trim();
  if (!t || t.length > 60) return false;
  if (/\d/.test(t)) return false;
  if (/https?:|www\.|@/.test(t)) return false;
  if (matchHeader(t)) return false;
  if (/^[-•|·]/.test(t)) return false;
  const words = t.split(/\s+/);
  if (words.length < 2 || words.length > 5) return false;
  return words.every((w) => /^[A-Za-zÀ-ÿ'’.-]+$/.test(w));
}

function looksLikeLocation(line: string): boolean {
  const t = line.trim();
  if (t.length > 60) return false;
  if (/\bconnections\b|\bfollowers\b/i.test(t)) return false;
  return /^[A-ZÀ-Ý][\w .'-]+,\s*[A-ZÀ-Ý][\w .'-]+$/.test(t) || /^(?:greater\s+)?[\w .'-]+\s+area$/i.test(t);
}

function parseExperience(lines: string[]): ExpEntry[] {
  const entries: ExpEntry[] = [];
  let chunk: string[] = [];

  const flush = (): void => {
    const ls = contentLines(chunk);
    if (ls.length) entries.push(buildEntry(ls));
    chunk = [];
  };

  for (const line of lines) {
    if (!line.trim()) {
      flush();
    } else {
      chunk.push(line);
    }
  }
  flush();

  return entries.filter((e) => e.title || e.bullets.length);
}

function buildEntry(ls: string[]): ExpEntry {
  const title = ls[0] ?? '';
  let company = '';
  let dates = '';
  const bullets: string[] = [];

  for (const l of ls.slice(1)) {
    if (isBullet(l)) {
      bullets.push(l.replace(BULLET_RE, '').trim());
    } else if (!dates && DATE_LINE_RE.test(l) && l.length < 90) {
      dates = l;
    } else if (!company && !DATE_LINE_RE.test(l) && l.length < 90) {
      company = l;
    } else if (!isBullet(l) && l.length < 90 && !dates) {
      dates = l;
    } else {
      // Continuation of the previous bullet rather than a new one.
      if (bullets.length) bullets[bullets.length - 1] += ' ' + l;
      else if (company) company += ' ' + l;
    }
  }

  const ys = years(ls.join(' '));
  return {
    title,
    company,
    dates,
    bullets,
    metricBullets: bullets.filter(hasMetric).length,
    year: ys.length ? Math.max(...ys) : null,
    firstYear: ys.length ? Math.min(...ys) : null,
  };
}

function parseSkills(lines: string[]): string[] {
  const out: string[] = [];
  for (const l of contentLines(lines)) {
    for (const part of l.split(/[,•·|]/)) {
      const s = part.trim().replace(/^\d+\.\s*/, '');
      if (s && s.length <= 48 && /[A-Za-z]/.test(s) && !DATE_LINE_RE.test(s)) out.push(s);
    }
  }
  return [...new Set(out)];
}

export interface ParseOptions {
  flags?: Partial<ProfileFlags>;
}

export function parseProfileText(raw: string, opts: ParseOptions = {}): ParsedProfile {
  const { head, blocks } = splitSections(raw);
  const headLines = contentLines(head);

  const nameLine = headLines.find(looksLikeName) ?? '';
  const location = headLines.find(looksLikeLocation) ?? '';
  const headline =
    headLines.find(
      (l) =>
        l !== nameLine &&
        l !== location &&
        l.length <= 220 &&
        /[A-Za-z]/.test(l) &&
        !/https?:|@|\bconnections\b/i.test(l) &&
        !DATE_LINE_RE.test(l)
    ) ?? '';

  const aboutLines = blocks.about ?? [];
  const about = contentLines(aboutLines).join(' ').trim();

  const experience = parseExperience(blocks.experience ?? []);
  const education = contentLines(blocks.education ?? []).filter((l) => l.length <= 160);
  const skills = parseSkills(blocks.skills ?? []);
  const certifications = contentLines(blocks.certifications ?? []).filter((l) => l.length <= 160);
  const featuredLines = contentLines(blocks.featured ?? []);
  const activityBlock = contentLines(blocks.activity ?? []).join(' ').trim();

  const links = [...new Set((raw.match(/https?:\/\/[^\s)"'<>]+/g) ?? []).map((u) => u.replace(/[.,;]+$/, '')))];

  const flags: ProfileFlags = {
    photo: opts.flags?.photo ?? null,
    banner: opts.flags?.banner ?? null,
    customUrl: opts.flags?.customUrl ?? null,
    featured: opts.flags?.featured ?? (featuredLines.length > 0 ? true : null),
    active90: opts.flags?.active90 ?? null,
  };

  const bullets = experience.flatMap((e) => e.bullets);
  const allYears = years(raw);
  const jobYears = experience.map((e) => e.firstYear).filter((y): y is number => y !== null);

  return {
    raw,
    name: nameLine,
    headline,
    location,
    about,
    experience,
    education,
    skills,
    certifications,
    links,
    activityBlock,
    flags,
    words: countWords(raw),
    aboutWords: countWords(about),
    bulletCount: bullets.length,
    metricCount: bullets.filter(hasMetric).length,
    lastActivityYear: activityBlock ? Math.max(0, ...years(activityBlock)) || null : null,
    yearsExperience: jobYears.length ? new Date().getFullYear() - Math.min(...jobYears) : allYears.length ? null : null,
  };
}

/** Which sections this paste can actually score, and which it cannot. */
export function basisFor(p: ParsedProfile): Record<SectionKey, Basis> {
  const activityKnown = p.flags.active90 !== null || p.activityBlock.length > 0;
  const mediaKnown = p.flags.featured !== null || p.links.length > 0;
  const presenceKnown = p.flags.photo !== null || p.flags.banner !== null || p.flags.customUrl !== null;

  return {
    headline: p.headline ? 'measured' : 'unknown',
    about: p.aboutWords > 0 ? 'measured' : 'unknown',
    experience: p.experience.length > 0 ? 'measured' : 'unknown',
    education: p.education.length > 0 || p.certifications.length > 0 ? 'measured' : 'partial',
    skills: p.skills.length > 0 ? 'measured' : 'partial',
    activity: activityKnown ? (p.activityBlock.length > 0 ? 'measured' : 'partial') : 'unknown',
    media: mediaKnown ? (p.links.length > 0 || p.flags.featured === true ? 'measured' : 'partial') : 'unknown',
    presence: presenceKnown ? 'partial' : 'unknown',
  };
}

export function isWeakHeadline(h: string): boolean {
  return WEAK_HEADLINE_RE.test(h);
}

export function hasCta(text: string): boolean {
  return /\b(?:let'?s talk|let'?s connect|reach (?:out|me)|contact me|get in touch|open to|email me|happy to chat|dm me)\b|[\w.+-]+@[\w-]+\.[\w.]+/i.test(
    text
  );
}

export function hasFirstPerson(text: string): boolean {
  return /\b(?:I\b|I'm|I've|I'll|my\b|we\b|our\b)/.test(text);
}
