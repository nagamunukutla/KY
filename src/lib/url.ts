export interface ParsedUrl {
  raw: string;
  kind: 'linkedin' | 'other';
  /** Stable slug used for seeding and matching curated sample profiles. */
  slug: string;
  /** Short human-friendly display of where the audit came from. */
  display: string;
}

function clean(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
}

/**
 * Never throws: any input maps to a usable ParsedUrl so the demo has no dead end.
 */
export function parseProfileUrl(raw: string): ParsedUrl {
  const trimmed = raw.trim();

  // Bare handle: "sarah-mitchell"
  if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,79}$/.test(trimmed)) {
    const slug = clean(trimmed);
    return { raw: trimmed, kind: 'linkedin', slug, display: `linkedin.com/in/${slug}` };
  }

  let url: URL | null = null;
  try {
    url = new URL(trimmed.includes('://') ? trimmed : `https://${trimmed}`);
  } catch {
    url = null;
  }

  if (url && url.hostname) {
    const host = url.hostname.replace(/^www\./, '').toLowerCase();
    const isLinkedin = host.includes('linkedin');
    const parts = url.pathname.split('/').filter(Boolean);
    const idx = parts.findIndex((p) => p === 'in' || p === 'pub' || p === 'company' || p === 'school');
    const slugPart = idx >= 0 && parts[idx + 1] ? parts[idx + 1] : (parts[0] ?? '');
    const slug = clean(slugPart) || 'profile';
    return {
      raw: trimmed,
      kind: isLinkedin ? 'linkedin' : 'other',
      slug,
      display: `${host}${url.pathname}`.slice(0, 60),
    };
  }

  return {
    raw: trimmed,
    kind: 'other',
    slug: clean(trimmed) || 'profile',
    display: trimmed.slice(0, 60),
  };
}
