# Fix EN landing page - change all /dashboard links to /demo-dashboard
$f = 'C:\Users\julia\.openclaw\sandboxes\caelith-project\src\frontend\src\app\api\landing\landing-en.ts'
$c = Get-Content $f -Raw -Encoding UTF8

# Count occurrences before
$before = ([regex]::Matches($c, 'caelith\.tech/dashboard')).Count
$before2 = ([regex]::Matches($c, 'href=\\"\/dashboard')).Count
Write-Host "EN before: $before absolute + $before2 relative /dashboard links"

# Replace absolute URLs
$c = $c.Replace('https://www.caelith.tech/dashboard', '/demo-dashboard')

# Replace relative /dashboard hrefs (but NOT /demo-dashboard)
# Be careful not to double-replace
$c = $c.Replace('href=\"/dashboard\"', 'href=\"/demo-dashboard\"')

$after = ([regex]::Matches($c, '/demo-dashboard')).Count
Write-Host "EN after: $after /demo-dashboard links"

Set-Content $f -Value $c -Encoding UTF8 -NoNewline
Write-Host "EN done. Size: $((Get-Item $f).Length)"

# Fix DE landing page
$f2 = 'C:\Users\julia\.openclaw\sandboxes\caelith-project\src\frontend\src\app\api\landing\landing-de.ts'
$c2 = Get-Content $f2 -Raw -Encoding UTF8

$before3 = ([regex]::Matches($c2, 'caelith\.tech/dashboard')).Count
$before4 = ([regex]::Matches($c2, 'href=\\"\/dashboard')).Count
Write-Host "DE before: $before3 absolute + $before4 relative /dashboard links"

$c2 = $c2.Replace('https://www.caelith.tech/dashboard', '/demo-dashboard')
$c2 = $c2.Replace('href=\"/dashboard\"', 'href=\"/demo-dashboard\"')

$after2 = ([regex]::Matches($c2, '/demo-dashboard')).Count
Write-Host "DE after: $after2 /demo-dashboard links"

Set-Content $f2 -Value $c2 -Encoding UTF8 -NoNewline
Write-Host "DE done. Size: $((Get-Item $f2).Length)"
