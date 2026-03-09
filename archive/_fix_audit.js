const fs = require('fs');
const p = 'C:\\Users\\julia\\projects\\private-asset-registry_Caelith_v2\\src\\backend\\lib\\audit-logger.ts';
let c = fs.readFileSync(p, 'utf8');
c = c.replace("| 'api_key.revoked'", "| 'api_key.revoked'\n  | 'api_key.rotated'");
fs.writeFileSync(p, c);
console.log('audit-logger.ts updated');
