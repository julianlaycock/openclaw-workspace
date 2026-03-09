const s = require('fs').readFileSync('C:/Users/julia/.openclaw/sandboxes/caelith-project/src/frontend/src/app/api/landing/landing-en.ts', 'utf8');
const needle = 'btn-demo';
const i = s.indexOf(needle, s.indexOf('nav-links'));
console.log(s.substring(i - 300, i + 300));
