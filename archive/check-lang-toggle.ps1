$en = Get-Content 'C:\Users\julia\.openclaw\sandboxes\caelith-project\src\frontend\src\app\api\landing\landing-en.ts' -Raw
if ($en -match 'lang-switch') { Write-Host 'EN: has lang-switch class' } else { Write-Host 'EN: MISSING lang-switch' }
if ($en -match 'lang=de') { Write-Host 'EN: has lang=de link' } else { Write-Host 'EN: MISSING lang=de link' }
if ($en -match 'EN.*DE') { Write-Host 'EN: has EN|DE text' } else { Write-Host 'EN: MISSING EN|DE text' }
