$urls = @(
    @{Name="13-public-discovery"; Method="GET"; Url="https://www.caelith.tech/api/v1/public"},
    @{Name="14-sanctions-search"; Method="POST"; Url="https://www.caelith.tech/api/v1/public/sanctions/search?q=Putin"},
    @{Name="15-lei-lookup"; Method="GET"; Url="https://www.caelith.tech/api/v1/public/lei/529900HNOAA1KXQJUQ27"},
    @{Name="16-calendar"; Method="GET"; Url="https://www.caelith.tech/api/v1/public/calendar/summary"},
    @{Name="17-nca"; Method="GET"; Url="https://www.caelith.tech/api/v1/public/nca"},
    @{Name="18-regulatory"; Method="GET"; Url="https://www.caelith.tech/api/v1/public/regulatory/events"},
    @{Name="19-copilot"; Method="POST"; Url="https://www.caelith.tech/api/v1/public/copilot/chat"; Body='{"message":"What is AIFMD II?"}'},
    @{Name="20-errors"; Method="GET"; Url="https://www.caelith.tech/api/v1/public/errors"},
    @{Name="22-no-auth"; Method="GET"; Url="https://www.caelith.tech/api/v1/funds"},
    @{Name="23-fake-key"; Method="GET"; Url="https://www.caelith.tech/api/v1/funds"; Headers=@{"x-api-key"="fake"}}
)

foreach ($t in $urls) {
    try {
        $params = @{Uri=$t.Url; Method=$t.Method; UseBasicParsing=$true; TimeoutSec=15}
        if ($t.Body) { $params.Body = $t.Body; $params.ContentType = "application/json" }
        if ($t.Headers) { $params.Headers = $t.Headers }
        $r = Invoke-WebRequest @params
        $preview = $r.Content.Substring(0, [Math]::Min(300, $r.Content.Length))
        Write-Output "[$($t.Name)] STATUS:$($r.StatusCode) | $preview"
    } catch {
        $code = $_.Exception.Response.StatusCode.value__
        $msg = $_.ErrorDetails.Message
        if (-not $msg) { $msg = $_.Exception.Message }
        $preview = if ($msg) { $msg.Substring(0, [Math]::Min(300, $msg.Length)) } else { "no details" }
        Write-Output "[$($t.Name)] STATUS:$code | $preview"
    }
    Write-Output "---"
}
