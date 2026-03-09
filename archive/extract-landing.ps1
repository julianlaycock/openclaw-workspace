$c = Get-Content 'C:\Users\julia\.openclaw\sandboxes\caelith-project\src\frontend\src\app\api\landing\landing-en.ts' -Raw
# Extract key sections
Write-Output "=== FILE LENGTH ==="
Write-Output $c.Length

Write-Output "`n=== STYLE SECTION (first 3000 chars after <style>) ==="
$styleStart = $c.IndexOf('<style>')
if ($styleStart -ge 0) {
    Write-Output $c.Substring($styleStart, [Math]::Min(3000, $c.Length - $styleStart))
}

Write-Output "`n=== NAVBAR SECTION ==="
$navStart = $c.IndexOf('<nav')
if ($navStart -ge 0) {
    $navEnd = $c.IndexOf('</nav>', $navStart) + 6
    Write-Output $c.Substring($navStart, [Math]::Min($navEnd - $navStart, 2000))
}

Write-Output "`n=== HERO SECTION (first 2000 chars after hero) ==="  
$heroStart = $c.IndexOf('hero')
if ($heroStart -ge 0) {
    Write-Output $c.Substring([Math]::Max(0, $heroStart - 100), [Math]::Min(2000, $c.Length - $heroStart + 100))
}

Write-Output "`n=== CLOSING TAGS (last 2000 chars) ==="
Write-Output $c.Substring($c.Length - 2000)
