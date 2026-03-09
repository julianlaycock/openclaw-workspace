const s = require('fs').readFileSync('C:/Users/julia/.openclaw/sandboxes/caelith-project/src/frontend/src/app/api/landing/landing-de.ts', 'utf8');
const needle = 'btn-demo';
const i = s.indexOf(needle, 30000);
console.log('Found at:', i);
console.log(s.substring(i - 200, i + 200));
