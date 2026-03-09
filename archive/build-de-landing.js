const fs = require('fs');

let html = fs.readFileSync('C:\\Users\\julia\\openclaw-workspace\\redesign-concepts\\v3-option-b.html', 'utf8');

// 1. Change lang
html = html.replace('<html lang="en">', '<html lang="de">');

// 2. Title & meta
html = html.replace(
  '<title>Caelith — AIFMD II Compliance Platform for EU Fund Managers</title>',
  '<title>Caelith — AIFMD II Compliance-Plattform für EU-Fondsmanager</title>'
);
html = html.replace(
  '<meta name="description" content="AIFMD II compliance platform. XSD-validated Annex IV, real-time sanctions screening, cryptographic audit trails, developer API. Try the live demo.">',
  '<meta name="description" content="AIFMD II Compliance-Plattform. XSD-validiertes Annex IV, Echtzeit-Sanktionsprüfung, kryptografische Audit Trails, Entwickler-API. Jetzt Demo testen.">'
);

// 3. Nav links
html = html.replace('>Features</a>', '>Funktionen</a>');
html = html.replace('>Platform</a>', '>Plattform</a>');
html = html.replace('>Pricing</a>', '>Preise</a>');
html = html.replace('Try Demo <span', 'Demo testen <span');

// 4. Hero section
html = html.replace('AIFMD II COMPLIANCE PLATFORM', 'AIFMD II COMPLIANCE-PLATTFORM');
html = html.replace('Fund compliance,<br><span class="grad">automated.</span>', 'Fondscompliance,<br><span class="grad">automatisiert.</span>');
html = html.replace('Every decision logged, verified, and cryptographically proven — before your regulator asks.', 'Jede Entscheidung protokolliert, verifiziert und kryptografisch bewiesen — bevor die Aufsicht fragt.');
html = html.replace('>Try the Live Demo <span class="arrow">→</span></a>', '>Live-Demo testen <span class="arrow">→</span></a>');
html = html.replace('>View API Docs <span class="arrow">→</span></a>', '>API-Dokumentation <span class="arrow">→</span></a>');
html = html.replace('<span>✓ ESMA XSD-validated</span>', '<span>✓ ESMA XSD-validiert</span>');
html = html.replace('<span>✓ EU hosted</span>', '<span>✓ EU-gehostet</span>');
html = html.replace('<span>✓ Open source core</span>', '<span>✓ Open-Source-Kern</span>');
html = html.replace('<span>✓ No signup needed</span>', '<span>✓ Keine Registrierung nötig</span>');

// Terminal
html = html.replace('caelith — compliance evaluation', 'caelith — Compliance-Auswertung');
html = html.replace('<span>Scroll</span>', '<span>Scrollen</span>');

// 5. Readiness banner
html = html.replace('Are you ready for <span class="grad">AIFMD II</span>?', 'Sind Sie bereit für <span class="grad">AIFMD II</span>?');
html = html.replace('<strong>Free assessment.</strong> 3 minutes. Instant results.', '<strong>Kostenlose Bewertung.</strong> 3 Minuten. Sofortige Ergebnisse.');
html = html.replace('Take the Readiness Check <span', 'Jetzt Readiness-Check starten <span');

// 6. API section
html = html.replace('FOR DEVELOPERS', 'FÜR ENTWICKLER');
html = html.replace('API-first.<br><span class="grad grad-line">By design.</span>', 'API-first.<br><span class="grad grad-line">By Design.</span>');
html = html.replace('Full REST API with OpenAPI/Swagger documentation. Integrate compliance checks, fund data, and regulatory reporting directly into your systems.', 'Vollständige REST-API mit OpenAPI/Swagger-Dokumentation. Integrieren Sie Compliance-Prüfungen, Fondsdaten und regulatorisches Reporting direkt in Ihre Systeme.');
html = html.replace('<li>Versioned routes (/api/v1/*)</li>', '<li>Versionierte Routen (/api/v1/*)</li>');
html = html.replace('<li>API key authentication</li>', '<li>API-Key-Authentifizierung</li>');
html = html.replace('<li>OpenAPI/Swagger docs at /api/docs</li>', '<li>OpenAPI/Swagger-Docs unter /api/docs</li>');
html = html.replace('<li>Fund CRUD, investor management</li>', '<li>Fonds-CRUD, Investorverwaltung</li>');
html = html.replace('<li>Compliance evaluation endpoints</li>', '<li>Compliance-Auswertungs-Endpunkte</li>');
html = html.replace('<li>Annex IV generation via API</li>', '<li>Annex IV-Generierung via API</li>');
html = html.replace('>View API Docs <span class="arrow">→</span></a>', '>API-Docs ansehen <span class="arrow">→</span></a>');

// 7. Features section
html = html.replace('>Capabilities</div>', '>Funktionen</div>');
html = html.replace('Built for compliance. <span class="grad grad-line">Engineered for speed.</span>', 'Gebaut für Compliance. <span class="grad grad-line">Entwickelt für Geschwindigkeit.</span>');
html = html.replace('Everything you need for AIFMD II — from investor onboarding to BaFin portal submission, with a full developer API.', 'Alles was Sie für AIFMD II brauchen — vom Investor-Onboarding bis zur BaFin-Portal-Einreichung, mit vollständiger Entwickler-API.');

// Feature cards
html = html.replace('>Rules Engine</h3>', '>Regelwerk-Engine</h3>');
html = html.replace('13 pre-built rules across AIFMD II, KAGB, ELTIF 2.0, RAIF & SIF. Real-time investor classification and eligibility.', '13 vorkonfigurierte Regeln für AIFMD II, KAGB, ELTIF 2.0, RAIF & SIF. Echtzeit-Investorklassifizierung und Eignungsprüfung.');
html = html.replace('>13 rules · 6 frameworks · real-time</div>', '>13 Regeln · 6 Rahmenwerke · Echtzeit</div>');

html = html.replace('>Sanctions Screening</h3>', '>Sanktionsprüfung</h3>');
html = html.replace('Real-time screening against 6,863 EU & UN sanctions entities with fuzzy matching. Auto re-screening on list updates.', 'Echtzeit-Screening gegen 6.863 EU- & UN-Sanktionseinträge mit Fuzzy-Matching. Automatisches Re-Screening bei Listenaktualisierungen.');
html = html.replace('>6,863 entities · fuzzy match · EU + UN</div>', '>6.863 Einträge · Fuzzy-Match · EU + UN</div>');

html = html.replace('>Annex IV Reporting</h3>', '>Annex IV-Reporting</h3>');
html = html.replace('XSD-validated XML output against ESMA Rev 6 schema. One-click export for BaFin, CSSF, FMA, and AMF.', 'XSD-validierte XML-Ausgabe gegen ESMA Rev 6-Schema. Ein-Klick-Export für BaFin, CSSF, FMA und AMF.');

html = html.replace('>Audit Trail</h3>', '>Audit Trail</h3>');
html = html.replace('Every compliance decision SHA-256 hashed and chained. Tamper-proof, verifiable, regulator-ready.', 'Jede Compliance-Entscheidung SHA-256-gehasht und verkettet. Manipulationssicher, verifizierbar, aufsichtsbereit.');
html = html.replace('>SHA-256 · hash-chained · immutable</div>', '>SHA-256 · hash-verkettet · unveränderlich</div>');

html = html.replace('>LEI Verification</h3>', '>LEI-Verifizierung</h3>');
html = html.replace('Instant Legal Entity Identifier validation via GLEIF database. Auto-verify investor identity and corporate structure.', 'Sofortige Legal Entity Identifier-Validierung via GLEIF-Datenbank. Automatische Verifizierung von Investoridentität und Unternehmensstruktur.');
html = html.replace('>GLEIF API · real-time validation</div>', '>GLEIF API · Echtzeit-Validierung</div>');

html = html.replace('>EMT / EET / EPT Templates</h3>', '>EMT / EET / EPT-Vorlagen</h3>');
html = html.replace('Auto-generate European MiFID Template, ESG Template, and Cost Template from fund data. 43+ fields auto-filled.', 'Automatische Generierung von European MiFID Template, ESG Template und Cost Template aus Fondsdaten. 43+ Felder automatisch ausgefüllt.');
html = html.replace('>43+ fields · MiFID II · ESG reporting</div>', '>43+ Felder · MiFID II · ESG-Reporting</div>');

html = html.replace('>Compliance Copilot AI</h3>', '>Compliance Copilot KI</h3>');
html = html.replace('Locale-aware AI assistant with 80+ UI terms in EN/DE. Tool-use architecture for regulatory Q&A and workflow guidance.', 'Sprachbewusster KI-Assistent mit 80+ UI-Begriffen in EN/DE. Tool-Use-Architektur für regulatorische Fragen und Workflow-Begleitung.');
html = html.replace('>80+ terms · EN/DE · tool-use AI</div>', '>80+ Begriffe · EN/DE · Tool-Use-KI</div>');

html = html.replace('>XSD Validation</h3>', '>XSD-Validierung</h3>');
html = html.replace('Validate Annex IV XML against ESMA\'s Rev 6 v1.2 schema before submission. Catch errors before regulators do.', 'Validieren Sie Annex IV-XML gegen ESMAs Rev 6 v1.2-Schema vor der Einreichung. Fehler erkennen, bevor die Aufsicht es tut.');
html = html.replace('>ESMA Rev 6 v1.2 · pre-submission</div>', '>ESMA Rev 6 v1.2 · vor Einreichung</div>');

html = html.replace('>Developer API</h3>', '>Entwickler-API</h3>');
html = html.replace('Full REST API with OpenAPI/Swagger docs. Versioned routes, API key authentication. Integrate compliance into your stack.', 'Vollständige REST-API mit OpenAPI/Swagger-Docs. Versionierte Routen, API-Key-Authentifizierung. Integrieren Sie Compliance in Ihren Stack.');

// 8. Copilot section
html = html.replace('Ask anything about <span class="grad grad-line">AIFMD II</span>', 'Fragen Sie alles über <span class="grad grad-line">AIFMD II</span>');
html = html.replace('Your AI compliance advisor. Get instant answers on regulatory requirements, investor classification, reporting obligations, and more — in English or German.', 'Ihr KI-Compliance-Berater. Erhalten Sie sofortige Antworten zu regulatorischen Anforderungen, Investorklassifizierung, Meldepflichten und mehr — auf Englisch oder Deutsch.');
html = html.replace('>Try the Copilot <span class="arrow">→</span></a>', '>Copilot testen <span class="arrow">→</span></a>');
html = html.replace('Ask about AIFMD II compliance...', 'Fragen zur AIFMD II-Compliance stellen...');

// 9. Dashboard section
html = html.replace('>The Platform</div>', '>Die Plattform</div>');
html = html.replace('See it in action. <span class="grad grad-line">No signup required.</span>', 'Erleben Sie es in Aktion. <span class="grad grad-line">Keine Registrierung nötig.</span>');
html = html.replace(/Explore the full platform at/, 'Erkunden Sie die vollständige Plattform auf');
html = html.replace(' — live demo, no gates, no forms.', ' — Live-Demo, keine Hürden, keine Formulare.');
html = html.replace('>Active Funds</div>', '>Aktive Fonds</div>');
html = html.replace('>Investors</div>', '>Investoren</div>');
html = html.replace('>Rules Passing</div>', '>Regeln bestanden</div>');
html = html.replace('>Latest Compliance Decisions</h4>', '>Aktuelle Compliance-Entscheidungen</h4>');
html = html.replace('>Audit Hash Chain</h4>', '>Audit Hash-Kette</h4>');

// 10. Comparison section
html = html.replace('>Why Caelith</div>', '>Warum Caelith</div>');
html = html.replace('<span class="grad">€180K</span> manual. Or <span class="grad">€11,880</span> automated.', '<span class="grad">180.000 €</span> manuell. Oder <span class="grad">11.880 €</span> automatisiert.');
html = html.replace('The average AIFM spends €150–200K/year on compliance consulting. Caelith automates 80%+ of that work.', 'Der durchschnittliche AIFM gibt 150.000–200.000 €/Jahr für Compliance-Beratung aus. Caelith automatisiert 80%+ dieser Arbeit.');
html = html.replace('<th>Metric</th><th>Manual Process</th><th>With Caelith</th>', '<th>Metrik</th><th>Manueller Prozess</th><th>Mit Caelith</th>');
html = html.replace('<td>Time to audit</td><td class="old">2–4 weeks</td><td>&lt; 4 minutes</td>', '<td>Zeit bis zum Audit</td><td class="old">2–4 Wochen</td><td>&lt; 4 Minuten</td>');
html = html.replace('<td>Error rate</td><td class="old">Human-dependent</td><td>Zero (deterministic)</td>', '<td>Fehlerquote</td><td class="old">Menschenabhängig</td><td>Null (deterministisch)</td>');
html = html.replace('<td>Framework coverage</td><td class="old">1–2 frameworks</td><td>6 frameworks, 13 rules</td>', '<td>Rahmenwerk-Abdeckung</td><td class="old">1–2 Rahmenwerke</td><td>6 Rahmenwerke, 13 Regeln</td>');
html = html.replace('<td>Audit evidence</td><td class="old">Screenshots & emails</td><td>Cryptographic proof (SHA-256)</td>', '<td>Prüfungsnachweise</td><td class="old">Screenshots & E-Mails</td><td>Kryptografischer Nachweis (SHA-256)</td>');
html = html.replace('<td>Template generation</td><td class="old">Manual, error-prone</td><td>43+ fields auto-filled (EMT/EET/EPT)</td>', '<td>Template-Generierung</td><td class="old">Manuell, fehleranfällig</td><td>43+ Felder automatisch ausgefüllt (EMT/EET/EPT)</td>');
html = html.replace('<td>Annual cost</td><td class="old">~€180,000</td><td>From €11,880/year</td>', '<td>Jährliche Kosten</td><td class="old">~180.000 €</td><td>Ab 11.880 €/Jahr</td>');

// 11. Process section
html = html.replace('>How it works</div>', '>So funktioniert\'s</div>');
html = html.replace('Four steps to <span class="grad grad-line">audit-ready.</span>', 'Vier Schritte zur <span class="grad grad-line">Audit-Bereitschaft.</span>');
html = html.replace('>Capture</h4>', '>Erfassen</h4>');
html = html.replace('Upload fund structures and investor data. Caelith auto-detects applicable frameworks across 6 jurisdictions.', 'Laden Sie Fondsstrukturen und Investordaten hoch. Caelith erkennt automatisch anwendbare Rahmenwerke über 6 Jurisdiktionen.');
html = html.replace('>Evaluate</h4>', '>Auswerten</h4>');
html = html.replace('Every investor classified against 13 rules in real time. Sanctions screened. LEI verified.', 'Jeder Investor wird gegen 13 Regeln in Echtzeit klassifiziert. Sanktionen geprüft. LEI verifiziert.');
html = html.replace('>Prove</h4>', '>Beweisen</h4>');
html = html.replace('Each decision SHA-256 hashed and chained. Tamper-proof by design, regulator-ready by default.', 'Jede Entscheidung SHA-256-gehasht und verkettet. Manipulationssicher by Design, aufsichtsbereit by Default.');
html = html.replace('>Report</h4>', '>Berichten</h4>');
html = html.replace('Annex IV XML, EMT/EET/EPT templates, AIFMD II disclosures. XSD-validated. One click.', 'Annex IV-XML, EMT/EET/EPT-Vorlagen, AIFMD II-Offenlegungen. XSD-validiert. Ein Klick.');

// 12. Open source bar
html = html.replace('OPEN SOURCE CORE', 'OPEN-SOURCE-KERN');
html = html.replace('Annex IV parsing and validation library. Apache 2.0. Available on npm and GitHub.', 'Annex IV Parsing- und Validierungsbibliothek. Apache 2.0. Verfügbar auf npm und GitHub.');
html = html.replace('View on GitHub →', 'Auf GitHub ansehen →');

// 13. Pricing section
html = html.replace('>Pricing</div>\n      <h2>Simple pricing. <span class="grad grad-line">No surprises.</span></h2>', '>Preise</div>\n      <h2>Einfache Preise. <span class="grad grad-line">Keine Überraschungen.</span></h2>');
html = html.replace('93% cheaper than manual compliance consulting. Start in minutes, not months.', '93% günstiger als manuelle Compliance-Beratung. In Minuten starten, nicht Monaten.');
html = html.replace('MOST POPULAR', 'AM BELIEBTESTEN');
html = html.replace('For emerging managers with up to 3 funds.', 'Für aufstrebende Manager mit bis zu 3 Fonds.');
html = html.replace('<li>3 funds, 200 investors</li>', '<li>3 Fonds, 200 Investoren</li>');
html = html.replace('<li>Core rules engine</li>', '<li>Kern-Regelwerk-Engine</li>');
html = html.replace('<li>Full audit trail</li>', '<li>Vollständiger Audit Trail</li>');
html = html.replace('<li>EMT/EET/EPT templates</li>', '<li>EMT/EET/EPT-Vorlagen</li>');
html = html.replace('<li>Email support</li>', '<li>E-Mail-Support</li>');
html = html.replace('For established managers with multiple funds.', 'Für etablierte Manager mit mehreren Fonds.');
html = html.replace('<li>15 funds, unlimited investors</li>', '<li>15 Fonds, unbegrenzte Investoren</li>');
html = html.replace('<li>Full rules + scenario modeling</li>', '<li>Vollständige Regeln + Szenario-Modellierung</li>');
html = html.replace('<li>Annex IV reporting + XSD validation</li>', '<li>Annex IV-Reporting + XSD-Validierung</li>');
html = html.replace('<li>Sanctions screening + LEI</li>', '<li>Sanktionsprüfung + LEI</li>');
html = html.replace('<li>API access</li>', '<li>API-Zugang</li>');
html = html.replace('<li>Priority support</li>', '<li>Prioritäts-Support</li>');
html = html.replace('For large AIFMs and service providers.', 'Für große AIFMs und Dienstleister.');
html = html.replace('<li>Unlimited funds & investors</li>', '<li>Unbegrenzte Fonds & Investoren</li>');
html = html.replace('<li>Custom rule development</li>', '<li>Individuelle Regelentwicklung</li>');
html = html.replace('<li>On-premise, SSO</li>', '<li>On-Premise, SSO</li>');
html = html.replace('<li>Full API + webhooks</li>', '<li>Vollständige API + Webhooks</li>');
html = html.replace('<li>Custom integrations</li>', '<li>Individuelle Integrationen</li>');
html = html.replace('<li>Dedicated account manager</li>', '<li>Dedizierter Account Manager</li>');

// Pricing amounts - German format
html = html.replace('<div class="amount">€990<span>/mo</span></div>', '<div class="amount">990 €<span>/Monat</span></div>');
html = html.replace('<div class="amount">€1,990<span>/mo</span></div>', '<div class="amount">1.990 €<span>/Monat</span></div>');
html = html.replace('<div class="amount">From €3,500<span>/mo</span></div>', '<div class="amount">Ab 3.500 €<span>/Monat</span></div>');

// Pricing buttons
html = html.replaceAll('>Get started <span class="arrow">→</span></a>', '>Jetzt starten <span class="arrow">→</span></a>');
html = html.replaceAll('>Book a demo</a>', '>Demo buchen</a>');
html = html.replace('>Contact sales <span class="arrow">→</span></a>', '>Vertrieb kontaktieren <span class="arrow">→</span></a>');

// 14. CTA section
html = html.replace('>Days left</span>', '>Tage verbleibend</span>');
html = html.replace('until AIFMD II enforcement', 'bis zur AIFMD II-Durchsetzung');
html = html.replace('After April 16,<br>non-compliance is a fine.', 'Nach dem 16. April ist<br>Nicht-Compliance ein Bußgeld.');
html = html.replace('Try the full platform today — no signup, no credit card, no gatekeeping.', 'Testen Sie die vollständige Plattform heute — keine Registrierung, keine Kreditkarte, keine Hürden.');
html = html.replace('>Try the Live Demo <span class="arrow">→</span></a>', '>Live-Demo testen <span class="arrow">→</span></a>');
html = html.replace('>API Documentation <span class="arrow">→</span></a>', '>API-Dokumentation <span class="arrow">→</span></a>');
html = html.replace('Or email <a', 'Oder per E-Mail an <a');

// 15. FAQ
html = html.replace('>Common questions.</h2>', '>Häufig gestellte Fragen.</h2>');
html = html.replace('What regulatory frameworks does Caelith cover?', 'Welche regulatorischen Rahmenwerke deckt Caelith ab?');
html = html.replace('AIFMD II, KAGB (including A1(19)), ELTIF 2.0, RAIF Law, SIF Law, and MiFID II provisions. 13 rules across 6 frameworks. Annex IV XML validated against ESMA XSD Rev 6 v1.2.', 'AIFMD II, KAGB (einschließlich §1(19)), ELTIF 2.0, RAIF-Gesetz, SIF-Gesetz und MiFID II-Bestimmungen. 13 Regeln über 6 Rahmenwerke. Annex IV-XML validiert gegen ESMA XSD Rev 6 v1.2.');
html = html.replace('Can I try Caelith without signing up?', 'Kann ich Caelith ohne Registrierung testen?');
html = html.replace(/Yes\. The full demo is available at <a href="https:\/\/www\.caelith\.tech\/dashboard">caelith\.tech<\/a> — no account, no credit card, no forms\. Explore the dashboard, run compliance checks, and generate reports immediately\./, 'Ja. Die vollständige Demo ist unter <a href="https://www.caelith.tech/dashboard">caelith.tech</a> verfügbar — kein Konto, keine Kreditkarte, keine Formulare. Erkunden Sie das Dashboard, führen Sie Compliance-Prüfungen durch und erstellen Sie sofort Berichte.');
html = html.replace('Do you have an API?', 'Haben Sie eine API?');
html = html.replace(/Yes\. Full REST API with OpenAPI\/Swagger documentation at \/api\/docs\. Versioned routes \(\/api\/v1\/\*\), API key authentication\. Available on Professional and Enterprise plans\. The core Annex IV library \(open-annex-iv\) is open source on npm\./, 'Ja. Vollständige REST-API mit OpenAPI/Swagger-Dokumentation unter /api/docs. Versionierte Routen (/api/v1/*), API-Key-Authentifizierung. Verfügbar in Professional- und Enterprise-Plänen. Die Kern-Annex-IV-Bibliothek (open-annex-iv) ist Open Source auf npm.');
html = html.replace('What are EMT/EET/EPT templates?', 'Was sind EMT/EET/EPT-Vorlagen?');
html = html.replace('European MiFID Template (EMT), ESG Template (EET), and Cost Template (EPT) are standardized regulatory data exchange formats. Caelith auto-generates these from your fund data with 43+ fields pre-filled.', 'European MiFID Template (EMT), ESG Template (EET) und Cost Template (EPT) sind standardisierte regulatorische Datenaustauschformate. Caelith generiert diese automatisch aus Ihren Fondsdaten mit 43+ vorausgefüllten Feldern.');
html = html.replace('How does the audit trail work?', 'Wie funktioniert der Audit Trail?');
html = html.replace('Every decision is stored as a block with SHA-256 hash linked to the previous block. Any modification is immediately detectable — tamper-evident by design.', 'Jede Entscheidung wird als Block mit SHA-256-Hash gespeichert, der mit dem vorherigen Block verknüpft ist. Jede Änderung ist sofort erkennbar — manipulationssicher by Design.');
html = html.replace('When does AIFMD II take effect?', 'Wann tritt AIFMD II in Kraft?');
html = html.replace('April 16, 2026. Fund managers must be fully compliant by this date.', '16. April 2026. Fondsmanager müssen bis zu diesem Datum vollständig konform sein.');
html = html.replace('Is my data secure?', 'Sind meine Daten sicher?');
html = html.replace('EU-hosted infrastructure (Frankfurt), end-to-end encryption, GDPR compliant. Data never leaves the EU. Enterprise customers can opt for on-premise deployment.', 'EU-gehostete Infrastruktur (Frankfurt), End-to-End-Verschlüsselung, DSGVO-konform. Daten verlassen niemals die EU. Enterprise-Kunden können On-Premise-Bereitstellung wählen.');

// 16. Footer
html = html.replace('The compliance platform for European fund managers.', 'Die Compliance-Plattform für europäische Fondsmanager.');
html = html.replace('<h4>Product</h4>', '<h4>Produkt</h4>');
html = html.replace('>Features</a><a href="#platform">Platform</a>', '>Funktionen</a><a href="#platform">Plattform</a>');
html = html.replace('<h4>Resources</h4>', '<h4>Ressourcen</h4>');
html = html.replace('<h4>Legal</h4>', '<h4>Rechtliches</h4>');
html = html.replace('>Privacy</a>', '>Datenschutz</a>');
html = html.replace('>Terms</a>', '>AGB</a>');
html = html.replace('>Imprint</a>', '>Impressum</a>');
html = html.replace('<h4>Connect</h4>', '<h4>Kontakt</h4>');

// Nav countdown
html = html.replace("+'d '+String(h).padStart(2,'0')+'h to AIFMD II'", "+'T '+String(h).padStart(2,'0')+'h bis AIFMD II'");

// Terminal lines in JS
html = html.replace("t:'$ caelith evaluate --investor INV-4891 --fund FUND-01',c:'cmd'", "t:'$ caelith evaluate --investor INV-4891 --fund FUND-01',c:'cmd'");
html = html.replace("t:'Evaluating against 6 frameworks...',c:''", "t:'Auswertung gegen 6 Rahmenwerke...',c:''");
html = html.replace("t:'Result: COMPLIANT — 13/13 rules passed',c:'ok'", "t:'Ergebnis: KONFORM — 13/13 Regeln bestanden',c:'ok'");
html = html.replace("t:'EMT/EET/EPT: 43 fields auto-filled',c:'warn'", "t:'EMT/EET/EPT: 43 Felder automatisch ausgefüllt',c:'warn'");
html = html.replace("t:'Report exported → annex-iv-2026-Q1.xml',c:'cmd'", "t:'Bericht exportiert → annex-iv-2026-Q1.xml',c:'cmd'");

// Blog links: ?lang=en -> ?lang=de  (there might not be any in this file, but just in case)
html = html.replaceAll('?lang=en', '?lang=de');

// Language switcher: need to add one since v3-option-b doesn't have one
// Add lang switcher before closing </nav>
html = html.replace(
  '</div>\n</nav>\n</div>',
  '    <span style="font-family:\'JetBrains Mono\',monospace;font-size:10px;margin-left:8px"><a href="/api/landing?lang=de" style="color:#fff;font-weight:700;text-decoration:none">DE</a> <span style="color:var(--text3)">|</span> <a href="/api/landing" style="color:var(--text3);text-decoration:none">EN</a></span>\n  </div>\n</nav>\n</div>'
);

// Now convert to single-line TS
let escaped = html
  .replace(/\\/g, '\\\\')
  .replace(/"/g, '\\"')
  .replace(/\r\n/g, '\\n')
  .replace(/\n/g, '\\n')
  .replace(/\r/g, '\\n');

const tsContent = 'export const htmlDe = "' + escaped + '";\n';
fs.writeFileSync('C:\\Users\\julia\\.openclaw\\sandboxes\\caelith-project\\src\\frontend\\src\\app\\api\\landing\\landing-de.ts', tsContent, 'utf8');
console.log('Done! File size:', tsContent.length, 'bytes');
