try {
    $r = Invoke-WebRequest -Uri 'https://www.caelith.tech' -TimeoutSec 10 -UseBasicParsing
    Write-Host "frontend:$($r.StatusCode)"
} catch {
    Write-Host "frontend:DOWN"
}
try {
    $r2 = Invoke-WebRequest -Uri 'https://www.caelith.tech/api/health' -TimeoutSec 10 -UseBasicParsing
    Write-Host "api:$($r2.StatusCode)"
} catch {
    Write-Host "api:DOWN"
}
