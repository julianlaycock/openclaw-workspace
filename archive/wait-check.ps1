for ($i = 2; $i -le 10; $i++) {
  Start-Sleep -Seconds 60
  $mod = (Get-Item 'C:\Users\julia\.openclaw\sandboxes\caelith-project\src\frontend\src\app\api\readiness-check\route.ts').LastWriteTime
  $now = Get-Date
  $diff = ($now - $mod).TotalMinutes
  Write-Host "Attempt $i : modified $([math]::Round($diff,1)) min ago"
  if ($diff -le 5) { Write-Host 'READY'; exit 0 }
}
Write-Host 'TIMEOUT'
