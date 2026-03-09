$c = Get-Content 'C:\Users\julia\.openclaw\sandboxes\caelith-project\src\frontend\src\app\api\landing\landing-en.ts' -Raw
$matches = [regex]::Matches($c, '(?i)(sign.?in|login)[^"]*?"([^"]*?)"')
foreach ($m in $matches) { Write-Host $m.Value }
Write-Host "---"
# Search for /login references
$loginMatches = [regex]::Matches($c, '/login')
Write-Host "Found /login refs: $($loginMatches.Count)"
# Search for sign-in or Sign in with href context
$signMatches = [regex]::Matches($c, '.{0,80}[Ss]ign.{0,5}in.{0,80}')
foreach ($m in $signMatches) { Write-Host $m.Value }
