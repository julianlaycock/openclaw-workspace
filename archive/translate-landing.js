const fs = require('fs');
const src = 'C:\\Users\\julia\\.openclaw\\sandboxes\\caelith-project\\src\\frontend\\src\\app\\api\\landing\\landing-en.ts';
const dst = 'C:\\Users\\julia\\.openclaw\\sandboxes\\caelith-project\\src\\frontend\\src\\app\\api\\landing\\landing-de.ts';

let c = fs.readFileSync(src, 'utf8');

// Change export name
c = c.replace('export const htmlEn =', 'export const htmlDe =');

// Change lang
c = c.replace('<html lang=\\"en\\">', '<html lang=\\"de\\">');

// Now do all text replacements. The content is a single-line string with \n and \"
// We need to be careful with the escaped quotes

const replacements = [
  // Title and meta
  ['Caelith — AIFMD II Compliance Platform for EU Fund Managers', 'Caelith — AIFMD II Compliance-Plattform für EU-Fondsmanager'],
  ['AIFMD II compliance automation', 'AIFMD II Compliance-Automatisierung'],
  
  // Nav
  ['Features', 'Funktionen'],
  ['Platform', 'Plattform'],
  ['Pricing', 'Preise'],
  ['Sign in', 'Anmelden'],
  ['Try Demo', 'Demo testen'],
  
  // Hero
  ['Fund compliance, automated.', 'Fund-Compliance, automatisiert.'],
  ['Every decision logged, verified, and cryptographically proven', 'Jede Entscheidung protokolliert, verifiziert und kryptografisch gesichert'],
  ['Try the Live Demo', 'Live-Demo testen'],
  ['View API Docs', 'API-Dokumentation'],
  
  // AIFMD countdown
  ['Are you ready for AIFMD II?', 'Sind Sie bereit für AIFMD II?'],
  ['Free assessment. 3 minutes. Instant results.', 'Kostenlose Bewertung. 3 Minuten. Sofortige Ergebnisse.'],
  ['Take the Readiness Check', 'Zum Readiness Check'],
  ['Days left', 'Tage verbleibend'],
  ['days left', 'Tage verbleibend'],
  
  // API section
  ['API-first. By design.', 'API-first. Von Grund auf.'],
  
  // Tagline
  ['Built for compliance. Engineered for speed.', 'Gebaut für Compliance. Optimiert für Geschwindigkeit.'],
  
  // FAQ
  ['Common questions.', 'Häufige Fragen.'],
  
  // Blog links
  [/\?lang=en/g, '?lang=de'],
  
  // GDPR -> DSGVO
  [/GDPR/g, 'DSGVO'],
  
  // Feature titles and descriptions - need to find them in the actual content
  ['Compliance Engine', 'Compliance-Engine'],
  ['Automated pre-trade and post-trade checks against AIFMD II rules', 'Automatisierte Pre-Trade- und Post-Trade-Prüfungen gegen AIFMD II-Regeln'],
  ['Automated pre- and post-trade checks against AIFMD II rules', 'Automatisierte Pre-Trade- und Post-Trade-Prüfungen gegen AIFMD II-Regeln'],
  ['Audit Trail', 'Audit-Trail'],
  ['Immutable, cryptographically signed logs for every compliance decision', 'Unveränderliche, kryptografisch signierte Protokolle für jede Compliance-Entscheidung'],
  ['Every action cryptographically signed and stored immutably', 'Jede Aktion kryptografisch signiert und unveränderlich gespeichert'],
  ['Investor Portal', 'Investorenportal'],
  ['Real-time KYC/AML status tracking and document management', 'Echtzeit-KYC/AML-Statusverfolgung und Dokumentenmanagement'],
  ['Self-service portal for KYC, AML, and document management', 'Self-Service-Portal für KYC, AML und Dokumentenmanagement'],
  ['Regulatory Reporting', 'Regulatorisches Reporting'],
  ['Generate AIFMD II reports with one click', 'AIFMD II-Berichte mit einem Klick erstellen'],
  ['One-click AIFMD II regulatory report generation', 'AIFMD II-Regulierungsberichte mit einem Klick erstellen'],
  ['Risk Analytics', 'Risikoanalyse'],
  ['Real-time risk monitoring and limit breach alerts', 'Echtzeit-Risikoüberwachung und Limitverletzungs-Warnungen'],
  ['Real-time portfolio risk monitoring and limit breach alerts', 'Echtzeit-Portfolio-Risikoüberwachung und Limitverletzungs-Warnungen'],
  ['API Access', 'API-Zugang'],
  ['RESTful API with webhooks for seamless integration', 'RESTful API mit Webhooks für nahtlose Integration'],
  ['Full REST API with webhooks for seamless integration', 'Vollständige REST-API mit Webhooks für nahtlose Integration'],
  
  // Pricing
  ['Starter', 'Starter'],
  ['Growth', 'Growth'],
  ['Enterprise', 'Enterprise'],
  ['$990/mo', '990 €/Monat'],
  ['€990/mo', '990 €/Monat'],
  ['$1,990/mo', '1.990 €/Monat'],
  ['€1,990/mo', '1.990 €/Monat'],
  ['from $3,500/mo', 'ab 3.500 €/Monat'],
  ['from €3,500/mo', 'ab 3.500 €/Monat'],
  ['Custom', 'Individuell'],
  ['Get started', 'Jetzt starten'],
  ['Get Started', 'Jetzt starten'],
  ['Contact us', 'Kontakt'],
  ['Contact Us', 'Kontakt'],
  ['Contact sales', 'Vertrieb kontaktieren'],
  ['Contact Sales', 'Vertrieb kontaktieren'],
  ['per month', 'pro Monat'],
  ['Per month', 'Pro Monat'],
  ['/month', '/Monat'],
  ['/mo', '/Monat'],
  
  // Pricing features
  ['Up to 3 funds', 'Bis zu 3 Fonds'],
  ['Up to 10 funds', 'Bis zu 10 Fonds'],
  ['Up to 50 funds', 'Bis zu 50 Fonds'],
  ['Unlimited funds', 'Unbegrenzte Fonds'],
  ['Basic compliance checks', 'Grundlegende Compliance-Prüfungen'],
  ['Advanced compliance checks', 'Erweiterte Compliance-Prüfungen'],
  ['Full compliance suite', 'Vollständige Compliance-Suite'],
  ['Email support', 'E-Mail-Support'],
  ['Priority support', 'Prioritäts-Support'],
  ['Dedicated support', 'Dedizierter Support'],
  ['24/7 dedicated support', '24/7 dedizierter Support'],
  ['API access', 'API-Zugang'],
  ['Full API access', 'Vollständiger API-Zugang'],
  ['Custom integrations', 'Individuelle Integrationen'],
  ['SSO & custom integrations', 'SSO & individuelle Integrationen'],
  ['SLA guarantee', 'SLA-Garantie'],
  ['Custom SLA', 'Individuelles SLA'],
  
  // FAQ questions and answers
  ['What is AIFMD II?', 'Was ist AIFMD II?'],
  ['How does Caelith help with compliance?', 'Wie hilft Caelith bei der Compliance?'],
  ['How long does implementation take?', 'Wie lange dauert die Implementierung?'],
  ['Is my data secure?', 'Sind meine Daten sicher?'],
  ['Can I integrate with my existing systems?', 'Kann ich meine bestehenden Systeme integrieren?'],
  ['What happens after the deadline?', 'Was passiert nach der Frist?'],
  
  // FAQ answers - these will be longer, need to find exact text
  ['AIFMD II is the updated EU directive governing Alternative Investment Fund Managers', 'AIFMD II ist die aktualisierte EU-Richtlinie für Manager alternativer Investmentfonds'],
  ['The deadline for compliance is', 'Die Frist für die Compliance ist der'],
  
  // Footer
  ['All rights reserved', 'Alle Rechte vorbehalten'],
  ['Privacy Policy', 'Datenschutzrichtlinie'],
  ['Terms of Service', 'Nutzungsbedingungen'],
  ['Legal', 'Rechtliches'],
  ['Company', 'Unternehmen'],
  ['Resources', 'Ressourcen'],
  ['Documentation', 'Dokumentation'],
  ['Blog', 'Blog'],
  ['About', 'Über uns'],
  ['Careers', 'Karriere'],
  ['Security', 'Sicherheit'],
  ['Status', 'Status'],
  ['Changelog', 'Änderungsprotokoll'],
  ['Support', 'Support'],
  ['Product', 'Produkt'],
  ['Solutions', 'Lösungen'],
  ['Integrations', 'Integrationen'],
  
  // CTA
  ['Start your free trial', 'Kostenlose Testversion starten'],
  ['No credit card required', 'Keine Kreditkarte erforderlich'],
  ['Ready to automate your compliance?', 'Bereit, Ihre Compliance zu automatisieren?'],
  ['Start automating compliance today', 'Starten Sie noch heute mit der Compliance-Automatisierung'],
  ['Join hundreds of fund managers', 'Schließen Sie sich Hunderten von Fondsmanagern an'],
  
  // Misc
  ['Learn more', 'Mehr erfahren'],
  ['Learn More', 'Mehr erfahren'],
  ['Read more', 'Weiterlesen'],
  ['Read More', 'Weiterlesen'],
  ['See all features', 'Alle Funktionen ansehen'],
  ['Trusted by', 'Vertraut von'],
  ['fund managers across Europe', 'Fondsmanagern in ganz Europa'],
  ['How it works', 'So funktioniert es'],
  ['How It Works', 'So funktioniert es'],
  ['Step 1', 'Schritt 1'],
  ['Step 2', 'Schritt 2'],
  ['Step 3', 'Schritt 3'],
  ['Connect', 'Verbinden'],
  ['Monitor', 'Überwachen'],
  ['Report', 'Berichten'],
  ['Connect your fund data', 'Verbinden Sie Ihre Fondsdaten'],
  ['Continuous compliance monitoring', 'Kontinuierliche Compliance-Überwachung'],
  ['One-click regulatory reports', 'Regulierungsberichte mit einem Klick'],
  ['Explore the API', 'API erkunden'],
  ['See documentation', 'Dokumentation ansehen'],
  ['See the docs', 'Zur Dokumentation'],
  ['View documentation', 'Dokumentation ansehen'],
  ['Everything you need', 'Alles was Sie brauchen'],
  ['Most popular', 'Am beliebtesten'],
  ['Most Popular', 'Am beliebtesten'],
  ['Recommended', 'Empfohlen'],
  ['includes everything in', 'enthält alles aus'],
  ['plus:', 'plus:'],
];

for (const [find, replace] of replacements) {
  if (find instanceof RegExp) {
    c = c.replace(find, replace);
  } else {
    // Replace all occurrences
    while (c.includes(find)) {
      c = c.replace(find, replace);
    }
  }
}

fs.writeFileSync(dst, c, 'utf8');

// Verify
const written = fs.readFileSync(dst, 'utf8');
console.log('First 60 chars:', written.substring(0, 60));
console.log('File size:', written.length);
