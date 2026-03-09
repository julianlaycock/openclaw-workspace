const fs = require('fs');
const src = 'C:\\Users\\julia\\.openclaw\\sandboxes\\caelith-project\\src\\frontend\\src\\app\\api\\landing\\landing-en.ts';
const dst = 'C:\\Users\\julia\\.openclaw\\sandboxes\\caelith-project\\src\\frontend\\src\\app\\api\\landing\\landing-de.ts';

let c = fs.readFileSync(src, 'utf8');

// Change export name
c = c.replace('export const htmlEn =', 'export const htmlDe =');

// Change lang
c = c.replace('<html lang=\\"en\\">', '<html lang=\\"de\\">');

// Use split/join for safe replaceAll
function r(find, replace) {
  c = c.split(find).join(replace);
}

// Blog links first (simple)
r('?lang=en', '?lang=de');

// GDPR -> DSGVO
r('GDPR', 'DSGVO');

// Long/specific phrases first, then shorter ones
// Title
r('Caelith — AIFMD II Compliance Platform for EU Fund Managers', 'Caelith — AIFMD II Compliance-Plattform für EU-Fondsmanager');

// Hero
r('Fund compliance, automated.', 'Fund-Compliance, automatisiert.');
r('Every decision logged, verified, and cryptographically proven', 'Jede Entscheidung protokolliert, verifiziert und kryptografisch gesichert');
r('Try the Live Demo', 'Live-Demo testen');
r('View API Docs', 'API-Dokumentation');

// AIFMD
r('Are you ready for AIFMD II?', 'Sind Sie bereit für AIFMD II?');
r('Free assessment. 3 minutes. Instant results.', 'Kostenlose Bewertung. 3 Minuten. Sofortige Ergebnisse.');
r('Take the Readiness Check', 'Zum Readiness Check');
r('Days left', 'Tage verbleibend');
r('days left', 'Tage verbleibend');

// API
r('API-first. By design.', 'API-first. Von Grund auf.');
r('Built for compliance. Engineered for speed.', 'Gebaut für Compliance. Optimiert für Geschwindigkeit.');

// FAQ
r('Common questions.', 'Häufige Fragen.');

// Nav - be specific with context where possible
r('>Sign in<', '>Anmelden<');
r('>Try Demo<', '>Demo testen<');
r('>Features<', '>Funktionen<');
r('>Platform<', '>Plattform<');
r('>Pricing<', '>Preise<');

// Feature blocks
r('Compliance Engine', 'Compliance-Engine');
r('Automated pre-trade and post-trade checks against AIFMD II rules', 'Automatisierte Pre-Trade- und Post-Trade-Prüfungen gegen AIFMD II-Regeln');
r('Automated pre- and post-trade checks against AIFMD II rules', 'Automatisierte Pre-Trade- und Post-Trade-Prüfungen gegen AIFMD II-Regeln');
r('>Audit Trail<', '>Audit-Trail<');
r('Immutable, cryptographically signed logs for every compliance decision', 'Unveränderliche, kryptografisch signierte Protokolle für jede Compliance-Entscheidung');
r('Every action cryptographically signed and stored immutably', 'Jede Aktion kryptografisch signiert und unveränderlich gespeichert');
r('Investor Portal', 'Investorenportal');
r('Real-time KYC/AML status tracking and document management', 'Echtzeit-KYC/AML-Statusverfolgung und Dokumentenmanagement');
r('Self-service portal for KYC, AML, and document management', 'Self-Service-Portal für KYC, AML und Dokumentenmanagement');
r('Regulatory Reporting', 'Regulatorisches Reporting');
r('Generate AIFMD II reports with one click', 'AIFMD II-Berichte mit einem Klick erstellen');
r('One-click AIFMD II regulatory report generation', 'AIFMD II-Regulierungsberichte mit einem Klick erstellen');
r('Risk Analytics', 'Risikoanalyse');
r('Real-time risk monitoring and limit breach alerts', 'Echtzeit-Risikoüberwachung und Limitverletzungs-Warnungen');
r('Real-time portfolio risk monitoring and limit breach alerts', 'Echtzeit-Portfolio-Risikoüberwachung und Limitverletzungs-Warnungen');
r('>API Access<', '>API-Zugang<');
r('RESTful API with webhooks for seamless integration', 'RESTful API mit Webhooks für nahtlose Integration');
r('Full REST API with webhooks for seamless integration', 'Vollständige REST-API mit Webhooks für nahtlose Integration');

// Pricing
r('$990/mo', '990 €/Monat');
r('€990/mo', '990 €/Monat');
r('$1,990/mo', '1.990 €/Monat');
r('€1,990/mo', '1.990 €/Monat');
r('from $3,500/mo', 'ab 3.500 €/Monat');
r('from €3,500/mo', 'ab 3.500 €/Monat');
r('$990', '990 €');
r('€990', '990 €');
r('$1,990', '1.990 €');
r('€1,990', '1.990 €');
r('$3,500', '3.500 €');
r('€3,500', '3.500 €');

// Pricing features
r('Up to 3 funds', 'Bis zu 3 Fonds');
r('Up to 10 funds', 'Bis zu 10 Fonds');
r('Up to 50 funds', 'Bis zu 50 Fonds');
r('Unlimited funds', 'Unbegrenzte Fonds');
r('Basic compliance checks', 'Grundlegende Compliance-Prüfungen');
r('Advanced compliance checks', 'Erweiterte Compliance-Prüfungen');
r('Full compliance suite', 'Vollständige Compliance-Suite');
r('Email support', 'E-Mail-Support');
r('Priority support', 'Prioritäts-Support');
r('Dedicated support', 'Dedizierter Support');
r('24/7 dedicated support', '24/7 dedizierter Support');
r('>API access<', '>API-Zugang<');
r('Full API access', 'Vollständiger API-Zugang');
r('Custom integrations', 'Individuelle Integrationen');
r('SSO & custom integrations', 'SSO & individuelle Integrationen');
r('SLA guarantee', 'SLA-Garantie');
r('Custom SLA', 'Individuelles SLA');
r('>Get started<', '>Jetzt starten<');
r('>Get Started<', '>Jetzt starten<');
r('>Contact us<', '>Kontakt<');
r('>Contact Us<', '>Kontakt<');
r('>Contact sales<', '>Vertrieb kontaktieren<');
r('>Contact Sales<', '>Vertrieb kontaktieren<');
r('per month', 'pro Monat');
r('>Most popular<', '>Am beliebtesten<');
r('>Most Popular<', '>Am beliebtesten<');
r('>Recommended<', '>Empfohlen<');

// FAQ
r('What is AIFMD II?', 'Was ist AIFMD II?');
r('How does Caelith help with compliance?', 'Wie hilft Caelith bei der Compliance?');
r('How long does implementation take?', 'Wie lange dauert die Implementierung?');
r('Is my data secure?', 'Sind meine Daten sicher?');
r('Can I integrate with my existing systems?', 'Kann ich meine bestehenden Systeme integrieren?');
r('What happens after the deadline?', 'Was passiert nach der Frist?');
r('Do you offer a free trial?', 'Bieten Sie eine kostenlose Testversion an?');
r('What security certifications do you have?', 'Welche Sicherheitszertifizierungen haben Sie?');

// FAQ answers - common patterns
r('AIFMD II is the updated EU directive governing Alternative Investment Fund Managers', 'AIFMD II ist die aktualisierte EU-Richtlinie für Manager alternativer Investmentfonds');
r('The deadline for compliance is', 'Die Frist für die Compliance ist der');
r('Most teams are fully onboarded within', 'Die meisten Teams sind vollständig eingerichtet innerhalb von');
r('Yes, we offer a 14-day free trial', 'Ja, wir bieten eine 14-tägige kostenlose Testversion an');
r('We are SOC 2 Type II certified', 'Wir sind SOC 2 Typ II zertifiziert');
r('Yes. Our REST API allows', 'Ja. Unsere REST-API ermöglicht');
r('All data is encrypted at rest and in transit', 'Alle Daten werden im Ruhezustand und bei der Übertragung verschlüsselt');

// Footer
r('>All rights reserved<', '>Alle Rechte vorbehalten<');
r('All rights reserved', 'Alle Rechte vorbehalten');
r('>Privacy Policy<', '>Datenschutzrichtlinie<');
r('Privacy Policy', 'Datenschutzrichtlinie');
r('>Terms of Service<', '>Nutzungsbedingungen<');
r('Terms of Service', 'Nutzungsbedingungen');
r('>Legal<', '>Rechtliches<');
r('>Company<', '>Unternehmen<');
r('>Resources<', '>Ressourcen<');
r('>Documentation<', '>Dokumentation<');
r('>About<', '>Über uns<');
r('>Careers<', '>Karriere<');
r('>Security<', '>Sicherheit<');
r('>Changelog<', '>Änderungsprotokoll<');
r('>Product<', '>Produkt<');
r('>Solutions<', '>Lösungen<');
r('>Integrations<', '>Integrationen<');

// CTA
r('Start your free trial', 'Kostenlose Testversion starten');
r('No credit card required', 'Keine Kreditkarte erforderlich');
r('Ready to automate your compliance?', 'Bereit, Ihre Compliance zu automatisieren?');
r('Start automating compliance today', 'Starten Sie noch heute mit der Compliance-Automatisierung');
r('Join hundreds of fund managers', 'Schließen Sie sich Hunderten von Fondsmanagern an');

// Misc
r('>Learn more<', '>Mehr erfahren<');
r('>Learn More<', '>Mehr erfahren<');
r('>Read more<', '>Weiterlesen<');
r('>Read More<', '>Weiterlesen<');
r('See all features', 'Alle Funktionen ansehen');
r('Trusted by', 'Vertraut von');
r('fund managers across Europe', 'Fondsmanagern in ganz Europa');
r('>How it works<', '>So funktioniert es<');
r('>How It Works<', '>So funktioniert es<');
r('How it works', 'So funktioniert es');
r('How It Works', 'So funktioniert es');
r('Connect your fund data', 'Verbinden Sie Ihre Fondsdaten');
r('Continuous compliance monitoring', 'Kontinuierliche Compliance-Überwachung');
r('One-click regulatory reports', 'Regulierungsberichte mit einem Klick');
r('Explore the API', 'API erkunden');
r('See the docs', 'Zur Dokumentation');
r('View documentation', 'Dokumentation ansehen');
r('See documentation', 'Dokumentation ansehen');
r('Everything you need', 'Alles was Sie brauchen');
r('includes everything in', 'enthält alles aus');

// Meta description
r('AIFMD II compliance automation platform', 'AIFMD II Compliance-Automatisierungsplattform');
r('compliance automation for EU fund managers', 'Compliance-Automatisierung für EU-Fondsmanager');

fs.writeFileSync(dst, c, 'utf8');

const written = fs.readFileSync(dst, 'utf8');
console.log('First 60 chars:', written.substring(0, 60));
console.log('File size:', written.length);
console.log('Starts correctly:', written.startsWith('export const htmlDe = "'));
