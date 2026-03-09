$tests = @(
    @{Name="13"; Method="GET"; Url="https://www.caelith.tech/api/v1/public"},
    @{Name="14"; Method="POST"; Url="https://www.caelith.tech/api/v1/public/sanctions/search?q=Putin"},
    @{Name="15"; Method="GET"; Url="https://www.caelith.tech/api/v1/public/lei/529900HNOAA1KXQJUQ27"},
    @{Name="16"; Method="GET"; Url="https://www.caelith.tech/api/v1/public/calendar/summary"},
    @{Name="17"; Method="GET"; Url="https://www.caelith.tech/api/v1/public/nca"},
    @{Name="18"; Method="GET"; Url="https://www.caelith.tech/api/v1/public/regulatory/events"},
    @{Name="19"; Method="POST"; Url="https://www.caelith.tech/api/v1/public/copilot/chat"; Body='{"message":"What is AIFMD II?"}'},
    @{Name="20"; Method="GET"; Url="https://www.caelith.tech/api/v1/public/errors"}
)

foreach ($t in $tests) {
    $sw = [System.Diagnostics.Stopwatch]::StartNew()
    try {
        $params = @{Uri=$t.Url; Method=$t.Method; UseBasicParsing=$true; TimeoutSec=30}
        if ($t.Body) { $params.Body = $t.Body; $params.ContentType = "application/json" }
        $r = Invoke-WebRequest @params
        $sw.Stop()
        $preview = $r.Content.Substring(0, [Math]::Min(400, $r.Content.Length))
        Write-Output "[$($t.Name)] $($r.StatusCode) ${$sw.ElapsedMilliseconds}ms | $preview"
    } catch {
        $sw.Stop()
        $code = $_.Exception.Response.StatusCode.value__
        $body = ""
        try {
            $stream = $_.Exception.Response.GetResponseStream()
            $reader = New-Object System.IO.StreamReader($stream)
            $body = $reader.ReadToEnd()
            $body = $body.Substring(0, [Math]::Min(400, $body.Length))
        } catch {}
        Write-Output "[$($t.Name)] $code $($sw.ElapsedMilliseconds)ms | $body"
    }
    Write-Output "---"
}
