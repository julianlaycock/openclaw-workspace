# Caelith Pitch Deck - Deployment Script (PowerShell)
# Run from the pitch-deck directory

Write-Host "=== Caelith Pitch Deck Deployment ===" -ForegroundColor Cyan

# Option 1: Netlify (recommended - simplest)
Write-Host "`n[Option 1] Netlify Deploy" -ForegroundColor Green
Write-Host "  npx netlify-cli deploy --dir=. --prod"
Write-Host "  (First run will prompt you to create/link a site)"

# Option 2: Vercel
Write-Host "`n[Option 2] Vercel Deploy" -ForegroundColor Green
Write-Host "  npx vercel --prod"

# Option 3: GitHub Pages
Write-Host "`n[Option 3] GitHub Pages" -ForegroundColor Green
Write-Host "  1. Create repo: gh repo create caelith-pitch-deck --public"
Write-Host "  2. git init && git add . && git commit -m 'Pitch deck'"
Write-Host "  3. git remote add origin https://github.com/YOUR_USER/caelith-pitch-deck.git"
Write-Host "  4. git push -u origin main"
Write-Host "  5. Enable Pages in repo Settings > Pages > Deploy from branch: main"

# Auto-deploy with Netlify if CLI available
$choice = Read-Host "`nDeploy now with Netlify? (y/n)"
if ($choice -eq 'y') {
    npx netlify-cli deploy --dir=. --prod
}
