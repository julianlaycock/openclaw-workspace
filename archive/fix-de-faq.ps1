$f = 'C:\Users\julia\.openclaw\sandboxes\caelith-project\src\frontend\src\app\api\landing\landing-de.ts'
$c = Get-Content $f -Raw -Encoding UTF8

# FAQ - use simple string replace instead of regex
$c = $c.Replace('What regulatory frameworks does Caelith cover?', 'Welche regulatorischen Rahmenwerke deckt Caelith ab?')
$c = $c.Replace('AIFMD II, KAGB (including A1(19)), ELTIF 2.0, RAIF Law, SIF Law, and MiFID II provisions. 13 rules across 6 frameworks. Annex IV XML validated against ESMA XSD Rev 6 v1.2.', 'AIFMD II, KAGB (einschlie'+[char]0x00DF+'lich A1(19)), ELTIF 2.0, RAIF-Gesetz, SIF-Gesetz und MiFID II. 13 Regeln '+[char]0x00FC+'ber 6 Rahmenwerke. Annex IV XML validiert gegen ESMA XSD Rev 6 v1.2.')
$c = $c.Replace('Can I try Caelith without signing up?', 'Kann ich Caelith ohne Registrierung testen?')
$c = $c.Replace('Yes. The full demo is available at', 'Ja. Die vollst'+[char]0x00E4+'ndige Demo ist verf'+[char]0x00FC+'gbar unter')
$c = $c.Replace('no account, no credit card, no forms. Explore the dashboard, run compliance checks, and generate reports immediately.', 'kein Konto, keine Kreditkarte, keine Formulare. Erkunden Sie das Dashboard, f'+[char]0x00FC+'hren Sie Compliance-Pr'+[char]0x00FC+'fungen durch und erstellen Sie sofort Berichte.')
$c = $c.Replace('Do you have an API?', 'Haben Sie eine API?')
$c = $c.Replace('Yes. Full REST API with OpenAPI/Swagger documentation at /api/docs. Versioned routes (/api/v1/*), API key authentication. Available on Professional and Enterprise plans. The core Annex IV library (open-annex-iv) is open source on npm.', 'Ja. Vollst'+[char]0x00E4+'ndige REST API mit OpenAPI/Swagger-Dokumentation unter /api/docs. Versionierte Routen (/api/v1/*), API-Key-Authentifizierung. Verf'+[char]0x00FC+'gbar in Professional- und Enterprise-Pl'+[char]0x00E4+'nen. Die Annex IV-Kernbibliothek (open-annex-iv) ist Open Source auf npm.')
$c = $c.Replace('What are EMT/EET/EPT templates?', 'Was sind EMT/EET/EPT-Templates?')
$c = $c.Replace('European MiFID Template (EMT), ESG Template (EET), and Cost Template (EPT) are standardized regulatory data exchange formats. Caelith auto-generates these from your fund data with 43+ fields pre-filled.', 'European MiFID Template (EMT), ESG Template (EET) und Cost Template (EPT) sind standardisierte regulatorische Datenaustauschformate. Caelith generiert diese automatisch aus Ihren Fondsdaten mit 43+ vorausgef'+[char]0x00FC+'llten Feldern.')
$c = $c.Replace('How does the audit trail work?', 'Wie funktioniert der Audit Trail?')
$c = $c.Replace('Every decision is stored as a block with SHA-256 hash linked to the previous block. Any modification is immediately detectable', 'Jede Entscheidung wird als Block mit SHA-256-Hash gespeichert, der mit dem vorherigen Block verkn'+[char]0x00FC+'pft ist. Jede '+[char]0x00C4+'nderung ist sofort erkennbar')
$c = $c.Replace('tamper-evident by design.', 'manipulationssicher by Design.')
$c = $c.Replace('When does AIFMD II take effect?', 'Wann tritt AIFMD II in Kraft?')
$c = $c.Replace('April 16, 2026. Fund managers must be fully compliant by this date.', 'Am 16. April 2026. Fondsmanager m'+[char]0x00FC+'ssen bis zu diesem Datum vollst'+[char]0x00E4+'ndig compliant sein.')
$c = $c.Replace('Is my data secure?', 'Sind meine Daten sicher?')
$c = $c.Replace('EU-hosted infrastructure (Frankfurt), end-to-end encryption, GDPR compliant. Data never leaves the EU. Enterprise customers can opt for on-premise deployment.', 'EU-gehostete Infrastruktur (Frankfurt), Ende-zu-Ende-Verschl'+[char]0x00FC+'sselung, DSGVO-konform. Daten verlassen niemals die EU. Enterprise-Kunden k'+[char]0x00F6+'nnen On-Premise-Deployment w'+[char]0x00E4+'hlen.')

# Copilot chat
$c = $c.Replace('Does a semi-professional investor with', 'Qualifiziert sich ein semiprofessioneller Investor mit')
$c = $c.Replace('qualify under KAGB', 'nach KAGB')
$c = $c.Replace('<strong>Yes, with conditions.</strong>', '<strong>Ja, unter Bedingungen.</strong>')
$c = $c.Replace('a semi-professional investor must commit at least', 'muss ein semiprofessioneller Investor mindestens')
$c = $c.Replace('does <strong>not</strong> meet the minimum', 'erf'+[char]0x00FC+'llt <strong>nicht</strong> das Minimum')
$c = $c.Replace('increase their commitment or qualify under a different exemption (e.g., ELTIF 2.0 with suitability assessment).', 'seine Zusage erh'+[char]0x00F6+'hen oder sich '+[char]0x00FC+'ber eine andere Ausnahme qualifizieren (z.B. ELTIF 2.0 mit Eignungspr'+[char]0x00FC+'fung).')
$c = $c.Replace('the previous', 'wurde das bisherige Minimum von')
$c = $c.Replace('minimum was <strong>removed</strong>', '<strong>abgeschafft</strong>')
$c = $c.Replace('Retail investors can now participate with <strong>no minimum</strong>, provided a suitability assessment is completed and the 10% portfolio cap is respected.', 'Privatanleger k'+[char]0x00F6+'nnen nun <strong>ohne Mindestbetrag</strong> teilnehmen, sofern eine Eignungspr'+[char]0x00FC+'fung durchgef'+[char]0x00FC+'hrt wird und die 10%-Portfolioobergrenze eingehalten wird.')
$c = $c.Replace('Ask about AIFMD II compliance...', 'Fragen Sie zur AIFMD II Compliance...')

# Platform section
$c = $c.Replace('>The Platform<', '>Die Plattform<')
$c = $c.Replace('live demo, no gates, no forms.', 'Live-Demo, keine H'+[char]0x00FC+'rden, keine Formulare.')

# How it works
$c = $c.Replace('>How it works<', '>So funktioniert es<')
$c = $c.Replace('>Capture<', '>Erfassen<')
$c = $c.Replace('Upload fund structures and investor data. Caelith auto-detects applicable frameworks across 6 jurisdictions.', 'Laden Sie Fondsstrukturen und Investorendaten hoch. Caelith erkennt automatisch anwendbare Rahmenwerke '+[char]0x00FC+'ber 6 Jurisdiktionen.')
$c = $c.Replace('>Evaluate<', '>Bewerten<')
$c = $c.Replace('Every investor classified against 13 rules in real time. Sanctions screened. LEI verified.', 'Jeder Investor wird in Echtzeit gegen 13 Regeln klassifiziert. Sanktionen gepr'+[char]0x00FC+'ft. LEI verifiziert.')
$c = $c.Replace('>Prove<', '>Beweisen<')
$c = $c.Replace('Each decision SHA-256 hashed and chained. Tamper-proof by design, regulator-ready by default.', 'Jede Entscheidung SHA-256-gehasht und verkettet. Manipulationssicher by Design, regulatorisch bereit ab Werk.')
$c = $c.Replace('>Report<', '>Berichten<')
$c = $c.Replace('Annex IV XML, EMT/EET/EPT templates, AIFMD II disclosures. XSD-validated. One click.', 'Annex IV XML, EMT/EET/EPT-Templates, AIFMD II-Offenlegungen. XSD-validiert. Ein Klick.')

# Comparison
$c = $c.Replace('>Metric<', '>Metrik<')
$c = $c.Replace('>Manual Process<', '>Manueller Prozess<')
$c = $c.Replace('>With Caelith<', '>Mit Caelith<')
$c = $c.Replace('>Time to audit<', '>Zeit bis Audit<')
$c = $c.Replace('>Human-dependent<', '>Menschenabh'+[char]0x00E4+'ngig<')
$c = $c.Replace('>Zero (deterministic)<', '>Null (deterministisch)<')
$c = $c.Replace('>Framework coverage<', '>Framework-Abdeckung<')
$c = $c.Replace('>Audit evidence<', '>Audit-Nachweis<')
$c = $c.Replace('>Screenshots & emails<', '>Screenshots & E-Mails<')
$c = $c.Replace('>Cryptographic proof (SHA-256)<', '>Kryptografischer Beweis (SHA-256)<')
$c = $c.Replace('>Template generation<', '>Template-Generierung<')
$c = $c.Replace('>Manual, error-prone<', '>Manuell, fehleranf'+[char]0x00E4+'llig<')
$c = $c.Replace('>Annual cost<', '>J'+[char]0x00E4+'hrliche Kosten<')
$c = $c.Replace('>Error rate<', '>Fehlerquote<')

# Open source
$c = $c.Replace('Annex IV parsing and validation library. Apache 2.0. Available on npm and GitHub.', 'Annex IV Parsing- und Validierungsbibliothek. Apache 2.0. Verf'+[char]0x00FC+'gbar auf npm und GitHub.')

# CTA
$c = $c.Replace('no signup, no credit card, no gatekeeping', 'keine Registrierung, keine Kreditkarte, kein Gatekeeping')
$c = $c.Replace('Or email', 'Oder schreiben Sie an')

# Description meta
$c = $c.Replace('AIFMD II compliance platform. XSD-validated Annex IV, real-time sanctions screening, cryptographic audit trails, developer API. Try the live demo.', 'AIFMD II Compliance-Plattform. XSD-validiertes Annex IV, Echtzeit-Sanktionspr'+[char]0x00FC+'fung, kryptografische Audit Trails, Entwickler-API. Testen Sie die Live-Demo.')

Set-Content $f -Value $c -Encoding UTF8 -NoNewline
Write-Host "Done. File size: $((Get-Item $f).Length)"
