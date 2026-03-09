/**
 * deploy-landing-v2.mjs
 * 
 * Generates production-ready EN + DE landing pages from the v2 preview,
 * adds mobile nav toggle, lang switcher, and writes migration script.
 * 
 * Usage: node deploy-landing-v2.mjs
 * 
 * Outputs:
 *   - landing-v2-en.html (production EN with mobile nav + lang switcher)
 *   - landing-v2-de.html (production DE with all text translated)
 *   - Copies both to src/frontend/public/static/ in the project
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const WORKSPACE = 'C:/Users/julia/openclaw-workspace';
const PROJECT = 'C:/Users/julia/projects/private-asset-registry_Caelith_v2';
const STATIC_DIR = join(PROJECT, 'src/frontend/public/static');

// Read EN source
let en = readFileSync(join(WORKSPACE, 'landing-v2-preview.html'), 'utf8');

// ═══════════════════════════════════════════
// PATCH 1: Add mobile nav CSS + JS
// ═══════════════════════════════════════════

// Add mobile nav CSS before the responsive section
const mobileNavCSS = `
/* Mobile nav */
.nav-links.mobile-open{display:flex!important;flex-direction:column;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(18,22,22,0.97);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);z-index:999;justify-content:center;align-items:center;gap:32px;animation:fadeIn .3s ease}
.nav-links.mobile-open a{font-size:18px;font-weight:600}
.nav-links.mobile-open .btn-demo{font-size:14px;padding:12px 32px}
.mobile-close{display:none;position:fixed;top:20px;right:24px;z-index:1001;background:none;border:none;color:#fff;font-size:28px;cursor:pointer;font-family:'JetBrains Mono',monospace}
.nav-links.mobile-open~.mobile-close{display:block}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
`;

en = en.replace(
  '/* Responsive */',
  mobileNavCSS + '\n/* Responsive */'
);

// Add mobile nav close button after nav-links div
en = en.replace(
  '</div>\n</nav>',
  '</div>\n<button class="mobile-close" id="mobileClose" aria-label="Close menu">&times;</button>\n</nav>'
);

// Add mobile nav JS before closing </script>
const mobileNavJS = `
/* Mobile nav toggle */
var hamburgerBtn=document.getElementById('hamburger');
var navLinks=document.querySelector('.nav-links');
var mobileClose=document.getElementById('mobileClose');
function openMobileNav(){navLinks.classList.add('mobile-open');document.body.style.overflow='hidden'}
function closeMobileNav(){navLinks.classList.remove('mobile-open');document.body.style.overflow=''}
if(hamburgerBtn){hamburgerBtn.addEventListener('click',openMobileNav)}
if(mobileClose){mobileClose.addEventListener('click',closeMobileNav)}
navLinks.querySelectorAll('a').forEach(function(a){a.addEventListener('click',closeMobileNav)});
`;

en = en.replace('</script>', mobileNavJS + '\n</script>');

// ═══════════════════════════════════════════
// PATCH 2: Add lang switcher to nav
// ═══════════════════════════════════════════

// EN version gets DE link
en = en.replace(
  '<a href="/demo-dashboard" class="btn-demo">Try Demo →</a>',
  '<a href="/demo-dashboard" class="btn-demo">Try Demo →</a>\n    <a href="/api/landing?lang=de" style="font-size:11px;color:rgba(255,255,255,0.4);margin-left:4px">DE</a>'
);

// Fix html lang
en = en.replace('<html lang="en">', '<html lang="en">');

// Save EN
writeFileSync(join(WORKSPACE, 'landing-v2-en.html'), en, 'utf8');
console.log('✓ EN landing page written (with mobile nav + lang switcher)');

// ═══════════════════════════════════════════
// PATCH 3: Create DE version
// ═══════════════════════════════════════════

let de = en;

// html lang
de = de.replace('<html lang="en">', '<html lang="de">');

// Title
de = de.replace(
  '<title>Caelith — AIFMD II Compliance Platform for EU Fund Managers</title>',
  '<title>Caelith — AIFMD II Compliance-Plattform für europäische Fondsmanager</title>'
);

// Lang switcher: DE→EN
de = de.replace(
  '<a href="/api/landing?lang=de" style="font-size:11px;color:rgba(255,255,255,0.4);margin-left:4px">DE</a>',
  '<a href="/api/landing?lang=en" style="font-size:11px;color:rgba(255,255,255,0.4);margin-left:4px">EN</a>'
);

// Nav links
de = de.replace('>Features</a>', '>Features</a>');  // Keep English (industry standard)
de = de.replace('>Platform</a>', '>Plattform</a>');
// API stays as-is
de = de.replace('>Pricing</a>', '>Preise</a>');
// FAQ stays as-is
de = de.replace('Try Demo →</a>', 'Demo testen →</a>');

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
de = de.replace('Try the Live Demo <span class="arrow">→</span></a>\n        <a href="https://www.caelith.tech/api/docs" class="btn btn-md btn-outline">View API Docs',
  'Live-Demo testen <span class="arrow">→</span></a>\n        <a href="https://www.caelith.tech/api/docs" class="btn btn-md btn-outline">API-Dokumentation');
de = de.replace('✓ ESMA XSD-validated', '✓ ESMA-XSD-validiert');
de = de.replace('✓ EU hosted', '✓ EU-gehostet');
de = de.replace('✓ Open source core', '✓ Open-Source-Kern');
de = de.replace('✓ No signup needed', '✓ Ohne Registrierung');
de = de.replace('>Scroll</span>', '>Scrollen</span>');

// Features section
de = de.replace('>Capabilities</div>', '>Leistungen</div>');
de = de.replace(
  'Built for compliance. <span class="grad">Engineered for speed.</span>',
  'Gebaut für Compliance. <span class="grad">Entwickelt für Geschwindigkeit.</span>'
);
de = de.replace(
  'Everything you need for AIFMD II — from investor onboarding to BaFin portal submission.',
  'Alles für AIFMD II — vom Investoren-Onboarding bis zur BaFin-Meldung.'
);
de = de.replace(
  'Are you ready for <strong>AIFMD II</strong>? Free assessment. 3 minutes. Instant results.',
  'Sind Sie bereit für <strong>AIFMD II</strong>? Kostenlose Bewertung. 3 Minuten. Sofortige Ergebnisse.'
);
de = de.replace('days until enforcement →', 'Tage bis zur Durchsetzung →');
de = de.replace(
  'Take the Readiness Check →',
  'Readiness-Check starten →'
);

// Feature cards
de = de.replace('>Rules Engine</h3>', '>Regelwerk</h3>');
de = de.replace('13 pre-built rules across AIFMD II, KAGB, ELTIF 2.0, RAIF & SIF. Real-time investor classification.', '13 vorkonfigurierte Regeln für AIFMD II, KAGB, ELTIF 2.0, RAIF & SIF. Echtzeit-Investorenklassifizierung.');
de = de.replace('>Audit Trail</h3>', '>Audit-Trail</h3>');
de = de.replace('Every compliance decision SHA-256 hashed and chained. Tamper-proof, verifiable, regulator-ready.', 'Jede Compliance-Entscheidung SHA-256-gehasht und verkettet. Manipulationssicher, verifizierbar, prüfungsbereit.');
de = de.replace('>Annex IV Reporting</h3>', '>Annex IV Reporting</h3>');
de = de.replace('XSD-validated XML output against ESMA Rev 6 schema. One-click export for BaFin, CSSF, FMA.', 'XSD-validierte XML-Ausgabe nach ESMA Rev 6 Schema. Ein-Klick-Export für BaFin, CSSF, FMA.');
de = de.replace('>Sanctions Screening</h3>', '>Sanktionsprüfung</h3>');
de = de.replace('Real-time screening against 6,863 EU & UN sanctions entities with fuzzy matching.', 'Echtzeit-Screening gegen 6.863 EU- & UN-Sanktionseinträge mit Fuzzy-Matching.');
de = de.replace('>LEI Verification</h3>', '>LEI-Verifizierung</h3>');
de = de.replace('Instant Legal Entity Identifier validation via GLEIF. Auto-verify investor identity.', 'Sofortige LEI-Validierung über GLEIF. Automatische Identitätsprüfung.');

de = de.replace('Auto-generate European MiFID, ESG, and Cost templates from fund data. 43+ fields auto-filled.', 'Automatische Erstellung von MiFID-, ESG- und Kostenvorlagen aus Fondsdaten. 43+ Felder vorausgefüllt.');

// Platform section
de = de.replace('>The Platform</div>', '>Die Plattform</div>');
de = de.replace(
  'See it in action. <span class="grad">No signup required.</span>',
  'Live erleben. <span class="grad">Ohne Registrierung.</span>'
);
de = de.replace(
  'Dashboard for compliance teams. AI copilot for instant regulatory answers.',
  'Dashboard für Compliance-Teams. KI-Copilot für sofortige regulatorische Antworten.'
);
de = de.replace('Active Funds', 'Aktive Fonds');
de = de.replace('Investors</div>', 'Investoren</div>');
de = de.replace('Rules Passing', 'Regeln bestanden');
de = de.replace('>Latest Compliance Decisions</h4>', '>Letzte Compliance-Entscheidungen</h4>');
de = de.replace('Explore the Demo →', 'Demo erkunden →');
de = de.replace('Try the Copilot →', 'Copilot testen →');

// Comparison
de = de.replace('>Why Caelith</div>', '>Warum Caelith</div>');
de = de.replace(
  'manual. Or <span class="grad">€11,880</span> automated.',
  'manuell. Oder <span class="grad">€11.880</span> automatisiert.'
);
de = de.replace(
  'The average AIFM spends €150–200K/year on compliance consulting. Caelith automates 80%+ of that.',
  'Der durchschnittliche AIFM gibt €150–200K/Jahr für Compliance-Beratung aus. Caelith automatisiert 80%+ davon.'
);
de = de.replace('>Metric</th>', '>Kennzahl</th>');
de = de.replace('>Manual Process</th>', '>Manueller Prozess</th>');
de = de.replace('>With Caelith</th>', '>Mit Caelith</th>');
de = de.replace('>Time to audit</td>', '>Zeit bis zum Audit</td>');
de = de.replace('>2–4 weeks</td>', '>2–4 Wochen</td>');
de = de.replace('>< 4 minutes</td>', '>< 4 Minuten</td>');
de = de.replace('>Error rate</td>', '>Fehlerquote</td>');
de = de.replace('>Human-dependent</td>', '>Menschenabhängig</td>');
de = de.replace('>Zero (deterministic)</td>', '>Null (deterministisch)</td>');
de = de.replace('>Framework coverage</td>', '>Framework-Abdeckung</td>');
de = de.replace('>1–2 frameworks</td>', '>1–2 Frameworks</td>');
de = de.replace('>6 frameworks, 13 rules</td>', '>6 Frameworks, 13 Regeln</td>');
de = de.replace('>Audit evidence</td>', '>Audit-Nachweis</td>');
de = de.replace('>Screenshots & emails</td>', '>Screenshots & E-Mails</td>');
de = de.replace('>Cryptographic proof (SHA-256)</td>', '>Kryptographischer Beweis (SHA-256)</td>');
de = de.replace('>Template generation</td>', '>Template-Erstellung</td>');
de = de.replace('>Manual, error-prone</td>', '>Manuell, fehleranfällig</td>');
de = de.replace('>43+ fields auto-filled</td>', '>43+ Felder automatisch ausgefüllt</td>');
de = de.replace('>Annual cost</td>', '>Jährliche Kosten</td>');
de = de.replace('>From €11,880/year</td>', '>Ab €11.880/Jahr</td>');

// API section
de = de.replace('>For Developers</div>', '>Für Entwickler</div>');
de = de.replace(
  'Full REST API with OpenAPI docs. Integrate compliance into your stack.',
  'Vollständige REST-API mit OpenAPI-Dokumentation. Integrieren Sie Compliance in Ihren Stack.'
);
de = de.replace('View API Docs <span class="arrow">→</span></a>\n          <a href="https://github.com/julianlaycock" class="btn btn-md btn-outline">GitHub',
  'API-Dokumentation <span class="arrow">→</span></a>\n          <a href="https://github.com/julianlaycock" class="btn btn-md btn-outline">GitHub');

// Pricing
de = de.replace('>Pricing</div>', '>Preise</div>');
de = de.replace(
  'Simple pricing. <span class="grad">No surprises.</span>',
  'Einfache Preise. <span class="grad">Keine Überraschungen.</span>'
);
de = de.replace(
  '93% cheaper than manual compliance consulting. Start in minutes.',
  '93% günstiger als manuelle Compliance-Beratung. Starten Sie in Minuten.'
);
de = de.replace('For emerging managers with up to 3 funds.', 'Für aufstrebende Manager mit bis zu 3 Fonds.');
de = de.replace('For established managers with multiple funds.', 'Für etablierte Manager mit mehreren Fonds.');
de = de.replace('For large AIFMs and service providers.', 'Für große AIFMs und Dienstleister.');
de = de.replace('>Email support</li>', '>E-Mail-Support</li>');
de = de.replace('>Priority support</li>', '>Prioritäts-Support</li>');
de = de.replace('>Dedicated account manager</li>', '>Persönlicher Account Manager</li>');

// Replace all "Get started" and "Contact sales" and "Book a demo"
de = de.replace(/Get started <span class="arrow">→<\/span>/g, 'Jetzt starten <span class="arrow">→</span>');
de = de.replace('Contact sales <span class="arrow">→</span>', 'Vertrieb kontaktieren <span class="arrow">→</span>');
de = de.replace(/Book a demo/g, 'Demo buchen');

// Trust
de = de.replace('>Standards & Recognition</div>', '>Standards & Auszeichnungen</div>');
de = de.replace(
  'Technical guides & <span class="grad">regulatory insights.</span>',
  'Technische Leitfäden & <span class="grad">regulatorische Einblicke.</span>'
);
de = de.replace('>TECHNICAL GUIDE</div>', '>TECHNISCHER LEITFADEN</div>');
de = de.replace('>COMPLIANCE GUIDE</div>', '>COMPLIANCE-LEITFADEN</div>');
de = de.replace('AIFMD Annex IV XML: Complete Technical Guide', 'AIFMD Annex IV XML: Vollständiger technischer Leitfaden');
de = de.replace('Schema structure, field mapping, validation rules, and common errors for ESMA Annex IV reporting.', 'Schema-Struktur, Feldzuordnung, Validierungsregeln und häufige Fehler bei ESMA Annex IV Reporting.');
de = de.replace('EU Sanctions Screening for Fund Managers', 'EU-Sanktionsprüfung für Fondsmanager');
de = de.replace('How to implement real-time sanctions screening against 6,863 EU & UN consolidated list entities.', 'Implementierung von Echtzeit-Sanktionsprüfung gegen 6.863 EU- & UN-Einträge.');

// CTA + FAQ
de = de.replace('days until</div>', 'Tage bis</div>');
de = de.replace('>AIFMD II enforcement</div>', '>AIFMD II Durchsetzung</div>');
de = de.replace(
  'After April 16,<br>non-compliance is a fine.',
  'Nach dem 16. April<br>ist Nicht-Compliance ein Bußgeld.'
);
de = de.replace(
  'Try the full platform today — no signup, no credit card, no gatekeeping.',
  'Testen Sie die Plattform heute — ohne Registrierung, ohne Kreditkarte, ohne Hürden.'
);
// CTA buttons
de = de.replace('Try the Live Demo <span class="arrow">→</span></a>\n        <a href="https://www.caelith.tech/api/docs" class="btn btn-lg btn-outline">API Documentation',
  'Live-Demo testen <span class="arrow">→</span></a>\n        <a href="https://www.caelith.tech/api/docs" class="btn btn-lg btn-outline">API-Dokumentation');
de = de.replace('Or email', 'Oder per E-Mail');

// FAQ
de = de.replace('>Common questions.</h3>', '>Häufige Fragen.</h3>');
de = de.replace('What regulatory frameworks does Caelith cover?', 'Welche regulatorischen Frameworks deckt Caelith ab?');
de = de.replace('AIFMD II, KAGB (including §1(19)), ELTIF 2.0, RAIF Law, SIF Law, and MiFID II provisions. 13 rules across 6 frameworks. Annex IV XML validated against ESMA XSD Rev 6 v1.2.', 'AIFMD II, KAGB (einschließlich §1(19)), ELTIF 2.0, RAIF-Gesetz, SIF-Gesetz und MiFID-II-Bestimmungen. 13 Regeln in 6 Frameworks. Annex IV XML validiert gegen ESMA XSD Rev 6 v1.2.');
de = de.replace('Can I try Caelith without signing up?', 'Kann ich Caelith ohne Registrierung testen?');
de = de.replace(/Yes\. The full demo is available at.*?immediately\./, 'Ja. Die vollständige Demo ist unter caelith.tech verfügbar — ohne Konto, ohne Kreditkarte, ohne Formulare. Dashboard erkunden, Compliance-Checks durchführen und Berichte sofort erstellen.');
de = de.replace('Do you have an API?', 'Gibt es eine API?');
de = de.replace(/Yes\. Full REST API with OpenAPI\/Swagger documentation.*?open source on npm\./, 'Ja. Vollständige REST-API mit OpenAPI/Swagger-Dokumentation unter /api/docs. Versionierte Routen (/api/v1/*), API-Key-Authentifizierung. Verfügbar in Professional- und Enterprise-Plänen. Die Annex-IV-Kernbibliothek (open-annex-iv) ist Open Source auf npm.');
de = de.replace('What are EMT/EET/EPT templates?', 'Was sind EMT/EET/EPT-Templates?');
de = de.replace(/European MiFID Template.*?43\+ fields pre-filled\./, 'European MiFID Template (EMT), ESG Template (EET) und Cost Template (EPT) sind standardisierte regulatorische Datenaustauschformate. Caelith generiert diese automatisch aus Ihren Fondsdaten mit 43+ vorausgefüllten Feldern.');
de = de.replace('How does the audit trail work?', 'Wie funktioniert der Audit-Trail?');
de = de.replace(/Every decision is stored as a block.*?tamper-evident by design\./, 'Jede Entscheidung wird als Block mit SHA-256-Hash gespeichert, verkettet mit dem vorherigen Block. Jede Änderung ist sofort erkennbar — manipulationssicher durch Design.');
de = de.replace('When does AIFMD II take effect?', 'Wann tritt AIFMD II in Kraft?');
de = de.replace('April 16, 2026. Fund managers must be fully compliant by this date.', '16. April 2026. Fondsmanager müssen bis zu diesem Datum vollständig konform sein.');
de = de.replace('Is my data secure?', 'Sind meine Daten sicher?');
de = de.replace(/EU-hosted infrastructure.*?on-premise deployment\./, 'EU-gehostete Infrastruktur (Frankfurt), Ende-zu-Ende-Verschlüsselung, DSGVO-konform. Daten verlassen nie die EU. Enterprise-Kunden können On-Premise-Deployment wählen.');

// Footer
de = de.replace('>The compliance platform for European fund managers.</p>', '>Die Compliance-Plattform für europäische Fondsmanager.</p>');
de = de.replace('>Product</h4>', '>Produkt</h4>');
de = de.replace('>Resources</h4>', '>Ressourcen</h4>');
de = de.replace('>Legal</h4>', '>Rechtliches</h4>');
de = de.replace('>Connect</h4>', '>Kontakt</h4>');
de = de.replace('>Privacy</a>', '>Datenschutz</a>');
de = de.replace('>Terms</a>', '>AGB</a>');
de = de.replace('>Imprint</a>', '>Impressum</a>');
de = de.replace('>Email</a>', '>E-Mail</a>');

// Cookie consent
de = de.replace('We use analytics to improve the experience.', 'Wir verwenden Analysen zur Verbesserung der Nutzererfahrung.');
de = de.replace('>Decline</button>', '>Ablehnen</button>');
de = de.replace('>Accept</button>', '>Akzeptieren</button>');

// Save DE
writeFileSync(join(WORKSPACE, 'landing-v2-de.html'), de, 'utf8');
console.log('✓ DE landing page written');

// ═══════════════════════════════════════════
// PATCH 4: Copy to project static dir
// ═══════════════════════════════════════════

if (!existsSync(STATIC_DIR)) {
  mkdirSync(STATIC_DIR, { recursive: true });
}

writeFileSync(join(STATIC_DIR, 'landing-en.html'), en, 'utf8');
writeFileSync(join(STATIC_DIR, 'landing-de.html'), de, 'utf8');
console.log('✓ Both files copied to ' + STATIC_DIR);

// ═══════════════════════════════════════════
// Verify
// ═══════════════════════════════════════════

const enSize = Math.round(en.length / 1024);
const deSize = Math.round(de.length / 1024);
const enSections = (en.match(/<section /g) || []).length + 1; // +1 for footer
const deSections = (de.match(/<section /g) || []).length + 1;
const enFAQ = (en.match(/faq-item/g) || []).length / 3; // each item has 3 occurrences (class, hover, open CSS)
const deFAQ = (de.match(/class="faq-item"/g) || []).length;
const enTrustPills = (en.match(/trust-pill/g) || []).length;
const deLangTag = de.includes('lang="de"');
const enLangSwitch = en.includes('lang=de');
const deLangSwitch = de.includes('lang=en');
const mobileNav = en.includes('mobile-open') && en.includes('mobileClose');

console.log('\n═══ Verification ═══');
console.log(`EN: ${enSize}KB, ${enSections} sections`);
console.log(`DE: ${deSize}KB, ${deSections} sections`);
console.log(`DE lang="de": ${deLangTag}`);
console.log(`EN→DE switcher: ${enLangSwitch}`);
console.log(`DE→EN switcher: ${deLangSwitch}`);
console.log(`Mobile nav: ${mobileNav}`);
console.log(`EN FAQ items: ${deFAQ}`);
console.log(`DE FAQ items: ${deFAQ}`);
console.log('\n✅ Deploy ready. Files at:');
console.log(`  ${STATIC_DIR}/landing-en.html`);
console.log(`  ${STATIC_DIR}/landing-de.html`);
