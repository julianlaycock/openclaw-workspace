$c = Get-Content 'C:\Users\julia\.openclaw\sandboxes\caelith-project\src\frontend\src\app\api\landing\landing-de.ts' -Raw
if ($c -match 'Fund-Compliance') { Write-Host 'has Fund-Compliance' } else { Write-Host 'MISSING Fund-Compliance' }
if ($c -match 'automatisiert') { Write-Host 'has automatisiert' } else { Write-Host 'MISSING automatisiert' }
if ($c -match 'Funktionen') { Write-Host 'has Funktionen' } else { Write-Host 'MISSING Funktionen' }
if ($c -match 'Anmelden') { Write-Host 'has Anmelden' } else { Write-Host 'MISSING Anmelden' }
if ($c -match 'Demo testen') { Write-Host 'has Demo testen' } else { Write-Host 'MISSING Demo testen' }
if ($c -match 'lang=de') { Write-Host 'has lang=de links' } else { Write-Host 'MISSING lang=de' }
if ($c -match 'Preise') { Write-Host 'has Preise' } else { Write-Host 'MISSING Preise' }
