$uri = 'https://www.caelith.tech/api/v1/public/copilot/chat'
$tests = @(
    @{msg='Screen Vladimir Putin and Angela Merkel'; expect='sanctions_screen'},
    @{msg='Can a semi-professional investor with 150K invest in a German AIF?'; expect='investor_classification'},
    @{msg='When is my next Annex IV filing due?'; expect='calendar'},
    @{msg='Generate a compliance checklist for a real estate fund with 500M AUM'; expect='compliance_checklist'},
    @{msg='What are BaFin Annex IV quirks?'; expect='nca_profile'},
    @{msg='Compare BaFin vs CSSF'; expect='nca_compare'},
    @{msg='What changed from AIFMD I to AIFMD II?'; expect='aifmd_changes'},
    @{msg='What is the SubAssetType field?'; expect='field_guidance'},
    @{msg='Look up LEI for Deutsche Bank'; expect='lei_lookup'},
    @{msg='Any new regulations affecting sanctions?'; expect='regulatory_events'},
    @{msg='Which countries have transposed AIFMD II?'; expect='transposition'},
    @{msg='How much does the API cost?'; expect='pricing'},
    @{msg='What endpoints are available?'; expect='api_info'},
    @{msg='What can you do?'; expect='help'},
    @{msg='Tell me about quantum physics'; expect='general'}
)

$failures = @()
$passCount = 0

foreach ($t in $tests) {
    try {
        $sid = 'cron-qa-' + [guid]::NewGuid().ToString().Substring(0,8)
        $body = @{message=$t.msg; sessionId=$sid} | ConvertTo-Json -Compress
        $r = Invoke-RestMethod -Uri $uri -Method Post -Body ([System.Text.Encoding]::UTF8.GetBytes($body)) -ContentType 'application/json; charset=utf-8' -TimeoutSec 45
        
        $intent = $null
        $replyStr = ''
        
        if ($r.intent) { $intent = $r.intent }
        elseif ($r.data -and $r.data.intent) { $intent = $r.data.intent }
        
        if ($r.reply) { $replyStr = [string]$r.reply }
        elseif ($r.data -and $r.data.reply) { $replyStr = [string]$r.data.reply }
        
        if (-not $intent) { $intent = 'NO_INTENT_FIELD' }
        
        $intentOk = ($intent -eq $t.expect)
        $hasRawDate = $false
        if ($replyStr -match 'GMT[+-]0000') { $hasRawDate = $true }
        
        $hasBrokenChars = $false
        $brokenPatterns = @([char]0x00E2 + [char]0x20AC, [char]0x00C3 + [char]0x00A4, [char]0x00C3 + [char]0x00B6, [char]0x00C3 + [char]0x00BC)
        foreach ($bp in $brokenPatterns) {
            if ($replyStr.Contains($bp)) { $hasBrokenChars = $true; break }
        }
        
        if (-not $intentOk -or $hasRawDate -or $hasBrokenChars) {
            $len = [Math]::Min(200, $replyStr.Length)
            $preview = $replyStr.Substring(0, $len)
            $reasons = @()
            if (-not $intentOk) { $reasons += "wrong intent: got=$intent expected=$($t.expect)" }
            if ($hasRawDate) { $reasons += 'raw dates' }
            if ($hasBrokenChars) { $reasons += 'broken chars' }
            $reasonStr = $reasons -join '; '
            $failures += "FAIL [$($t.expect)]: $reasonStr | Reply: $preview"
            Write-Host "FAIL: $($t.expect) - $reasonStr"
        } else {
            $passCount++
            Write-Host "PASS: $($t.expect)"
        }
    } catch {
        $errMsg = $_.Exception.Message
        $failures += "ERROR [$($t.expect)]: $errMsg"
        Write-Host "ERROR: $($t.expect) - $errMsg"
    }
}

Write-Host ''
Write-Host "=== RESULTS ==="
Write-Host "Passed: $passCount / $($tests.Count)"
if ($failures.Count -eq 0) {
    Write-Host 'All 15 intents OK'
} else {
    Write-Host 'Failures:'
    foreach ($f in $failures) {
        Write-Host $f
    }
}
