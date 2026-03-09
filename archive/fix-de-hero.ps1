$f = 'C:\Users\julia\.openclaw\sandboxes\caelith-project\src\frontend\src\app\api\landing\landing-de.ts'
$c = Get-Content $f -Raw -Encoding UTF8

# Hero h1
$c = $c -replace 'Fund compliance,<br><span class=\\"grad\\">automated\.', 'Fund-Compliance,<br><span class=\"grad\">automatisiert.'

# Hero subtitle
$c = $c -replace 'Every decision logged, verified, and cryptographically proven .{1,5} before your regulator asks\.', 'Jede Entscheidung protokolliert, verifiziert und kryptografisch gesichert \u2014 bevor die BaFin fragt.'

# Hero CTA buttons
$c = $c -replace '>Try the Live Demo <', '>Live-Demo testen <'
$c = $c -replace '>View API Docs <', '>API-Dokumentation <'

# Hero meta
$c = $c -replace 'ESMA XSD-validated', 'ESMA XSD-validiert'
$c = $c -replace 'EU hosted', 'EU-gehostet'
$c = $c -replace 'Open source core', 'Open-Source-Kern'
$c = $c -replace 'No signup needed', 'Keine Registrierung'

# Section headers
$c = $c -replace 'Built for compliance\. <span class=\\"grad grad-line\\">Engineered for speed\.', 'Gebaut f\u00fcr Compliance. <span class=\"grad grad-line\">Optimiert f\u00fcr Geschwindigkeit.'
$c = $c -replace 'Everything you need for AIFMD II', 'Alles was Sie f\u00fcr AIFMD II brauchen'

# Comparison section
$c = $c -replace 'manual\. Or', 'manuell. Oder'
$c = $c -replace 'automated\.', 'automatisiert.'
$c = $c -replace 'The average AIFM spends', 'Der durchschnittliche AIFM gibt'

# CTA section  
$c = $c -replace 'After April 16,<br>non-compliance is a fine\.', 'Nach dem 16. April<br>ist Nichteinhaltung ein Bu\u00dfgeld.'
$c = $c -replace 'Try the full platform today', 'Testen Sie die Plattform heute'

# FAQ header
$c = $c -replace 'Common questions\.', 'H\u00e4ufige Fragen.'

# Footer
$c = $c -replace 'The compliance platform for European fund managers\.', 'Die Compliance-Plattform f\u00fcr europ\u00e4ische Fondsmanager.'

Set-Content $f -Value $c -Encoding UTF8 -NoNewline
Write-Host "Done. File size: $((Get-Item $f).Length)"
