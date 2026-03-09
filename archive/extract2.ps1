$dir = 'C:\Users\julia\.openclaw\sandboxes\caelith-project\src\frontend\src\app\api\landing'

# Get more context for regulatory reporting EN
$en = Get-Content "$dir\landing-en.ts" -Raw
$idx = $en.IndexOf('Regulatory reporting')
Write-Output "=== EN Regulatory reporting full card ==="
Write-Output $en.Substring($idx - 50, 800)
Write-Output ""

# DE regulatory reporting
$de = Get-Content "$dir\landing-de.ts" -Raw
$idx = $de.IndexOf('Regulatorisches Reporting')
Write-Output "=== DE Regulatorisches Reporting full card ==="
Write-Output $de.Substring($idx - 50, 800)
Write-Output ""

# DE FAQ
$patterns = @('Welche regulatorischen', 'regulatorischen Rahmenwerke deckt', 'Welche Rahmenwerke', 'FAQ', 'faq-block')
foreach ($p in $patterns) {
    $idx = $de.IndexOf($p)
    if ($idx -gt 0) {
        Write-Output "=== DE: '$p' at $idx ==="
        Write-Output $de.Substring([Math]::Max(0,$idx-50), 500)
        Write-Output ""
    }
}

# EN FAQ full
$idx = $en.IndexOf('What regulatory frameworks')
Write-Output "=== EN FAQ full ==="
Write-Output $en.Substring($idx, 600)
