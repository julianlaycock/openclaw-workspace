import fs from 'fs';
const routePath = 'C:/Users/julia/.openclaw/sandboxes/caelith-project/src/frontend/src/app/api/landing/route.ts';
let content = fs.readFileSync(routePath, 'utf8');

// Find the Enterprise pricing section
const idx = content.indexOf('Enterprise');
if (idx > -1) {
  const snippet = content.substring(idx - 50, idx + 300);
  console.log('Context around Enterprise:', snippet.substring(0, 350));
}

// Check what Custom looks like
const cidx = content.indexOf('Custom</div>');
if (cidx > -1) {
  console.log('\nCustom context:', content.substring(cidx - 100, cidx + 50));
}
