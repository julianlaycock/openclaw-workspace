$c = Get-Content 'C:\Users\julia\.openclaw\sandboxes\caelith-project\src\frontend\src\app\api\landing\landing-en.ts' -Raw
# Get 300 chars around "Sign in"
$idx = $c.IndexOf('Sign in')
if ($idx -gt 0) {
    $start = [Math]::Max(0, $idx - 200)
    $len = [Math]::Min(400, $c.Length - $start)
    Write-Host $c.Substring($start, $len)
}
