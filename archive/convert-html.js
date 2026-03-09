const fs = require('fs');
const html = fs.readFileSync('C:\\Users\\julia\\openclaw-workspace\\redesign-concepts\\v3-option-b.html', 'utf8');
const escaped = html.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/`/g, '\\`').replace(/\r?\n/g, '\\n');
const out = 'export const htmlEn = "' + escaped + '";\n';
const outPath = 'C:\\Users\\julia\\.openclaw\\sandboxes\\caelith-project\\src\\frontend\\src\\app\\api\\landing\\landing-en.ts';
fs.writeFileSync(outPath, out, 'utf8');
const lines = fs.readFileSync(outPath, 'utf8').split('\n').length;
console.log('Lines:', lines);
