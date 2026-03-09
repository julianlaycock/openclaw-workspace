$r = Invoke-WebRequest -Uri "https://www.caelith.tech/" -UseBasicParsing -TimeoutSec 15
$links = [regex]::Matches($r.Content, 'href="([^"]*demo[^"]*)"', 'IgnoreCase')
foreach ($l in $links) {
    Write-Output "DEMO LINK: $($l.Groups[1].Value)"
}
