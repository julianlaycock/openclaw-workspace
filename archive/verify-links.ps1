$en = Get-Content 'C:\Users\julia\.openclaw\sandboxes\caelith-project\src\frontend\src\app\api\landing\landing-en.ts' -Raw
# Find any remaining /dashboard that's NOT /demo-dashboard
$matches = [regex]::Matches($en, '(?<!demo-)/dashboard')
Write-Host "EN remaining /dashboard refs (non-demo): $($matches.Count)"
foreach ($m in $matches) {
    $start = [Math]::Max(0, $m.Index - 40)
    $len = [Math]::Min(80, $en.Length - $start)
    Write-Host "  ...$($en.Substring($start, $len))..."
}
