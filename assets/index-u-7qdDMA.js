(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function s(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(a){if(a.ep)return;a.ep=!0;const o=s(a);fetch(a.href,o)}})();const Ne={check:'<path d="M20 6 9 17l-5-5"/>',x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',arrowRight:'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',zap:'<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',target:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',briefcase:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',star:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',activity:'<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',image:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',share:'<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="m16 6-4-4-4 4"/><path d="M12 2v13"/>',copy:'<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',sparkles:'<path d="m12 3 1.9 5.7 5.8 1.9-5.8 1.9L12 18.4l-1.9-5.9-5.8-1.9 5.8-1.9L12 3z"/><path d="M19 14.5l.8 2.4 2.4.8-2.4.8-.8 2.4-.8-2.4-2.4-.8 2.4-.8.8-2.4z"/><path d="M5 3l.7 2.1 2.1.7-2.1.7L5 8.6l-.7-2.1L2.2 5.8l2.1-.7L5 3z"/>',link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',camera:'<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',alert:'<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',trendUp:'<path d="m23 6-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/>',fileText:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/>',chevronDown:'<path d="m6 9 6 6 6-6"/>',refresh:'<path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',mapPin:'<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',history:'<path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l4 2"/>',bell:'<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',plus:'<path d="M12 5v14"/><path d="M5 12h14"/>',trash:'<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>',sliders:'<path d="M4 21v-7"/><path d="M4 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-5"/><path d="M20 12V3"/><path d="M1 14h6"/><path d="M9 8h6"/><path d="M17 16h6"/>',mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',chart:'<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',paste:'<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>',logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>'};function u(e,t="h-5 w-5"){return`<svg class="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Ne[e]}</svg>`}const He={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function d(e){return e.replace(/[&<>"']/g,t=>He[t])}let fe=0;function w(e){const t=document.getElementById("toast");t&&(t.textContent=e,t.classList.add("toast-show"),window.clearTimeout(fe),fe=window.setTimeout(()=>t.classList.remove("toast-show"),2800))}async function U(e){try{return await navigator.clipboard.writeText(e),!0}catch{try{const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();const s=document.execCommand("copy");return t.remove(),s}catch{return!1}}}function Be(e){let t=2166136261;for(let s=0;s<e.length;s++)t^=e.charCodeAt(s),t=Math.imul(t,16777619);return t>>>0}function Ke(e){let t=e>>>0;return()=>{t|=0,t=t+1831565813|0;let s=Math.imul(t^t>>>15,1|t);return s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967296}}function Q(e,t,s){return t+Math.floor(e()*(s-t+1))}function xe(e,t){return t[Math.min(t.length-1,Math.floor(e()*t.length))]}function Oe(e,t,s){const n=[...t];for(let a=n.length-1;a>0;a--){const o=Math.floor(e()*(a+1));[n[a],n[o]]=[n[o],n[a]]}return n.slice(0,Math.min(s,n.length))}function j(e,t,s){return Math.max(t,Math.min(s,e))}function L(e){return e<50?"#e11d48":e<70?"#d97706":"#059669"}function oe(e,t=170,s=14){const n=(t-s)/2,a=2*Math.PI*n,o=a*(1-j(e,0,100)/100),r=L(e);return`<svg width="${t}" height="${t}" viewBox="0 0 ${t} ${t}" class="-rotate-90" aria-hidden="true">
  <circle cx="${t/2}" cy="${t/2}" r="${n}" fill="none" stroke="rgba(100,116,139,0.18)" stroke-width="${s}"/>
  <circle cx="${t/2}" cy="${t/2}" r="${n}" fill="none" stroke="${r}" stroke-width="${s}" stroke-linecap="round" stroke-dasharray="${a.toFixed(1)}" stroke-dashoffset="${o.toFixed(1)}"/>
</svg>`}function Ye(e,t=380){const s=t/2,n=t/2,a=t/2-64,o=e.length,r=(m,x)=>{const b=-Math.PI/2+m*2*Math.PI/o;return[s+a*x*Math.cos(b),n+a*x*Math.sin(b)]},i=m=>e.map((x,b)=>r(b,m).map($=>$.toFixed(1)).join(",")).join(" "),l=[.25,.5,.75,1].map(m=>`<polygon points="${i(m)}" fill="none" stroke="#e2e8f0" stroke-width="1"/>`).join(""),p=e.map((m,x)=>{const[b,$]=r(x,1);return`<line x1="${s}" y1="${n}" x2="${b.toFixed(1)}" y2="${$.toFixed(1)}" stroke="#e2e8f0" stroke-width="1"/>`}).join(""),h=e.map((m,x)=>r(x,j(m.value,0,100)/100)),M=h.map(m=>m.map(x=>x.toFixed(1)).join(",")).join(" "),k=h.map(m=>`<circle cx="${m[0].toFixed(1)}" cy="${m[1].toFixed(1)}" r="3.5" fill="#0a66c2"/>`).join(""),y=e.map((m,x)=>{const[b,$]=r(x,1.16),C=Math.cos(-Math.PI/2+x*2*Math.PI/o),N=Math.abs(C)<.35?"middle":C>0?"start":"end";return`<text x="${b.toFixed(1)}" y="${($+4).toFixed(1)}" text-anchor="${N}" font-size="11.5" font-weight="600" fill="#475569">${d(m.label)}</text>`}).join("");return`<svg width="100%" viewBox="0 0 ${t} ${t}" role="img" aria-label="Radar chart of section scores">
  ${l}${p}
  <polygon points="${M}" fill="rgba(10,102,194,0.22)" stroke="#0a66c2" stroke-width="2.5" stroke-linejoin="round"/>
  ${k}${y}
</svg>`}function Ue(e,t=640,s=190){if(e.length<2)return"";const n=38,a=16,o=16,r=34,i=t-n-a,l=s-o-r,p=e.map(f=>j(f.value,0,100)),h=Math.max(0,Math.floor((Math.min(...p)-8)/10)*10),M=Math.min(100,Math.ceil((Math.max(...p)+8)/10)*10),k=Math.max(10,M-h),y=f=>n+(e.length===1?i/2:f*i/(e.length-1)),m=f=>o+l-(j(f,0,100)-h)/k*l,x=[],b=k/4;for(let f=0;f<=4;f++){const v=h+b*f,D=m(v);x.push(`<line x1="${n}" y1="${D.toFixed(1)}" x2="${t-a}" y2="${D.toFixed(1)}" stroke="#e2e8f0" stroke-width="1"/>`,`<text x="${n-8}" y="${(D+4).toFixed(1)}" text-anchor="end" font-size="10" fill="#94a3b8">${Math.round(v)}</text>`)}const $=e.map((f,v)=>[y(v),m(f.value)]),C=$.map((f,v)=>`${v===0?"M":"L"}${f[0].toFixed(1)} ${f[1].toFixed(1)}`).join(" "),N=`${C} L${$[$.length-1][0].toFixed(1)} ${(o+l).toFixed(1)} L${$[0][0].toFixed(1)} ${(o+l).toFixed(1)} Z`,O=$.map((f,v)=>`<circle cx="${f[0].toFixed(1)}" cy="${f[1].toFixed(1)}" r="4" fill="${L(e[v].value)}" stroke="#fff" stroke-width="2"/><text x="${f[0].toFixed(1)}" y="${(f[1]-10).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="${L(e[v].value)}">${e[v].value}</text>`).join(""),Y=e.map((f,v)=>`<text x="${y(v).toFixed(1)}" y="${(s-12).toFixed(1)}" text-anchor="middle" font-size="10" fill="#94a3b8">${d(f.when)}</text>`).join("");return`<svg width="100%" viewBox="0 0 ${t} ${s}" role="img" aria-label="Score history over time">
  ${x.join("")}
  <path d="${N}" fill="rgba(10,102,194,0.10)"/>
  <path d="${C}" fill="none" stroke="#0a66c2" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  ${O}${Y}
</svg>`}const z=[{slug:"sarah-mitchell-marketing",url:"https://www.linkedin.com/in/sarah-mitchell-marketing",name:"Sarah Mitchell",initials:"SM",role:"Marketing Manager",company:"Bloom & Co.",industry:"Marketing",location:"Amsterdam, NL",headline:"Marketing enthusiast looking for new opportunities",percentile:62,sections:[{key:"headline",score:42},{key:"about",score:60},{key:"experience",score:74},{key:"education",score:84},{key:"skills",score:52},{key:"activity",score:34},{key:"media",score:25},{key:"presence",score:75}],keywords:["SEO","Content Strategy","GA4","Email Marketing","CRO","A/B Testing","Brand Strategy","Lifecycle Marketing"],headlineFix:{before:"Marketing enthusiast looking for new opportunities",after:"Marketing Manager | Growth & Content for DTC Brands | +142% organic traffic in 12 months",why:"Recruiters search by role, niche and outcome. This headline matches all three — and the number gives it proof."},summary:"Sarah has genuinely strong, quantified experience — but her profile hides it. A generic headline, a dormant feed and zero featured media mean recruiters never see the best of her. The 3 fixes below take about an hour and target exactly those leaks."},{slug:"michael-chen-swe",url:"https://www.linkedin.com/in/michael-chen-swe",name:"Michael Chen",initials:"MC",role:"Senior Software Engineer",company:"Cloudwave",industry:"Software",location:"Singapore",headline:"Senior Software Engineer at Cloudwave",percentile:86,sections:[{key:"headline",score:78},{key:"about",score:84},{key:"experience",score:92},{key:"education",score:76},{key:"skills",score:78},{key:"activity",score:58},{key:"media",score:64},{key:"presence",score:88}],keywords:["System Design","AWS","Kubernetes","Observability","Technical Leadership","Incident Response","Mentoring","Open Source"],headlineFix:{before:"Senior Software Engineer at Cloudwave",after:"Senior Software Engineer | Distributed Systems & Cloud (AWS, K8s) | 99.95% uptime",why:'Your stack and the result you own should be searchable — an employer name alone matches zero recruiter searches for "AWS" or "distributed systems".'},summary:"Michael is in the top ~15% of software profiles: deep, well-quantified experience and a complete education block. The remaining points are all about visibility — posting cadence, leadership keywords and 1–2 featured projects."}],A=[{key:"headline",label:"Headline",icon:"trendUp",weight:.18,desc:"The first thing a recruiter reads — role, niche, proof.",weakIssues:["Headline is a job title or vague phrase — no differentiator","Missing the keywords recruiters actually search for","No quantified result in the headline"],midIssues:["Headline reads like a keyword list rather than a value proposition","No clear outcome or number to earn attention"],fixTitle:"Rewrite your headline",fixDetail:'Turn your headline into: Role | Differentiator | Proof. Example: "Marketing Manager | B2B SaaS | +40% pipeline". Recruiters search all three parts.'},{key:"about",label:"About section",icon:"fileText",weight:.14,desc:"Your 200-word pitch, checked for story and search keywords.",weakIssues:["About section is under 100 words or missing entirely","Written in third person or generic job-description language","No measurable achievements and no call-to-action"],midIssues:["About lists duties instead of one clear story with proof","No call-to-action (contact, portfolio, what you want next)"],fixTitle:"Rewrite your About section",fixDetail:"Lead with who you help and one proof point. Keep it under 200 words, first person, and close with a call-to-action. Aim for 3–5 keywords you want to rank for."},{key:"experience",label:"Experience",icon:"briefcase",weight:.2,desc:"Bullets, metrics and keywords in every role you list.",weakIssues:["Roles with fewer than 2 bullets each","Bullets describe duties, not outcomes or numbers","Most recent role has no summary line"],midIssues:['Bullets are missing numbers ("led the team" vs "+18% conversion")',"Target-role keywords are absent from your bullets"],fixTitle:"Quantify your experience",fixDetail:'Rewrite each bullet as Action + Result + Number. "Cut onboarding time from 14 to 3 days" beats "responsible for onboarding". Two strong bullets per role is enough.'},{key:"education",label:"Education",icon:"book",weight:.08,desc:"Degrees, certifications and courses that back your claims.",weakIssues:["No degree, certification or relevant course listed","Education block incomplete (missing school or years)"],midIssues:["No certifications or courses that reinforce your positioning"],fixTitle:"Complete your education block",fixDetail:"Add degrees, relevant certifications and 2–3 courses. It is a one-time 10-minute fix that removes a common recruiter red flag."},{key:"skills",label:"Skills",icon:"star",weight:.12,desc:"The visible skills that decide which searches you appear in.",weakIssues:["Fewer than 5 skills, and few endorsed","Top skills do not match the roles you are targeting"],midIssues:["Skills list is missing in-demand terms for your industry","Top 3 skills (the ones shown on your profile) are not prioritized"],fixTitle:"Expand and reorder your skills",fixDetail:"List 10–15 skills in the order you want to be found for — the top 3 appear on your profile card. Add the keywords recruiters search, not just what you do daily."},{key:"activity",label:"Activity",icon:"activity",weight:.12,desc:'Posts, comments and recency — the "alive" signal.',weakIssues:["No posts or comments in the last 90 days","Dormant profiles surface far less in recruiter searches"],midIssues:["Posting cadence is inconsistent","No comments on peers’ posts — half the algorithm is replies"],fixTitle:"Post or comment twice a week",fixDetail:"One short post from your week plus two thoughtful comments a day is enough. Recency is a ranking factor — a 6-week streak reliably lifts profile views."},{key:"media",label:"Media & featured",icon:"image",weight:.08,desc:"Featured posts, projects and results people can open.",weakIssues:["No featured section configured","Zero media attached to any experience item"],midIssues:["Media is generic — screenshots of work without context or results"],fixTitle:"Add 2–3 featured items",fixDetail:"Pin one post, one project or one talk to Featured, and attach one media item to your two most recent roles. Recruiters judge depth in the first 5 seconds of media."},{key:"presence",label:"Visual presence",icon:"user",weight:.08,desc:"Photo, banner and custom URL — the visual first impression.",weakIssues:["No professional photo","No custom banner and no custom public URL"],midIssues:["Banner is the default grey block — wasted prime space"],fixTitle:"Upgrade your visual presence",fixDetail:"Photo, a banner with your role and one keyword, and a clean custom URL. Profiles with photos get dramatically more views — it is the cheapest win on this list."}],T=120;function re(e){const t=e.reduce((s,n)=>{const a=A.find(o=>o.key===n.key);return s+n.score*(a?a.weight:0)},0);return Math.round(t)}function Me(e,t,s){const n=A.find(o=>o.key===e);if(!n)return[];const a=o=>s?o[Math.floor(s()*o.length)]:o[0];if(t<55){const o=a(n.weakIssues),r=n.weakIssues.filter(i=>i!==o);return[o,...r.length>0?[a(r)]:[]]}return t<75?[a(n.midIssues)]:[]}const G="ky.v1",_=`${G}.audits`,ie=`${G}.trackedKeywords`,Le=`${G}.waitlist`,se=`${G}.account`,qe=60;function Z(e,t){try{const s=localStorage.getItem(e);return s?JSON.parse(s):t}catch{return t}}function I(e,t){try{return localStorage.setItem(e,JSON.stringify(t)),!0}catch{return!1}}function E(){return Z(_,[]).slice().sort((t,s)=>s.createdAt.localeCompare(t.createdAt))}function ze(e){const t=E().filter(n=>n.id!==e.id),s=[e,...t].slice(0,qe);return I(_,s),s.slice().sort((n,a)=>a.createdAt.localeCompare(n.createdAt))}function We(e){const t=E().filter(s=>s.id!==e);return I(_,t),t}function Ve(){I(_,[])}function Ge(e,t){return E().filter(n=>n.profileKey===e&&n.id!==t)[0]??null}function _e(){return`a${Date.now().toString(36)}${Math.random().toString(36).slice(2,7)}`}function B(){return Z(ie,[])}function Ze(e){const t=e.trim().replace(/\s+/g," ");if(!t)return B();const s=[...new Set([...B(),t])].slice(0,40);return I(ie,s),s}function Je(e){const t=B().filter(s=>s.toLowerCase()!==e.toLowerCase());return I(ie,t),t}function le(){return Z(Le,[])}function Qe(e,t){const s={email:e.trim(),createdAt:new Date().toISOString(),plan:t},n=[...le().filter(a=>a.email.toLowerCase()!==s.email.toLowerCase()),s];return I(Le,n),n}function de(){return Z(se,null)}function be(e){if(e)I(se,e);else try{localStorage.removeItem(se)}catch{}}function Xe(){return JSON.stringify({product:"KY — LinkedIn Profile Audit",exportedAt:new Date().toISOString(),account:de(),trackedKeywords:B(),waitlist:le(),audits:E()},null,2)}function et(){return[["created_at","label","source","mode","industry","overall","percentile","gaps"].join(","),...E().map(t=>[t.createdAt,t.label,t.source,t.mode,t.industry,t.overall,t.percentile,`"${t.gaps.join("; ")}"`].map(tt).join(","))].join(`
`)}function tt(e){const t=String(e);return/[",\n]/.test(t)?`"${t.replace(/"/g,'""')}"`:t}function ge(e,t,s="text/plain"){const n=new Blob([t],{type:`${s};charset=utf-8`}),a=URL.createObjectURL(n),o=document.createElement("a");o.href=a,o.download=e,document.body.appendChild(o),o.click(),o.remove(),window.setTimeout(()=>URL.revokeObjectURL(a),1e3)}function st(){return`${nt()}
  <main>
    ${at()}
    ${ot()}
    ${rt()}
    ${it()}
    ${lt()}
    ${dt()}
    ${ct()}
    ${ut()}
  </main>
  ${pt()}`}function Ae(){return'<span class="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-sky-400 text-white text-xs font-black tracking-tight">KY</span>'}function nt(){return`<header class="no-print sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur">
  <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
    <a href="#top" class="flex items-center gap-2.5">
      ${Ae()}
      <span class="text-lg font-extrabold tracking-tight text-white">KY</span>
      <span class="mt-1 hidden text-[11px] font-semibold uppercase tracking-wider text-slate-400 sm:inline">LinkedIn Profile Audit</span>
    </a>
    <nav class="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
      <a class="transition hover:text-white" href="#how">How it works</a>
      <a class="transition hover:text-white" href="#samples">Sample reports</a>
      <a class="transition hover:text-white" href="#pricing">Pricing</a>
      <a class="transition hover:text-white" href="#faq">FAQ</a>
      <button type="button" data-open-history class="inline-flex items-center gap-1.5 transition hover:text-white">
        ${u("history","h-4 w-4")} History
      </button>
    </nav>
    <a href="#audit" class="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark">
      Audit my profile ${u("arrowRight","h-4 w-4")}
    </a>
  </div>
</header>`}function X(e,t){const s=L(t),n=t<50?"bg-rose-500":t<70?"bg-amber-500":"bg-emerald-500";return`<div>
  <div class="flex items-center justify-between text-xs">
    <span class="font-medium text-slate-300">${e}</span>
    <span class="font-bold tabular-nums" style="color:${s}">${t}</span>
  </div>
  <div class="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
    <div class="h-full rounded-full ${n}" style="width:${t}%"></div>
  </div>
</div>`}function at(){const e=`<div class="relative animate-rise" style="animation-delay:0.15s">
  <div class="max-w-sm rounded-2xl border border-white/10 bg-ink-soft/80 p-6 shadow-2xl shadow-black/40 backdrop-blur">
    <div class="flex items-center gap-4">
      <div class="relative h-[120px] w-[120px] shrink-0">
        ${oe(87,120,10)}
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
      ${X("Headline",78)}
      ${X("Experience",92)}
      ${X("Activity",58)}
    </div>
    <div class="mt-5 flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-3 py-2">
      ${u("zap","h-4 w-4 shrink-0 text-emerald-400")}
      <p class="text-xs font-medium text-emerald-300">Top fix: post or comment 2x a week</p>
    </div>
  </div>
  <div class="absolute -bottom-5 -left-5 hidden animate-rise items-center gap-2.5 rounded-xl bg-white px-4 py-3 shadow-xl sm:flex" style="animation-delay:0.35s">
    ${u("trendUp","h-5 w-5 text-emerald-600")}
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
        ${u("sparkles","h-3.5 w-3.5 text-sky-400")} Phase 2 &middot; Real analysis &middot; Free &middot; No sign-up
      </span>
      <h1 class="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
        Your LinkedIn profile,<br/>
        <span class="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">scored in 60 seconds.</span>
      </h1>
      <p class="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
        Paste your profile text and KY scores it for real — headline, About, bullets, skills and education across ${T}+ checkpoints. Then it rewrites your weakest sections and tracks your score over time.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href="#audit" class="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-dark">
          Audit my profile — it's free ${u("arrowRight","h-5 w-5")}
        </a>
        <a href="#samples" class="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10">
          See a sample report
        </a>
      </div>
      <dl class="mt-10 grid max-w-md grid-cols-3 gap-4">
        <div>
          <dt class="text-2xl font-extrabold text-white">${T}+</dt>
          <dd class="mt-1 text-xs text-slate-400">checkpoints</dd>
        </div>
        <div>
          <dt class="text-2xl font-extrabold text-white">8</dt>
          <dd class="mt-1 text-xs text-slate-400">sections audited</dd>
        </div>
        <div>
          <dt class="text-2xl font-extrabold text-white">Free</dt>
          <dd class="mt-1 text-xs text-slate-400">no sign-up</dd>
        </div>
      </dl>
    </div>
    ${e}
  </div>
</section>`}function ye(e,t,s,n){const a=L(n);return`<button type="button" data-sample="${e}" class="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand hover:text-brand">
  <span class="grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold" style="background:rgba(10,102,194,.12);color:#0a66c2">${d(t.slice(0,2).toUpperCase())}</span>
  ${d(t)}
  <span class="rounded-full px-2 py-0.5 text-xs font-bold" style="background:rgba(100,116,139,.1);color:${a}">${n}</span>
  <span class="hidden text-slate-400 sm:inline">${d(s)}</span>
</button>`}function we(e,t,s){return`<button type="button" data-tab="${e}" class="flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition">
  <span class="block">${t}</span>
  <span class="mt-0.5 block text-[11px] font-medium opacity-70">${s}</span>
</button>`}function H(e,t){return`<label class="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs font-medium text-slate-600 transition hover:border-brand/40 hover:bg-white">
  <input type="checkbox" data-flag="${e}" class="h-3.5 w-3.5 accent-brand"/>
  ${t}
</label>`}function ot(){return`<section id="audit" class="bg-white py-20 sm:py-24">
  <div class="mx-auto max-w-3xl animate-rise px-4">
    <div class="text-center">
      <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Paste a profile. Get your report.</h2>
      <p class="mt-3 text-lg text-slate-600">No login, no LinkedIn password. Two ways in — pick one.</p>
    </div>

    <div class="mx-auto mt-8 flex max-w-lg gap-1 rounded-xl bg-slate-100 p-1">
      ${we("paste","Paste profile text","Real analysis")}
      ${we("url","Profile URL","Demo data")}
    </div>

    <div data-panel="paste" class="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm">
      <p class="text-sm leading-relaxed text-slate-600">
        KY scores the text you paste — your headline, About, bullets, skills and education. Nothing is uploaded: it runs
        in your browser and never contacts LinkedIn.
      </p>
      <details class="mt-3 rounded-lg bg-slate-50 px-3 py-2">
        <summary class="cursor-pointer text-sm font-semibold text-brand">How do I copy my profile?</summary>
        <ol class="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-600">
          <li>Open your LinkedIn profile and press <kbd class="rounded border border-slate-300 bg-white px-1">Ctrl</kbd>+<kbd class="rounded border border-slate-300 bg-white px-1">A</kbd>, then <kbd class="rounded border border-slate-300 bg-white px-1">Ctrl</kbd>+<kbd class="rounded border border-slate-300 bg-white px-1">C</kbd>.</li>
          <li>Or use <em>More → Save to PDF</em> and paste the text from the PDF.</li>
          <li>Paste it below. Rough formatting is fine.</li>
        </ol>
      </details>
      <form id="paste-form" class="mt-4" novalidate>
        <label class="sr-only" for="profile-text">Your profile text</label>
        <textarea id="profile-text" name="profile-text" rows="11" spellcheck="false"
          placeholder="Alex Morgan&#10;Senior Product Manager | B2B SaaS | +38% activation&#10;&#10;About&#10;I'm a product manager with 9 years in B2B SaaS…&#10;&#10;Experience&#10;&#10;Senior Product Manager&#10;Acme Cloud&#10;Jan 2021 - Present&#10;• Led onboarding redesign that increased activation by 38%&#10;&#10;Skills&#10;Product Strategy, A/B Testing, SQL"
          class="w-full rounded-xl border border-slate-300 bg-white p-4 font-mono text-xs leading-relaxed text-slate-800 transition placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"></textarea>

        <p class="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">Things a text paste cannot see (optional)</p>
        <div class="mt-2 grid gap-2 sm:grid-cols-2">
          ${H("photo","I have a professional photo")}
          ${H("banner","I have a custom banner")}
          ${H("customUrl","I use a custom public URL")}
          ${H("featured","Featured section is set up")}
          ${H("active90","Posted or commented in the last 90 days")}
        </div>

        <p id="paste-error" class="mt-3 hidden text-sm font-medium text-rose-600"></p>
        <button type="submit" class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-semibold text-white transition hover:bg-brand-dark">
          ${u("zap","h-5 w-5")} Run real audit
        </button>
        <p class="mt-3 flex items-start gap-1.5 text-xs text-slate-400">
          ${u("shield","h-3.5 w-3.5 mt-0.5 shrink-0")} Runs entirely in your browser. No account, no upload, no LinkedIn access.
        </p>
      </form>
    </div>

    <div data-panel="url" class="mt-6 hidden text-center">
      <form id="audit-form" class="flex flex-col gap-3 sm:flex-row" novalidate>
        <label class="sr-only" for="profile-url">LinkedIn profile URL</label>
        <div class="relative flex-1 text-left">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">${u("link","h-5 w-5")}</span>
          <input id="profile-url" name="profile-url" type="text" inputmode="url" autocomplete="off"
            placeholder="https://www.linkedin.com/in/your-profile"
            class="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-12 pr-4 text-slate-900 transition placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"/>
        </div>
        <button type="submit" class="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-semibold text-white transition hover:bg-brand-dark">
          ${u("search","h-5 w-5")} Run demo audit
        </button>
      </form>
      <p id="audit-error" class="mt-3 hidden text-sm font-medium text-rose-600"></p>
      <div class="mt-6 flex flex-wrap items-center justify-center gap-2.5">
        <span class="text-sm font-medium text-slate-500">Or try a sample:</span>
        ${ye("sarah-mitchell-marketing","Sarah Mitchell","Marketing",56)}
        ${ye("michael-chen-swe","Michael Chen","Software",79)}
      </div>
      <p class="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-800 ring-1 ring-amber-200">
        Demo mode scores <strong>sample</strong> data, not your profile — it exists so you can explore the full report
        without pasting anything. For a real score, use <em>Paste profile text</em>.
      </p>
    </div>
  </div>
</section>`}function ee(e,t,s,n){return`<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
  <div class="flex items-center gap-3">
    <span class="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">${u(t,"h-5 w-5")}</span>
    <span class="text-sm font-bold text-slate-400">Step ${e}</span>
  </div>
  <h3 class="mt-4 text-lg font-bold text-slate-900">${s}</h3>
  <p class="mt-2 text-sm leading-relaxed text-slate-600">${n}</p>
</div>`}function rt(){return`<section id="how" class="bg-slate-50 py-20 sm:py-24">
  <div class="mx-auto max-w-6xl px-4">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">How it works</h2>
      <p class="mt-3 text-lg text-slate-600">Three steps. No account, no LinkedIn login, nothing to install, nothing leaves your browser.</p>
    </div>
    <div class="mt-12 grid gap-6 md:grid-cols-3">
      ${ee("1","paste","Paste your profile text","Copy your profile and paste it in. It is scored in your browser — no upload, no LinkedIn login, no credentials.")}
      ${ee("2","zap",`Runs ${T}+ checkpoints`,"Headline, About, experience, education, skills, activity, media and presence. Sections a text paste cannot prove are left out of the score instead of guessed.")}
      ${ee("3","edit","Get rewrites, not just scores","A benchmarked score, your real keyword gaps, rewrites for your weakest sections, and a score history that shows whether the changes worked.")}
    </div>
  </div>
</section>`}function ve(e){const t=z.find(o=>o.slug===e);if(!t)return"";const s=re(t.sections),a=[...t.sections].sort((o,r)=>o.score-r.score).slice(0,2).map(o=>{const r=A.find(l=>l.key===o.key),i=L(o.score);return`<span class="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">${d(r?r.label:o.key)} <span style="color:${i}">${o.score}</span></span>`}).join("");return`<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
  <div class="flex items-center gap-4">
    <div class="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand/10 font-bold text-brand">${t.initials}</div>
    <div class="min-w-0 flex-1">
      <p class="font-bold text-slate-900">${d(t.name)}</p>
      <p class="text-sm text-slate-500">${d(t.role)} · ${d(t.company)}</p>
    </div>
    <div class="relative h-16 w-16 shrink-0">
      ${oe(s,64,6)}
      <div class="absolute inset-0 grid place-items-center">
        <span class="text-sm font-extrabold" style="color:${L(s)}">${s}</span>
      </div>
    </div>
  </div>
  <p class="mt-4 text-sm text-slate-600">Better than <strong class="text-slate-900">${t.percentile}%</strong> of ${d(t.industry)} profiles</p>
  <div class="mt-3 flex flex-wrap gap-2">${a}</div>
  <button type="button" data-sample-view="${t.slug}" class="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand py-2.5 font-semibold text-brand transition hover:bg-brand hover:text-white">
    View full report ${u("arrowRight","h-4 w-4")}
  </button>
</div>`}function it(){return`<section id="samples" class="bg-white py-20 sm:py-24">
  <div class="mx-auto max-w-6xl px-4">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Sample reports</h2>
      <p class="mt-3 text-lg text-slate-600">Two realistic profiles. One underperforms, one nearly peaks — see exactly what KY points out in each.</p>
    </div>
    <div class="mt-12 grid gap-6 md:grid-cols-2">
      ${ve("sarah-mitchell-marketing")}
      ${ve("michael-chen-swe")}
    </div>
  </div>
</section>`}function lt(){const e=A.map(t=>`<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div class="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">${u(t.icon,"h-5 w-5")}</div>
    <h3 class="mt-3 font-bold text-slate-900">${d(t.label)}</h3>
    <p class="mt-1.5 text-sm leading-relaxed text-slate-600">${d(t.desc)}</p>
  </div>`);return`<section class="bg-slate-50 py-20 sm:py-24">
  <div class="mx-auto max-w-6xl px-4">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">What we audit</h2>
      <p class="mt-3 text-lg text-slate-600">Eight sections, ${T}+ checkpoints — everything a recruiter or client scans in the first 60 seconds.</p>
    </div>
    <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      ${e.join("")}
    </div>
  </div>
</section>`}function dt(){return`<section id="pricing" class="bg-white py-20 sm:py-24">
  <div class="mx-auto max-w-6xl px-4">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Pricing</h2>
      <p class="mt-3 text-lg text-slate-600">The audit is free. Pro adds the tracking layer — and it is unlocked here so you can try it before it is charged for.</p>
    </div>
    <div class="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
      <div class="rounded-2xl border-2 border-brand bg-white p-7 shadow-sm">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-slate-900">Free</h3>
          <span class="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">Live now</span>
        </div>
        <p class="mt-2 text-sm text-slate-500">A real audit of the profile text you paste.</p>
        <p class="mt-5 text-4xl font-extrabold text-slate-900">$0<span class="text-base font-medium text-slate-400"> / forever</span></p>
        <ul class="mt-6 space-y-3 text-sm text-slate-600">
          ${["Real 8-section analysis of your text","Industry benchmark & percentile","Keyword gaps found in your actual profile","Rewrites for your weakest sections","1-page PDF report, resume-ready","Shareable LinkedIn post"].map(e=>`<li class="flex items-start gap-2.5">${u("check","h-4 w-4 shrink-0 text-emerald-600")} ${e}</li>`).join("")}
        </ul>
        <a href="#audit" class="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-brand py-3 font-semibold text-white transition hover:bg-brand-dark">Run your free audit</a>
      </div>
      <div class="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-slate-900">Pro</h3>
          <span class="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">Phase 2.5 preview</span>
        </div>
        <p class="mt-2 text-sm text-slate-500">For anyone who edits their profile more than once.</p>
        <p class="mt-5 text-4xl font-extrabold text-slate-900">$12<span class="text-base font-medium text-slate-400"> / month early bird</span></p>
        <ul class="mt-6 space-y-3 text-sm text-slate-600">
          ${["Score history & trend line","Keyword tracking with alerts on drops","What changed since your last audit","Unlimited saved audits in your browser","CSV & JSON export of every run"].map(e=>`<li class="flex items-start gap-2.5">${u("check","h-4 w-4 shrink-0 text-brand")} ${e}</li>`).join("")}
        </ul>
        <button type="button" data-open-plan class="mt-7 inline-flex w-full items-center justify-center rounded-xl border border-slate-300 py-3 font-semibold text-slate-700 transition hover:border-brand hover:text-brand">Try Pro features</button>
        <p class="mt-3 text-xs leading-relaxed text-slate-400">
          Billing is not connected in this build — Pro features are unlocked so you can evaluate them. Your data stays in
          your browser.
        </p>
      </div>
    </div>
  </div>
</section>`}function ct(){return`<section id="waitlist" class="bg-ink py-16 text-white sm:py-20">
  <div class="mx-auto max-w-2xl px-4 text-center">
    <h2 class="text-3xl font-extrabold tracking-tight">Get the Pro launch</h2>
    <p class="mt-3 text-lg text-slate-300">
      Phase 2 is live. Pro — hosted accounts, weekly re-audits and Stripe billing — is next. Waitlist members get early
      access and 3 months free.
    </p>
    <form id="waitlist-form" class="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row" novalidate>
      <label class="sr-only" for="waitlist-email">Email address</label>
      <input id="waitlist-email" type="email" placeholder="you@example.com"
        class="w-full flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"/>
      <button type="submit" class="rounded-xl bg-sky-500 px-6 py-3 font-semibold text-ink transition hover:bg-sky-400">Join waitlist</button>
    </form>
    <p class="mt-4 text-xs text-slate-500">
      Saved to this browser only (<span data-waitlist-count>${le().length}</span> so far) — there is no server to send it to yet.
    </p>
  </div>
</section>`}function F(e,t){return`<details class="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
  <summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900 [&::-webkit-details-marker]:hidden">
    ${e}
    <span class="shrink-0 text-slate-400 transition-transform group-open:rotate-180">${u("chevronDown","h-5 w-5")}</span>
  </summary>
  <p class="mt-3 text-sm leading-relaxed text-slate-600">${t}</p>
</details>`}function ut(){return`<section id="faq" class="bg-slate-50 py-20 sm:py-24">
  <div class="mx-auto max-w-3xl px-4">
    <div class="text-center">
      <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">FAQ</h2>
    </div>
    <div class="mt-10 space-y-4">
      ${F("Is this using my real profile data?","It uses exactly what you paste, and nothing else. KY runs in your browser: it never contacts LinkedIn, never asks for your password and never uploads your text. Sections a text paste cannot prove — photo, banner, posting cadence — are excluded from the score rather than guessed, unless you tick the boxes that confirm them.")}
      ${F("How is the score calculated?",`Each of the 8 sections is scored 0–100 against ${T}+ checkpoints (length, keywords, quantified results, recency, media, visual polish). The overall score is a weighted blend — experience and headline weigh most, because that's what recruiters read first.`)}
      ${F("Is KY affiliated with LinkedIn?","No. KY is an independent, unofficial tool. We never ask for your LinkedIn credentials, and Phase 1 reads no real data at all.")}
      ${F("Where does my data go?","Nowhere. Audits, tracked keywords and your saved history live in your browser's local storage. Clearing your browser data clears them, and you can export everything as JSON or CSV from the History page first.")}
      ${F("Are the rewrites written by AI?","They are template rewrites assembled from facts found in your own text — your role, your numbers, your keywords. That is deliberate: no API key, no network call, and nothing invented. Anything KY cannot know is left as a [bracketed placeholder] for you to fill in.")}
      ${F("What is Phase 2.5?",'The tracking layer between the audit and the team features: score history with a trend line, keyword tracking with alerts when coverage drops, a "what changed since last audit" diff, and export. All of it is in this build, running locally.')}
    </div>
  </div>
</section>`}function pt(){return`<footer class="bg-ink py-12 text-slate-400">
  <div class="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center">
    <div class="flex items-center gap-2.5">
      ${Ae()}
      <span class="text-lg font-extrabold tracking-tight text-white">KY</span>
    </div>
    <p class="max-w-md text-sm">LinkedIn profile intelligence for job hunters, founders and the people hiring them.</p>
    <p class="max-w-md text-xs text-slate-500">
      Not affiliated with LinkedIn Corporation. Analysis runs in your browser on text you paste; nothing is uploaded and
      no LinkedIn data is fetched. The URL tab is labelled demo mode and scores sample data.
    </p>
    <p class="text-xs text-slate-600">© 2026 KY</p>
  </div>
</footer>`}function ht(e,t){var s,n;mt(e),ft(e,t.onPaste),xt(e,t.onAudit),bt(e,t.onAudit),gt(e),(s=e.querySelector("[data-open-history]"))==null||s.addEventListener("click",t.onHistory),(n=e.querySelector("[data-open-plan]"))==null||n.addEventListener("click",t.onOpenPlan)}function mt(e){const t=Array.from(e.querySelectorAll("[data-tab]")),s=Array.from(e.querySelectorAll("[data-panel]")),n=a=>{t.forEach(o=>{const r=o.dataset.tab===a;o.classList.toggle("bg-white",r),o.classList.toggle("text-brand",r),o.classList.toggle("shadow-sm",r),o.classList.toggle("text-slate-500",!r),o.setAttribute("aria-selected",r?"true":"false")}),s.forEach(o=>o.classList.toggle("hidden",o.dataset.panel!==a))};t.forEach(a=>a.addEventListener("click",()=>n(a.dataset.tab??"paste"))),n("paste")}function ft(e,t){const s=e.querySelector("#paste-form"),n=e.querySelector("#profile-text"),a=e.querySelector("#paste-error");!s||!n||!a||s.addEventListener("submit",o=>{o.preventDefault();const r=n.value.trim();if(r.length<80){a.textContent="Paste a bit more of your profile first — 80 characters is not enough to score.",a.classList.remove("hidden"),n.focus();return}a.classList.add("hidden");const i={};e.querySelectorAll("[data-flag]").forEach(l=>{l.dataset.flag&&(i[l.dataset.flag]=l.checked)}),t(r,i)})}function xt(e,t){const s=e.querySelector("#audit-form"),n=e.querySelector("#profile-url"),a=e.querySelector("#audit-error");!s||!n||!a||s.addEventListener("submit",o=>{o.preventDefault();const r=n.value.trim();if(!r){a.textContent="Paste a LinkedIn profile URL first.",a.classList.remove("hidden"),n.focus();return}a.classList.add("hidden"),t(r)})}function bt(e,t){const s=e.querySelector("#profile-url");e.querySelectorAll("[data-sample]").forEach(n=>{n.addEventListener("click",()=>{const a=z.find(o=>o.slug===(n.dataset.sample??""));a&&(s&&(s.value=a.url),t(a.url))})}),e.querySelectorAll("[data-sample-view]").forEach(n=>{n.addEventListener("click",()=>{const a=z.find(o=>o.slug===(n.dataset.sampleView??""));a&&t(a.url)})})}function gt(e){const t=e.querySelector("#waitlist-form"),s=e.querySelector("#waitlist-email");!t||!s||t.addEventListener("submit",n=>{n.preventDefault();const a=s.value.trim();if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(a)){w("Enter a valid email first."),s.focus();return}const o=Qe(a,"pro-early-bird");w(`Saved to this browser (${o.length} on your list). Nothing is sent — there is no server yet.`),s.value="";const r=e.querySelector("[data-waitlist-count]");r&&(r.textContent=String(o.length))})}function yt(e){const t=e.mode==="text"?["Parsing the text you pasted","Extracting roles, bullets, skills and dates",`Running ${T}+ checkpoints`,`Searching for ${e.industry} keywords`,"Writing rewrites for your weakest sections","Comparing against your previous audits","Building your report"]:["Loading sample profile data",`Running ${T}+ checkpoints`,`Benchmarking against ${e.industry} peers`,"Finding missing keywords","Writing your 3 priority fixes","Building your report"];return`<div class="grid min-h-screen place-items-center bg-slate-50 px-4">
  <div class="w-full max-w-md animate-pop rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
    <div class="flex items-center gap-3">
      <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">${u("search","h-5 w-5")}</span>
      <div class="min-w-0">
        <p class="font-bold text-slate-900">Auditing ${d(e.name)}</p>
        <p class="truncate text-xs text-slate-500">${d(e.input.display)}</p>
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
</div>`}function wt(e,t){const s=Array.from(e.querySelectorAll("[data-step]")),n=e.querySelector("[data-progress]");let a=0;const o=()=>{var r;if(a>0){const i=s[a-1];if(i){i.setAttribute("data-state","done");const l=i.querySelector(".step-dot");l&&(l.innerHTML=u("check","h-3.5 w-3.5 text-white"))}}a<s.length?((r=s[a])==null||r.setAttribute("data-state","active"),n&&(n.style.width=`${Math.round((a+1)/s.length*100)}%`),a+=1,window.setTimeout(o,360+a%2*140)):(n&&(n.style.width="100%"),window.setTimeout(t,500))};window.setTimeout(o,250)}const vt={High:"bg-rose-50 text-rose-700 ring-1 ring-rose-200",Medium:"bg-amber-50 text-amber-700 ring-1 ring-amber-200",Low:"bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"},kt={up:"border-emerald-200 bg-emerald-50 text-emerald-800",down:"border-rose-200 bg-rose-50 text-rose-800","keyword-lost":"border-amber-200 bg-amber-50 text-amber-800","keyword-won":"border-emerald-200 bg-emerald-50 text-emerald-800","section-down":"border-amber-200 bg-amber-50 text-amber-800"};function $t(e){return e<50?"bg-rose-500":e<70?"bg-amber-500":"bg-emerald-500"}function St(e){const t=window.location.href.split("#")[0],s=e.mode==="text"?"":" (demo data)";return[`Just scored my LinkedIn profile: ${e.overall}/100 with KY${s}.`,"",`That's better than ${e.percentile}% of ${e.industry} profiles.`,"","The 3 fixes KY flagged:",...e.fixes.map((n,a)=>`${a+1}. ${n.title}`),"",`Try it free: ${t}`,"","#LinkedIn #PersonalBrand #CareerGrowth"].join(`
`)}function Mt(e){const t=e.mode==="text"?"real analysis of pasted text":"demo estimate",s=[`KY Profile Audit — ${e.name}`,`Source: ${e.input.display} (${t})`,`Generated: ${new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}`,"",`Overall: ${e.overall}/100 — better than ${e.percentile}% of ${e.industry} profiles`];if(e.excluded.length&&s.push(`Scored from ${e.measuredCount} of 8 sections (not readable from text: ${e.excluded.join(", ")})`),e.signals.length&&s.push(`Parsed: ${e.signals.join(" · ")}`),s.push("","Section scores:",...e.sections.map(n=>`  - ${n.label}: ${n.basis==="unknown"?"not scored":`${n.score}/100`}${n.issues.length?` (${n.issues.join("; ")})`:""}`),"","Top 3 fixes:",...e.fixes.map((n,a)=>`${a+1}. [${n.impact}] ${n.title} — ${n.detail}`)),e.keywordReport?(s.push("",`Keywords found (${e.keywordReport.covered.length}): ${e.keywordReport.covered.join(", ")||"none"}`),s.push(`Keyword gaps (${e.keywordReport.gaps.length}): ${e.keywordReport.gaps.join(", ")||"none"}`)):s.push("",`Keyword gaps: ${e.keywords.join(", ")}`),e.rewrites.length){s.push("","Rewrites:");for(const n of e.rewrites)s.push(`  ${n.title}`),s.push(`    Before: ${n.before.replace(/\n/g," ")}`),s.push(`    After:  ${n.after.replace(/\n/g," ")}`)}else s.push("","Headline:",`  Before: ${e.headlineFix.before}`,`  After:  ${e.headlineFix.after}`);return s.push("","KY — LinkedIn Profile Audit. Not affiliated with LinkedIn."),s.join(`
`)}function Lt(e){const t=L(e.overall),s=new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}),n=e.mode==="text",a=E().length,o=n?`Real analysis of the text you pasted — ${d(e.input.display)}`:e.source==="curated"?"Sample profile — demo data, not your profile":`Demo estimate for ${d(e.input.display)} — sample-based data`;return`<div class="min-h-screen bg-slate-50">
  <header class="no-print sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
      <a href="#" data-home class="flex items-center gap-2.5">
        <span class="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-sky-400 text-xs font-black text-white">KY</span>
        <span class="font-extrabold tracking-tight text-white">KY</span>
      </a>
      <div class="flex items-center gap-2 sm:gap-3">
        ${n?`<span class="hidden items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 sm:inline-flex">
          ${u("check","h-3.5 w-3.5")} Real analysis
        </span>`:`<span class="hidden items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300 sm:inline-flex">
          ${u("alert","h-3.5 w-3.5")} Demo data
        </span>`}
        <button data-action="history" class="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
          ${u("history","h-4 w-4")} <span class="hidden sm:inline">History${a?` (${a})`:""}</span>
        </button>
        <button data-action="restart" class="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark">
          ${u("refresh","h-4 w-4")} <span class="hidden sm:inline">New audit</span>
        </button>
      </div>
    </div>
  </header>

  <main class="screen-only mx-auto max-w-6xl px-4 py-8">
    <p class="no-print text-xs text-slate-500">${o}. Generated ${s}. Not affiliated with LinkedIn.</p>

    ${At(e)}

    <section class="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div class="flex flex-col gap-8 sm:flex-row sm:items-center">
        <div class="flex min-w-0 flex-1 items-center gap-4">
          <div class="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-brand/10 text-xl font-extrabold text-brand">${d(e.initials)}</div>
          <div class="min-w-0">
            <h1 class="truncate text-2xl font-extrabold text-slate-900">${d(e.name)}</h1>
            <p class="truncate text-slate-600">${d(e.role)}</p>
            <p class="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
              <span class="inline-flex items-center gap-1.5">${u("globe","h-4 w-4")} ${d(e.industry)}</span>
              <span class="inline-flex items-center gap-1.5">${u("mapPin","h-4 w-4")} ${d(e.location)}</span>
            </p>
          </div>
        </div>
        <div class="flex items-center gap-6">
          <div class="relative h-[170px] w-[170px] shrink-0">
            ${oe(e.overall,170,14)}
            <div class="absolute inset-0 grid place-items-center">
              <div class="text-center">
                <span class="text-5xl font-extrabold tabular-nums" style="color:${t}">${e.overall}</span>
                <span class="mt-1 block text-xs font-medium text-slate-400">out of 100</span>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <p class="text-sm font-semibold text-slate-900">Better than ${e.percentile}%</p>
            <p class="text-sm text-slate-500">of ${d(e.industry)} profiles</p>
            ${n&&e.excluded.length?`<p class="mt-2 text-xs text-slate-400">Scored from ${e.measuredCount} of 8 sections</p>`:""}
          </div>
        </div>
      </div>

      ${Ct(e)}

      <p class="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">${d(e.summary)}</p>

      ${e.signals.length?`<div class="mt-4 flex flex-wrap gap-2">
        ${e.signals.map(r=>`<span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">${d(r)}</span>`).join("")}
      </div>`:""}
    </section>

    <div class="mt-6 grid items-start gap-6 lg:grid-cols-5">
      <div class="space-y-6 lg:col-span-3">
        ${Rt(e)}
        ${e.keywordReport?jt(e):Tt(e)}
        ${e.rewrites.length?Et(e):It(e)}
      </div>
      <div class="space-y-6 lg:col-span-2">
        ${Dt(e)}
        ${Ft(e)}
        ${e.excluded.length?Pt(e):""}
      </div>
    </div>

    <section class="no-print mt-8 flex flex-wrap gap-3">
      <button data-action="share" class="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark">
        ${u("share","h-5 w-5")} Share on LinkedIn
      </button>
      <button data-action="save" class="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-brand hover:text-brand">
        ${u("history","h-5 w-5")} Save to history
      </button>
      <button data-action="copy" class="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-brand hover:text-brand">
        ${u("copy","h-5 w-5")} Copy report
      </button>
      <button data-action="print" class="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-brand hover:text-brand">
        ${u("download","h-5 w-5")} Download PDF
      </button>
    </section>
  </main>

  <footer class="no-print py-8 text-center text-xs text-slate-400">KY · ${n?"Phase 2 real analysis":"demo data"} · ${s}</footer>

  ${Nt(e)}
</div>`}function At(e){return e.alerts.length?`<section class="no-print animate-rise mt-4 space-y-2">
  ${e.alerts.map(t=>`<div class="flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium ${kt[t.kind]}">
      <span class="mt-0.5 shrink-0">${u(t.kind==="up"||t.kind==="keyword-won"?"trendUp":"bell","h-4 w-4")}</span>
      <span>${d(t.text)}</span>
    </div>`).join("")}
</section>`:""}function Ct(e){const t=e.delta;if(!t)return"";const s=t.overall>0,n=t.overall===0,a=n?"text-slate-500":s?"text-emerald-600":"text-rose-600",o=n?"→":s?"↑":"↓",r=t.sections.length?t.sections.map(i=>{const l=i.change>0?"text-emerald-600":"text-rose-600";return`<span class="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
        ${d(i.label)} <span class="${l}">${i.change>0?"+":""}${i.change}</span></span>`}).join(""):'<span class="text-xs text-slate-400">No individual section moved.</span>';return`<div class="mt-6 rounded-xl border border-slate-200 bg-white p-4">
  <p class="flex flex-wrap items-baseline gap-2 text-sm">
    <span class="font-bold ${a}">${o} ${s?"+":""}${t.overall} points</span>
    <span class="text-slate-500">vs your audit on ${d(t.previousDate)}</span>
  </p>
  <div class="mt-2.5 flex flex-wrap gap-2">${r}</div>
</div>`}function Rt(e){return`<section class="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" style="animation-delay:0.05s">
  <h2 class="text-lg font-bold text-slate-900">Section scores</h2>
  <p class="mt-0.5 text-sm text-slate-500">
    ${e.mode==="text"?`8 sections · ${e.measuredCount} scored from your text`:"8 sections · 120+ checkpoints"}
  </p>
  <div class="mt-5 space-y-5">
    ${e.sections.map(t=>{const s=A.find(o=>o.key===t.key),n=L(t.score),a=t.basis==="unknown";return`<div class="flex items-start gap-3">
        <div class="grid h-9 w-9 shrink-0 place-items-center rounded-lg ${a?"bg-slate-50 text-slate-300":"bg-slate-100 text-slate-500"}">${u(s?s.icon:"target")}</div>
        <div class="min-w-0 flex-1">
          <div class="flex items-baseline justify-between gap-2">
            <p class="text-sm font-semibold text-slate-800">${d(t.label)}</p>
            ${a?'<p class="text-xs font-semibold text-slate-400">not scored</p>':`<p class="text-sm font-bold tabular-nums" style="color:${n}">${t.score}</p>`}
          </div>
          ${a?"":`<div class="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
            <div class="bar-fill h-full rounded-full ${$t(t.score)}" style="width:${t.score}%"></div>
          </div>`}
          ${t.issues.length?`<p class="mt-1.5 text-xs leading-relaxed text-slate-500">${t.issues.map(d).join(" · ")}</p>`:a?"":'<p class="mt-1.5 text-xs font-medium text-emerald-600">No major issues found here.</p>'}
          ${t.wins.length?`<p class="mt-1 flex flex-wrap gap-1.5">${t.wins.slice(0,3).map(o=>`<span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">${u("check","h-3 w-3")} ${d(o)}</span>`).join("")}</p>`:""}
        </div>
      </div>`}).join("")}
  </div>
</section>`}function jt(e){const t=e.keywordReport;if(!t)return"";const s=t.coverage.length?Math.round(t.covered.length/t.coverage.length*100):0,n=a=>{const o=a.tracked?u("star","h-3 w-3 text-amber-500"):"";return a.found?`<span class="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-800" title="Found in: ${a.where.map(d).join(", ")}">
      ${u("check","h-3.5 w-3.5 text-emerald-600")} ${o} ${d(a.keyword)}</span>`:`<span class="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-800">
      ${u("x","h-3.5 w-3.5 text-rose-500")} ${o} ${d(a.keyword)}</span>`};return`<section class="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" style="animation-delay:0.1s">
  <div class="flex flex-wrap items-center justify-between gap-2">
    <h2 class="text-lg font-bold text-slate-900">Keyword coverage</h2>
    <span class="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">${t.covered.length}/${t.coverage.length} found · ${s}%</span>
  </div>
  <p class="mt-0.5 text-sm text-slate-500">
    Every ${d(t.industry.label)} term recruiters search, actually searched for in the text you pasted.
  </p>

  ${t.gaps.length?`<p class="mt-4 text-xs font-bold uppercase tracking-wide text-rose-500">Missing (${t.gaps.length})</p>
  <div class="mt-2 flex flex-wrap gap-2">${t.coverage.filter(a=>!a.found).map(n).join("")}</div>`:'<p class="mt-4 rounded-lg bg-emerald-50 p-3 text-sm font-medium text-emerald-700">Every tracked term is present.</p>'}

  ${t.covered.length?`<p class="mt-5 text-xs font-bold uppercase tracking-wide text-emerald-600">Found (${t.covered.length})</p>
  <div class="mt-2 flex flex-wrap gap-2">${t.coverage.filter(a=>a.found).map(n).join("")}</div>`:""}

  <p class="mt-4 text-xs text-slate-400">
    ${u("star","h-3 w-3 inline text-amber-500")} = a keyword you track. Add them on the History page to get alerted if one drops off.
  </p>
</section>`}function Et(e){return`<section class="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" style="animation-delay:0.15s">
  <div class="flex flex-wrap items-center justify-between gap-2">
    <h2 class="text-lg font-bold text-slate-900">Rewrites</h2>
    <span class="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-bold text-brand">built from your own text</span>
  </div>
  <p class="mt-0.5 text-sm text-slate-500">
    Template rewrites assembled from facts KY found in your paste — no invented credentials. Fill the
    <span class="rounded bg-slate-100 px-1 font-mono text-xs">[brackets]</span> and delete them.
  </p>
  <div class="mt-5 space-y-5">
    ${e.rewrites.map((t,s)=>`<div class="rounded-xl border border-slate-200 p-4">
      <div class="flex items-center justify-between gap-3">
        <p class="text-sm font-bold text-slate-900">${d(t.title)}</p>
        ${t.needsEdit?'<span class="shrink-0 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700 ring-1 ring-amber-200">needs your input</span>':'<span class="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-200">ready to use</span>'}
      </div>
      <p class="mt-3 text-xs font-semibold uppercase tracking-wide text-rose-400">Before</p>
      <p class="mt-1 rounded-lg bg-rose-50 p-3 text-sm leading-relaxed text-slate-700">${d(t.before)}</p>
      <p class="mt-3 text-xs font-semibold uppercase tracking-wide text-emerald-600">After</p>
      <p class="mt-1 whitespace-pre-line rounded-lg bg-emerald-50 p-3 text-sm font-medium leading-relaxed text-slate-900">${d(t.after)}</p>
      <div class="mt-3 flex items-start justify-between gap-3">
        <p class="text-xs leading-relaxed text-slate-500">${d(t.why)}</p>
        <button data-action="copy-rewrite" data-index="${s}" class="no-print shrink-0 rounded-lg border border-slate-300 bg-white p-2 text-slate-600 transition hover:border-brand hover:text-brand" title="Copy this rewrite">
          ${u("copy","h-3.5 w-3.5")}
        </button>
      </div>
    </div>`).join("")}
  </div>
</section>`}function Pt(e){return`<section class="animate-rise rounded-2xl border border-dashed border-slate-300 bg-white p-5 shadow-sm" style="animation-delay:0.2s">
  <h2 class="text-sm font-bold text-slate-900">${e.excluded.length} sections were not scored</h2>
  <p class="mt-1.5 text-xs leading-relaxed text-slate-500">
    ${d(e.excluded.join(", "))} cannot be read from pasted text. KY left them out of your score rather than
    guessing — tick the boxes on the audit form to include them.
  </p>
</section>`}function Tt(e){return`<section class="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" style="animation-delay:0.1s">
  <div class="flex items-center gap-2">
    <h2 class="text-lg font-bold text-slate-900">Keyword gaps</h2>
    <span class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">top ${e.keywords.length}</span>
  </div>
  <p class="mt-0.5 text-sm text-slate-500">Terms recruiters and clients search for in ${d(e.industry)}.</p>
  <div class="mt-4 flex flex-wrap gap-2">
    ${e.keywords.map(t=>`<span class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">
        ${u("x","h-3.5 w-3.5 text-rose-500")} ${d(t)}</span>`).join("")}
  </div>
  <p class="mt-4 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-500">
    Demo mode shows sample gaps. Paste your profile text for a real keyword check against your own words.
  </p>
</section>`}function It(e){return`<section class="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" style="animation-delay:0.15s">
  <h2 class="text-lg font-bold text-slate-900">Headline, rewritten</h2>
  <p class="mt-0.5 text-sm text-slate-500">The single highest-impact change on your profile.</p>
  <div class="mt-4 space-y-3">
    <div class="flex items-start gap-3 rounded-xl border border-rose-100 bg-rose-50 p-4">
      <span class="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-rose-100 text-rose-600">${u("x","h-3.5 w-3.5")}</span>
      <div class="min-w-0">
        <p class="text-xs font-semibold uppercase tracking-wide text-rose-400">Before</p>
        <p class="mt-1 text-sm text-slate-700">${d(e.headlineFix.before)}</p>
      </div>
    </div>
    <div class="flex justify-center">${u("arrowRight","h-5 w-5 rotate-90 text-slate-300")}</div>
    <div class="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
      <span class="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-600">${u("check","h-3.5 w-3.5")}</span>
      <div class="min-w-0 flex-1">
        <p class="text-xs font-semibold uppercase tracking-wide text-emerald-600">After</p>
        <p class="mt-1 text-sm font-semibold text-slate-900">${d(e.headlineFix.after)}</p>
      </div>
      <button data-action="copy-headline" class="no-print shrink-0 rounded-lg border border-emerald-300 bg-white p-1.5 text-emerald-700 transition hover:bg-emerald-100" title="Copy this headline">
        ${u("copy","h-3.5 w-3.5")}
      </button>
    </div>
    <div class="rounded-lg border border-slate-100 bg-slate-50 p-3.5 text-sm leading-relaxed text-slate-600">
      <span class="font-semibold text-slate-800">Why it works:</span> ${d(e.headlineFix.why)}
    </div>
  </div>
</section>`}function Dt(e){const t=e.sections.filter(s=>s.basis!=="unknown").map(s=>({label:s.label,value:s.score}));return`<section class="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" style="animation-delay:0.1s">
  <h2 class="text-lg font-bold text-slate-900">Profile radar</h2>
  <p class="mt-0.5 text-sm text-slate-500">Where you're strong, where you leak impressions.</p>
  <div class="mt-2">${Ye(t)}</div>
</section>`}function Ft(e){return`<section class="animate-rise rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" style="animation-delay:0.15s">
  <h2 class="text-lg font-bold text-slate-900">Your top 3 fixes</h2>
  <p class="mt-0.5 text-sm text-slate-500">Ranked by impact on your overall score.</p>
  <div class="mt-4 space-y-3">
    ${e.fixes.map((t,s)=>`<div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div class="flex items-center justify-between gap-3">
          <p class="text-sm font-bold text-slate-900"><span class="mr-1.5 text-slate-400">${s+1}.</span>${d(t.title)}</p>
          <span class="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${vt[t.impact]}">${t.impact}</span>
        </div>
        <p class="mt-1.5 text-sm leading-relaxed text-slate-600">${d(t.detail)}</p>
      </div>`).join("")}
  </div>
</section>`}function Nt(e){const t=new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}),s=e.sections.filter(o=>o.basis!=="unknown"),n=e.keywordReport?e.keywordReport.gaps:e.keywords,a=e.rewrites.find(o=>o.key==="headline");return`<div class="print-only">
  <div class="print-head">
    <div>
      <h1 class="print-name">${d(e.name)}</h1>
      <p class="print-sub">${d(e.role)} · ${d(e.industry)} · ${d(e.location)}</p>
    </div>
    <div class="print-score">
      <span class="print-score-num" style="color:${L(e.overall)}">${e.overall}</span>
      <span class="print-score-of">/100 · top ${100-e.percentile}%</span>
    </div>
  </div>
  <p class="print-meta">
    ${e.mode==="text"?"Real analysis of pasted profile text":"Demo data"} · ${t} ·
    ${e.mode==="text"?`${e.measuredCount} of 8 sections scored`:"8 sections scored"} · KY Profile Audit
  </p>

  <div class="print-grid">
    <div>
      <h2 class="print-h">Section scores</h2>
      <table class="print-table">
        ${s.map(o=>`<tr><td>${d(o.label)}</td><td class="print-num">${o.score}</td><td class="print-bar"><span style="width:${o.score}%;background:${L(o.score)}"></span></td></tr>`).join("")}
      </table>
      ${e.excluded.length?`<p class="print-note">Not scored (not readable from text): ${d(e.excluded.join(", "))}</p>`:""}

      <h2 class="print-h">Top 3 fixes</h2>
      <ol class="print-list">
        ${e.fixes.map(o=>`<li><strong>${d(o.title)}</strong> — ${d(o.detail)}</li>`).join("")}
      </ol>
    </div>

    <div>
      <h2 class="print-h">Keyword gaps</h2>
      <p class="print-chips">${n.length?n.map(d).join(" · "):"None — full coverage."}</p>
      ${e.keywordReport?`<p class="print-note">Found: ${d(e.keywordReport.covered.join(", ")||"none")}</p>`:""}

      <h2 class="print-h">Headline</h2>
      <p class="print-before">${d(a?a.before:e.headlineFix.before)}</p>
      <p class="print-after">${d(a?a.after:e.headlineFix.after)}</p>
      <p class="print-note">${d(a?a.why:e.headlineFix.why)}</p>

      ${e.rewrites.filter(o=>o.key==="about").length?`<h2 class="print-h">About — skeleton</h2>
      <p class="print-pre">${d(e.rewrites.find(o=>o.key==="about").after)}</p>`:""}
    </div>
  </div>

  <p class="print-foot">Generated by KY — LinkedIn Profile Audit. Not affiliated with LinkedIn Corporation.</p>
</div>`}function Ht(e,t,s){e.querySelectorAll("[data-action]").forEach(a=>{a.addEventListener("click",async()=>{const o=a.dataset.action;if(o==="restart")s.onRestart();else if(o==="history")s.onHistory();else if(o==="save")s.onSave(t),w("Saved to this browser — the next audit will show what changed"),a.textContent="Saved to history",a.disabled=!0,a.classList.add("opacity-60");else if(o==="share"){const r=await U(St(t));w(r?"Copied — paste it straight into LinkedIn":"Copy failed — select the text manually")}else if(o==="copy"){const r=await U(Mt(t));w(r?"Full report copied to clipboard":"Copy failed")}else if(o==="print")window.print();else if(o==="copy-headline"){const r=await U(t.headlineFix.after);w(r?"Headline copied":"Copy failed")}else if(o==="copy-rewrite"){const r=Number(a.dataset.index),i=t.rewrites[r];if(!i)return;const l=await U(i.after);w(l?"Rewrite copied":"Copy failed")}})});const n=e.querySelector("[data-home]");n==null||n.addEventListener("click",a=>{a.preventDefault(),s.onRestart()})}function Bt(e){return new Date(e).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}function Kt(e){return new Date(e).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}function Ot(e){return e.mode==="text"?'<span class="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-200">Real</span>':'<span class="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700 ring-1 ring-amber-200">Demo</span>'}function Ce(){var i;const e=E(),t=B(),s=de(),n=new Map;for(const l of e)n.set(l.profileKey,(n.get(l.profileKey)??0)+1);const a=((i=[...n.entries()].sort((l,p)=>p[1]-l[1])[0])==null?void 0:i[0])??null,o=a?e.filter(l=>l.profileKey===a).sort((l,p)=>l.createdAt.localeCompare(p.createdAt)):[],r=o.map(l=>({label:l.label,value:l.overall,when:Bt(l.createdAt)}));return`<div class="min-h-screen bg-slate-50">
  <header class="sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur">
    <div class="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
      <button type="button" data-back class="inline-flex items-center gap-2 text-sm font-semibold text-white">
        ${u("arrowRight","h-4 w-4 rotate-180")} Back
      </button>
      <div class="flex items-center gap-2.5">
        <span class="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-sky-400 text-xs font-black text-white">KY</span>
        <span class="font-extrabold tracking-tight text-white">Audit history</span>
      </div>
      <div class="flex items-center gap-2">
        <button type="button" data-export="csv" class="hidden rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10 sm:inline-flex">CSV</button>
        <button type="button" data-export="json" class="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10">Export</button>
      </div>
    </div>
  </header>

  <main class="mx-auto max-w-5xl px-4 py-8">
    <p class="text-xs text-slate-500">
      ${s?`Account: ${d(s.name||s.email)} · `:""}Stored in this browser only. Nothing is uploaded.
    </p>

    ${e.length===0?Ut():""}

    ${r.length>=2?`<section class="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="flex flex-wrap items-baseline justify-between gap-2">
        <h2 class="text-lg font-bold text-slate-900">Score trend</h2>
        <p class="text-sm text-slate-500">${d(o[0].label)} · ${o.length} audits</p>
      </div>
      <p class="mt-0.5 text-sm text-slate-500">${Yt(o)}</p>
      <div class="mt-4">${Ue(r)}</div>
    </section>`:""}

    ${zt(t)}

    ${e.length?`<section class="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="flex items-center justify-between gap-3">
        <h2 class="text-lg font-bold text-slate-900">Saved audits</h2>
        <button type="button" data-clear class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition hover:text-rose-600">
          ${u("trash","h-3.5 w-3.5")} Clear all
        </button>
      </div>
      <ul class="mt-4 divide-y divide-slate-100">
        ${e.map(qt).join("")}
      </ul>
    </section>`:""}
  </main>
</div>`}function Yt(e){const t=e[0],s=e[e.length-1],n=s.overall-t.overall,a=n>0?"up":n<0?"down":"flat";return`First audit ${t.overall} → latest ${s.overall} — ${a} ${Math.abs(n)} point${Math.abs(n)===1?"":"s"} across ${e.length} runs.`}function Ut(){return`<section class="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
  <span class="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand">${u("history","h-6 w-6")}</span>
  <h2 class="mt-4 text-lg font-bold text-slate-900">No audits saved yet</h2>
  <p class="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
    Run an audit and choose <em>Save to history</em> on the report. Your score, keyword coverage and section scores are
    kept in this browser so the next run can show you what changed.
  </p>
</section>`}function qt(e){const t=L(e.overall);return`<li class="flex flex-wrap items-center gap-3 py-3.5">
  <div class="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-sm font-extrabold" style="background:${t}1a;color:${t}">${e.overall}</div>
  <div class="min-w-0 flex-1">
    <p class="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-900">
      ${d(e.label)} ${Ot(e)}
    </p>
    <p class="truncate text-xs text-slate-500">${d(e.industry)} · ${Kt(e.createdAt)} · ${d(e.source)}</p>
    ${e.gaps.length?`<p class="mt-1 truncate text-xs text-slate-400">Gaps: ${d(e.gaps.slice(0,5).join(", "))}</p>`:""}
  </div>
  <button type="button" data-delete="${e.id}" class="shrink-0 rounded-lg p-2 text-slate-300 transition hover:bg-rose-50 hover:text-rose-600" title="Delete this audit">
    ${u("trash","h-4 w-4")}
  </button>
</li>`}function zt(e){return`<section class="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
  <h2 class="text-lg font-bold text-slate-900">Tracked keywords</h2>
  <p class="mt-0.5 text-sm text-slate-500">
    Terms you want to rank for. Every audit checks whether each one still appears on your profile, and alerts you if it
    disappears.
  </p>
  <form id="tracked-form" class="mt-4 flex gap-2">
    <label class="sr-only" for="tracked-input">Keyword</label>
    <input id="tracked-input" type="text" placeholder="e.g. Lifecycle Marketing"
      class="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"/>
    <button type="submit" class="inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark">
      ${u("plus","h-4 w-4")} Track
    </button>
  </form>
  <div class="mt-4 flex flex-wrap gap-2">
    ${e.length?e.map(t=>`<span class="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand/5 py-1.5 pl-3 pr-1.5 text-sm font-medium text-brand">
        ${d(t)}
        <button type="button" data-untrack="${d(t)}" class="grid h-5 w-5 place-items-center rounded-full transition hover:bg-brand/15" title="Stop tracking">
          ${u("x","h-3 w-3")}
        </button>
      </span>`).join(""):'<p class="text-sm text-slate-400">Nothing tracked yet — add the terms recruiters should find you for.</p>'}
  </div>
</section>`}function Re(e,t){var a,o;(a=e.querySelector("[data-back]"))==null||a.addEventListener("click",t.onBack),e.querySelectorAll("[data-export]").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.export;if(!E().length){w("Nothing to export yet — run an audit first.");return}const l=new Date().toISOString().slice(0,10);i==="csv"?(ge(`ky-audits-${l}.csv`,et(),"text/csv"),w("CSV downloaded")):(ge(`ky-audits-${l}.json`,Xe(),"application/json"),w("JSON downloaded"))})}),e.querySelectorAll("[data-delete]").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.delete;i&&(We(i),q(e,t),w("Audit deleted"))})}),(o=e.querySelector("[data-clear]"))==null||o.addEventListener("click",()=>{Ve(),q(e,t),w("History cleared")});const s=e.querySelector("#tracked-form"),n=e.querySelector("#tracked-input");s==null||s.addEventListener("submit",r=>{r.preventDefault();const i=(n==null?void 0:n.value.trim())??"";i&&(Ze(i),n&&(n.value=""),q(e,t),w(`Tracking "${i}"`))}),e.querySelectorAll("[data-untrack]").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.untrack;i&&(Je(i),q(e,t))})})}function q(e,t){e.parentElement&&(e.innerHTML=Ce(),Re(e,t))}const Wt=["Score history with a trend line across every run","Keyword tracking — alerts when a term drops off your profile",'"What changed since your last audit" diff on each report',"Unlimited saved audits, plus CSV and JSON export"],Vt=["Hosted accounts — your data stays in this browser","Weekly automated re-audits and email alerts","Stripe billing — no payment provider is connected","Team and agency features (Phase 3)"];function Gt(){const e=de(),t=document.createElement("div");t.id="plan-modal",t.className="fixed inset-0 z-50 grid place-items-center bg-ink/60 p-4 backdrop-blur-sm",t.innerHTML=`<div role="dialog" aria-modal="true" aria-labelledby="plan-title" class="animate-pop w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
  <div class="flex items-start justify-between gap-4 border-b border-slate-100 bg-slate-50 p-6">
    <div>
      <p class="text-xs font-bold uppercase tracking-wider text-amber-600">Phase 2.5 preview</p>
      <h2 id="plan-title" class="mt-1 text-xl font-extrabold text-slate-900">KY Pro</h2>
      <p class="mt-1 text-sm text-slate-500">$12 / month early bird — not chargeable in this build.</p>
    </div>
    <button type="button" data-close class="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700" aria-label="Close">
      ${u("x","h-5 w-5")}
    </button>
  </div>

  <div class="max-h-[60vh] overflow-y-auto p-6">
    <h3 class="text-sm font-bold text-slate-900">What Pro adds</h3>
    <ul class="mt-3 space-y-2 text-sm text-slate-600">
      ${Wt.map(s=>`<li class="flex items-start gap-2.5">${u("check","h-4 w-4 mt-0.5 shrink-0 text-emerald-600")} ${s}</li>`).join("")}
    </ul>

    <h3 class="mt-6 text-sm font-bold text-slate-900">Not in this build</h3>
    <ul class="mt-3 space-y-2 text-sm text-slate-500">
      ${Vt.map(s=>`<li class="flex items-start gap-2.5">${u("x","h-4 w-4 mt-0.5 shrink-0 text-slate-300")} ${s}</li>`).join("")}
    </ul>

    <div class="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <h3 class="text-sm font-bold text-slate-900">${e?"Your demo account":"Create a demo account"}</h3>
      <p class="mt-1 text-xs leading-relaxed text-slate-500">
        ${e?`Signed in locally as ${e.name||e.email}. No password, no server — the name lives in this browser.`:"A name and email, kept in your browser. There is no login, no password and no verification email."}
      </p>
      ${e?`<button type="button" data-signout class="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-rose-300 hover:text-rose-600">
        ${u("logout","h-3.5 w-3.5")} Sign out of the demo account
      </button>`:`<form id="account-form" class="mt-3 flex flex-col gap-2 sm:flex-row">
        <label class="sr-only" for="account-name">Name</label>
        <input id="account-name" type="text" placeholder="Your name" class="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"/>
        <label class="sr-only" for="account-email">Email</label>
        <input id="account-email" type="email" placeholder="you@example.com" class="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"/>
        <button type="submit" class="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark">Save</button>
      </form>`}
    </div>
  </div>

  <div class="flex items-center justify-between gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
    <p class="text-xs text-slate-400">Pro features are already unlocked in this preview.</p>
    <button type="button" data-close class="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">Close</button>
  </div>
</div>`,document.body.appendChild(t),_t(t)}function _t(e){var n;const t=()=>e.remove();e.querySelectorAll("[data-close]").forEach(a=>a.addEventListener("click",t)),e.addEventListener("click",a=>{a.target===e&&t()}),(n=e.querySelector("[data-signout]"))==null||n.addEventListener("click",()=>{be(null),w("Demo account cleared from this browser"),t()});const s=e.querySelector("#account-form");s==null||s.addEventListener("submit",a=>{var i,l;a.preventDefault();const o=((i=e.querySelector("#account-name"))==null?void 0:i.value.trim())??"",r=((l=e.querySelector("#account-email"))==null?void 0:l.value.trim())??"";if(!o&&!r){w("Add a name or an email first.");return}be({name:o,email:r,plan:"pro",createdAt:new Date().toISOString()}),w("Saved to this browser — Pro is unlocked"),t()})}const ne=[{key:"marketing",label:"Marketing",keywords:["SEO","Content Strategy","GA4","Email Marketing","CRO","A/B Testing","Brand Strategy","Lifecycle Marketing"],headlines:[{before:"Marketing enthusiast looking for new opportunities",after:"Marketing Manager | Growth & Content for DTC Brands | +142% organic traffic in 12 months",why:"Recruiters search by role, niche and outcome. This headline matches all three — and the number gives it proof."},{before:"Digital marketing / social media / content",after:"Content & Social Lead | B2B SaaS | 3.2M impressions across 12 channels",why:"Keyword soup reads as spam; role + niche + proof reads as expertise."}]},{key:"software",label:"Software",keywords:["System Design","AWS","Kubernetes","Observability","Technical Leadership","Incident Response","Mentoring","Open Source"],headlines:[{before:"Software Engineer at Acme",after:"Senior Software Engineer | Distributed Systems & Cloud (AWS, K8s) | 99.95% uptime",why:"Your stack and the result you own should be searchable — not just your employer."},{before:"Full stack developer. Python. JS. SQL",after:"Full-Stack Engineer | React & Go | Shipped 3 products used by 400k people",why:"Adding the scale you have shipped turns a tool list into evidence."}]},{key:"sales",label:"Sales",keywords:["Pipeline Management","Salesforce","SaaS","Forecasting","Deal Desk","Enterprise Sales","Discovery","Negotiation"],headlines:[{before:"Sales professional seeking challenges",after:"Enterprise AE | SaaS $1–10M ACV | 128% of quota for 3 consecutive years",why:"Buyers and recruiters both filter on deal size and quota performance."},{before:"Business development / partnerships",after:"Partnerships Lead | Cloud & SaaS | 14 strategic deals closed in 2025",why:'"BD" is vague; the industry plus a closed count makes you specific and memorable.'}]},{key:"product",label:"Product",keywords:["Roadmapping","A/B Testing","SQL","User Research","Onboarding","Cohort Analysis","GTM","OKRs"],headlines:[{before:"Product Manager",after:"Product Manager | B2B Onboarding | Cut time-to-value from 14d to 3d",why:"A role plus a metric outcome shows you ship — not just manage."},{before:"PM looking for great teams",after:"Senior PM | 0-to-1 Consumer Apps | 2.1M installs across 3 launches",why:"Recruiters search for the problems you have solved, not the teams you want."}]},{key:"design",label:"Design",keywords:["Design Systems","Figma","Prototyping","Usability Testing","Accessibility","Motion Design","Design Tokens","Developer Handoff"],headlines:[{before:"UX/UI designer",after:"Product Designer | Fintech & Mobile | 40+ shipped flows, 2 design systems",why:"Discipline + domain + volume of shipped work is what hiring managers search."},{before:"Graphic designer | open to work",after:"Brand & Product Designer | Identity systems with 3 award nominations",why:'Drop "open to work" into your headline; state your craft and your proof instead.'}]},{key:"finance",label:"Finance",keywords:["FP&A","P&L","Budgeting","RevOps","M&A Modeling","IFRS","Cash Flow","Unit Economics"],headlines:[{before:"Finance manager",after:"Finance Manager | SaaS RevOps | Built P&L for 3 product lines, $12M ARR",why:'Niche (RevOps) plus scale (ARR) separates you from 90% of "finance" profiles.'},{before:"Looking for finance opportunities",after:"Senior Financial Analyst | FP&A & M&A Modeling | Big 4 to SaaS",why:"Career trajectory plus speciality is the fastest way to be picked from search."}]},{key:"operations",label:"Operations",keywords:["Process Improvement","Lean","Supply Chain","ERP","Vendor Management","KPI Dashboards","SOPs","Capacity Planning"],headlines:[{before:"Operations manager",after:"Operations Lead | Logistics & 3PL | 38% cost reduction across 5 hubs",why:"Operations credibility lives in the number, not the title."},{before:"Supply chain / logistics",after:"Supply Chain Manager | Cold-chain, EU | 120k units/month, zero compliance incidents",why:"Scope (region, volume) and risk ownership (compliance) are your differentiators."}]},{key:"education",label:"Education",keywords:["Curriculum Design","IEP","EdTech","Differentiated Instruction","Classroom Management","Data Literacy","AP/IB","Coaching"],headlines:[{before:"Teacher",after:"High-School Physics Teacher | AP Program Lead | 94% pass rate, 5 yrs",why:"Subject + program + student outcome — the three things school leaders search."},{before:"Looking for teaching positions",after:"Learning Designer | K-12 EdTech | Curriculum used by 60+ schools",why:"The move into ed-tech is a differentiator — say it explicitly."}]}],je=/^\s*(?:[•·◦▪*+‣]|[-–—]{1,2})\s+/,Zt=/\b(?:19|20)\d{2}\b/g,W=/\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+(?:19|20)\d{2}\b|\b(?:19|20)\d{2}\s*(?:-|–|—|to)\s*(?:present|now|current|(?:19|20)\d{2})\b|\b\d{1,2}\s*(?:yrs?|years?)\b/i,Jt=/\b(?:looking for|seeking|open to|enthusiast|passionate about|aspiring|new opportunities|unemployed|helping (?:companies|businesses) grow)\b/i,Qt=[{key:"about",re:/^(?:about|summary|profile\s+summary|overview|professional\s+summary)\s*[:.]?\s*$/i},{key:"experience",re:/^(?:experience|work\s+experience|employment(?:\s+history)?|positions?|professional\s+experience)\s*[:.]?\s*$/i},{key:"education",re:/^(?:education|academics?|academic\s+background)\s*[:.]?\s*$/i},{key:"skills",re:/^(?:skills|top\s+skills|core\s+(?:competencies|skills)|skills\s*(?:&|and)\s*endorsements)\s*[:.]?\s*$/i},{key:"certifications",re:/^(?:licen[sc]es?\s*(?:&|and)?\s*certifications?|certifications?|courses?|test\s*scores)\s*[:.]?\s*$/i},{key:"featured",re:/^(?:featured|projects?|publications?|honors?\s*(?:&|and)?\s*awards?|volunteering)\s*[:.]?\s*$/i},{key:"activity",re:/^(?:activity|posts?|articles?|all\s+star\s+sections)\s*[:.]?\s*$/i}];function Ee(e){const t=e.trim();if(!t||t.length>40)return null;for(const s of Qt)if(s.re.test(t))return s.key;return null}const Xt=/\b(?:increas|reduc|cut|grew|grown|grow|improv|boost|lift|rais|lower|sav|deliver|launch|led|lead|built|build|shipp|optimi|automat|scal|doubl|tripled|expand|shorten|accelerat|onboard\w*d|ran|run|migrat|consolidat|negoti|recruit\w*d|hired|trained)\w*/i;function J(e){return/(?:[$€£¥₹]\s?\d)|(?:\b\d+(?:[.,]\d+)?\s*(?:%|percent|x|×|k|m|bn|mn|mm|q|pt|pts|bps)\b)/i.test(e)?!0:/\d/.test(e)?Xt.test(e)?!0:/\b\d[\d,.]*\+?\s+[A-Za-z]/.test(e):!1}function ke(e){const t=e.trim().match(/[A-Za-zÀ-ÿ0-9''-]+/g);return t?t.length:0}function ae(e){const t=e.match(Zt);return t?[...new Set(t.map(s=>Number(s)))].filter(s=>s>=1950&&s<=new Date().getFullYear()+1):[]}function $e(e){return je.test(e)}function es(e){const t=e.replace(/\r\n?/g,`
`).split(`
`),s={},n=[];let a=n;for(const o of t){const r=Ee(o);if(r){a=s[r]??(s[r]=[]);continue}const i=o.match(/^\s*(about|summary|experience|education|skills|certifications|featured|activity)\s*[:]\s*(.+)$/i);if(i){const l=i[1].toLowerCase(),p=s[l]??(s[l]=[]);p.push(i[2]),a=p;continue}a.push(o)}return{head:n,blocks:s}}function R(e){return e.map(t=>t.trim()).filter(t=>t.length>0)}function ts(e){const t=e.trim();if(!t||t.length>60||/\d/.test(t)||/https?:|www\.|@/.test(t)||Ee(t)||/^[-•|·]/.test(t))return!1;const s=t.split(/\s+/);return s.length<2||s.length>5?!1:s.every(n=>/^[A-Za-zÀ-ÿ'’.-]+$/.test(n))}function ss(e){const t=e.trim();return t.length>60||/\bconnections\b|\bfollowers\b/i.test(t)?!1:/^[A-ZÀ-Ý][\w .'-]+,\s*[A-ZÀ-Ý][\w .'-]+$/.test(t)||/^(?:greater\s+)?[\w .'-]+\s+area$/i.test(t)}function ns(e){const t=[];let s=[];const n=()=>{const a=R(s);a.length&&t.push(as(a)),s=[]};for(const a of e)a.trim()?s.push(a):n();return n(),t.filter(a=>a.title||a.bullets.length)}function as(e){const t=e[0]??"";let s="",n="";const a=[];for(const r of e.slice(1))$e(r)?a.push(r.replace(je,"").trim()):!n&&W.test(r)&&r.length<90?n=r:!s&&!W.test(r)&&r.length<90?s=r:!$e(r)&&r.length<90&&!n?n=r:a.length?a[a.length-1]+=" "+r:s&&(s+=" "+r);const o=ae(e.join(" "));return{title:t,company:s,dates:n,bullets:a,metricBullets:a.filter(J).length,year:o.length?Math.max(...o):null,firstYear:o.length?Math.min(...o):null}}function os(e){const t=[];for(const s of R(e))for(const n of s.split(/[,•·|]/)){const a=n.trim().replace(/^\d+\.\s*/,"");a&&a.length<=48&&/[A-Za-z]/.test(a)&&!W.test(a)&&t.push(a)}return[...new Set(t)]}function rs(e,t={}){var Y,f,v,D,me;const{head:s,blocks:n}=es(e),a=R(s),o=a.find(ts)??"",r=a.find(ss)??"",i=a.find(g=>g!==o&&g!==r&&g.length<=220&&/[A-Za-z]/.test(g)&&!/https?:|@|\bconnections\b/i.test(g)&&!W.test(g))??"",l=n.about??[],p=R(l).join(" ").trim(),h=ns(n.experience??[]),M=R(n.education??[]).filter(g=>g.length<=160),k=os(n.skills??[]),y=R(n.certifications??[]).filter(g=>g.length<=160),m=R(n.featured??[]),x=R(n.activity??[]).join(" ").trim(),b=[...new Set((e.match(/https?:\/\/[^\s)"'<>]+/g)??[]).map(g=>g.replace(/[.,;]+$/,"")))],$={photo:((Y=t.flags)==null?void 0:Y.photo)??null,banner:((f=t.flags)==null?void 0:f.banner)??null,customUrl:((v=t.flags)==null?void 0:v.customUrl)??null,featured:((D=t.flags)==null?void 0:D.featured)??(m.length>0?!0:null),active90:((me=t.flags)==null?void 0:me.active90)??null},C=h.flatMap(g=>g.bullets),N=ae(e),O=h.map(g=>g.firstYear).filter(g=>g!==null);return{raw:e,name:o,headline:i,location:r,about:p,experience:h,education:M,skills:k,certifications:y,links:b,activityBlock:x,flags:$,words:ke(e),aboutWords:ke(p),bulletCount:C.length,metricCount:C.filter(J).length,lastActivityYear:x&&Math.max(0,...ae(x))||null,yearsExperience:O.length?new Date().getFullYear()-Math.min(...O):(N.length,null)}}function is(e){const t=e.flags.active90!==null||e.activityBlock.length>0,s=e.flags.featured!==null||e.links.length>0,n=e.flags.photo!==null||e.flags.banner!==null||e.flags.customUrl!==null;return{headline:e.headline?"measured":"unknown",about:e.aboutWords>0?"measured":"unknown",experience:e.experience.length>0?"measured":"unknown",education:e.education.length>0||e.certifications.length>0?"measured":"partial",skills:e.skills.length>0?"measured":"partial",activity:t?e.activityBlock.length>0?"measured":"partial":"unknown",media:s?e.links.length>0||e.flags.featured===!0?"measured":"partial":"unknown",presence:n?"partial":"unknown"}}function ls(e){return Jt.test(e)}function ds(e){return/\b(?:let'?s talk|let'?s connect|reach (?:out|me)|contact me|get in touch|open to|email me|happy to chat|dm me)\b|[\w.+-]+@[\w-]+\.[\w.]+/i.test(e)}function cs(e){return/\b(?:I\b|I'm|I've|I'll|my\b|we\b|our\b)/.test(e)}const P=()=>({score:0,issues:[],wins:[]});function c(e,t,s,n){e.score+=t,s&&e.wins.push(s),n&&e.issues.push(n)}function K(e,t){const s=n=>n.toLowerCase().replace(/[^a-z0-9+#.\s]/g," ").replace(/\s+/g," ");return s(e).includes(s(t))}function Pe(e,t){return t.length?t.filter(s=>K(e,s)).length/t.length:0}function us(e,t){const s=P(),n=e.headline.trim();if(!n)return s.issues.push("No headline found in the pasted text"),s;const a=n.length;a<25?c(s,8,void 0,"Headline is very short — LinkedIn gives you 220 characters"):a<45?c(s,18,void 0,"Headline is short for the space available"):a<=160?c(s,30,"Headline length uses the space well"):c(s,20,void 0,"Headline is near the 220-character limit and may truncate in search results"),/[|·•‖]| – | — | \/ /.test(n)?c(s,20,'Clear "Role | Niche | Proof" structure'):s.issues.push('No structure — separate role, niche and proof with "|"'),/\d/.test(n)?c(s,20,"Headline contains a number — proof recruiters remember"):s.issues.push("No number or measurable result in the headline"),ls(n)?s.issues.push('Reads as a job-seeking status ("looking for…"), not a value proposition'):c(s,15,"Headline sells an outcome rather than a job search");const o=t.keywords.filter(r=>K(n,r)).length;return o===0?s.issues.push(`None of the ${t.label} keywords recruiters search appear here`):c(s,Math.min(15,o*8),`${o} searchable ${t.label} keyword${o>1?"s":""} in the headline`),s}function ps(e,t){const s=P(),n=e.aboutWords;if(n===0)return s.issues.push("No About section found in the pasted text"),s;n<60?c(s,8,void 0,`About is only ${n} words — aim for 150–250`):n<120?c(s,20,void 0,`About is ${n} words — a little thin for the story you can tell`):n<=280?c(s,35,`About is ${n} words — the sweet spot recruiters actually read`):n<=420?c(s,24,void 0,`About runs to ${n} words — trim to keep it scannable`):c(s,14,void 0,`About is ${n} words — far too long; most readers stop at ~300`),cs(e.about)?c(s,10,"Written in the first person"):s.issues.push("Written in the third person — reads like a job description, not a person"),/\d/.test(e.about)&&hs(e.about)?c(s,15,"About contains quantified proof"):s.issues.push("No measurable result in the About section"),ds(e.about)?c(s,15,"About ends with a call-to-action"):s.issues.push("No call-to-action — tell readers what to do next");const a=Pe(e.about,t.keywords);return c(s,Math.round(a*15)),a<.15&&s.issues.push("About is missing the keywords recruiters search for"),e.about.split(/\s{2,}|\n/).filter(r=>r.trim().length>40).length>=2?c(s,10,"Broken into readable paragraphs"):s.issues.push("About is one unbroken block of text"),s}function hs(e){return/\b(?:\d+(?:[.,]\d+)?\s*%|[$€£¥₹]\s?\d|\b\d+x\b|\b\d+(?:k|m|bn)\b)/i.test(e)}function ms(e,t){const s=P(),n=e.experience;if(!n.length)return s.issues.push("No experience entries found in the pasted text"),s;const a=n.length;a===1?c(s,10,void 0,"Only one role listed — add earlier roles for depth"):a<=4?c(s,20,`${a} roles listed`):c(s,14,void 0,`${a} roles listed — consider grouping older roles`);const o=e.bulletCount/a;o<1?c(s,5,void 0,"Roles average under one bullet each"):o<2?c(s,14,void 0,"Roles average fewer than 2 bullets"):o<=5?c(s,25,`Roles average ${o.toFixed(1)} bullets`):c(s,18,void 0,"Some roles carry too many bullets to be scanned");const r=e.bulletCount?e.metricCount/e.bulletCount:0;r===0?c(s,0,void 0,`${e.bulletCount} bullets and none contain a number — the biggest leak`):r<.3?c(s,12,void 0,`Only ${Math.round(r*100)}% of bullets are quantified`):r<.6?c(s,22,`${Math.round(r*100)}% of bullets carry a number`):c(s,30,`${Math.round(r*100)}% of bullets are quantified`);const i=new Date().getFullYear(),l=Math.max(0,...n.map(h=>h.year??0));l?i-l<=1?c(s,15,"Most recent role is current"):i-l<=3?c(s,8,void 0,`Most recent listed role is from ${l}`):c(s,2,void 0,`Most recent listed role is from ${l} — add your current one`):s.issues.push("No dates on your roles — recruiters cannot see recency");const p=Pe(n.map(h=>`${h.title} ${h.company} ${h.bullets.join(" ")}`).join(" "),t.keywords);return c(s,Math.round(p*10)),p<.2&&s.issues.push(`Target ${t.label} keywords are missing from your bullets`),s}function fs(e){const t=P(),s=[...e.education,...e.certifications];return s.length?(c(t,40,`${s.length} education or certification ${s.length>1?"entries":"entry"} listed`),e.education.some(r=>/\b(?:b\.?a\.?|b\.?sc\.?|m\.?a\.?|m\.?sc\.?|m\.?b\.?a\.?|ph\.?d\.?|bachelor|master|doctorate|diploma|degree)\b/i.test(r))?c(t,25,"A degree is listed"):t.issues.push("No degree listed — if you have one, add it"),e.education.some(r=>/\b(?:university|college|institute|school|polytechnic|academy)\b/i.test(r))?c(t,15,"Institution named"):t.issues.push("Education entries do not name a school or institution"),e.certifications.length?c(t,20,`${e.certifications.length} certification${e.certifications.length>1?"s":""} or course${e.certifications.length>1?"s":""} listed`):t.issues.push("No certifications or courses — a 10-minute fix that reinforces positioning"),s.some(r=>/\b(?:19|20)\d{2}\b/.test(r))?c(t,10,"Years included"):t.issues.push("No years on your education entries"),t):(t.issues.push("No education, certification or course listed"),t)}function xs(e,t){const s=P(),n=e.skills.length;if(n===0)return s.issues.push("No skills found in the pasted text"),s;n<5?c(s,10,void 0,`Only ${n} skills listed — add up to 15`):n<10?c(s,25,void 0,`${n} skills listed — you can list up to 15`):n<=20?c(s,40,`${n} skills listed`):c(s,30,void 0,`${n} skills listed — dilution hides your top 3`);const a=t.keywords.filter(i=>e.skills.some(l=>K(l,i)||K(i,l))),o=a.length/t.keywords.length;c(s,Math.round(o*40)),o<.25?s.issues.push(`Only ${a.length} of ${t.keywords.length} in-demand ${t.label} terms appear in your skills`):c(s,0,`${a.length} in-demand ${t.label} terms in your skills`);const r=e.skills.reduce((i,l)=>i+l.length,0)/n;return r<10?c(s,10,"Skills are specific terms rather than vague adjectives"):r<=26?c(s,20,"Skills read as specific, searchable terms"):c(s,8,void 0,"Some skills read as full sentences rather than searchable terms"),s}function bs(e){const t=P(),s=e.flags.active90,n=e.activityBlock.length>0;if(s===null&&!n)return t.issues.push("Activity could not be read from the pasted text — confirm on your profile"),t;if(s===!0?c(t,45,"Posted or commented in the last 90 days"):s===!1?t.issues.push("No posts or comments in the last 90 days — dormant profiles rank lower"):c(t,20),n){const a=e.lastActivityYear??0;new Date().getFullYear()-a<=1?c(t,30,"Activity is recent"):c(t,10,void 0,`Most recent activity is from ${a}`),c(t,25,"Activity section is populated")}else c(t,15),t.issues.push("No activity section in the paste — recency is a ranking factor");return t}function gs(e){const t=P(),s=e.flags.featured;if(s===null&&e.links.length===0)return t.issues.push("Media could not be read from the pasted text"),t;s===!0?c(t,45,"Featured section is set up"):s===!1?t.issues.push("No Featured section — it is the most-scrolled block on your profile"):c(t,20);const n=e.links.length;return n===0?t.issues.push("No links to work, projects or writing in the paste"):n<=2?c(t,30,`${n} link${n>1?"s":""} to your work`):n<=5?c(t,55,`${n} links to your work`):c(t,40,void 0,`${n} links — a few strong ones beat many weak ones`),t}function ys(e){const t=P(),{photo:s,banner:n,customUrl:a}=e.flags;return s===null&&n===null&&a===null?(t.issues.push("Visual presence cannot be read from pasted text"),t):(s===!0?c(t,45,"Professional photo in place"):s===!1&&t.issues.push("No professional photo — the cheapest win on this list"),n===!0?c(t,30,"Custom banner in place"):n===!1&&t.issues.push("Banner is the default grey block — wasted prime space"),a===!0?c(t,25,"Custom public URL"):a===!1&&t.issues.push("No custom public URL"),t)}const ws={headline:us,about:ps,experience:ms,education:fs,skills:xs,activity:bs,media:gs,presence:ys};function vs(e,t){const s=is(e),n=A.map(i=>{const l=s[i.key];if(l==="unknown")return{key:i.key,label:i.label,score:0,basis:l,issues:[`Not readable from pasted text — ${i.label.toLowerCase()} needs your live profile`],wins:[],weight:0};const p=ws[i.key](e,t);return{key:i.key,label:i.label,score:Math.round(j(p.score,0,100)),basis:l,issues:p.issues,wins:p.wins,weight:i.weight}}),a=n.filter(i=>i.basis!=="unknown"),o=a.reduce((i,l)=>i+l.weight,0),r=o>0?Math.round(a.reduce((i,l)=>i+l.score*l.weight,0)/o):0;return{sections:n,overall:r,measuredCount:a.length,excluded:n.filter(i=>i.basis==="unknown").map(i=>i.label)}}const ks=["headline","about","experience","education","skills","activity","media","presence"];function $s(e){let t=ne[0],s=-1;for(const a of ne){let o=0;for(const r of a.keywords){const i=new RegExp(`\\b${Ss(r)}\\b`,"gi"),l=e.match(i);o+=l?Math.min(l.length,4):0}o>s&&(s=o,t=a)}const n=t.keywords.length*4;return{industry:t,confidence:n>0?Math.min(1,s/Math.max(8,n/2)):0}}function Ss(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Ms(e,t,s,n=[]){const o=[...n.map(r=>({keyword:r,tracked:!0})),...t.keywords.filter(r=>!n.some(i=>i.toLowerCase()===r.toLowerCase())).map(r=>({keyword:r,tracked:!1}))].map(({keyword:r,tracked:i})=>{const l=ks.filter(p=>K(e[p],r));return{keyword:r,found:l.length>0,where:l,tracked:i}});return{industry:t,confidence:s,coverage:o,gaps:o.filter(r=>!r.found).map(r=>r.keyword),covered:o.filter(r=>r.found).map(r=>r.keyword)}}function Ls(e){return{headline:e.headline,about:e.about,experience:e.experience.map(t=>`${t.title} ${t.company} ${t.bullets.join(" ")}`).join(" "),education:[...e.education,...e.certifications].join(" "),skills:e.skills.join(" "),activity:e.activityBlock,media:e.links.join(" "),presence:e.flags.customUrl===!0?"custom public url vanity url":""}}const As=/\[[^\]]+\]/;function Te(e){return e.replace(/\w\S*/g,t=>t[0].toUpperCase()+t.slice(1).toLowerCase())}function ce(e,t){var a;const s=e.experience[0];if(s!=null&&s.title){const o=s.title.replace(/\s*(?:at|@)\s.*$/i,"").replace(/\s*[-|].*$/,"").trim();if(o.length>2&&o.length<70)return o}const n=(a=e.headline.split(/[|·•]/)[0])==null?void 0:a.trim();return n&&n.length>2&&n.length<60?n:`${t.label} professional`}function Ie(e){const s=e.experience.flatMap(r=>r.bullets).filter(J);if(!s.length)return null;const o=[...s].sort((r,i)=>{const l=p=>/%/.test(p)?1:0;return l(i)-l(r)||r.length-i.length})[0].match(/(?:[$€£¥₹]\s?\d[\d.,]*\s*(?:k|m|bn|mn)?|\b\d+(?:[.,]\d+)?\s*(?:%|x|k|m|bn)\b|\b\d[\d,]{1,}\+?)/i);return o?o[0].trim():null}function V(e,t){const s=e.skills.slice(0,3).filter(Boolean);return s.length>=2?s.slice(0,2).map(Te).join(" & "):t.keywords.find(a=>e.raw.toLowerCase().includes(a.toLowerCase()))??`${t.label}`}function Cs(e,t){const s=ce(e,t),n=Ie(e),a=n?`${s} | ${V(e,t)} | ${n} ${Rs(e)}`.trim():`${s} | ${V(e,t)} | [your strongest number]`;return{key:"headline",title:"Headline",before:e.headline||"(empty)",after:a,why:n?"Role, niche and a real number — the three things recruiters search and scan for, using a result already in your profile.":"Role plus niche plus proof. Only the number is missing: take your single best result and put it here.",needsEdit:As.test(a)}}function Rs(e){return e.headline.length>0,""}function js(e,t){const s=ce(e,t),n=Ie(e),a=e.yearsExperience&&e.yearsExperience>0?e.yearsExperience:null,o=t.keywords.slice(0,3).join(", "),r=[a?`I'm a ${s.toLowerCase()} with ${a} years in ${t.label.toLowerCase()}, focused on ${V(e,t).toLowerCase()}.`:`I'm a ${s.toLowerCase()} focused on ${V(e,t).toLowerCase()} in ${t.label.toLowerCase()}.`,n?`Most recently I delivered ${n} — [what you changed, in one line].`:"[Your single best result, with the number that proves it.]",`I work across ${o}. ${e.skills.slice(3,6).join(", ")}${e.skills.length>6?", and more.":"."}`,"[What you want next] — reach me at [your email] or send a message here."].join(`

`);return{key:"about",title:"About section",before:e.about?Ts(e.about,320):"(empty)",after:r,why:"Four short paragraphs: who you are, the proof, the searchable keywords, and a call-to-action. Everything in brackets is a fact only you have — fill it in and delete the brackets.",needsEdit:!0}}function Es(e){const t=e.experience.flatMap(n=>n.bullets.map(a=>({role:n.title||"your role",bullet:a,hasNum:J(a)}))),s=t.filter(n=>!n.hasNum).slice(0,2);return!s.length&&t.length&&s.push(t[0]),s.map(({role:n,bullet:a},o)=>{const r=(a.match(/^[A-Za-z]+/)??[""])[0],i=a.replace(/^[A-Za-z]+\s+/,"").replace(/[.!?]+$/,"").trim(),l=`${Te(r||"Led")} ${Is(i||"[the thing you changed]")} — [result] in [number + timeframe].`;return{key:"experience",title:`Experience bullet ${o+1} · ${n}`,before:a,after:l,why:"Action + result + number. Recruiters skip duty bullets and stop on numbers; keeping your own verb makes it recognisably your work.",needsEdit:!0}})}function Ps(e,t){const s=t.keywords.filter(o=>!e.skills.some(r=>r.toLowerCase()===o.toLowerCase())),n=e.skills.slice(0,10),a=[...new Set([...t.keywords.slice(0,4),...n])].slice(0,15).join(" · ");return{key:"skills",title:"Skills list",before:e.skills.length?e.skills.slice(0,10).join(" · "):"(none found)",after:a,why:s.length?`The top 3 skills show on your profile card, so put the searched terms first. Missing today: ${s.slice(0,4).join(", ")}.`:"Already well covered — reorder so the most-searched terms sit in the top 3 shown on your card.",needsEdit:!1}}function Se(e,t){const s=[Cs(e,t),js(e,t),...Es(e)];return s.push(Ps(e,t)),s}function Ts(e,t){return e.length>t?`${e.slice(0,t).trimEnd()}…`:e}function Is(e){return e.charAt(0).toLowerCase()+e.slice(1)}function Ds(e){const t=z.find(n=>n.slug===e.slug);return{...t?qs(t,e):zs(e),keywordReport:null,rewrites:[],measuredCount:8,excluded:[],signals:[],parsed:null,alerts:[],delta:null}}function Fs(e,t={},s=""){var x;const n=rs(e,{flags:t}),a=$s(e),o=a.industry,r=vs(n,o),i=[],l=Ms(Ls(n),o,a.confidence,i),p=r.sections.map(b=>({key:b.key,label:b.label,score:b.score,issues:b.issues,wins:b.wins,basis:b.basis,weight:b.weight})),h=ce(n,o),M=n.name||"Your profile",k=Se(n,o)[0],y={raw:s||"pasted profile text",kind:s?"linkedin":"other",slug:n.name?n.name.toLowerCase().replace(/[^a-z0-9]+/g,"-"):"pasted-profile",display:s||`${n.words.toLocaleString("en-GB")} words of pasted profile text`},m=j(r.overall+Math.round((a.confidence-.4)*10),4,97);return{mode:"text",source:"pasted",input:y,profileKey:ue(y,M),name:M,initials:Ns(M),role:(x=n.experience[0])!=null&&x.company?`${h} · ${n.experience[0].company}`:h,industry:o.label,location:n.location||"—",headline:n.headline||"(no headline found)",overall:r.overall,percentile:m,sections:p,fixes:pe(p),keywords:l.gaps.slice(0,8),headlineFix:{before:k.before,after:k.after,why:k.why},summary:Hs(n,r,o),keywordReport:l,rewrites:Se(n,o),measuredCount:r.measuredCount,excluded:r.excluded,signals:Bs(n),parsed:n,alerts:[],delta:null}}function ue(e,t){const s=(t||e.slug).toLowerCase().replace(/[^a-z0-9]+/g,"-");return`${e.kind}:${s}`}function Ns(e){return e.split(/\s+/).filter(Boolean).slice(0,2).map(s=>{var n;return((n=s[0])==null?void 0:n.toUpperCase())??""}).join("")||"KY"}function Hs(e,t,s){const n=t.sections.filter(p=>p.basis!=="unknown"),a=[...n].sort((p,h)=>h.score-p.score)[0],o=[...n].sort((p,h)=>p.score-h.score)[0],r=e.metricCount,i=e.bulletCount,l=[];return l.push(`Scored from your real text: ${e.words.toLocaleString("en-GB")} words, ${e.experience.length} role${e.experience.length===1?"":"s"}, ${i} bullet${i===1?"":"s"}.`),a&&o&&a.key!==o.key&&l.push(`Strongest is ${a.label} (${a.score}/100); weakest is ${o.label} (${o.score}/100).`),i>0&&l.push(r===0?`None of your ${i} bullets contain a number — that is usually the single biggest scoring leak.`:`${r} of ${i} bullets carry a number; the rest still read as duties.`),t.excluded.length&&l.push(`${t.excluded.join(" and ")} could not be read from text and were left out of the score.`),l.push(`Detected industry: ${s.label}.`),l.join(" ")}function Bs(e){const t=[`${e.words.toLocaleString("en-GB")} words parsed`,`${e.aboutWords} words in About`,`${e.experience.length} roles`,`${e.bulletCount} bullets · ${e.metricCount} with numbers`,`${e.skills.length} skills`,`${e.education.length} education · ${e.certifications.length} certifications`,`${e.links.length} links`];return e.yearsExperience!==null&&e.yearsExperience>0&&t.push(`~${e.yearsExperience} years of history`),t}function Ks(e,t){if(!t)return null;const s=e.sections.filter(n=>n.basis!=="unknown").map(n=>{const a=t.sections.find(o=>o.key===n.key);return{key:n.key,label:n.label,change:a?n.score-a.score:0}}).filter(n=>n.change!==0);return{overall:e.overall-t.overall,sections:s.sort((n,a)=>Math.abs(a.change)-Math.abs(n.change)).slice(0,5),previousLabel:t.label,previousDate:new Date(t.createdAt).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}}function Os(e,t,s){if(!t||!s)return[];const n=[];s.overall<=-3?n.push({kind:"down",text:`Overall score dropped ${Math.abs(s.overall)} points since ${s.previousDate}`}):s.overall>=3&&n.push({kind:"up",text:`Overall score up ${s.overall} points since ${s.previousDate}`});const a=e.keywordReport?e.keywordReport.covered:[],o=new Map(t.covered.map(h=>[h.toLowerCase(),h])),r=new Map(a.map(h=>[h.toLowerCase(),h])),i=[...o].filter(([h])=>!r.has(h)).map(([,h])=>h);i.length&&n.push({kind:"keyword-lost",text:`Keyword${i.length>1?"s":""} no longer found on your profile: ${i.slice(0,3).join(", ")}`});const l=[...r].filter(([h])=>!o.has(h)).map(([,h])=>h);l.length&&n.push({kind:"keyword-won",text:`New keyword coverage: ${l.slice(0,3).join(", ")}`});const p=s.sections.filter(h=>h.change<=-8)[0];return p&&n.push({kind:"section-down",text:`${p.label} fell ${Math.abs(p.change)} points — worth a look before it compounds`}),n}function Ys(e){var t;return((t=A.find(s=>s.key===e))==null?void 0:t.label)??e}function Us(e){var t;return((t=A.find(s=>s.key===e))==null?void 0:t.weight)??0}function pe(e){const t=[...e].filter(n=>n.basis!=="unknown").sort((n,a)=>n.score-a.score).slice(0,3),s=["High","Medium","Low"];return t.map((n,a)=>{const o=A.find(r=>r.key===n.key);return{title:o?o.fixTitle:"Improve this section",detail:n.issues[0]??(o?o.fixDetail:"Bring this section in line with the rest of your profile."),impact:s[a]}})}function qs(e,t){const s=e.sections.map(n=>({key:n.key,label:Ys(n.key),score:n.score,issues:Me(n.key,n.score),wins:[],basis:"measured",weight:Us(n.key)}));return{mode:"url-demo",source:"curated",input:t,profileKey:ue(t,e.name),name:e.name,initials:e.initials,role:`${e.role} · ${e.company}`,industry:e.industry,location:e.location,headline:e.headline,overall:re(s),percentile:e.percentile,sections:s,fixes:pe(s),keywords:e.keywords,headlineFix:e.headlineFix,summary:e.summary,keywordReport:null,rewrites:[],measuredCount:8,excluded:[],signals:[],parsed:null,alerts:[],delta:null}}function zs(e){const t=Ke(Be(`${e.kind}|${e.slug}`)),s=xe(t,ne),n=Q(t,40,72),a=A.map(y=>{const m=j(n+Q(t,-12,14),18,95);return{key:y.key,label:y.label,score:m,issues:Me(y.key,m,t),wins:[],basis:"measured",weight:y.weight}}),o=re(a),r=j(o+Q(t,-5,7),4,96),i=xe(t,s.headlines),l=Oe(t,s.keywords,5),p=[...a].sort((y,m)=>y.score-m.score),h=p[0],M=p[p.length-1],k=e.slug.replace(/[^a-z0-9]/g,"").slice(0,2).toUpperCase();return{mode:"url-demo",source:"estimated",input:e,profileKey:ue(e,"your profile"),name:"Your profile",initials:k.length>=2?k:"KY",role:`${s.label} professional`,industry:s.label,location:"—",headline:i.before,overall:o,percentile:r,sections:a,fixes:pe(a),keywords:l,headlineFix:i,summary:`A ${s.label.toLowerCase()} profile with real signal to work with: strongest section is ${M.label} (${M.score}/100), weakest is ${h.label} (${h.score}/100). Closing the three lowest-scoring sections is usually the fastest route to a visibly better score.`,keywordReport:null,rewrites:[],measuredCount:8,excluded:[],signals:[],parsed:null,alerts:[],delta:null}}function te(e){return e.toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,"").slice(0,48)}function Ws(e){const t=e.trim();if(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,79}$/.test(t)){const n=te(t);return{raw:t,kind:"linkedin",slug:n,display:`linkedin.com/in/${n}`}}let s=null;try{s=new URL(t.includes("://")?t:`https://${t}`)}catch{s=null}if(s&&s.hostname){const n=s.hostname.replace(/^www\./,"").toLowerCase(),a=n.includes("linkedin"),o=s.pathname.split("/").filter(Boolean),r=o.findIndex(p=>p==="in"||p==="pub"||p==="company"||p==="school"),i=r>=0&&o[r+1]?o[r+1]:o[0]??"",l=te(i)||"profile";return{raw:t,kind:a?"linkedin":"other",slug:l,display:`${n}${s.pathname}`.slice(0,60)}}return{raw:t,kind:"other",slug:te(t)||"profile",display:t.slice(0,60)}}const S=document.getElementById("app");function Vs(){S&&he()}function he(){if(!S)return;S.innerHTML=st(),ht(S,{onAudit:Gs,onPaste:_s,onHistory:De,onOpenPlan:Gt}),window.scrollTo(0,0)}function De(){S&&(S.innerHTML=Ce(),Re(S,{onBack:he}),window.scrollTo(0,0))}function Gs(e){Fe(Ds(Ws(e)))}function _s(e,t){const s={photo:t.photo??null,banner:t.banner??null,customUrl:t.customUrl??null,featured:t.featured??null,active90:t.active90??null};Fe(Fs(e,s))}function Fe(e){if(!S)return;const t=Ge(e.profileKey),s=Ks(e,t),n={...e,delta:s,alerts:Os(e,t,s)};S.innerHTML=yt(n),wt(S,()=>{S&&(S.innerHTML=Lt(n),Ht(S,n,{onRestart:he,onHistory:De,onSave:a=>Zs(a)}),window.scrollTo(0,0))})}function Zs(e){var t;ze({id:_e(),profileKey:e.profileKey,label:e.name,source:e.input.display,industry:e.industry,mode:e.mode,overall:e.overall,percentile:e.percentile,sections:e.sections.filter(s=>s.basis!=="unknown").map(s=>({key:s.key,score:s.score})),covered:((t=e.keywordReport)==null?void 0:t.covered)??[],gaps:e.keywordReport?e.keywordReport.gaps:e.keywords,createdAt:new Date().toISOString()})}Vs();
