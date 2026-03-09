$f = 'C:\Users\julia\.openclaw\sandboxes\caelith-project\src\frontend\src\app\api\landing\landing-de.ts'
$c = Get-Content $f -Raw -Encoding UTF8

# Copilot section
$c = $c -replace 'Ask anything about', 'Fragen Sie alles \u00fcber'
$c = $c -replace 'Your AI compliance advisor\. Get instant answers on regulatory requirements, investor classification, reporting obligations, and more .{1,5} in English or German\.', 'Ihr KI-Compliance-Berater. Erhalten Sie sofortige Antworten zu regulatorischen Anforderungen, Investorenklassifizierung, Meldepflichten und mehr \u2014 auf Deutsch oder Englisch.'
$c = $c -replace '>Try the Copilot <', '>Copilot testen <'
$c = $c -replace 'Does a semi-professional investor with', 'Qualifiziert sich ein semiprofessioneller Investor mit'
$c = $c -replace '150K qualify under KAGB', '150K nach KAGB'
$c = $c -replace '<strong>Yes, with conditions\.</strong>', '<strong>Ja, unter Bedingungen.</strong>'
$c = $c -replace 'a semi-professional investor must commit at least', 'muss ein semiprofessioneller Investor mindestens'
$c = $c -replace 'so .{1,10}150K alone does <strong>not</strong> meet the minimum', 'daher erf\u00fcllen \u20ac150K allein <strong>nicht</strong> das Minimum'
$c = $c -replace "They'd need to increase their commitment or qualify under a different exemption", 'Der Investor m\u00fcsste seine Zusage erh\u00f6hen oder sich \u00fcber eine andere Ausnahme qualifizieren'
$c = $c -replace "What about ELTIF 2\.0 .{1,5} what's the minimum there\?", 'Was ist mit ELTIF 2.0 \u2014 wie hoch ist dort das Minimum?'
$c = $c -replace 'the previous .{1,10}10,000 minimum was <strong>removed</strong>', 'wurde das bisherige Minimum von \u20ac10.000 <strong>abgeschafft</strong>'
$c = $c -replace 'Retail investors can now participate with <strong>no minimum</strong>, provided a suitability assessment is completed and the 10% portfolio cap is respected\.', 'Privatanleger k\u00f6nnen nun <strong>ohne Mindestbetrag</strong> teilnehmen, sofern eine Eignungspr\u00fcfung durchgef\u00fchrt wird und die 10%-Portfolioobergrenze eingehalten wird.'
$c = $c -replace 'Ask about AIFMD II compliance\.\.\.', 'Fragen Sie zur AIFMD II Compliance...'
$c = $c -replace 'Compliance Copilot', 'Compliance-Copilot'

# FAQ questions
$c = $c -replace 'What regulatory frameworks does Caelith cover\?', 'Welche regulatorischen Rahmenwerke deckt Caelith ab?'
$c = $c -replace 'AIFMD II, KAGB \(including A1\(19\)\), ELTIF 2\.0, RAIF Law, SIF Law, and MiFID II provisions\. 13 rules across 6 frameworks\. Annex IV XML validated against ESMA XSD Rev 6 v1\.2\.', 'AIFMD II, KAGB (einschlie\u00dflich A1(19)), ELTIF 2.0, RAIF-Gesetz, SIF-Gesetz und MiFID II-Bestimmungen. 13 Regeln \u00fcber 6 Rahmenwerke. Annex IV XML validiert gegen ESMA XSD Rev 6 v1.2.'
$c = $c -replace 'Can I try Caelith without signing up\?', 'Kann ich Caelith ohne Registrierung testen?'
$c = $c -replace 'Yes\. The full demo is available at', 'Ja. Die vollst\u00e4ndige Demo ist verf\u00fcgbar unter'
$c = $c -replace 'no account, no credit card, no forms\. Explore the dashboard, run compliance checks, and generate reports immediately\.', 'kein Konto, keine Kreditkarte, keine Formulare. Erkunden Sie das Dashboard, f\u00fchren Sie Compliance-Pr\u00fcfungen durch und erstellen Sie sofort Berichte.'
$c = $c -replace 'Do you have an API\?', 'Haben Sie eine API?'
$c = $c -replace 'Yes\. Full REST API with OpenAPI/Swagger documentation at /api/docs\. Versioned routes \(/api/v1/\*\), API key authentication\. Available on Professional and Enterprise plans\. The core Annex IV library \(open-annex-iv\) is open source on npm\.', 'Ja. Vollst\u00e4ndige REST API mit OpenAPI/Swagger-Dokumentation unter /api/docs. Versionierte Routen (/api/v1/*), API-Key-Authentifizierung. Verf\u00fcgbar in Professional- und Enterprise-Pl\u00e4nen. Die Annex IV-Kernbibliothek (open-annex-iv) ist Open Source auf npm.'
$c = $c -replace 'What are EMT/EET/EPT templates\?', 'Was sind EMT/EET/EPT-Templates?'
$c = $c -replace 'European MiFID Template \(EMT\), ESG Template \(EET\), and Cost Template \(EPT\) are standardized regulatory data exchange formats\. Caelith auto-generates these from your fund data with 43\+ fields pre-filled\.', 'European MiFID Template (EMT), ESG Template (EET) und Cost Template (EPT) sind standardisierte regulatorische Datenaustauschformate. Caelith generiert diese automatisch aus Ihren Fondsdaten mit 43+ vorausgef\u00fcllten Feldern.'
$c = $c -replace 'How does the audit trail work\?', 'Wie funktioniert der Audit Trail?'
$c = $c -replace 'Every decision is stored as a block with SHA-256 hash linked to the previous block\. Any modification is immediately detectable .{1,5} tamper-evident by design\.', 'Jede Entscheidung wird als Block mit SHA-256-Hash gespeichert, der mit dem vorherigen Block verkn\u00fcpft ist. Jede \u00c4nderung ist sofort erkennbar \u2014 manipulationssicher by Design.'
$c = $c -replace 'When does AIFMD II take effect\?', 'Wann tritt AIFMD II in Kraft?'
$c = $c -replace 'April 16, 2026\. Fund managers must be fully compliant by this date\.', 'Am 16. April 2026. Fondsmanager m\u00fcssen bis zu diesem Datum vollst\u00e4ndig compliant sein.'
$c = $c -replace 'Is my data secure\?', 'Sind meine Daten sicher?'
$c = $c -replace 'EU-hosted infrastructure \(Frankfurt\), end-to-end encryption, GDPR compliant\. Data never leaves the EU\. Enterprise customers can opt for on-premise deployment\.', 'EU-gehostete Infrastruktur (Frankfurt), Ende-zu-Ende-Verschl\u00fcsselung, DSGVO-konform. Daten verlassen niemals die EU. Enterprise-Kunden k\u00f6nnen On-Premise-Deployment w\u00e4hlen.'

# Platform section
$c = $c -replace '>The Platform<', '>Die Plattform<'
$c = $c -replace 'See it in action\. <span class=\\"grad grad-line\\">No signup required\.', 'Sehen Sie es in Aktion. <span class=\"grad grad-line\">Keine Registrierung erforderlich.'
$c = $c -replace 'live demo, no gates, no forms\.', 'Live-Demo, keine H\u00fcrden, keine Formulare.'

# How it works
$c = $c -replace '>How it works<', '>So funktioniert es<'
$c = $c -replace 'Four steps to <span class=\\"grad grad-line\\">audit-ready\.', 'Vier Schritte zur <span class=\"grad grad-line\">Audit-Bereitschaft.'
$c = $c -replace '>Capture<', '>Erfassen<'
$c = $c -replace 'Upload fund structures and investor data\. Caelith auto-detects applicable frameworks across 6 jurisdictions\.', 'Laden Sie Fondsstrukturen und Investorendaten hoch. Caelith erkennt automatisch anwendbare Rahmenwerke \u00fcber 6 Jurisdiktionen.'
$c = $c -replace '>Evaluate<', '>Bewerten<'
$c = $c -replace 'Every investor classified against 13 rules in real time\. Sanctions screened\. LEI verified\.', 'Jeder Investor wird in Echtzeit gegen 13 Regeln klassifiziert. Sanktionen gepr\u00fcft. LEI verifiziert.'
$c = $c -replace '>Prove<', '>Beweisen<'
$c = $c -replace 'Each decision SHA-256 hashed and chained\. Tamper-proof by design, regulator-ready by default\.', 'Jede Entscheidung SHA-256-gehasht und verkettet. Manipulationssicher by Design, regulatorisch bereit ab Werk.'
$c = $c -replace '>Report<', '>Berichten<'
$c = $c -replace 'Annex IV XML, EMT/EET/EPT templates, AIFMD II disclosures\. XSD-validated\. One click\.', 'Annex IV XML, EMT/EET/EPT-Templates, AIFMD II-Offenlegungen. XSD-validiert. Ein Klick.'

# Comparison table
$c = $c -replace '>Metric<', '>Metrik<'
$c = $c -replace '>Manual Process<', '>Manueller Prozess<'
$c = $c -replace '>With Caelith<', '>Mit Caelith<'
$c = $c -replace '>Time to audit<', '>Zeit bis zum Audit<'
$c = $c -replace '>2.{1,3}4 weeks<', '>2\u20134 Wochen<'
$c = $c -replace '>Error rate<', '>Fehlerquote<'
$c = $c -replace '>Human-dependent<', '>Menschenabh\u00e4ngig<'
$c = $c -replace '>Zero \(deterministic\)<', '>Null (deterministisch)<'
$c = $c -replace '>Framework coverage<', '>Framework-Abdeckung<'
$c = $c -replace '>1.{1,3}2 frameworks<', '>1\u20132 Frameworks<'
$c = $c -replace '>Audit evidence<', '>Audit-Nachweis<'
$c = $c -replace '>Screenshots & emails<', '>Screenshots & E-Mails<'
$c = $c -replace '>Cryptographic proof \(SHA-256\)<', '>Kryptografischer Beweis (SHA-256)<'
$c = $c -replace '>Template generation<', '>Template-Generierung<'
$c = $c -replace '>Manual, error-prone<', '>Manuell, fehleranf\u00e4llig<'
$c = $c -replace '>Annual cost<', '>J\u00e4hrliche Kosten<'

# CTA
$c = $c -replace 'no signup, no credit card, no gatekeeping', 'keine Registrierung, keine Kreditkarte, kein Gatekeeping'
$c = $c -replace '>Try the Live Demo <', '>Live-Demo testen <'
$c = $c -replace '>API Documentation <', '>API-Dokumentation <'
$c = $c -replace 'Or email', 'Oder schreiben Sie an'

# Readiness banner
$c = $c -replace 'Are you ready for', 'Sind Sie bereit f\u00fcr'
$c = $c -replace '<strong>Free assessment\.</strong> 3 minutes\. Instant results\.', '<strong>Kostenlose Bewertung.</strong> 3 Minuten. Sofortige Ergebnisse.'
$c = $c -replace '>Take the Readiness Check <', '>Zum Readiness Check <'

# Why Caelith
$c = $c -replace '>Why Caelith<', '>Warum Caelith<'

# Open source
$c = $c -replace 'Annex IV parsing and validation library\. Apache 2\.0\. Available on npm and GitHub\.', 'Annex IV Parsing- und Validierungsbibliothek. Apache 2.0. Verf\u00fcgbar auf npm und GitHub.'

# Resources
$c = $c -replace '> RESOURCES<', '> RESSOURCEN<'
$c = $c -replace 'Technical guides &amp; <span class=\\"grad\\">regulatory insights\.', 'Technische Leitf\u00e4den &amp; <span class=\"grad\">regulatorische Einblicke.'

# Days left
$c = $c -replace 'Days left', 'Tage verbleibend'
$c = $c -replace "to AIFMD II'", "bis AIFMD II'"

# Description meta
$c = $c -replace 'content=\"AIFMD II compliance platform\. XSD-validated Annex IV, real-time sanctions screening, cryptographic audit trails, developer API\. Try the live demo\.\"', 'content=\"AIFMD II Compliance-Plattform. XSD-validiertes Annex IV, Echtzeit-Sanktionspr\u00fcfung, kryptografische Audit Trails, Entwickler-API. Testen Sie die Live-Demo.\"'

Set-Content $f -Value $c -Encoding UTF8 -NoNewline
Write-Host "Done. File size: $((Get-Item $f).Length)"
