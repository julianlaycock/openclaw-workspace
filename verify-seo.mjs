import { readFileSync } from 'fs';
const html = readFileSync('C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/public/static/landing-en.html', 'utf8');

const title = html.match(/<title>([^<]+)/)?.[1];
const metaDesc = html.match(/name="description" content="([^"]+)"/)?.[1] || html.match(/content="([^"]+)" name="description"/)?.[1];
const ogTitle = html.includes('og:title');
const ogDesc = html.includes('og:description');
const ogImage = html.includes('og:image');
const canonical = html.includes('rel="canonical"');
const twitterCard = html.includes('twitter:card');
const robots = html.includes('name="robots"');

console.log('=== SEO ===');
console.log('Title:', title, `(${title?.length} chars)`);
console.log('Meta description:', metaDesc?.substring(0, 100) || '❌ MISSING');
console.log('OG title:', ogTitle ? '✅' : '❌');
console.log('OG desc:', ogDesc ? '✅' : '❌');
console.log('OG image:', ogImage ? '✅' : '❌');
console.log('Canonical:', canonical ? '✅' : '❌');
console.log('Twitter card:', twitterCard ? '✅' : '❌');
console.log('Robots:', robots ? '✅' : '❌');

console.log('\n=== HEAD SECTION ===');
const headMatch = html.match(/<head>([\s\S]*?)<\/head>/);
if (headMatch) {
  const head = headMatch[1];
  const metas = head.match(/<meta[^>]+>/g) || [];
  const links = head.match(/<link[^>]+>/g) || [];
  metas.forEach(m => console.log('  META:', m.substring(0, 100)));
  links.forEach(l => console.log('  LINK:', l.substring(0, 100)));
}

console.log('\n=== BUTTONS WITHOUT TYPE ===');
const btns = html.match(/<button[^>]*>/g) || [];
btns.filter(b => !b.includes('type=')).forEach(b => console.log('  ', b.substring(0, 80)));

console.log('\n=== FOCUS STYLES ===');
const focusStyles = html.match(/:focus[^{]*\{[^}]+/g) || [];
focusStyles.forEach(f => console.log('  ', f.substring(0, 80)));

console.log('\n=== TOUCH TARGETS (buttons/links) ===');
const btnCss = html.match(/\.(btn[^{]*)\{([^}]+)/g) || [];
btnCss.slice(0, 5).forEach(b => console.log('  ', b.substring(0, 100)));
