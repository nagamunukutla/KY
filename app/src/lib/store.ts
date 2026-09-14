/**
 * Phase 2.5 — local persistence.
 *
 * Everything lives in the visitor's own browser: no account server, no
 * analytics, nothing leaves the device. Storage is namespaced and versioned so
 * a future schema change can migrate instead of crashing.
 */

export interface StoredSection {
  key: string;
  score: number;
}

export interface StoredAudit {
  id: string;
  /** Stable identity of the audited profile, so runs can be compared. */
  profileKey: string;
  label: string;
  source: string;
  industry: string;
  mode: 'url-demo' | 'text';
  overall: number;
  percentile: number;
  sections: StoredSection[];
  covered: string[];
  gaps: string[];
  createdAt: string;
}

export interface WaitlistEntry {
  email: string;
  createdAt: string;
  plan: string;
}

export interface Account {
  name: string;
  email: string;
  plan: 'free' | 'pro';
  createdAt: string;
}

const NS = 'ky.v1';
const K_AUDITS = `${NS}.audits`;
const K_TRACKED = `${NS}.trackedKeywords`;
const K_WAITLIST = `${NS}.waitlist`;
const K_ACCOUNT = `${NS}.account`;

const MAX_AUDITS = 60;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function storageAvailable(): boolean {
  try {
    const probe = `${NS}.probe`;
    localStorage.setItem(probe, '1');
    localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

/* ---------- audit history ---------- */

export function listAudits(): StoredAudit[] {
  const all = read<StoredAudit[]>(K_AUDITS, []);
  return all.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function saveAudit(audit: StoredAudit): StoredAudit[] {
  const existing = listAudits().filter((a) => a.id !== audit.id);
  const next = [audit, ...existing].slice(0, MAX_AUDITS);
  write(K_AUDITS, next);
  return next.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function deleteAudit(id: string): StoredAudit[] {
  const next = listAudits().filter((a) => a.id !== id);
  write(K_AUDITS, next);
  return next;
}

export function clearAudits(): void {
  write(K_AUDITS, []);
}

/** The most recent *previous* audit for the same profile, if any. */
export function previousAuditFor(profileKey: string, excludeId?: string): StoredAudit | null {
  const match = listAudits().filter((a) => a.profileKey === profileKey && a.id !== excludeId);
  return match[0] ?? null;
}

export function newAuditId(): string {
  return `a${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

/* ---------- tracked keywords ---------- */

export function listTracked(): string[] {
  return read<string[]>(K_TRACKED, []);
}

export function addTracked(keyword: string): string[] {
  const k = keyword.trim().replace(/\s+/g, ' ');
  if (!k) return listTracked();
  const next = [...new Set([...listTracked(), k])].slice(0, 40);
  write(K_TRACKED, next);
  return next;
}

export function removeTracked(keyword: string): string[] {
  const next = listTracked().filter((k) => k.toLowerCase() !== keyword.toLowerCase());
  write(K_TRACKED, next);
  return next;
}

/* ---------- waitlist ---------- */

export function listWaitlist(): WaitlistEntry[] {
  return read<WaitlistEntry[]>(K_WAITLIST, []);
}

export function addWaitlist(email: string, plan: string): WaitlistEntry[] {
  const entry: WaitlistEntry = { email: email.trim(), createdAt: new Date().toISOString(), plan };
  const next = [...listWaitlist().filter((e) => e.email.toLowerCase() !== entry.email.toLowerCase()), entry];
  write(K_WAITLIST, next);
  return next;
}

/* ---------- account ---------- */

export function getAccount(): Account | null {
  return read<Account | null>(K_ACCOUNT, null);
}

export function setAccount(a: Account | null): void {
  if (a) write(K_ACCOUNT, a);
  else {
    try {
      localStorage.removeItem(K_ACCOUNT);
    } catch {
      /* ignore */
    }
  }
}

/* ---------- export ---------- */

export function exportJson(): string {
  return JSON.stringify(
    {
      product: 'KY — LinkedIn Profile Audit',
      exportedAt: new Date().toISOString(),
      account: getAccount(),
      trackedKeywords: listTracked(),
      waitlist: listWaitlist(),
      audits: listAudits(),
    },
    null,
    2
  );
}

export function exportCsv(): string {
  const rows = [
    ['created_at', 'label', 'source', 'mode', 'industry', 'overall', 'percentile', 'gaps'].join(','),
    ...listAudits().map((a) =>
      [a.createdAt, a.label, a.source, a.mode, a.industry, a.overall, a.percentile, `"${a.gaps.join('; ')}"`]
        .map(csvCell)
        .join(',')
    ),
  ];
  return rows.join('\n');
}

function csvCell(v: string | number): string {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function download(filename: string, contents: string, type = 'text/plain'): void {
  const blob = new Blob([contents], { type: `${type};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
