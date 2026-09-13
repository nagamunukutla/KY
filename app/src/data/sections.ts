import type { IconName } from '../components/icons';

export type SectionKey =
  | 'headline'
  | 'about'
  | 'experience'
  | 'education'
  | 'skills'
  | 'activity'
  | 'media'
  | 'presence';

export interface SectionDef {
  key: SectionKey;
  label: string;
  icon: IconName;
  weight: number;
  desc: string;
  weakIssues: string[];
  midIssues: string[];
  fixTitle: string;
  fixDetail: string;
}

/** Weights sum to 1.0 — experience and headline weigh most, because that's what recruiters read first. */
export const SECTION_DEFS: SectionDef[] = [
  {
    key: 'headline',
    label: 'Headline',
    icon: 'trendUp',
    weight: 0.18,
    desc: 'The first thing a recruiter reads — role, niche, proof.',
    weakIssues: [
      'Headline is a job title or vague phrase — no differentiator',
      'Missing the keywords recruiters actually search for',
      'No quantified result in the headline',
    ],
    midIssues: [
      'Headline reads like a keyword list rather than a value proposition',
      'No clear outcome or number to earn attention',
    ],
    fixTitle: 'Rewrite your headline',
    fixDetail:
      'Turn your headline into: Role | Differentiator | Proof. Example: "Marketing Manager | B2B SaaS | +40% pipeline". Recruiters search all three parts.',
  },
  {
    key: 'about',
    label: 'About section',
    icon: 'fileText',
    weight: 0.14,
    desc: 'Your 200-word pitch, checked for story and search keywords.',
    weakIssues: [
      'About section is under 100 words or missing entirely',
      'Written in third person or generic job-description language',
      'No measurable achievements and no call-to-action',
    ],
    midIssues: [
      'About lists duties instead of one clear story with proof',
      'No call-to-action (contact, portfolio, what you want next)',
    ],
    fixTitle: 'Rewrite your About section',
    fixDetail:
      'Lead with who you help and one proof point. Keep it under 200 words, first person, and close with a call-to-action. Aim for 3–5 keywords you want to rank for.',
  },
  {
    key: 'experience',
    label: 'Experience',
    icon: 'briefcase',
    weight: 0.2,
    desc: 'Bullets, metrics and keywords in every role you list.',
    weakIssues: [
      'Roles with fewer than 2 bullets each',
      'Bullets describe duties, not outcomes or numbers',
      'Most recent role has no summary line',
    ],
    midIssues: [
      'Bullets are missing numbers ("led the team" vs "+18% conversion")',
      'Target-role keywords are absent from your bullets',
    ],
    fixTitle: 'Quantify your experience',
    fixDetail:
      'Rewrite each bullet as Action + Result + Number. "Cut onboarding time from 14 to 3 days" beats "responsible for onboarding". Two strong bullets per role is enough.',
  },
  {
    key: 'education',
    label: 'Education',
    icon: 'book',
    weight: 0.08,
    desc: 'Degrees, certifications and courses that back your claims.',
    weakIssues: [
      'No degree, certification or relevant course listed',
      'Education block incomplete (missing school or years)',
    ],
    midIssues: [
      'No certifications or courses that reinforce your positioning',
    ],
    fixTitle: 'Complete your education block',
    fixDetail:
      'Add degrees, relevant certifications and 2–3 courses. It is a one-time 10-minute fix that removes a common recruiter red flag.',
  },
  {
    key: 'skills',
    label: 'Skills',
    icon: 'star',
    weight: 0.12,
    desc: 'The visible skills that decide which searches you appear in.',
    weakIssues: [
      'Fewer than 5 skills, and few endorsed',
      'Top skills do not match the roles you are targeting',
    ],
    midIssues: [
      'Skills list is missing in-demand terms for your industry',
      'Top 3 skills (the ones shown on your profile) are not prioritized',
    ],
    fixTitle: 'Expand and reorder your skills',
    fixDetail:
      'List 10–15 skills in the order you want to be found for — the top 3 appear on your profile card. Add the keywords recruiters search, not just what you do daily.',
  },
  {
    key: 'activity',
    label: 'Activity',
    icon: 'activity',
    weight: 0.12,
    desc: 'Posts, comments and recency — the "alive" signal.',
    weakIssues: [
      'No posts or comments in the last 90 days',
      'Dormant profiles surface far less in recruiter searches',
    ],
    midIssues: [
      'Posting cadence is inconsistent',
      'No comments on peers\u2019 posts — half the algorithm is replies',
    ],
    fixTitle: 'Post or comment twice a week',
    fixDetail:
      'One short post from your week plus two thoughtful comments a day is enough. Recency is a ranking factor — a 6-week streak reliably lifts profile views.',
  },
  {
    key: 'media',
    label: 'Media & featured',
    icon: 'image',
    weight: 0.08,
    desc: 'Featured posts, projects and results people can open.',
    weakIssues: [
      'No featured section configured',
      'Zero media attached to any experience item',
    ],
    midIssues: [
      'Media is generic — screenshots of work without context or results',
    ],
    fixTitle: 'Add 2–3 featured items',
    fixDetail:
      'Pin one post, one project or one talk to Featured, and attach one media item to your two most recent roles. Recruiters judge depth in the first 5 seconds of media.',
  },
  {
    key: 'presence',
    label: 'Visual presence',
    icon: 'user',
    weight: 0.08,
    desc: 'Photo, banner and custom URL — the visual first impression.',
    weakIssues: [
      'No professional photo',
      'No custom banner and no custom public URL',
    ],
    midIssues: [
      'Banner is the default grey block — wasted prime space',
    ],
    fixTitle: 'Upgrade your visual presence',
    fixDetail:
      'Photo, a banner with your role and one keyword, and a clean custom URL. Profiles with photos get dramatically more views — it is the cheapest win on this list.',
  },
];

export const CHECKPOINTS = 120;

export function computeOverall(sections: { key: SectionKey; score: number }[]): number {
  const total = sections.reduce((acc, s) => {
    const def = SECTION_DEFS.find((d) => d.key === s.key);
    return acc + s.score * (def ? def.weight : 0);
  }, 0);
  return Math.round(total);
}

export function issuesFor(key: SectionKey, score: number, rng?: () => number): string[] {
  const def = SECTION_DEFS.find((d) => d.key === key);
  if (!def) return [];
  const pickOne = (arr: string[]): string =>
    rng ? arr[Math.floor(rng() * arr.length)] : arr[0];
  if (score < 55) {
    const a = pickOne(def.weakIssues);
    const rest = def.weakIssues.filter((i) => i !== a);
    return [a, ...(rest.length > 0 ? [pickOne(rest)] : [])];
  }
  if (score < 75) {
    return [pickOne(def.midIssues)];
  }
  return [];
}
