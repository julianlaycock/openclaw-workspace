try {
    $r = Invoke-WebRequest -Uri 'http://localhost:3000/api/readiness-check' -UseBasicParsing -TimeoutSec 10
    Write-Host "Status: $($r.StatusCode)"
    Write-Host "Length: $($r.Content.Length)"
} catch {
    Write-Host "Error: $_"
}
