import { landingHtml, wireLanding } from './views/landing';
import type { LandingHandlers } from './views/landing';
import { scanningHtml, runScan } from './views/scanning';
import { reportHtml, wireReport } from './views/report';
import { historyHtml, wireHistory } from './views/history';
import { openPlanModal } from './views/plan';
import { analyze, analyzeText, computeAlerts, computeDelta } from './analysis';
import type { AnalysisResult } from './analysis';
import { parseProfileUrl } from './lib/url';
import { newAuditId, previousAuditFor, saveAudit } from './lib/store';
import type { ProfileFlags } from './parse/profile';

const app = document.getElementById('app') as HTMLElement | null;

export function initApp(): void {
  if (!app) return;
  renderLanding();
}

export function renderLanding(): void {
  if (!app) return;
  app.innerHTML = landingHtml();
  const handlers: LandingHandlers = {
    onAudit: handleAudit,
    onPaste: handlePaste,
    onHistory: renderHistory,
    onOpenPlan: openPlanModal,
  };
  wireLanding(app, handlers);
  window.scrollTo(0, 0);
}

export function renderHistory(): void {
  if (!app) return;
  app.innerHTML = historyHtml();
  wireHistory(app, { onBack: renderLanding });
  window.scrollTo(0, 0);
}

/** Phase 1 demo path: a URL scored against sample data. */
function handleAudit(raw: string): void {
  showReport(analyze(parseProfileUrl(raw)));
}

/** Phase 2 path: real analysis of pasted profile text. */
function handlePaste(text: string, flags: Record<string, boolean>): void {
  const f: Partial<ProfileFlags> = {
    photo: flags.photo ?? null,
    banner: flags.banner ?? null,
    customUrl: flags.customUrl ?? null,
    featured: flags.featured ?? null,
    active90: flags.active90 ?? null,
  };
  showReport(analyzeText(text, f));
}

function showReport(result: AnalysisResult): void {
  if (!app) return;

  // Phase 2.5: compare against the last saved run of the same profile.
  const prev = previousAuditFor(result.profileKey);
  const delta = computeDelta(result, prev);
  const enriched: AnalysisResult = { ...result, delta, alerts: computeAlerts(result, prev, delta) };

  app.innerHTML = scanningHtml(enriched);
  runScan(app, () => {
    if (!app) return;
    app.innerHTML = reportHtml(enriched);
    wireReport(app, enriched, {
      onRestart: renderLanding,
      onHistory: renderHistory,
      onSave: (r) => saveResult(r),
    });
    window.scrollTo(0, 0);
  });
}

function saveResult(r: AnalysisResult): void {
  saveAudit({
    id: newAuditId(),
    profileKey: r.profileKey,
    label: r.name,
    source: r.input.display,
    industry: r.industry,
    mode: r.mode,
    overall: r.overall,
    percentile: r.percentile,
    sections: r.sections.filter((s) => s.basis !== 'unknown').map((s) => ({ key: s.key, score: s.score })),
    covered: r.keywordReport?.covered ?? [],
    gaps: r.keywordReport ? r.keywordReport.gaps : r.keywords,
    createdAt: new Date().toISOString(),
  });
}
