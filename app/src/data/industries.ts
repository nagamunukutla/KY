export interface HeadlinePair {
  before: string;
  after: string;
  why: string;
}

export interface Industry {
  key: string;
  label: string;
  keywords: string[];
  headlines: HeadlinePair[];
}

export const INDUSTRIES: Industry[] = [
  {
    key: 'marketing',
    label: 'Marketing',
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
    headlines: [
      {
        before: 'Marketing enthusiast looking for new opportunities',
        after: 'Marketing Manager | Growth & Content for DTC Brands | +142% organic traffic in 12 months',
        why: 'Recruiters search by role, niche and outcome. This headline matches all three — and the number gives it proof.',
      },
      {
        before: 'Digital marketing / social media / content',
        after: 'Content & Social Lead | B2B SaaS | 3.2M impressions across 12 channels',
        why: 'Keyword soup reads as spam; role + niche + proof reads as expertise.',
      },
    ],
  },
  {
    key: 'software',
    label: 'Software',
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
    headlines: [
      {
        before: 'Software Engineer at Acme',
        after: 'Senior Software Engineer | Distributed Systems & Cloud (AWS, K8s) | 99.95% uptime',
        why: 'Your stack and the result you own should be searchable — not just your employer.',
      },
      {
        before: 'Full stack developer. Python. JS. SQL',
        after: 'Full-Stack Engineer | React & Go | Shipped 3 products used by 400k people',
        why: 'Adding the scale you have shipped turns a tool list into evidence.',
      },
    ],
  },
  {
    key: 'sales',
    label: 'Sales',
    keywords: [
      'Pipeline Management',
      'Salesforce',
      'SaaS',
      'Forecasting',
      'Deal Desk',
      'Enterprise Sales',
      'Discovery',
      'Negotiation',
    ],
    headlines: [
      {
        before: 'Sales professional seeking challenges',
        after: 'Enterprise AE | SaaS $1–10M ACV | 128% of quota for 3 consecutive years',
        why: 'Buyers and recruiters both filter on deal size and quota performance.',
      },
      {
        before: 'Business development / partnerships',
        after: 'Partnerships Lead | Cloud & SaaS | 14 strategic deals closed in 2025',
        why: '"BD" is vague; the industry plus a closed count makes you specific and memorable.',
      },
    ],
  },
  {
    key: 'product',
    label: 'Product',
    keywords: [
      'Roadmapping',
      'A/B Testing',
      'SQL',
      'User Research',
      'Onboarding',
      'Cohort Analysis',
      'GTM',
      'OKRs',
    ],
    headlines: [
      {
        before: 'Product Manager',
        after: 'Product Manager | B2B Onboarding | Cut time-to-value from 14d to 3d',
        why: 'A role plus a metric outcome shows you ship — not just manage.',
      },
      {
        before: 'PM looking for great teams',
        after: 'Senior PM | 0-to-1 Consumer Apps | 2.1M installs across 3 launches',
        why: 'Recruiters search for the problems you have solved, not the teams you want.',
      },
    ],
  },
  {
    key: 'design',
    label: 'Design',
    keywords: [
      'Design Systems',
      'Figma',
      'Prototyping',
      'Usability Testing',
      'Accessibility',
      'Motion Design',
      'Design Tokens',
      'Developer Handoff',
    ],
    headlines: [
      {
        before: 'UX/UI designer',
        after: 'Product Designer | Fintech & Mobile | 40+ shipped flows, 2 design systems',
        why: 'Discipline + domain + volume of shipped work is what hiring managers search.',
      },
      {
        before: 'Graphic designer | open to work',
        after: 'Brand & Product Designer | Identity systems with 3 award nominations',
        why: 'Drop "open to work" into your headline; state your craft and your proof instead.',
      },
    ],
  },
  {
    key: 'finance',
    label: 'Finance',
    keywords: [
      'FP&A',
      'P&L',
      'Budgeting',
      'RevOps',
      'M&A Modeling',
      'IFRS',
      'Cash Flow',
      'Unit Economics',
    ],
    headlines: [
      {
        before: 'Finance manager',
        after: 'Finance Manager | SaaS RevOps | Built P&L for 3 product lines, $12M ARR',
        why: 'Niche (RevOps) plus scale (ARR) separates you from 90% of "finance" profiles.',
      },
      {
        before: 'Looking for finance opportunities',
        after: 'Senior Financial Analyst | FP&A & M&A Modeling | Big 4 to SaaS',
        why: 'Career trajectory plus speciality is the fastest way to be picked from search.',
      },
    ],
  },
  {
    key: 'operations',
    label: 'Operations',
    keywords: [
      'Process Improvement',
      'Lean',
      'Supply Chain',
      'ERP',
      'Vendor Management',
      'KPI Dashboards',
      'SOPs',
      'Capacity Planning',
    ],
    headlines: [
      {
        before: 'Operations manager',
        after: 'Operations Lead | Logistics & 3PL | 38% cost reduction across 5 hubs',
        why: 'Operations credibility lives in the number, not the title.',
      },
      {
        before: 'Supply chain / logistics',
        after: 'Supply Chain Manager | Cold-chain, EU | 120k units/month, zero compliance incidents',
        why: 'Scope (region, volume) and risk ownership (compliance) are your differentiators.',
      },
    ],
  },
  {
    key: 'education',
    label: 'Education',
    keywords: [
      'Curriculum Design',
      'IEP',
      'EdTech',
      'Differentiated Instruction',
      'Classroom Management',
      'Data Literacy',
      'AP/IB',
      'Coaching',
    ],
    headlines: [
      {
        before: 'Teacher',
        after: 'High-School Physics Teacher | AP Program Lead | 94% pass rate, 5 yrs',
        why: 'Subject + program + student outcome — the three things school leaders search.',
      },
      {
        before: 'Looking for teaching positions',
        after: 'Learning Designer | K-12 EdTech | Curriculum used by 60+ schools',
        why: 'The move into ed-tech is a differentiator — say it explicitly.',
      },
    ],
  },
];
