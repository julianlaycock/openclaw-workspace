const s = require('fs').readFileSync('C:/Users/julia/.openclaw/sandboxes/caelith-project/src/frontend/src/app/api/landing/landing-en.ts', 'utf8');
const i = s.indexOf('nav-links">');
console.log(s.substring(i, i + 500));
