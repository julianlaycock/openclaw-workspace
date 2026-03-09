const s = require('fs').readFileSync('C:/Users/julia/.openclaw/sandboxes/caelith-project/src/frontend/src/app/api/landing/landing-en.ts', 'utf8');
// Find the nav HTML section with the Try Demo link
const needle = 'class=\\"btn-demo\\"';
const i = s.indexOf(needle);
console.log('Found at:', i);
console.log(s.substring(i - 200, i + 200));
