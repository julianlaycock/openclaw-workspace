$c = Get-Content 'C:\Users\julia\.openclaw\sandboxes\caelith-project\src\frontend\src\app\api\landing\landing-de.ts' -Raw
if ($c -match 'compliance-infrastructure') { Write-Host 'v3 design' } else { Write-Host 'OLD design' }
if ($c -match 'demo-dashboard') { Write-Host 'has demo-dashboard' } else { Write-Host 'MISSING demo-dashboard' }
if ($c -match 'Regulatorische Infrastruktur') { Write-Host 'has German hero' } else { Write-Host 'MISSING German hero' }
if ($c -match 'lang=en') { Write-Host 'has lang switcher' } else { Write-Host 'MISSING lang switcher' }
