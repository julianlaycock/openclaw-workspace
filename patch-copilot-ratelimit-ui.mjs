import { readFileSync, writeFileSync } from 'fs';

const path = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/components/copilot.tsx';
let c = readFileSync(path, 'utf8');

// Add COPILOT_RATE_LIMITED handler alongside the existing DEMO_LIMIT_REACHED handler
c = c.replace(
  `if (apiErr?.error === 'DEMO_LIMIT_REACHED') {`,
  `if (apiErr?.error === 'DEMO_LIMIT_REACHED' || apiErr?.error === 'COPILOT_RATE_LIMITED') {`
);

writeFileSync(path, c, 'utf8');
console.log('Patched: COPILOT_RATE_LIMITED now handled in frontend');

// Verify
const result = readFileSync(path, 'utf8');
console.log('Has COPILOT_RATE_LIMITED:', result.includes('COPILOT_RATE_LIMITED'));
