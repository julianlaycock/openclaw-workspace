import { readFileSync, writeFileSync } from 'fs';

const dir = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2/src/frontend/public/static';

const OLD_NAV = `  <a class="nav-logo" href="#">Caelith</a>\n  <button class="hamburger" id="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>\n</nav>`;

const enNav = `  <a class="nav-logo" href="#">Caelith</a>\n  <div style="display:flex;align-items:center;gap:12px;">\n    <a href="/api/landing?lang=de" style="font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(255,255,255,0.4);text-decoration:none;letter-spacing:0.5px;padding:6px 2px;">DE</a>\n    <button class="hamburger" id="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>\n  </div>\n</nav>`;

const deNav = `  <a class="nav-logo" href="#">Caelith</a>\n  <div style="display:flex;align-items:center;gap:12px;">\n    <a href="/api/landing?lang=en" style="font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(255,255,255,0.4);text-decoration:none;letter-spacing:0.5px;padding:6px 2px;">EN</a>\n    <button class="hamburger" id="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>\n  </div>\n</nav>`;

let en = readFileSync(dir + '/landing-mobile-en.html', 'utf8');
en = en.replace(OLD_NAV, enNav);
writeFileSync(dir + '/landing-mobile-en.html', en, 'utf8');
console.log('EN:', en.includes('lang=de') ? '✓ DE link present' : '✗ MISSING');

let de = readFileSync(dir + '/landing-mobile-de.html', 'utf8');
de = de.replace(OLD_NAV, deNav);
writeFileSync(dir + '/landing-mobile-de.html', de, 'utf8');
console.log('DE:', de.includes('lang=en') ? '✓ EN link present' : '✗ MISSING');
