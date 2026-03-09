$c = Get-Content 'C:\Users\julia\.openclaw\sandboxes\caelith-project\src\frontend\src\app\api\landing\landing-de.ts' -Raw
if ($c -match 'compliance-infrastructure') { Write-Host 'v3 design' } else { Write-Host 'OLD design' }
if ($c -match 'Regulatorische Infrastruktur') { Write-Host 'has German hero' } else { Write-Host 'MISSING German hero' }
Write-Host "Length: $($c.Length)"
