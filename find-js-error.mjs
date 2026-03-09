import { readFileSync } from 'fs';

const c = readFileSync('C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/src/app/api/readiness-check/route.ts', 'utf8');

// Extract just the JS script content (between <script> and </script>)
const scriptStart = c.indexOf('<script>') + '<script>'.length;
const scriptEnd = c.lastIndexOf('</script>');
const script = c.substring(scriptStart, scriptEnd);

console.log('Script length:', script.length);

// Try to parse line by line accumulating
const lines = script.split('\n');
let accumulated = '';
for (let i = 0; i < lines.length; i++) {
  accumulated += lines[i] + '\n';
  try {
    new Function(accumulated);
  } catch(e) {
    if (e instanceof SyntaxError && !e.message.includes('end of input') && !e.message.includes('Unexpected token }') && !e.message.includes('Unexpected token )')) {
      console.log(`Syntax error at line ${i+1}: ${e.message}`);
      console.log('Line content:', JSON.stringify(lines[i]).substring(0, 200));
      console.log('Prev line:', JSON.stringify(lines[i-1] || '').substring(0, 200));
      if (i > 0) console.log('Line -2:', JSON.stringify(lines[i-2] || '').substring(0, 200));
    }
  }
}
console.log('Done scanning');
