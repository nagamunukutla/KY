import type { SectionKey } from './sections';

export interface CuratedProfile {
  slug: string;
  url: string;
  name: string;
  initials: string;
  role: string;
  company: string;
  industry: string;
  location: string;
  headline: string;
  percentile: number;
  sections: { key: SectionKey; score: number }[];
  keywords: string[];
  headlineFix: { before: string; after: string; why: string };
  summary: string;
}

/**
 * Hand-crafted sample profiles for the Phase 1 demo.
 * Overall score is derived from the section scores (see computeOverall).
 */
export const CURATED: CuratedProfile[] = [
  {
    slug: 'sarah-mitchell-marketing',
    url: 'https://www.linkedin.com/in/sarah-mitchell-marketing',
    name: 'Sarah Mitchell',
    initials: 'SM',
    role: 'Marketing Manager',
    company: 'Bloom & Co.',
    industry: 'Marketing',
    location: 'Amsterdam, NL',
    headline: 'Marketing enthusiast looking for new opportunities',
    percentile: 62,
    sections: [
      { key: 'headline', score: 42 },
      { key: 'about', score: 60 },
      { key: 'experience', score: 74 },
      { key: 'education', score: 84 },
      { key: 'skills', score: 52 },
      { key: 'activity', score: 34 },
      { key: 'media', score: 25 },
      { key: 'presence', score: 75 },
    ],
    keywords: [
      'SEO',
      'Content Strategy',
      'GA4',
      'Email Marketing',
      'CRO',
      'A/B Testing',
      'Brand Strategy',
      'Lifecycle Marketing',
    ],
    headlineFix: {
      before: 'Marketing enthusiast looking for new opportunities',
      after: 'Marketing Manager | Growth & Content for DTC Brands | +142% organic traffic in 12 months',
      why: 'Recruiters search by role, niche and outcome. This headline matches all three — and the number gives it proof.',
    },
    summary:
      'Sarah has genuinely strong, quantified experience — but her profile hides it. A generic headline, a dormant feed and zero featured media mean recruiters never see the best of her. The 3 fixes below take about an hour and target exactly those leaks.',
  },
  {
    slug: 'michael-chen-swe',
    url: 'https://www.linkedin.com/in/michael-chen-swe',
    name: 'Michael Chen',
    initials: 'MC',
    role: 'Senior Software Engineer',
    company: 'Cloudwave',
    industry: 'Software',
    location: 'Singapore',
    headline: 'Senior Software Engineer at Cloudwave',
    percentile: 86,
    sections: [
      { key: 'headline', score: 78 },
      { key: 'about', score: 84 },
      { key: 'experience', score: 92 },
      { key: 'education', score: 76 },
      { key: 'skills', score: 78 },
      { key: 'activity', score: 58 },
      { key: 'media', score: 64 },
      { key: 'presence', score: 88 },
    ],
    keywords: [
      'System Design',
      'AWS',
      'Kubernetes',
      'Observability',
      'Technical Leadership',
      'Incident Response',
      'Mentoring',
      'Open Source',
    ],
    headlineFix: {
      before: 'Senior Software Engineer at Cloudwave',
      after: 'Senior Software Engineer | Distributed Systems & Cloud (AWS, K8s) | 99.95% uptime',
      why: 'Your stack and the result you own should be searchable — an employer name alone matches zero recruiter searches for "AWS" or "distributed systems".',
    },
    summary:
      'Michael is in the top ~15% of software profiles: deep, well-quantified experience and a complete education block. The remaining points are all about visibility — posting cadence, leadership keywords and 1–2 featured projects.',
  },
];
