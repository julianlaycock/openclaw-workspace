$file = 'C:\Users\julia\.openclaw\sandboxes\caelith-project\src\frontend\src\app\api\landing\landing-en.ts'
$content = Get-Content $file -Raw

# 1. Credentials badge - add after GDPR compliant badge
$old1 = 'GDPR compliant (DPA, Art. 15/17/20)</div>'
$new1 = 'GDPR compliant (DPA, Art. 15/17/20)</div>\n    <div class=\"credential-badge\"><span class=\"credential-icon\">\u2713</span> ESMA XSD-validated XML</div>'
if ($content.Contains($old1)) {
    $content = $content.Replace($old1, $new1)
    Write-Output "1. Credentials badge: OK"
} else { Write-Output "1. Credentials badge: NOT FOUND" }

# 2. Regulatory reporting feature card - description
$old2 = 'Generate Annex IV reports, AIFMD II disclosures, and cross-border marketing notifications automatically. Export-ready for BaFin, CSSF, FMA, and AMF.</p>\n          <div class=\"feature-code\">report: annex_iv_q4_2025<br>status: generated<br>entities: 14 funds, 2,847 investors<br>findings: 3 breaches (auto-resolved)<br>export: [PDF, XML, XBRL]</div>'
$new2 = 'Generate Annex IV reports, AIFMD II disclosures, and cross-border marketing notifications automatically. XML output is validated against ESMA\u2019s official AIFMD_DATAIF_V1.2.xsd schema (Rev 6), ensuring BaFin MVP-Portal compatibility. Export-ready for BaFin, CSSF, FMA, and AMF.</p>\n          <div class=\"feature-code\">report: annex_iv_q1_2025<br>schema: ESMA AIFMD_DATAIF_V1.2.xsd \u2713<br>validation: 0 errors<br>status: ready for BaFin MVP-Portal<br>export: [PDF, XML]</div>'
if ($content.Contains($old2)) {
    $content = $content.Replace($old2, $new2)
    Write-Output "2. Regulatory reporting: OK"
} else { Write-Output "2. Regulatory reporting: NOT FOUND" }

# 3. Trust bar
$old3 = 'hosted (Frankfurt)</div>\n    \n  </div>\n</section>'
$new3 = 'hosted (Frankfurt)</div>\n    <div class=\"trust-item\"><span class=\"trust-num\">\u2713</span> ESMA XSD-validated</div>\n  </div>\n</section>'
if ($content.Contains($old3)) {
    $content = $content.Replace($old3, $new3)
    Write-Output "3. Trust bar: OK"
} else { Write-Output "3. Trust bar: NOT FOUND" }

Set-Content $file -Value $content -NoNewline
Write-Output "Done EN"
