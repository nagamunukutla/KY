import { landingHtml, wireLanding } from './views/landing';
import { scanningHtml, runScan } from './views/scanning';
import { reportHtml, wireReport } from './views/report';
import { analyze } from './analysis';
import { parseProfileUrl } from './lib/url';

const app = document.getElementById('app') as HTMLElement | null;

export function initApp(): void {
  if (!app) return;
  renderLanding();
}

export function renderLanding(): void {
  if (!app) return;
  app.innerHTML = landingHtml();
  wireLanding(app, handleAudit);
  window.scrollTo(0, 0);
}

function handleAudit(raw: string): void {
  if (!app) return;
  const parsed = parseProfileUrl(raw);
  const result = analyze(parsed);
  app.innerHTML = scanningHtml(result);
  runScan(app, () => {
    if (!app) return;
    app.innerHTML = reportHtml(result);
    wireReport(app, result, renderLanding);
    window.scrollTo(0, 0);
  });
}
