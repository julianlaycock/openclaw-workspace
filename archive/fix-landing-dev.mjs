import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const projectRoot = 'C:\\Users\\julia\\.openclaw\\sandboxes\\caelith-project';
const landingDir = join(projectRoot, 'src', 'frontend', 'src', 'app', 'api', 'landing');
const publicDir = join(projectRoot, 'src', 'frontend', 'public', 'static');

function extractHtml(tsContent) {
  const match = tsContent.match(/=\s*"([\s\S]*)";?\s*$/);
  if (!match) throw new Error('Could not extract HTML string');
  let html = match[1];
  html = html.replace(/\\n/g, '\n');
  html = html.replace(/\\"/g, '"');
  html = html.replace(/\\\\/g, '\\');
  return html;
}

mkdirSync(publicDir, { recursive: true });

for (const lang of ['en', 'de']) {
  const tsFile = join(landingDir, `landing-${lang}.ts`);
  const tsContent = readFileSync(tsFile, 'utf8');
  const html = extractHtml(tsContent);
  const htmlFile = join(publicDir, `landing-${lang}.html`);
  writeFileSync(htmlFile, html, 'utf8');
  console.log(`Extracted ${htmlFile} (${html.length} chars)`);
}

const newRoute = `import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

function loadHtml(lang: string): string {
  const filename = lang === 'de' ? 'landing-de.html' : 'landing-en.html';
  const filePath = join(process.cwd(), 'public', 'static', filename);
  return readFileSync(filePath, 'utf8');
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang');
  const content = loadHtml(lang === 'de' ? 'de' : 'en');
  const encoded = new TextEncoder().encode(content);
  return new NextResponse(encoded, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  });
}
`;

const routeFile = join(landingDir, 'route.ts');
writeFileSync(routeFile, newRoute, 'utf8');
console.log('Rewrote route.ts to use static file reads');
console.log('\\nDone! Landing pages now load from public/static/*.html');
