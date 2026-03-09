$c = Get-Content 'C:\Users\julia\.openclaw\sandboxes\caelith-project\src\frontend\src\app\api\landing\landing-de.ts' -Raw
$idx = $c.IndexOf('hero-sub')
if ($idx -gt 0) {
    $start = [Math]::Max(0, $idx - 300)
    Write-Host $c.Substring($start, 500)
}
