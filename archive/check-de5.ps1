$c = Get-Content 'C:\Users\julia\.openclaw\sandboxes\caelith-project\src\frontend\src\app\api\landing\landing-de.ts' -Raw
$idx = $c.IndexOf('Fund compliance')
if ($idx -gt 0) { Write-Host "Found English hero at $idx" } else { Write-Host "No English hero" }
$idx2 = $c.IndexOf('Fondsmanager')
if ($idx2 -gt 0) { 
    $start = [Math]::Max(0, $idx2 - 100)
    Write-Host $c.Substring($start, 300)
}
