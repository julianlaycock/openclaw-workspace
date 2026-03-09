import { readFileSync, writeFileSync } from 'fs';

const deck   = readFileSync('index-v3.html', 'utf8');
const vision = readFileSync('../research/agent-vision.html', 'utf8');

// ── Extract agent-vision styles and body ────────────────────────────────────
const visionStyles = vision.match(/<style[^>]*>([\s\S]*?)<\/style>/)?.[1] ?? '';
const visionBody   = vision.match(/<body[^>]*>([\s\S]*?)<\/body>/)?.[1] ?? '';

// ── Build the combined file ─────────────────────────────────────────────────
// Strategy:
//  1. Keep deck html/body overflow:hidden (slides are locked by default)
//  2. Inject extra CSS for the vision section
//  3. Append vision section after closing </div> of deck, before </body>
//  4. Patch the wheel/touch/keyboard handlers:
//     - last slide + scroll down  → unlock + scroll to vision
//     - first slide + scroll up   → re-lock (if scrolled back to top)

// ── 1. Extra CSS (injected before </style>) ─────────────────────────────────
const extraCSS = `
/* ── vision section ── */
#visionSection { display: none; }
#visionSection.unlocked { display: block; }

/* namespaced agent-vision styles */
#visionSection ${visionStyles.replace(/\n/g, '\n#visionSection ')}

/* scroll-hint on last slide */
#scrollHint {
  position: fixed; bottom: 62px; right: 48px;
  font-family: 'JetBrains Mono', monospace; font-size: 11px;
  color: rgba(255,255,255,0); pointer-events: none;
  letter-spacing: .06em; z-index: 200;
  transition: color .5s;
}
#scrollHint.show { color: rgba(255,255,255,.4); pointer-events: auto; cursor: pointer; }
@keyframes nudge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }
#scrollHint.show { animation: nudge 2s ease-in-out infinite; }
`;

// ── 2. Patch JS: replace wheel + touch handlers, add unlock logic ────────────
const unlockJS = `
// ── unlock & scroll to vision ──────────────────────────────────────────────
function unlockVision() {
  document.getElementById('visionSection').classList.add('unlocked');
  document.documentElement.style.overflow = 'auto';
  document.body.style.overflow = 'auto';
  document.getElementById('visionSection').scrollIntoView({ behavior: 'smooth' });
}
// re-lock when scrolled back to top
window.addEventListener('scroll', () => {
  if (window.scrollY === 0) {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.getElementById('visionSection').classList.remove('unlocked');
  }
}, { passive: true });
`;

const patchedWheel = `
// Mouse wheel
let wheelTimeout;
document.addEventListener('wheel', e => {
  // last slide + scroll down → unlock vision
  if (e.deltaY > 0 && current === total - 1) { unlockVision(); return; }
  if (wheelTimeout) return;
  wheelTimeout = setTimeout(() => wheelTimeout = null, 600);
  if (e.deltaY > 0) goTo(current + 1);
  else if (e.deltaY < 0) goTo(current - 1);
}, { passive: true });
`;

const patchedTouch = `document.addEventListener('touchend', e => {
  const d = e.changedTouches[0].clientX - tx;
  if (Math.abs(d) > 50) {
    if (d < 0 && current === total - 1) { unlockVision(); }
    else { d < 0 ? goTo(current + 1) : goTo(current - 1); }
  }
});`;

const scrollHintJS = `
// scroll hint on last slide
const _sh = document.createElement('div');
_sh.id = 'scrollHint'; _sh.textContent = '↓  product vision';
document.body.appendChild(_sh);
const _origGoTo = goTo;
goTo = n => { _origGoTo(n); _sh.classList.toggle('show', current === total - 1); };
_sh.onclick = unlockVision;
`;

// ── 3. Assemble ──────────────────────────────────────────────────────────────
let out = deck;

// inject CSS
out = out.replace('</style>', extraCSS + '</style>');

// replace wheel handler
out = out.replace(
  /\/\/ Mouse wheel[\s\S]*?}, \{passive:true\}\);/,
  patchedWheel
);

// replace touch handler
out = out.replace(
  /document\.addEventListener\('touchend',e=>\{[\s\S]*?\}\);/,
  patchedTouch
);

// inject unlock + scroll-hint JS before closing </script>
out = out.replace('goTo(0);\n</script>', `goTo(0);\n${unlockJS}\n${scrollHintJS}\n</script>`);

// append vision section before </body>
out = out.replace('</body>', `
<div id="visionSection">
${visionBody}
</div>
</body>`);

writeFileSync(
  'C:/Users/julia/.openclaw/sandboxes/caelith-project/src/frontend/public/deck.html',
  out, 'utf8'
);
console.log('Built. Size:', out.length, 'chars');
