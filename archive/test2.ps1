try {
    $r = Invoke-WebRequest -Uri "https://www.caelith.tech/api/v1/public" -UseBasicParsing -TimeoutSec 30
    Write-Output "STATUS:$($r.StatusCode)"
    Write-Output $r.Content.Substring(0, [Math]::Min(500, $r.Content.Length))
} catch {
    Write-Output "ERR:$($_.Exception.Response.StatusCode.value__)"
    Write-Output $_.Exception.Message
}
