import { escapeHtml } from '../lib/dom';
import { clamp } from '../lib/random';

export function scoreColor(score: number): string {
  if (score < 50) return '#e11d48';
  if (score < 70) return '#d97706';
  return '#059669';
}

/** Circular score dial (SVG only — the number is overlaid in HTML). */
export function scoreDial(score: number, size = 170, stroke = 14): string {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - clamp(score, 0, 100) / 100);
  const col = scoreColor(score);
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="-rotate-90" aria-hidden="true">
  <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="rgba(100,116,139,0.18)" stroke-width="${stroke}"/>
  <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${col}" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"/>
</svg>`;
}

/** Radar chart for the 8 section scores. Pure SVG, no dependencies. */
export function radarSvg(items: { label: string; value: number }[], size = 380): string {
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - 64;
  const n = items.length;

  const pt = (i: number, frac: number): [number, number] => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return [cx + R * frac * Math.cos(a), cy + R * frac * Math.sin(a)];
  };

  const ring = (frac: number): string =>
    items
      .map((_, i) => pt(i, frac).map((v) => v.toFixed(1)).join(','))
      .join(' ');

  const grid = [0.25, 0.5, 0.75, 1]
    .map((f) => `<polygon points="${ring(f)}" fill="none" stroke="#e2e8f0" stroke-width="1"/>`)
    .join('');

  const spokes = items
    .map((_, i) => {
      const [x, y] = pt(i, 1);
      return `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#e2e8f0" stroke-width="1"/>`;
    })
    .join('');

  const dataPts = items.map((it, i) => pt(i, clamp(it.value, 0, 100) / 100));
  const dataPoly = dataPts.map((p) => p.map((v) => v.toFixed(1)).join(',')).join(' ');
  const dots = dataPts
    .map((p) => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.5" fill="#0a66c2"/>`)
    .join('');

  const labels = items
    .map((it, i) => {
      const [x, y] = pt(i, 1.16);
      const cos = Math.cos(-Math.PI / 2 + (i * 2 * Math.PI) / n);
      const anchor = Math.abs(cos) < 0.35 ? 'middle' : cos > 0 ? 'start' : 'end';
      return `<text x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="${anchor}" font-size="11.5" font-weight="600" fill="#475569">${escapeHtml(it.label)}</text>`;
    })
    .join('');

  return `<svg width="100%" viewBox="0 0 ${size} ${size}" role="img" aria-label="Radar chart of section scores">
  ${grid}${spokes}
  <polygon points="${dataPoly}" fill="rgba(10,102,194,0.22)" stroke="#0a66c2" stroke-width="2.5" stroke-linejoin="round"/>
  ${dots}${labels}
</svg>`;
}
