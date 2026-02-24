import fs from 'fs';
const routePath = 'C:/Users/julia/.openclaw/sandboxes/caelith-project/src/frontend/src/app/api/landing/route.ts';
let content = fs.readFileSync(routePath, 'utf8');

// The HTML is stored with escaped quotes in the TS template literal, but actually it uses regular quotes inside backticks
// Let's just do a simple string replace
content = content.replace(
  '<div class=\\"pricing-price\\">Custom</div>',
  '<div class=\\"pricing-price\\">From €3,500<span>/mo</span></div>'
);

// Also try without escaped quotes (in case it's in a template literal)
content = content.replace(
  '<div class="pricing-price">Custom</div>',
  '<div class="pricing-price">From €3,500<span>/mo</span></div>'
);

fs.writeFileSync(routePath, content);

const updated = fs.readFileSync(routePath, 'utf8');
console.log('Contains €3,500:', updated.includes('€3,500'));
console.log('Contains From €3,500:', updated.includes('From €3,500'));
