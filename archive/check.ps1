try {
    $r = Invoke-WebRequest -Uri 'http://localhost:3000/api/landing' -UseBasicParsing -TimeoutSec 5
    Write-Host "Status: $($r.StatusCode)"
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}
