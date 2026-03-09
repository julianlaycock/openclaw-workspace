/**
 * gen-landing-mobile.mjs
 * Generates landing-mobile-en.html + landing-mobile-de.html from _PREVIEW_DO_NOT_DEPLOY_mobile-v2.html
 *
 * Usage:
 *   node gen-landing-mobile.mjs              # dry run — writes to workspace only
 *   node gen-landing-mobile.mjs --production # copies to project static dir
 *
 * SAFETY RULES:
 *   - Source must be named _PREVIEW_DO_NOT_DEPLOY_* — never a plain landing-*.html
 *   - Output is always landing-mobile-*.html — NEVER landing-en/de.html (desktop files)
 *   - Size sanity check: output must be >= 40KB or deploy is aborted
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const PRODUCTION = process.argv.includes('--production');
const WORKSPACE = 'C:/Users/julia/openclaw-workspace';
const PROJECT = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2';
const STATIC_DIR = join(PROJECT, 'src/frontend/public/static');
const SOURCE = join(WORKSPACE, '_PREVIEW_DO_NOT_DEPLOY_mobile-v2.html');
const SIZE_MIN_KB = 40;

if (!existsSync(SOURCE)) {
  console.error('Source file not found:', SOURCE);
  process.exit(1);
}

if (PRODUCTION) {
  console.log('PRODUCTION mode: files will be copied to project static dir');
} else {
  console.log('DRY RUN: output written to workspace only. Pass --production to deploy.');
}

let en = readFileSync(SOURCE, 'utf8');

// Fix title
en = en.replace('Caelith \u2014 Mobile Preview v2', 'Caelith \u2014 AIFMD II Compliance Platform for EU Fund Managers');

// Add lang switcher to mobile menu
en = en.replace(
  '<a href="/readiness-check" class="menu-cta">Readiness Check \u2192</a>\n</div>',
  '<a href="/readiness-check" class="menu-cta">Readiness Check \u2192</a>\n  <a href="/api/landing?lang=de" style="font-size:10px;color:rgba(255,255,255,0.3);margin-top:8px">\ud83c\udde9\ud83c\uddea DE</a>\n</div>'
);

writeFileSync(join(WORKSPACE, 'landing-mobile-en-new.html'), en, 'utf8');
console.log('EN written to workspace');

// DE version
let de = en;
de = de.replace('<html lang="en">', '<html lang="de">');
de = de.replace('Caelith \u2014 AIFMD II Compliance Platform for EU Fund Managers', 'Caelith \u2014 AIFMD II Compliance-Plattform f\u00fcr europ\u00e4ische Fondsmanager');
de = de.replace('/api/landing?lang=de', '/api/landing?lang=en');
de = de.replace('\ud83c\udde9\ud83c\uddea DE', '\ud83c\uddec\ud83c\udde7 EN');

// Nav
de = de.replace('>Platform</a>', '>Plattform</a>');
de = de.replace('>Pricing</a>', '>Preise</a>');
de = de.replace('>Readiness Check \u2192</a>', '>Readiness-Check \u2192</a>');

// Hero
de = de.replace('AIFMD II COMPLIANCE PLATFORM', 'AIFMD II COMPLIANCE-PLATTFORM');
de = de.replace('Fund compliance,<br><span class="grad">automated.</span>', 'Fonds-Compliance,<br><span class="grad">automatisiert.</span>');
de = de.replace('Every decision logged, verified, and cryptographically proven \u2014 before your regulator asks.', 'Jede Entscheidung dokumentiert, verifiziert und kryptographisch bewiesen \u2014 bevor die Aufsicht fragt.');
de = de.replace('Free Readiness Check <span class="arrow">\u2192</span>', 'Kostenloser Readiness-Check <span class="arrow">\u2192</span>');
de = de.replace('Try the Copilot <span class="arrow">\u2192</span>', 'Copilot testen <span class="arrow">\u2192</span>');
de = de.replace('\u2713 ESMA XSD-validated', '\u2713 ESMA-XSD-validiert');
de = de.replace('\u2713 EU hosted', '\u2713 EU-gehostet');
de = de.replace('\u2713 Open source core', '\u2713 Open-Source-Kern');

// Pricing
de = de.replace(/Get started /g, 'Jetzt starten ');
de = de.replace(/Contact sales/g, 'Vertrieb kontaktieren');
de = de.replace(/Book demo/g, 'Demo buchen');
de = de.replace('Simple pricing.<br><span class="grad">No surprises.</span>', 'Einfache Preise.<br><span class="grad">Keine \u00dcberraschungen.</span>');
de = de.replace('93% cheaper than compliance consulting.', '93% g\u00fcnstiger als Compliance-Beratung.');

// Footer
de = de.replace('Compliance platform for European fund managers.', 'Compliance-Plattform f\u00fcr europ\u00e4ische Fondsmanager.');
de = de.replace('>Privacy</a>', '>Datenschutz</a>');
de = de.replace('>Terms</a>', '>AGB</a>');
de = de.replace('>Imprint</a>', '>Impressum</a>');

// Cookie banner
de = de.replace('We use analytics to improve the experience.', 'Wir verwenden Analysen zur Verbesserung der Nutzererfahrung.');
de = de.replace('>Decline</button>', '>Ablehnen</button>');
de = de.replace('>Accept</button>', '>Akzeptieren</button>');

writeFileSync(join(WORKSPACE, 'landing-mobile-de-new.html'), de, 'utf8');
console.log('DE written to workspace');

// Size sanity check
const enKB = Math.round(en.length / 1024);
const deKB = Math.round(de.length / 1024);
console.log('EN size:', enKB + 'KB', '| DE size:', deKB + 'KB', '| min:', SIZE_MIN_KB + 'KB');

if (enKB < SIZE_MIN_KB || deKB < SIZE_MIN_KB) {
  console.error('SIZE SANITY CHECK FAILED. Refusing to deploy. Check source file.');
  process.exit(1);
}

// Deploy only with --production
if (PRODUCTION) {
  if (!existsSync(STATIC_DIR)) mkdirSync(STATIC_DIR, { recursive: true });
  writeFileSync(join(STATIC_DIR, 'landing-mobile-en.html'), en, 'utf8');
  writeFileSync(join(STATIC_DIR, 'landing-mobile-de.html'), de, 'utf8');
  console.log('Copied to', STATIC_DIR);
} else {
  console.log('Dry run complete. Run with --production to copy to project.');
}

// Verification
console.log('\n=== Verification ===');
console.log('Title fixed:', !en.includes('Mobile Preview') ? 'OK' : 'FAIL');
console.log('DE lang tag:', de.includes('lang="de"') ? 'OK' : 'FAIL');
console.log('DE hero translated:', de.includes('automatisiert') ? 'OK' : 'FAIL');
console.log('DE pricing translated:', de.includes('Jetzt starten') ? 'OK' : 'FAIL');