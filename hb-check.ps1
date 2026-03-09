try {
    $r = Invoke-WebRequest -Uri 'https://www.caelith.tech' -UseBasicParsing -TimeoutSec 10
    Write-Output "SITE:$($r.StatusCode)"
} catch {
    Write-Output "SITE:ERROR $($_.Exception.Message)"
}
try {
    $r2 = Invoke-WebRequest -Uri 'https://www.caelith.tech/api/health' -UseBasicParsing -TimeoutSec 10
    Write-Output "API:$($r2.StatusCode)"
} catch {
    Write-Output "API:ERROR $($_.Exception.Message)"
}
