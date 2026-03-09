/**
 * gen-landing-from-mobile-v2.mjs
 * Generates landing-en.html + landing-de.html from landing-mobile-v2.html
 * Usage: node gen-landing-from-mobile-v2.mjs
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const WORKSPACE = 'C:/Users/julia/openclaw-workspace';
const PROJECT = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2';
const STATIC_DIR = join(PROJECT, 'src/frontend/public/static');

let en = readFileSync(join(WORKSPACE, 'landing-mobile-v2.html'), 'utf8');

// Fix title
en = en.replace(
  '<title>Caelith — Mobile Preview v2</title>',
  '<title>Caelith — AIFMD II Compliance Platform for EU Fund Managers</title>'
);

// Add lang switcher to mobile menu (before closing div of mobile-menu)
en = en.replace(
  '<a href="/readiness-check" class="menu-cta">Readiness Check →</a>\n</div>',
  '<a href="/readiness-check" class="menu-cta">Readiness Check →</a>\n  <a href="/api/landing?lang=de" style="font-size:10px;color:rgba(255,255,255,0.3);margin-top:8px">🇩🇪 DE</a>\n</div>'
);

writeFileSync(join(WORKSPACE, 'landing-v2-en-new.html'), en, 'utf8');
console.log('✓ EN written to workspace');

// ══ DE version ══
let de = en;

de = de.replace('<html lang="en">', '<html lang="de">');
de = de.replace(
  '<title>Caelith — AIFMD II Compliance Platform for EU Fund Managers</title>',
  '<title>Caelith — AIFMD II Compliance-Plattform für europäische Fondsmanager</title>'
);

// Lang switcher: DE→EN
de = de.replace(
  '<a href="/api/landing?lang=de" style="font-size:10px;color:rgba(255,255,255,0.3);margin-top:8px">🇩🇪 DE</a>',
  '<a href="/api/landing?lang=en" style="font-size:10px;color:rgba(255,255,255,0.3);margin-top:8px">🇬🇧 EN</a>'
);

// Mobile menu links
de = de.replace('>Platform</a>', '>Plattform</a>');
de = de.replace('>Pricing</a>', '>Preise</a>');
de = de.replace('>Readiness Check →</a>', '>Readiness-Check →</a>');

// Hero
de = de.replace('AIFMD II COMPLIANCE PLATFORM', 'AIFMD II COMPLIANCE-PLATTFORM');
de = de.replace(
  'Fund compliance,<br><span class="grad">automated.</span>',
  'Fonds-Compliance,<br><span class="grad">automatisiert.</span>'
);
de = de.replace(
  'Every decision logged, verified, and cryptographically proven — before your regulator asks.',
  'Jede Entscheidung dokumentiert, verifiziert und kryptographisch bewiesen — bevor die Aufsicht fragt.'
);
de = de.replace('Free Readiness Check <span class="arrow">→</span>', 'Kostenloser Readiness-Check <span class="arrow">→</span>');
de = de.replace('Try the Copilot <span class="arrow">→</span>', 'Copilot testen <span class="arrow">→</span>');
de = de.replace('✓ ESMA XSD-validated', '✓ ESMA-XSD-validiert');
de = de.replace('✓ EU hosted', '✓ EU-gehostet');
de = de.replace('✓ Open source core', '✓ Open-Source-Kern');

// Features
de = de.replace('>Capabilities</div>', '>Leistungen</div>');
de = de.replace(
  'Built for compliance.<br><span class="grad">Engineered for speed.</span>',
  'Gebaut für Compliance.<br><span class="grad">Entwickelt für Geschwindigkeit.</span>'
);
de = de.replace('Ready for <strong>AIFMD II</strong>? Free assessment. 3 minutes.', 'Bereit für <strong>AIFMD II</strong>? Kostenlose Bewertung. 3 Minuten.');
de = de.replace('days until enforcement →', 'Tage bis zur Durchsetzung →');
de = de.replace('Take the Readiness Check →', 'Readiness-Check starten →');

// Feature cards
de = de.replace('>Rules Engine</h3>', '>Regelwerk</h3>');
de = de.replace('13 rules across AIFMD II, KAGB, ELTIF 2.0. Real-time classification.', '13 Regeln für AIFMD II, KAGB, ELTIF 2.0. Echtzeit-Klassifizierung.');
de = de.replace('>Audit Trail</h3>', '>Audit-Trail</h3>');
de = de.replace('SHA-256 hashed &amp; chained. Tamper-proof, regulator-ready.', 'SHA-256-gehasht &amp; verkettet. Manipulationssicher, prüfungsbereit.');
de = de.replace('>Annex IV Reporting</h3>', '>Annex IV Reporting</h3>');
de = de.replace('XSD-validated XML. One-click export for BaFin, CSSF, FMA.', 'XSD-validierte XML. Ein-Klick-Export für BaFin, CSSF, FMA.');
de = de.replace('>Sanctions Screening</h3>', '>Sanktionsprüfung</h3>');
de = de.replace('6,863 EU &amp; UN entities. Fuzzy matching, real-time.', '6.863 EU- &amp; UN-Einträge. Fuzzy-Matching, Echtzeit.');
de = de.replace('>LEI Verification</h3>', '>LEI-Verifizierung</h3>');
de = de.replace('GLEIF API validation. Auto-verify investor identity.', 'GLEIF-API-Validierung. Automatische Identitätsprüfung.');
de = de.replace('Auto-generate MiFID, ESG, Cost templates. 43+ fields.', 'Automatische Erstellung von MiFID-, ESG-, Kostenvorlagen. 43+ Felder.');

// Platform
de = de.replace('>The Platform</div>', '>Die Plattform</div>');
de = de.replace('See it in action.<br><span class="grad">No signup required.</span>', 'Live erleben.<br><span class="grad">Ohne Registrierung.</span>');
de = de.replace('Best on desktop or tablet', 'Optimal auf Desktop oder Tablet');
de = de.replace('>Interactive Dashboard Demo</h4>', '>Interaktive Dashboard-Demo</h4>');
de = de.replace('Explore compliance checks, audit trails, and Annex IV generation with live data.', 'Compliance-Checks, Audit-Trails und Annex-IV-Generierung mit Live-Daten erkunden.');
de = de.replace('Free Readiness Check →', 'Kostenloser Readiness-Check →');
de = de.replace('Try the Copilot →', 'Copilot testen →');

// Comparison
de = de.replace('>Why Caelith</div>', '>Warum Caelith</div>');
de = de.replace('<span class="grad">€180K</span> manual.<br>Or <span class="grad">€11,880</span> automated.', '<span class="grad">€180K</span> manuell.<br>Oder <span class="grad">€11.880</span> automatisiert.');
de = de.replace('>Time to audit</div>', '>Zeit bis zum Audit</div>');
de = de.replace('>2–4 weeks</div>', '>2–4 Wochen</div>');
de = de.replace('>&lt; 4 min</div>', '>&lt; 4 Min.</div>');
de = de.replace('>Error rate</div>', '>Fehlerquote</div>');
de = de.replace('>Human-dependent</div>', '>Menschenabhängig</div>');
de = de.replace('>Frameworks</div>', '>Frameworks</div>');
de = de.replace('>Audit evidence</div>', '>Audit-Nachweis</div>');
de = de.replace('>Screenshots</div>', '>Screenshots</div>');
de = de.replace('>Annual cost</div>', '>Jährliche Kosten</div>');
de = de.replace('>~€180,000</div>', '>~€180.000</div>');

// API
de = de.replace('>For Developers</div>', '>Für Entwickler</div>');
de = de.replace('API-first. <span class="grad">By design.</span>', 'API-first. <span class="grad">By Design.</span>');
de = de.replace('Full REST API with OpenAPI docs. Integrate compliance into your stack.', 'Vollständige REST-API mit OpenAPI-Dokumentation. Compliance in Ihren Stack integrieren.');
de = de.replace('View API Docs →', 'API-Dokumentation →');

// Pricing
de = de.replace('>Pricing</div>', '>Preise</div>');
de = de.replace('Simple pricing.<br><span class="grad">No surprises.</span>', 'Einfache Preise.<br><span class="grad">Keine Überraschungen.</span>');
de = de.replace('93% cheaper than compliance consulting.', '93% günstiger als Compliance-Beratung.');
de = de.replace('>Essentials</div>', '>Essentials</div>');
de = de.replace('>Up to 3 funds</div>', '>Bis zu 3 Fonds</div>');
de = de.replace('>Professional</div>', '>Professional</div>');
de = de.replace('>Multiple funds</div>', '>Mehrere Fonds</div>');
de = de.replace('>Enterprise</div>', '>Enterprise</div>');
de = de.replace('>Large AIFMs</div>', '>Große AIFMs</div>');
de = de.replace('>Email support</li>', '>E-Mail-Support</li>');
de = de.replace('>Priority support</li>', '>Prioritäts-Support</li>');
de = de.replace('>Dedicated account manager</li>', '>Persönlicher Account Manager</li>');
de = de.replace(/Get started →/g, 'Jetzt starten →');
de = de.replace(/Contact sales →/g, 'Vertrieb kontaktieren →');
de = de.replace(/Book demo/g, 'Demo buchen');

// Trust
de = de.replace('Guides & <span class="grad">insights.</span>', 'Leitfäden & <span class="grad">Einblicke.</span>');
de = de.replace('>TECHNICAL GUIDE</div>', '>TECHNISCHER LEITFADEN</div>');
de = de.replace('>COMPLIANCE GUIDE</div>', '>COMPLIANCE-LEITFADEN</div>');
de = de.replace('>Annex IV XML: Complete Guide</h3>', '>Annex IV XML: Vollständiger Leitfaden</h3>');
de = de.replace('Schema, field mapping, validation rules for ESMA reporting.', 'Schema, Feldzuordnung, Validierungsregeln für ESMA Reporting.');
de = de.replace('>EU Sanctions Screening</h3>', '>EU-Sanktionsprüfung</h3>');
de = de.replace('Real-time screening against 6,863 EU &amp; UN entities.', 'Echtzeit-Screening gegen 6.863 EU- &amp; UN-Einträge.');

// CTA + FAQ
de = de.replace('days until</div>', 'Tage bis</div>');
de = de.replace('>AIFMD II enforcement</div>', '>AIFMD II Durchsetzung</div>');
de = de.replace(
  'After April 16,<br>non-compliance is a fine.',
  'Nach dem 16. April<br>ist Nicht-Compliance ein Bußgeld.'
);
de = de.replace('Try the platform — no signup, no credit card.', 'Testen Sie die Plattform — ohne Registrierung, ohne Kreditkarte.');
de = de.replace('Free Readiness Check →', 'Kostenloser Readiness-Check →');
de = de.replace('Or email', 'Oder per E-Mail');
de = de.replace('Common questions.', 'Häufige Fragen.');
de = de.replace('What frameworks does Caelith cover?', 'Welche Frameworks deckt Caelith ab?');
de = de.replace('Can I try without signing up?', 'Kann ich ohne Registrierung testen?');
de = de.replace('Yes. The Readiness Check and Compliance Copilot are available instantly. The full dashboard demo is best on desktop or tablet.', 'Ja. Readiness Check und Compliance Copilot sind sofort verfügbar. Das vollständige Dashboard ist optimal auf Desktop oder Tablet.');
de = de.replace('Do you have an API?', 'Gibt es eine API?');
de = de.replace('Full REST API with OpenAPI/Swagger docs. Versioned routes, API key auth. Available on Professional and Enterprise. Core library is open source on npm.', 'Vollständige REST-API mit OpenAPI/Swagger-Dokumentation. Versionierte Routen, API-Key-Authentifizierung. Verfügbar in Professional und Enterprise. Core-Bibliothek Open Source auf npm.');
de = de.replace('What are EMT/EET/EPT?', 'Was sind EMT/EET/EPT?');
de = de.replace('European MiFID Template, ESG Template, and Cost Template — standardized data exchange formats. Caelith auto-generates them with 43+ fields.', 'European MiFID Template, ESG Template und Cost Template — standardisierte Datenaustauschformate. Caelith generiert sie automatisch mit 43+ Feldern.');
de = de.replace('When does AIFMD II take effect?', 'Wann tritt AIFMD II in Kraft?');
de = de.replace('April 16, 2026. Fund managers must be fully compliant by this date.', '16. April 2026. Fondsmanager müssen bis zu diesem Datum vollständig konform sein.');
de = de.replace('Is my data secure?', 'Sind meine Daten sicher?');
de = de.replace('EU-hosted (Frankfurt), end-to-end encryption, GDPR compliant. Enterprise can opt for on-premise deployment.', 'EU-gehostet (Frankfurt), Ende-zu-Ende-Verschlüsselung, DSGVO-konform. Enterprise kann On-Premise wählen.');

// Footer
de = de.replace('Compliance platform for European fund managers.', 'Compliance-Plattform für europäische Fondsmanager.');
de = de.replace('>Product</h4>', '>Produkt</h4>');
de = de.replace('>Resources</h4>', '>Ressourcen</h4>');
de = de.replace('>Legal</h4>', '>Rechtliches</h4>');
de = de.replace('>Connect</h4>', '>Kontakt</h4>');
de = de.replace('>Privacy</a>', '>Datenschutz</a>');
de = de.replace('>Terms</a>', '>AGB</a>');
de = de.replace('>Imprint</a>', '>Impressum</a>');
de = de.replace('>Email</a>', '>E-Mail</a>');

// Cookie
de = de.replace('We use analytics to improve the experience.', 'Wir verwenden Analysen zur Verbesserung der Nutzererfahrung.');
de = de.replace('>Decline</button>', '>Ablehnen</button>');
de = de.replace('>Accept</button>', '>Akzeptieren</button>');

// Save DE to workspace
writeFileSync(join(WORKSPACE, 'landing-v2-de-new.html'), de, 'utf8');
console.log('✓ DE written to workspace');

// Copy to project static dir
if (!existsSync(STATIC_DIR)) {
  mkdirSync(STATIC_DIR, { recursive: true });
}
writeFileSync(join(STATIC_DIR, 'landing-en.html'), en, 'utf8');
writeFileSync(join(STATIC_DIR, 'landing-de.html'), de, 'utf8');
console.log('✓ Both copied to', STATIC_DIR);

// Verify
console.log('\n═══ Verification ═══');
console.log('EN size:', Math.round(en.length/1024)+'KB');
console.log('DE size:', Math.round(de.length/1024)+'KB');
console.log('Title fixed:', en.includes('Mobile Preview v2') ? '❌' : '✅');
console.log('DE lang tag:', de.includes('lang="de"') ? '✅' : '❌');
console.log('DE hero translated:', de.includes('automatisiert') ? '✅' : '❌');
console.log('DE pricing translated:', de.includes('Jetzt starten') ? '✅' : '❌');
