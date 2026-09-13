(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(i){if(i.ep)return;i.ep=!0;const r=s(i);fetch(i.href,r)}})();const W={check:'<path d="M20 6 9 17l-5-5"/>',x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',arrowRight:'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',zap:'<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',target:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',briefcase:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',star:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',activity:'<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',image:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',share:'<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="m16 6-4-4-4 4"/><path d="M12 2v13"/>',copy:'<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',sparkles:'<path d="m12 3 1.9 5.7 5.8 1.9-5.8 1.9L12 18.4l-1.9-5.9-5.8-1.9 5.8-1.9L12 3z"/><path d="M19 14.5l.8 2.4 2.4.8-2.4.8-.8 2.4-.8-2.4-2.4-.8 2.4-.8.8-2.4z"/><path d="M5 3l.7 2.1 2.1.7-2.1.7L5 8.6l-.7-2.1L2.2 5.8l2.1-.7L5 3z"/>',link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',camera:'<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',alert:'<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',trendUp:'<path d="m23 6-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/>',fileText:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/>',chevronDown:'<path d="m6 9 6 6 6-6"/>',refresh:'<path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',mapPin:'<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'};function l(e,t="h-5 w-5"){return`<svg class="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${W[e]}</svg>`}const z={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function o(e){return e.replace(/[&<>"']/g,t=>z[t])}let R=0;function $(e){const t=document.getElementById("toast");t&&(t.textContent=e,t.classList.add("toast-show"),window.clearTimeout(R),R=window.setTimeout(()=>t.classList.remove("toast-show"),2800))}async function A(e){try{return await navigator.clipboard.writeText(e),!0}catch{try{const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();const s=document.execCommand("copy");return t.remove(),s}catch{return!1}}}function G(e){let t=2166136261;for(let s=0;s<e.length;s++)t^=e.charCodeAt(s),t=Math.imul(t,16777619);return t>>>0}function V(e){let t=e>>>0;return()=>{t|=0,t=t+1831565813|0;let s=Math.imul(t^t>>>15,1|t);return s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967296}}function C(e,t,s){return t+Math.floor(e()*(s-t+1))}function H(e,t){return t[Math.min(t.length-1,Math.floor(e()*t.length))]}function Q(e,t,s){const a=[...t];for(let i=a.length-1;i>0;i--){const r=Math.floor(e()*(i+1));[a[i],a[r]]=[a[r],a[i]]}return a.slice(0,Math.min(s,a.length))}function P(e,t,s){return Math.max(t,Math.min(s,e))}function b(e){return e<50?"#e11d48":e<70?"#d97706":"#059669"}function F(e,t=170,s=14){const a=(t-s)/2,i=2*Math.PI*a,r=i*(1-P(e,0,100)/100),n=b(e);return`<svg width="${t}" height="${t}" viewBox="0 0 ${t} ${t}" class="-rotate-90" aria-hidden="true">
  <circle cx="${t/2}" cy="${t/2}" r="${a}" fill="none" stroke="rgba(100,116,139,0.18)" stroke-width="${s}"/>
  <circle cx="${t/2}" cy="${t/2}" r="${a}" fill="none" stroke="${n}" stroke-width="${s}" stroke-linecap="round" stroke-dasharray="${i.toFixed(1)}" stroke-dashoffset="${r.toFixed(1)}"/>
</svg>`}function J(e,t=380){const s=t/2,a=t/2,i=t/2-64,r=e.length,n=(p,u)=>{const f=-Math.PI/2+p*2*Math.PI/r;return[s+i*u*Math.cos(f),a+i*u*Math.sin(f)]},d=p=>e.map((u,f)=>n(f,p).map(v=>v.toFixed(1)).join(",")).join(" "),c=[.25,.5,.75,1].map(p=>`<polygon points="${d(p)}" fill="none" stroke="#e2e8f0" stroke-width="1"/>`).join(""),h=e.map((p,u)=>{const[f,v]=n(u,1);return`<line x1="${s}" y1="${a}" x2="${f.toFixed(1)}" y2="${v.toFixed(1)}" stroke="#e2e8f0" stroke-width="1"/>`}).join(""),w=e.map((p,u)=>n(u,P(p.value,0,100)/100)),M=w.map(p=>p.map(u=>u.toFixed(1)).join(",")).join(" "),S=w.map(p=>`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.5" fill="#0a66c2"/>`).join(""),g=e.map((p,u)=>{const[f,v]=n(u,1.16),j=Math.cos(-Math.PI/2+u*2*Math.PI/r),U=Math.abs(j)<.35?"middle":j>0?"start":"end";return`<text x="${f.toFixed(1)}" y="${(v+4).toFixed(1)}" text-anchor="${U}" font-size="11.5" font-weight="600" fill="#475569">${o(p.label)}</text>`}).join("");return`<svg width="100%" viewBox="0 0 ${t} ${t}" role="img" aria-label="Radar chart of section scores">
  ${c}${h}
  <polygon points="${M}" fill="rgba(10,102,194,0.22)" stroke="#0a66c2" stroke-width="2.5" stroke-linejoin="round"/>
  ${S}${g}
</svg>`}const L=[{slug:"sarah-mitchell-marketing",url:"https://www.linkedin.com/in/sarah-mitchell-marketing",name:"Sarah Mitchell",initials:"SM",role:"Marketing Manager",company:"Bloom & Co.",industry:"Marketing",location:"Amsterdam, NL",headline:"Marketing enthusiast looking for new opportunities",percentile:62,sections:[{key:"headline",score:42},{key:"about",score:60},{key:"experience",score:74},{key:"education",score:84},{key:"skills",score:52},{key:"activity",score:34},{key:"media",score:25},{key:"presence",score:75}],keywords:["SEO","Content Strategy","GA4","Email Marketing","CRO","A/B Testing","Brand Strategy","Lifecycle Marketing"],headlineFix:{before:"Marketing enthusiast looking for new opportunities",after:"Marketing Manager | Growth & Content for DTC Brands | +142% organic traffic in 12 months",why:"Recruiters search by role, niche and outcome. This headline matches all three — and the number gives it proof."},summary:"Sarah has genuinely strong, quantified experience — but her profile hides it. A generic headline, a dormant feed and zero featured media mean recruiters never see the best of her. The 3 fixes below take about an hour and target exactly those leaks."},{slug:"michael-chen-swe",url:"https://www.linkedin.com/in/michael-chen-swe",name:"Michael Chen",initials:"MC",role:"Senior Software Engineer",company:"Cloudwave",industry:"Software",location:"Singapore",headline:"Senior Software Engineer at Cloudwave",percentile:86,sections:[{key:"headline",score:78},{key:"about",score:84},{key:"experience",score:92},{key:"education",score:76},{key:"skills",score:78},{key:"activity",score:58},{key:"media",score:64},{key:"presence",score:88}],keywords:["System Design","AWS","Kubernetes","Observability","Technical Leadership","Incident Response","Mentoring","Open Source"],headlineFix:{before:"Senior Software Engineer at Cloudwave",after:"Senior Software Engineer | Distributed Systems & Cloud (AWS, K8s) | 99.95% uptime",why:'Your stack and the result you own should be searchable — an employer name alone matches zero recruiter searches for "AWS" or "distributed systems".'},summary:"Michael is in the top ~15% of software profiles: deep, well-quantified experience and a complete education block. The remaining points are all about visibility — posting cadence, leadership keywords and 1–2 featured projects."}],x=[{key:"headline",label:"Headline",icon:"trendUp",weight:.18,desc:"The first thing a recruiter reads — role, niche, proof.",weakIssues:["Headline is a job title or vague phrase — no differentiator","Missing the keywords recruiters actually search for","No quantified result in the headline"],midIssues:["Headline reads like a keyword list rather than a value proposition","No clear outcome or number to earn attention"],fixTitle:"Rewrite your headline",fixDetail:'Turn your headline into: Role | Differentiator | Proof. Example: "Marketing Manager | B2B SaaS | +40% pipeline". Recruiters search all three parts.'},{key:"about",label:"About section",icon:"fileText",weight:.14,desc:"Your 200-word pitch, checked for story and search keywords.",weakIssues:["About section is under 100 words or missing entirely","Written in third person or generic job-description language","No measurable achievements and no call-to-action"],midIssues:["About lists duties instead of one clear story with proof","No call-to-action (contact, portfolio, what you want next)"],fixTitle:"Rewrite your About section",fixDetail:"Lead with who you help and one proof point. Keep it under 200 words, first person, and close with a call-to-action. Aim for 3–5 keywords you want to rank for."},{key:"experience",label:"Experience",icon:"briefcase",weight:.2,desc:"Bullets, metrics and keywords in every role you list.",weakIssues:["Roles with fewer than 2 bullets each","Bullets describe duties, not outcomes or numbers","Most recent role has no summary line"],midIssues:['Bullets are missing numbers ("led the team" vs "+18% conversion")',"Target-role keywords are absent from your bullets"],fixTitle:"Quantify your experience",fixDetail:'Rewrite each bullet as Action + Result + Number. "Cut onboarding time from 14 to 3 days" beats "responsible for onboarding". Two strong bullets per role is enough.'},{key:"education",label:"Education",icon:"book",weight:.08,desc:"Degrees, certifications and courses that back your claims.",weakIssues:["No degree, certification or relevant course listed","Education block incomplete (missing school or years)"],midIssues:["No certifications or courses that reinforce your positioning"],fixTitle:"Complete your education block",fixDetail:"Add degrees, relevant certifications and 2–3 courses. It is a one-time 10-minute fix that removes a common recruiter red flag."},{key:"skills",label:"Skills",icon:"star",weight:.12,desc:"The visible skills that decide which searches you appear in.",weakIssues:["Fewer than 5 skills, and few endorsed","Top skills do not match the roles you are targeting"],midIssues:["Skills list is missing in-demand terms for your industry","Top 3 skills (the ones shown on your profile) are not prioritized"],fixTitle:"Expand and reorder your skills",fixDetail:"List 10–15 skills in the order you want to be found for — the top 3 appear on your profile card. Add the keywords recruiters search, not just what you do daily."},{key:"activity",label:"Activity",icon:"activity",weight:.12,desc:'Posts, comments and recency — the "alive" signal.',weakIssues:["No posts or comments in the last 90 days","Dormant profiles surface far less in recruiter searches"],midIssues:["Posting cadence is inconsistent","No comments on peers’ posts — half the algorithm is replies"],fixTitle:"Post or comment twice a week",fixDetail:"One short post from your week plus two thoughtful comments a day is enough. Recency is a ranking factor — a 6-week streak reliably lifts profile views."},{key:"media",label:"Media & featured",icon:"image",weight:.08,desc:"Featured posts, projects and results people can open.",weakIssues:["No featured section configured","Zero media attached to any experience item"],midIssues:["Media is generic — screenshots of work without context or results"],fixTitle:"Add 2–3 featured items",fixDetail:"Pin one post, one project or one talk to Featured, and attach one media item to your two most recent roles. Recruiters judge depth in the first 5 seconds of media."},{key:"presence",label:"Visual presence",icon:"user",weight:.08,desc:"Photo, banner and custom URL — the visual first impression.",weakIssues:["No professional photo","No custom banner and no custom public URL"],midIssues:["Banner is the default grey block — wasted prime space"],fixTitle:"Upgrade your visual presence",fixDetail:"Photo, a banner with your role and one keyword, and a clean custom URL. Profiles with photos get dramatically more views — it is the cheapest win on this list."}],y=120;function E(e){const t=e.reduce((s,a)=>{const i=x.find(r=>r.key===a.key);return s+a.score*(i?i.weight:0)},0);return Math.round(t)}function K(e,t,s){const a=x.find(r=>r.key===e);if(!a)return[];const i=r=>s?r[Math.floor(s()*r.length)]:r[0];if(t<55){const r=i(a.weakIssues),n=a.weakIssues.filter(d=>d!==r);return[r,...n.length>0?[i(n)]:[]]}return t<75?[i(a.midIssues)]:[]}function _(){return`${Z()}
  <main>
    ${X()}
    ${ee()}
    ${te()}
    ${se()}
    ${ae()}
    ${ie()}
    ${re()}
    ${ne()}
  </main>
  ${oe()}`}function N(){return'<span class="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-sky-400 text-white text-xs font-black tracking-tight">KY</span>'}function Z(){return`<header class="no-print sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur">
  <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
    <a href="#top" class="flex items-center gap-2.5">
      ${N()}
      <span class="text-lg font-extrabold tracking-tight text-white">KY</span>
      <span class="mt-1 hidden text-[11px] font-semibold uppercase tracking-wider text-slate-400 sm:inline">LinkedIn Profile Audit</span>
    </a>
    <nav class="hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex">
      <a class="transition hover:text-white" href="#how">How it works</a>
      <a class="transition hover:text-white" href="#samples">Sample reports</a>
      <a class="transition hover:text-white" href="#pricing">Pricing</a>
      <a class="transition hover:text-white" href="#faq">FAQ</a>
    </nav>
    <a href="#audit" class="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark">
      Audit my profile ${l("arrowRight","h-4 w-4")}
    </a>
  </div>
</header>`}function T(e,t){const s=b(t),a=t<50?"bg-rose-500":t<70?"bg-amber-500":"bg-emerald-500";return`<div>
  <div class="flex items-center justify-between text-xs">
    <span class="font-medium text-slate-300">${e}</span>
    <span class="font-bold tabular-nums" style="color:${s}">${t}</span>
  </div>
  <div class="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
    <div class="h-full rounded-full ${a}" style="width:${t}%"></div>
  </div>
</div>`}function X(){const e=`<div class="relative animate-rise" style="animation-delay:0.15s">
  <div class="max-w-sm rounded-2xl border border-white/10 bg-ink-soft/80 p-6 shadow-2xl shadow-black/40 backdrop-blur">
    <div class="flex items-center gap-4">
      <div class="relative h-[120px] w-[120px] shrink-0">
        ${F(87,120,10)}
        <div class="absolute inset-0 grid place-items-center">
          <span class="text-3xl font-extrabold text-white">87</span>
        </div>
      </div>
      <div class="min-w-0">
        <p class="text-sm font-semibold text-white">Profile score</p>
        <p class="mt-1 text-xs leading-relaxed text-slate-400">Top 13% of Software<br/>profiles this month</p>
      </div>
    </div>
    <div class="mt-5 space-y-3">
      ${T("Headline",78)}
      ${T("Experience",92)}
      ${T("Activity",58)}
    </div>
    <div class="mt-5 flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-3 py-2">
      ${l("zap","h-4 w-4 shrink-0 text-emerald-400")}
      <p class="text-xs font-medium text-emerald-300">Top fix: post or comment 2x a week</p>
    </div>
  </div>
  <div class="absolute -bottom-5 -left-5 hidden animate-rise items-center gap-2.5 rounded-xl bg-white px-4 py-3 shadow-xl sm:flex" style="animation-delay:0.35s">
    ${l("trendUp","h-5 w-5 text-emerald-600")}
    <div>
      <p class="text-sm font-bold leading-none text-slate-900">+23 pts</p>
      <p class="mt-0.5 text-[11px] text-slate-500">after 30 days</p>
    </div>
  </div>
</div>`;return`<section id="top" class="relative overflow-hidden bg-ink text-white">
  <div class="hero-glow absolute inset-0"></div>
  <div class="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-24 pt-16 sm:pt-20 lg:grid-cols-2 lg:pt-24">
    <div class="animate-rise">
      <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-200">
        ${l("sparkles","h-3.5 w-3.5 text-sky-400")} Phase 1 demo &middot; Free &middot; No sign-up
      </span>
      <h1 class="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
        Your LinkedIn profile,<br/>
        <span class="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">scored in 60 seconds.</span>
      </h1>
      <p class="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
        KY audits your headline, About, experience, skills and activity across ${y}+ checkpoints, benchmarks you against your industry — and hands you the 3 fixes that matter most.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href="#audit" class="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-dark">
          Audit my profile — it's free ${l("arrowRight","h-5 w-5")}
        </a>
        <a href="#samples" class="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10">
          See a sample report
        </a>
      </div>
      <dl class="mt-10 grid max-w-md grid-cols-3 gap-4">
        <div>
          <dt class="text-2xl font-extrabold text-white">${y}+</dt>
          <dd class="mt-1 text-xs text-slate-400">checkpoints</dd>
        </div>
        <div>
          <dt class="text-2xl font-extrabold text-white">8</dt>
          <dd class="mt-1 text-xs text-slate-400">sections audited</dd>
        </div>
        <div>
          <dt class="text-2xl font-extrabold text-white">Free</dt>
          <dd class="mt-1 text-xs text-slate-400">in Phase 1</dd>
        </div>
      </dl>
    </div>
    ${e}
  </div>
</section>`}function B(e,t,s,a){const i=b(a);return`<button type="button" data-sample="${e}" class="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand hover:text-brand">
  <span class="grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold" style="background:rgba(10,102,194,.12);color:#0a66c2">${o(t.slice(0,2).toUpperCase())}</span>
  ${o(t)}
  <span class="rounded-full px-2 py-0.5 text-xs font-bold" style="background:rgba(100,116,139,.1);color:${i}">${a}</span>
  <span class="hidden text-slate-400 sm:inline">${o(s)}</span>
</button>`}function ee(){return`<section id="audit" class="bg-white py-20 sm:py-24">
  <div class="mx-auto max-w-3xl animate-rise px-4 text-center">
    <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Paste a profile. Get your report.</h2>
    <p class="mt-3 text-lg text-slate-600">No login, no sign-up. In Phase 1 every audit runs on realistic sample data.</p>
    <form id="audit-form" class="mt-8 flex flex-col gap-3 sm:flex-row" novalidate>
      <label class="sr-only" for="profile-url">LinkedIn profile URL</label>
      <div class="relative flex-1 text-left">
        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">${l("link","h-5 w-5")}</span>
        <input id="profile-url" name="profile-url" type="text" inputmode="url" autocomplete="off"
          placeholder="https://www.linkedin.com/in/your-profile"
          class="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-12 pr-4 text-slate-900 transition placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"/>
      </div>
      <button type="submit" class="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-semibold text-white transition hover:bg-brand-dark">
        ${l("search","h-5 w-5")} Run free audit
      </button>
    </form>
    <p id="audit-error" class="mt-3 hidden text-sm font-medium text-rose-600"></p>
    <div class="mt-6 flex flex-wrap items-center justify-center gap-2.5">
      <span class="text-sm font-medium text-slate-500">Or try a sample:</span>
      ${B("sarah-mitchell-marketing","Sarah Mitchell","Marketing",56)}
      ${B("michael-chen-swe","Michael Chen","Software",79)}
    </div>
    <p class="mt-4 text-xs text-slate-400">Any URL works in demo mode — results are sample-based, not your real data.</p>
  </div>
</section>`}function I(e,t,s,a){return`<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
  <div class="flex items-center gap-3">
    <span class="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">${l(t,"h-5 w-5")}</span>
    <span class="text-sm font-bold text-slate-400">Step ${e}</span>
  </div>
  <h3 class="mt-4 text-lg font-bold text-slate-900">${s}</h3>
  <p class="mt-2 text-sm leading-relaxed text-slate-600">${a}</p>
</div>`}function te(){return`<section id="how" class="bg-slate-50 py-20 sm:py-24">
  <div class="mx-auto max-w-6xl px-4">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">How it works</h2>
      <p class="mt-3 text-lg text-slate-600">Three steps. No account, no LinkedIn login, nothing to install.</p>
    </div>
    <div class="mt-12 grid gap-6 md:grid-cols-3">
      ${I("1","search","Paste the profile URL","Send KY any LinkedIn profile — yours, a candidate, a client. Public information only, and in Phase 1, demo data.")}
      ${I("2","zap",`Runs ${y}+ checkpoints`,"Headline, About, experience, education, skills, activity, media and presence — each scored 0–100 against industry benchmarks.")}
      ${I("3","target","Get your 3 priority fixes","A benchmarked overall score, your keyword gaps, and the highest-impact changes — written so you can act on them today.")}
    </div>
  </div>
</section>`}function O(e){const t=L.find(r=>r.slug===e);if(!t)return"";const s=E(t.sections),i=[...t.sections].sort((r,n)=>r.score-n.score).slice(0,2).map(r=>{const n=x.find(c=>c.key===r.key),d=b(r.score);return`<span class="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">${o(n?n.label:r.key)} <span style="color:${d}">${r.score}</span></span>`}).join("");return`<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
  <div class="flex items-center gap-4">
    <div class="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand/10 font-bold text-brand">${t.initials}</div>
    <div class="min-w-0 flex-1">
      <p class="font-bold text-slate-900">${o(t.name)}</p>
      <p class="text-sm text-slate-500">${o(t.role)} · ${o(t.company)}</p>
    </div>
    <div class="relative h-16 w-16 shrink-0">
      ${F(s,64,6)}
      <div class="absolute inset-0 grid place-items-center">
        <span class="text-sm font-extrabold" style="color:${b(s)}">${s}</span>
      </div>
    </div>
  </div>
  <p class="mt-4 text-sm text-slate-600">Better than <strong class="text-slate-900">${t.percentile}%</strong> of ${o(t.industry)} profiles</p>
  <div class="mt-3 flex flex-wrap gap-2">${i}</div>
  <button type="button" data-sample-view="${t.slug}" class="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand py-2.5 font-semibold text-brand transition hover:bg-brand hover:text-white">
    View full report ${l("arrowRight","h-4 w-4")}
  </button>
</div>`}function se(){return`<section id="samples" class="bg-white py-20 sm:py-24">
  <div class="mx-auto max-w-6xl px-4">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Sample reports</h2>
      <p class="mt-3 text-lg text-slate-600">Two realistic profiles. One underperforms, one nearly peaks — see exactly what KY points out in each.</p>
    </div>
    <div class="mt-12 grid gap-6 md:grid-cols-2">
      ${O("sarah-mitchell-marketing")}
      ${O("michael-chen-swe")}
    </div>
  </div>
</section>`}function ae(){const e=x.map(t=>`<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div class="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">${l(t.icon,"h-5 w-5")}</div>
    <h3 class="mt-3 font-bold text-slate-900">${o(t.label)}</h3>
    <p class="mt-1.5 text-sm leading-relaxed text-slate-600">${o(t.desc)}</p>
  </div>`);return`<section class="bg-slate-50 py-20 sm:py-24">
  <div class="mx-auto max-w-6xl px-4">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">What we audit</h2>
      <p class="mt-3 text-lg text-slate-600">Eight sections, ${y}+ checkpoints — everything a recruiter or client scans in the first 60 seconds.</p>
    </div>
    <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      ${e.join("")}
    </div>
  </div>
</section>`}function ie(){return`<section id="pricing" class="bg-white py-20 sm:py-24">
  <div class="mx-auto max-w-6xl px-4">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Pricing</h2>
      <p class="mt-3 text-lg text-slate-600">Phase 1 is completely free. Pro lands in Phase 2 with an early-bird price.</p>
    </div>
    <div class="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
      <div class="rounded-2xl border-2 border-brand bg-white p-7 shadow-sm">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-slate-900">Free</h3>
          <span class="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">Phase 1</span>
        </div>
        <p class="mt-2 text-sm text-slate-500">Everything you need to see exactly how your profile is read.</p>
        <p class="mt-5 text-4xl font-extrabold text-slate-900">$0<span class="text-base font-medium text-slate-400"> / forever</span></p>
        <ul class="mt-6 space-y-3 text-sm text-slate-600">
          ${["Full 8-section audit","Industry benchmark & percentile","Keyword gap analysis","3 priority fixes, written for action","Shareable report (copy, PDF, LinkedIn post)"].map(e=>`<li class="flex items-start gap-2.5">${l("check","h-4 w-4 shrink-0 text-emerald-600")} ${e}</li>`).join("")}
        </ul>
        <a href="#audit" class="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-brand py-3 font-semibold text-white transition hover:bg-brand-dark">Run your free audit</a>
      </div>
      <div class="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-slate-900">Pro</h3>
          <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">Phase 2</span>
        </div>
        <p class="mt-2 text-sm text-slate-500">For job hunters, founders and recruiters who audit regularly.</p>
        <p class="mt-5 text-4xl font-extrabold text-slate-900">$12<span class="text-base font-medium text-slate-400"> / month early bird</span></p>
        <ul class="mt-6 space-y-3 text-sm text-slate-600">
          ${["Live audits of real public profiles","AI rewrites for every section","Weekly re-audits & score tracking","Keyword tracking with alerts","1-page PDF report, resume-ready"].map(e=>`<li class="flex items-start gap-2.5">${l("check","h-4 w-4 shrink-0 text-brand")} ${e}</li>`).join("")}
        </ul>
        <a href="#waitlist" class="mt-7 inline-flex w-full items-center justify-center rounded-xl border border-slate-300 py-3 font-semibold text-slate-700 transition hover:border-brand hover:text-brand">Join the waitlist</a>
      </div>
    </div>
  </div>
</section>`}function re(){return`<section id="waitlist" class="bg-ink py-16 text-white sm:py-20">
  <div class="mx-auto max-w-2xl px-4 text-center">
    <h2 class="text-3xl font-extrabold tracking-tight">Be first when live audits ship</h2>
    <p class="mt-3 text-lg text-slate-300">Phase 2 adds real profile analysis, AI rewrites and weekly tracking. Waitlist members get early access and 3 months free.</p>
    <form id="waitlist-form" class="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row" novalidate>
      <label class="sr-only" for="waitlist-email">Email address</label>
      <input id="waitlist-email" type="email" placeholder="you@example.com"
        class="w-full flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"/>
      <button type="submit" class="rounded-xl bg-sky-500 px-6 py-3 font-semibold text-ink transition hover:bg-sky-400">Join waitlist</button>
    </form>
  </div>
</section>`}function k(e,t){return`<details class="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
  <summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900 [&::-webkit-details-marker]:hidden">
    ${e}
    <span class="shrink-0 text-slate-400 transition-transform group-open:rotate-180">${l("chevronDown","h-5 w-5")}</span>
  </summary>
  <p class="mt-3 text-sm leading-relaxed text-slate-600">${t}</p>
</details>`}function ne(){return`<section id="faq" class="bg-slate-50 py-20 sm:py-24">
  <div class="mx-auto max-w-3xl px-4">
    <div class="text-center">
      <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">FAQ</h2>
    </div>
    <div class="mt-10 space-y-4">
      ${k("Is this using my real profile data?","Not yet. Phase 1 is a demonstration build: every audit runs on realistic, sample-based data so you can explore the full experience end-to-end. Live analysis of public profiles arrives in Phase 2.")}
      ${k("How is the score calculated?",`Each of the 8 sections is scored 0–100 against ${y}+ checkpoints (length, keywords, quantified results, recency, media, visual polish). The overall score is a weighted blend — experience and headline weigh most, because that's what recruiters read first.`)}
      ${k("Is KY affiliated with LinkedIn?","No. KY is an independent, unofficial tool. We never ask for your LinkedIn credentials, and Phase 1 reads no real data at all.")}
      ${k("When does Phase 2 ship?","Phase 2 adds live audits of public profiles, AI rewrites for every section, keyword tracking with alerts, and 1-page PDF reports. Waitlist members get early access and 3 months free.")}
      ${k("What is Phase 1 for?","Showing the product, validating the flow and gathering feedback: a shareable demo you can try in 60 seconds, without an account. That is exactly what you are using right now.")}
    </div>
  </div>
</section>`}function oe(){return`<footer class="bg-ink py-12 text-slate-400">
  <div class="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center">
    <div class="flex items-center gap-2.5">
      ${N()}
      <span class="text-lg font-extrabold tracking-tight text-white">KY</span>
    </div>
    <p class="max-w-md text-sm">LinkedIn profile intelligence for job hunters, founders and the people hiring them.</p>
    <p class="max-w-md text-xs text-slate-500">
      Phase 1 demo — not affiliated with LinkedIn Corporation. Demo data is illustrative and no real profile data is read.
    </p>
    <p class="text-xs text-slate-600">© 2026 KY</p>
  </div>
</footer>`}function le(e,t){const s=e.querySelector("#audit-form"),a=e.querySelector("#profile-url"),i=e.querySelector("#audit-error");s&&a&&i&&s.addEventListener("submit",d=>{d.preventDefault();const c=a.value.trim();if(!c){i.textContent="Paste a LinkedIn profile URL first.",i.classList.remove("hidden"),a.focus();return}i.classList.add("hidden"),t(c)}),e.querySelectorAll("[data-sample]").forEach(d=>{d.addEventListener("click",()=>{const c=L.find(h=>h.slug===(d.dataset.sample??""));c&&(a&&(a.value=c.url),t(c.url))})}),e.querySelectorAll("[data-sample-view]").forEach(d=>{d.addEventListener("click",()=>{const c=L.find(h=>h.slug===(d.dataset.sampleView??""));c&&t(c.url)})});const r=e.querySelector("#waitlist-form"),n=e.querySelector("#waitlist-email");r&&n&&r.addEventListener("submit",d=>{if(d.preventDefault(),!n.value.trim().includes("@")){$("Enter a valid email first (demo — nothing is sent)."),n.focus();return}$("You're on the waitlist 🎉 (demo — nothing is sent)"),n.value=""})}function de(e){const t=["Fetching public profile data",`Running ${y}+ checkpoints`,`Benchmarking against ${e.industry} peers`,"Finding missing keywords","Writing your 3 priority fixes","Building your report"];return`<div class="grid min-h-screen place-items-center bg-slate-50 px-4">
  <div class="w-full max-w-md animate-pop rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
    <div class="flex items-center gap-3">
      <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">${l("search","h-5 w-5")}</span>
      <div class="min-w-0">
        <p class="font-bold text-slate-900">Auditing ${o(e.name)}</p>
        <p class="truncate text-xs text-slate-500">${o(e.input.display)}</p>
      </div>
    </div>
    <ol class="mt-7 space-y-4">
      ${t.map(s=>`<li data-step data-state="pending" class="flex items-center gap-3">
          <span class="step-dot grid h-6 w-6 shrink-0 place-items-center rounded-full"></span>
          <span class="step-label text-sm">${s}</span>
        </li>`).join("")}
    </ol>
    <div class="mt-7 h-1.5 overflow-hidden rounded-full bg-slate-100">
      <div data-progress class="h-full rounded-full bg-brand transition-all duration-300" style="width:0%"></div>
    </div>
  </div>
</div>`}function ce(e,t){const s=Array.from(e.querySelectorAll("[data-step]")),a=e.querySelector("[data-progress]");let i=0;const r=()=>{var n;if(i>0){const d=s[i-1];if(d){d.setAttribute("data-state","done");const c=d.querySelector(".step-dot");c&&(c.innerHTML=l("check","h-3.5 w-3.5 text-white"))}}i<s.length?((n=s[i])==null||n.setAttribute("data-state","active"),a&&(a.style.width=`${Math.round((i+1)/s.length*100)}%`),i+=1,window.setTimeout(r,360+i%2*140)):(a&&(a.style.width="100%"),window.setTimeout(t,500))};window.setTimeout(r,250)}const pe={High:"bg-rose-50 text-rose-700 ring-1 ring-rose-200",Medium:"bg-amber-50 text-amber-700 ring-1 ring-amber-200",Low:"bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"};function he(e){return e<50?"bg-rose-500":e<70?"bg-amber-500":"bg-emerald-500"}function ue(e){const t=window.location.href.split("#")[0];return[`Just scored my LinkedIn profile: ${e.overall}/100 with KY.`,"",`That's better than ${e.percentile}% of ${e.industry} profiles (Phase 1 demo data).`,"","The 3 fixes KY flagged:",...e.fixes.map((s,a)=>`${a+1}. ${s.title}`),"",`Try it free: ${t}`,"","#LinkedIn #PersonalBrand #CareerGrowth"].join(`
`)}function me(e){return[`KY Profile Audit — ${e.name}`,`Source: ${e.input.display} (${e.source==="curated"?"sample profile":"demo estimate"})`,`Generated: ${new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}`,"",`Overall: ${e.overall}/100 — better than ${e.percentile}% of ${e.industry} profiles (demo benchmark)`,"","Section scores:",...e.sections.map(s=>`  - ${s.label}: ${s.score}/100${s.issues.length?` (${s.issues.join("; ")})`:""}`),"","Top 3 fixes:",...e.fixes.map((s,a)=>`${a+1}. [${s.impact}] ${s.title} — ${s.detail}`),"",`Keyword gaps: ${e.keywords.join(", ")}`,"","Headline:",`  Before: ${e.headlineFix.before}`,`  After:  ${e.headlineFix.after}`,"","KY — LinkedIn Profile Audit (Phase 1 demo). Not affiliated with LinkedIn."].join(`
`)}function fe(e){const t=b(e.overall),s=new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}),a=e.source==="curated"?"Sample profile — Phase 1 demo data":`Demo estimate for ${o(e.input.display)} — sample-based data`;return`<div class="min-h-screen bg-slate-50">
  <header class="no-print sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
      <a href="#" data-home class="flex items-center gap-2.5">
        <span class="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-sky-400 text-xs font-black text-white">KY</span>
        <span class="font-extrabold tracking-tight text-white">KY</span>
      </a>
      <div class="flex items-center gap-3">
        <span class="hidden items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300 sm:inline-flex">
          ${l("alert","h-3.5 w-3.5")} Phase 1 demo
        </span>
        <button data-action="restart" class="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark">
          ${l("refresh","h-4 w-4")} New audit
        </button>
      </div>
    </div>
  </header>

  <main class="mx-auto max-w-6xl px-4 py-8">
    <p class="no-print text-xs text-slate-500">${a}. Generated ${s}. Not affiliated with LinkedIn.</p>

    <section class="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div class="flex flex-col gap-8 sm:flex-row sm:items-center">
        <div class="flex min-w-0 flex-1 items-center gap-4">
          <div class="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-brand/10 text-xl font-extrabold text-brand">${e.initials}</div>
          <div class="min-w-0">
            <h1 class="truncate text-2xl font-extrabold text-slate-900">${o(e.name)}</h1>
            <p class="truncate text-slate-600">${o(e.role)}</p>
            <p class="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
              <span class="inline-flex items-center gap-1.5">${l("globe","h-4 w-4")} ${o(e.industry)}</span>
              <span class="inline-flex items-center gap-1.5">${l("mapPin","h-4 w-4")} ${o(e.location)}</span>
            </p>
          </div>
        </div>
        <div class="flex items-center gap-6">
          <div class="relative h-[170px] w-[170px] shrink-0">
            ${F(e.overall,170,14)}
            <div class="absolute inset-0 grid place-items-center">
              <div class="text-center">
                <span class="text-5xl font-extrabold tabular-nums" style="color:${t}">${e.overall}</span>
                <span class="mt-1 block text-xs font-medium text-slate-400">out of 100</span>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <p class="text-sm font-semibold text-slate-900">Better than ${e.percentile}%</p>
            <p class="text-sm text-slate-500">of ${o(e.industry)} profiles<br/>(demo benchmark)</p>
          </div>
        </div>
      </div>
      <p class="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">${o(e.summary)}</p>
    </section>

    <div class="mt-6 grid items-start gap-6 lg:grid-cols-5">
      <div class="space-y-6 lg:col-span-3">
        ${xe(e)}
        ${ge(e)}
        ${be(e)}
      </div>
      <div class="space-y-6 lg:col-span-2">
        ${ye(e)}
        ${we(e)}
      </div>
    </div>

    <section class="no-print mt-8 flex flex-wrap gap-3">
      <button data-action="share" class="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark">
        ${l("share","h-5 w-5")} Share on LinkedIn
      </button>
      <button data-action="copy" class="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-brand hover:text-brand">
        ${l("copy","h-5 w-5")} Copy report
      </button>
      <button data-action="print" class="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-brand hover:text-brand">
        ${l("download","h-5 w-5")} Download PDF
      </button>
    </section>
  </main>

  <footer class="no-print py-8 text-center text-xs text-slate-400">KY · Phase 1 demo · ${s}</footer>
</div>`}function xe(e){return`<section class="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" style="animation-delay:0.05s">
  <h2 class="text-lg font-bold text-slate-900">Section scores</h2>
  <p class="mt-0.5 text-sm text-slate-500">8 sections · 120+ checkpoints</p>
  <div class="mt-5 space-y-5">
    ${e.sections.map(t=>{const s=x.find(i=>i.key===t.key),a=b(t.score);return`<div class="flex items-start gap-3">
        <div class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500">${l(s?s.icon:"target")}</div>
        <div class="min-w-0 flex-1">
          <div class="flex items-baseline justify-between gap-2">
            <p class="text-sm font-semibold text-slate-800">${o(t.label)}</p>
            <p class="text-sm font-bold tabular-nums" style="color:${a}">${t.score}</p>
          </div>
          <div class="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
            <div class="bar-fill h-full rounded-full ${he(t.score)}" style="width:${t.score}%"></div>
          </div>
          ${t.issues.length?`<p class="mt-1.5 text-xs leading-relaxed text-slate-500">${t.issues.map(o).join(" · ")}</p>`:'<p class="mt-1.5 text-xs font-medium text-emerald-600">No major issues found here.</p>'}
        </div>
      </div>`}).join("")}
  </div>
</section>`}function ge(e){return`<section class="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" style="animation-delay:0.1s">
  <div class="flex items-center gap-2">
    <h2 class="text-lg font-bold text-slate-900">Keyword gaps</h2>
    <span class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">top ${e.keywords.length}</span>
  </div>
  <p class="mt-0.5 text-sm text-slate-500">Terms recruiters and clients search for in ${o(e.industry)} — missing from this profile.</p>
  <div class="mt-4 flex flex-wrap gap-2">
    ${e.keywords.map(t=>`<span class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">
        ${l("x","h-3.5 w-3.5 text-rose-500")} ${o(t)}</span>`).join("")}
  </div>
  <p class="mt-4 text-xs text-slate-400">Tip: work these into your headline, About and top skills — 3–5 per week, not all at once.</p>
</section>`}function be(e){return`<section class="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" style="animation-delay:0.15s">
  <h2 class="text-lg font-bold text-slate-900">Headline, rewritten</h2>
  <p class="mt-0.5 text-sm text-slate-500">The single highest-impact change on your profile.</p>
  <div class="mt-4 space-y-3">
    <div class="flex items-start gap-3 rounded-xl border border-rose-100 bg-rose-50 p-4">
      <span class="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-rose-100 text-rose-600">${l("x","h-3.5 w-3.5")}</span>
      <div class="min-w-0">
        <p class="text-xs font-semibold uppercase tracking-wide text-rose-400">Before</p>
        <p class="mt-1 text-sm text-slate-700">${o(e.headlineFix.before)}</p>
      </div>
    </div>
    <div class="flex justify-center">${l("arrowRight","h-5 w-5 rotate-90 text-slate-300")}</div>
    <div class="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
      <span class="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-600">${l("check","h-3.5 w-3.5")}</span>
      <div class="min-w-0 flex-1">
        <p class="text-xs font-semibold uppercase tracking-wide text-emerald-600">After</p>
        <p class="mt-1 text-sm font-semibold text-slate-900">${o(e.headlineFix.after)}</p>
      </div>
      <button data-action="copy-headline" class="no-print shrink-0 rounded-lg border border-emerald-300 bg-white p-1.5 text-emerald-700 transition hover:bg-emerald-100" title="Copy this headline">
        ${l("copy","h-3.5 w-3.5")}
      </button>
    </div>
    <div class="rounded-lg border border-slate-100 bg-slate-50 p-3.5 text-sm leading-relaxed text-slate-600">
      <span class="font-semibold text-slate-800">Why it works:</span> ${o(e.headlineFix.why)}
    </div>
  </div>
</section>`}function ye(e){return`<section class="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" style="animation-delay:0.1s">
  <h2 class="text-lg font-bold text-slate-900">Profile radar</h2>
  <p class="mt-0.5 text-sm text-slate-500">Where you're strong, where you leak impressions.</p>
  <div class="mt-2">${J(e.sections.map(t=>({label:t.label,value:t.score})))}</div>
</section>`}function we(e){return`<section class="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" style="animation-delay:0.15s">
  <h2 class="text-lg font-bold text-slate-900">Your top 3 fixes</h2>
  <p class="mt-0.5 text-sm text-slate-500">Ranked by impact on your overall score.</p>
  <div class="mt-4 space-y-3">
    ${e.fixes.map((t,s)=>`<div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div class="flex items-center justify-between gap-3">
          <p class="text-sm font-bold text-slate-900"><span class="mr-1.5 text-slate-400">${s+1}.</span>${o(t.title)}</p>
          <span class="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${pe[t.impact]}">${t.impact}</span>
        </div>
        <p class="mt-1.5 text-sm leading-relaxed text-slate-600">${o(t.detail)}</p>
      </div>`).join("")}
  </div>
</section>`}function ve(e,t,s){e.querySelectorAll("[data-action]").forEach(i=>{i.addEventListener("click",async()=>{const r=i.dataset.action;if(r==="restart")s();else if(r==="share"){const n=await A(ue(t));$(n?"Copied — paste it straight into LinkedIn":"Copy failed — select the text manually")}else if(r==="copy"){const n=await A(me(t));$(n?"Full report copied to clipboard":"Copy failed")}else if(r==="print")window.print();else if(r==="copy-headline"){const n=await A(t.headlineFix.after);$(n?"Headline copied":"Copy failed")}})});const a=e.querySelector("[data-home]");a==null||a.addEventListener("click",i=>{i.preventDefault(),s()})}const ke=[{key:"marketing",label:"Marketing",keywords:["SEO","Content Strategy","GA4","Email Marketing","CRO","A/B Testing","Brand Strategy","Lifecycle Marketing"],headlines:[{before:"Marketing enthusiast looking for new opportunities",after:"Marketing Manager | Growth & Content for DTC Brands | +142% organic traffic in 12 months",why:"Recruiters search by role, niche and outcome. This headline matches all three — and the number gives it proof."},{before:"Digital marketing / social media / content",after:"Content & Social Lead | B2B SaaS | 3.2M impressions across 12 channels",why:"Keyword soup reads as spam; role + niche + proof reads as expertise."}]},{key:"software",label:"Software",keywords:["System Design","AWS","Kubernetes","Observability","Technical Leadership","Incident Response","Mentoring","Open Source"],headlines:[{before:"Software Engineer at Acme",after:"Senior Software Engineer | Distributed Systems & Cloud (AWS, K8s) | 99.95% uptime",why:"Your stack and the result you own should be searchable — not just your employer."},{before:"Full stack developer. Python. JS. SQL",after:"Full-Stack Engineer | React & Go | Shipped 3 products used by 400k people",why:"Adding the scale you have shipped turns a tool list into evidence."}]},{key:"sales",label:"Sales",keywords:["Pipeline Management","Salesforce","SaaS","Forecasting","Deal Desk","Enterprise Sales","Discovery","Negotiation"],headlines:[{before:"Sales professional seeking challenges",after:"Enterprise AE | SaaS $1–10M ACV | 128% of quota for 3 consecutive years",why:"Buyers and recruiters both filter on deal size and quota performance."},{before:"Business development / partnerships",after:"Partnerships Lead | Cloud & SaaS | 14 strategic deals closed in 2025",why:'"BD" is vague; the industry plus a closed count makes you specific and memorable.'}]},{key:"product",label:"Product",keywords:["Roadmapping","A/B Testing","SQL","User Research","Onboarding","Cohort Analysis","GTM","OKRs"],headlines:[{before:"Product Manager",after:"Product Manager | B2B Onboarding | Cut time-to-value from 14d to 3d",why:"A role plus a metric outcome shows you ship — not just manage."},{before:"PM looking for great teams",after:"Senior PM | 0-to-1 Consumer Apps | 2.1M installs across 3 launches",why:"Recruiters search for the problems you have solved, not the teams you want."}]},{key:"design",label:"Design",keywords:["Design Systems","Figma","Prototyping","Usability Testing","Accessibility","Motion Design","Design Tokens","Developer Handoff"],headlines:[{before:"UX/UI designer",after:"Product Designer | Fintech & Mobile | 40+ shipped flows, 2 design systems",why:"Discipline + domain + volume of shipped work is what hiring managers search."},{before:"Graphic designer | open to work",after:"Brand & Product Designer | Identity systems with 3 award nominations",why:'Drop "open to work" into your headline; state your craft and your proof instead.'}]},{key:"finance",label:"Finance",keywords:["FP&A","P&L","Budgeting","RevOps","M&A Modeling","IFRS","Cash Flow","Unit Economics"],headlines:[{before:"Finance manager",after:"Finance Manager | SaaS RevOps | Built P&L for 3 product lines, $12M ARR",why:'Niche (RevOps) plus scale (ARR) separates you from 90% of "finance" profiles.'},{before:"Looking for finance opportunities",after:"Senior Financial Analyst | FP&A & M&A Modeling | Big 4 to SaaS",why:"Career trajectory plus speciality is the fastest way to be picked from search."}]},{key:"operations",label:"Operations",keywords:["Process Improvement","Lean","Supply Chain","ERP","Vendor Management","KPI Dashboards","SOPs","Capacity Planning"],headlines:[{before:"Operations manager",after:"Operations Lead | Logistics & 3PL | 38% cost reduction across 5 hubs",why:"Operations credibility lives in the number, not the title."},{before:"Supply chain / logistics",after:"Supply Chain Manager | Cold-chain, EU | 120k units/month, zero compliance incidents",why:"Scope (region, volume) and risk ownership (compliance) are your differentiators."}]},{key:"education",label:"Education",keywords:["Curriculum Design","IEP","EdTech","Differentiated Instruction","Classroom Management","Data Literacy","AP/IB","Coaching"],headlines:[{before:"Teacher",after:"High-School Physics Teacher | AP Program Lead | 94% pass rate, 5 yrs",why:"Subject + program + student outcome — the three things school leaders search."},{before:"Looking for teaching positions",after:"Learning Designer | K-12 EdTech | Curriculum used by 60+ schools",why:"The move into ed-tech is a differentiator — say it explicitly."}]}];function $e(e){const t=L.find(s=>s.slug===e.slug);return t?Se(t,e):Pe(e)}function Me(e){var t;return((t=x.find(s=>s.key===e))==null?void 0:t.label)??e}function q(e){const t=[...e].sort((a,i)=>a.score-i.score).slice(0,3),s=["High","Medium","Low"];return t.map((a,i)=>{const r=x.find(n=>n.key===a.key);return{title:r?r.fixTitle:"Improve this section",detail:r?r.fixDetail:"Bring this section in line with the rest of your profile.",impact:s[i]}})}function Se(e,t){const s=e.sections.map(a=>({key:a.key,label:Me(a.key),score:a.score,issues:K(a.key,a.score)}));return{source:"curated",input:t,name:e.name,initials:e.initials,role:`${e.role} · ${e.company}`,industry:e.industry,location:e.location,headline:e.headline,overall:E(s),percentile:e.percentile,sections:s,fixes:q(s),keywords:e.keywords,headlineFix:e.headlineFix,summary:e.summary}}function Pe(e){const t=V(G(`${e.kind}|${e.slug}`)),s=H(t,ke),a=C(t,40,72),i=x.map(g=>{const p=P(a+C(t,-12,14),18,95);return{key:g.key,label:g.label,score:p,issues:K(g.key,p,t)}}),r=E(i),n=P(r+C(t,-5,7),4,96),d=H(t,s.headlines),c=Q(t,s.keywords,5),h=[...i].sort((g,p)=>g.score-p.score),w=h[0],M=h[h.length-1],S=e.slug.replace(/[^a-z0-9]/g,"").slice(0,2).toUpperCase();return{source:"estimated",input:e,name:"Your profile",initials:S.length>=2?S:"KY",role:`${s.label} professional`,industry:s.label,location:"—",headline:d.before,overall:r,percentile:n,sections:i,fixes:q(i),keywords:c,headlineFix:d,summary:`A ${s.label.toLowerCase()} profile with real signal to work with: strongest section is ${M.label} (${M.score}/100), weakest is ${w.label} (${w.score}/100). Closing the three lowest-scoring sections is usually the fastest route to a visibly better score.`}}function D(e){return e.toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,"").slice(0,48)}function Le(e){const t=e.trim();if(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,79}$/.test(t)){const a=D(t);return{raw:t,kind:"linkedin",slug:a,display:`linkedin.com/in/${a}`}}let s=null;try{s=new URL(t.includes("://")?t:`https://${t}`)}catch{s=null}if(s&&s.hostname){const a=s.hostname.replace(/^www\./,"").toLowerCase(),i=a.includes("linkedin"),r=s.pathname.split("/").filter(Boolean),n=r.findIndex(h=>h==="in"||h==="pub"||h==="company"||h==="school"),d=n>=0&&r[n+1]?r[n+1]:r[0]??"",c=D(d)||"profile";return{raw:t,kind:i?"linkedin":"other",slug:c,display:`${a}${s.pathname}`.slice(0,60)}}return{raw:t,kind:"other",slug:D(t)||"profile",display:t.slice(0,60)}}const m=document.getElementById("app");function Ae(){m&&Y()}function Y(){m&&(m.innerHTML=_(),le(m,Ce),window.scrollTo(0,0))}function Ce(e){if(!m)return;const t=Le(e),s=$e(t);m.innerHTML=de(s),ce(m,()=>{m&&(m.innerHTML=fe(s),ve(m,s,Y),window.scrollTo(0,0))})}Ae();
