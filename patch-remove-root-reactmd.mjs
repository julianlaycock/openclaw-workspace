import { readFileSync, writeFileSync } from 'fs';

const path = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/package.json';
let c = readFileSync(path, 'utf8');

// Remove react-markdown from root package.json (it belongs in src/frontend only)
c = c.replace(/\s*"react-markdown":\s*"\^10\.1\.0",?\n?/, '\n');

writeFileSync(path, c, 'utf8');
console.log('Removed react-markdown from root package.json');
