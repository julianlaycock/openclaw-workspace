$dir = 'C:\Users\julia\.openclaw\sandboxes\caelith-project\src\frontend\src\app\api\landing'
$en = Get-Content "$dir\landing-en.ts" -Raw

# Credentials badges
$patterns = @('GDPR compliant', 'BaFin-compliant', 'Regulatory reporting', 'Under the hood', 'compliance rules', 'regulatory frameworks', 'EU hosted', 'What regulatory frameworks')
foreach ($p in $patterns) {
    $idx = $en.IndexOf($p)
    if ($idx -gt 0) {
        $start = [Math]::Max(0, $idx - 150)
        $len = [Math]::Min(400, $en.Length - $start)
        Write-Output "=== EN: '$p' at $idx ==="
        Write-Output $en.Substring($start, $len)
        Write-Output ""
    } else {
        Write-Output "=== EN: '$p' NOT FOUND ==="
    }
}

$de = Get-Content "$dir\landing-de.ts" -Raw
$patterns_de = @('DSGVO-konform', 'BaFin-konform', 'Regulatorisches Reporting', 'Unter der Haube', 'Compliance-Regeln', 'regulatorische Rahmenwerke', 'EU-gehostet', 'Welche regulatorischen Rahmenwerke')
foreach ($p in $patterns_de) {
    $idx = $de.IndexOf($p)
    if ($idx -gt 0) {
        $start = [Math]::Max(0, $idx - 150)
        $len = [Math]::Min(400, $de.Length - $start)
        Write-Output "=== DE: '$p' at $idx ==="
        Write-Output $de.Substring($start, $len)
        Write-Output ""
    } else {
        Write-Output "=== DE: '$p' NOT FOUND ==="
    }
}
