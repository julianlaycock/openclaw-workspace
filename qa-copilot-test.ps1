[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$uri = 'https://www.caelith.tech/api/v1/public/copilot/chat'

# First, inspect one response to see the shape
$bodyObj = @{message='What can you do?'; sessionId='qa-shape-check'}
$bodyJson = $bodyObj | ConvertTo-Json -Compress
$bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($bodyJson)
$response = Invoke-WebRequest -Uri $uri -Method Post -Body $bodyBytes -ContentType 'application/json; charset=utf-8' -TimeoutSec 60 -UseBasicParsing
Write-Output "=== RAW RESPONSE ==="
Write-Output $response.Content
Write-Output "=== PARSED ==="
$parsed = $response.Content | ConvertFrom-Json
$parsed | Get-Member -MemberType NoteProperty | ForEach-Object { Write-Output "$($_.Name) = $($parsed.$($_.Name))" }
