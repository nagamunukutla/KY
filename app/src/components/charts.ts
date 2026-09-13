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

export interface TrendPoint {
  label: string;
  value: number;
  /** Short date shown under the axis. */
  when: string;
}

/**
 * Phase 2.5 — score history. Hand-rolled SVG line chart, no dependencies.
 * Returns an empty-state message when there is not enough history to plot.
 */
export function trendSvg(points: TrendPoint[], width = 640, height = 190): string {
  if (points.length < 2) return '';

  const padL = 38;
  const padR = 16;
  const padT = 16;
  const padB = 34;
  const w = width - padL - padR;
  const h = height - padT - padB;

  const values = points.map((p) => clamp(p.value, 0, 100));
  const lo = Math.max(0, Math.floor((Math.min(...values) - 8) / 10) * 10);
  const hi = Math.min(100, Math.ceil((Math.max(...values) + 8) / 10) * 10);
  const span = Math.max(10, hi - lo);

  const x = (i: number): number => padL + (points.length === 1 ? w / 2 : (i * w) / (points.length - 1));
  const y = (v: number): number => padT + h - ((clamp(v, 0, 100) - lo) / span) * h;

  const gridLines: string[] = [];
  const step = span / 4;
  for (let i = 0; i <= 4; i++) {
    const v = lo + step * i;
    const gy = y(v);
    gridLines.push(
      `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${width - padR}" y2="${gy.toFixed(1)}" stroke="#e2e8f0" stroke-width="1"/>`,
      `<text x="${padL - 8}" y="${(gy + 4).toFixed(1)}" text-anchor="end" font-size="10" fill="#94a3b8">${Math.round(v)}</text>`
    );
  }

  const coords = points.map((p, i) => [x(i), y(p.value)] as const);
  const line = coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c[0].toFixed(1)} ${c[1].toFixed(1)}`).join(' ');
  const area = `${line} L${coords[coords.length - 1][0].toFixed(1)} ${(padT + h).toFixed(1)} L${coords[0][0].toFixed(1)} ${(padT + h).toFixed(1)} Z`;

  const dots = coords
    .map(
      (c, i) =>
        `<circle cx="${c[0].toFixed(1)}" cy="${c[1].toFixed(1)}" r="4" fill="${scoreColor(points[i].value)}" stroke="#fff" stroke-width="2"/>` +
        `<text x="${c[0].toFixed(1)}" y="${(c[1] - 10).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="${scoreColor(points[i].value)}">${points[i].value}</text>`
    )
    .join('');

  const labels = points
    .map((p, i) => `<text x="${x(i).toFixed(1)}" y="${(height - 12).toFixed(1)}" text-anchor="middle" font-size="10" fill="#94a3b8">${escapeHtml(p.when)}</text>`)
    .join('');

  return `<svg width="100%" viewBox="0 0 ${width} ${height}" role="img" aria-label="Score history over time">
  ${gridLines.join('')}
  <path d="${area}" fill="rgba(10,102,194,0.10)"/>
  <path d="${line}" fill="none" stroke="#0a66c2" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  ${dots}${labels}
</svg>`;
}
