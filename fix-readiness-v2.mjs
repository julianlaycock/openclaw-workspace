import { readFileSync, writeFileSync } from 'fs';

const p = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/api/readiness-check/route.ts';
let content = readFileSync(p, 'utf8');

// ── Fix 1: ansNa → N/A ──
// The key generator does 'ans' + v.charAt(0).toUpperCase() + v.slice(1)
// For 'na' → 'ansNa', but translation key is 'ansNA'
// Fix: rename translation keys ansNA → ansNa in both EN and DE translations
content = content.replace(/ansNA: 'N\/A'/g, "ansNa: 'N/A'");
console.log('Fix 1 applied - ansNA → ansNa count:', (content.match(/ansNa: 'N\/A'/g) || []).length);

// ── Fix 2: Nav bar overlap ──
// The fixed pill nav sits at top:16px, ~44px tall = occupies ~60px from top
// progress-wrap is sticky at top:0, goes behind the pill nav
// Fix: change sticky top from 0 to 72px so it appears below the fixed nav
content = content.replace(
  'position:sticky;top:0;z-index:99}',
  'position:sticky;top:72px;z-index:99}'
);
// Also add padding-top to the quiz screen so content doesn't start hidden behind nav
content = content.replace(
  '.screen{display:none;',
  '.screen{padding-top:72px;display:none;'
);
// If screen doesn't have that exact rule, try adding to quiz-body
const screenMatch = content.includes('padding-top:72px;display:none;');
const progressMatch = content.includes('position:sticky;top:72px;z-index:99}');
console.log('Fix 2a (screen padding-top):', screenMatch);
console.log('Fix 2b (sticky top:72px):', progressMatch);

// Check if screen rule exists differently
if (!screenMatch) {
  const screenIdx = content.indexOf('.screen{');
  if (screenIdx > -1) {
    console.log('Screen rule found:', content.substring(screenIdx, screenIdx + 80));
  }
  // Try the quiz body instead
  content = content.replace(
    '#quiz-body{',
    '#quiz-body{padding-top:0;'
  );
  // Add padding to the quiz container
  content = content.replace(
    'id="screen-quiz" class="screen"',
    'id="screen-quiz" class="screen" style="padding-top:80px"'
  );
  const quizPad = content.includes('padding-top:80px');
  console.log('Fix 2b fallback (quiz padding-top):', quizPad);
}

writeFileSync(p, content, 'utf8');
console.log('\nWritten. Verifying...');

const verify = readFileSync(p, 'utf8');
console.log('ansNa keys:', (verify.match(/ansNa:/g) || []).length, '(should be 2 for EN+DE)');
console.log('ansNA keys remaining:', (verify.match(/ansNA:/g) || []).length, '(should be 0)');
console.log('Quiz screen padding:', verify.includes('padding-top:80px') || verify.includes('padding-top:72px'));
