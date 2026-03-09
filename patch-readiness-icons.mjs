import { readFileSync, writeFileSync } from 'fs';

const path = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/backend/services/readiness-service.ts';
let c = readFileSync(path, 'utf8');

// Replace emoji icons with text identifiers in CATEGORY_META
c = c.replace("icon: '🤝'", "icon: 'delegation'");
c = c.replace("icon: '📉'", "icon: 'liquidity'");
c = c.replace("icon: '📊'", "icon: 'reporting'");
c = c.replace("icon: '🛡️'", "icon: 'disclosure'");
c = c.replace("icon: '💳'", "icon: 'loan'");
c = c.replace("icon: '⚙️'", "icon: 'governance'");

writeFileSync(path, c, 'utf8');
console.log('Updated readiness-service.ts - category icons changed from emojis to text identifiers');
