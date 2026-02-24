import fs from 'fs';
const f = 'C:/Users/julia/openclaw-workspace/redesign-concepts/concept-v11.html';
let h = fs.readFileSync(f, 'utf8');
h = h.replace(/href="\/login"/g, 'href="https://www.caelith.tech/login"');
fs.writeFileSync(f, h);
console.log('Fixed concept-v11.html');
