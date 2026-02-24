import fs from 'fs';

const routePath = 'C:/Users/julia/.openclaw/sandboxes/caelith-project/src/frontend/src/app/api/landing/route.ts';
let content = fs.readFileSync(routePath, 'utf8');

// Fix pricing anchor text
content = content.replace(
  /The average AIFM spends <strong>€180,000\/year<\/strong> on manual compliance\. Caelith starts at <strong>€3,588<\/strong>\./g,
  'The average AIFM spends <strong>€150–200K/year</strong> on manual compliance. Caelith starts at <strong>€11,880</strong> — 93% cheaper.'
);

// Fix Starter → Essentials tier
content = content.replace(/<div class="pricing-tier">Starter<\/div>/g, '<div class="pricing-tier">Essentials</div>');
content = content.replace(/€299<span>\/mo<\/span>/g, '€990<span>/mo</span>');
content = content.replace(/For emerging managers with a single fund\./g, 'For emerging managers with up to 3 funds.');
content = content.replace(/1 fund, up to 100 investors/g, '3 funds, up to 200 investors');
content = content.replace(/Basic audit trail/g, 'Full audit trail');
content = content.replace(/subject=Starter%20Plan/g, 'subject=Essentials%20Plan');

// Fix Professional tier
content = content.replace(/€799<span>\/mo<\/span>/g, '€1,990<span>/mo</span>');
content = content.replace(/Up to 10 funds, unlimited investors/g, 'Up to 15 funds, unlimited investors');

// Fix Enterprise tier
content = content.replace(/<div class="pricing-price">Custom<\/div>/g, '<div class="pricing-price">From €3,500<span>/mo</span></div>');
content = content.replace(/On-premise deployment option/g, 'On-premise deployment, SSO');

fs.writeFileSync(routePath, content);
console.log('Route file updated with new pricing');

// Verify
const updated = fs.readFileSync(routePath, 'utf8');
console.log('Contains €990:', updated.includes('€990'));
console.log('Contains €1,990:', updated.includes('€1,990'));
console.log('Contains €3,500:', updated.includes('€3,500'));
console.log('Contains Essentials:', updated.includes('Essentials'));
