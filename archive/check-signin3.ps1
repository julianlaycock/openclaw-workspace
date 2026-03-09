$c = Get-Content 'C:\Users\julia\.openclaw\sandboxes\caelith-project\src\frontend\src\app\api\landing\landing-en.ts' -Raw
# Find all href near "Sign in" or "sign"
$idx = $c.IndexOf('Sign in')
$start = [Math]::Max(0, $idx - 100)
Write-Host $c.Substring($start, 200)
