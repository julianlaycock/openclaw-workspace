$r = Invoke-WebRequest -Uri 'https://www.caelith.tech/api/landing' -UseBasicParsing -TimeoutSec 15
$c = $r.Content
if ($c -match 'demo-dashboard') { Write-Host 'HAS /demo-dashboard links' } else { Write-Host 'STILL has old /dashboard links' }
if ($c -match 'lang-toggle') { Write-Host 'HAS lang toggle' } else { Write-Host 'MISSING lang toggle' }
