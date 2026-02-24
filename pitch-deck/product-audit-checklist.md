# Caelith Product Audit — Demo Readiness Checklist

Run through every page before any demo. Fix anything that looks broken, empty, or confusing.

## Critical Path (must be flawless for demos)

### Login Page
- [ ] Page loads fast (<2s)
- [ ] No console errors
- [ ] Clean branding (logo if available, "Caelith" wordmark at minimum)
- [ ] Error messages are user-friendly (not stack traces)
- [ ] "Forgot password" — does it exist? If not, hide the link or add it

### Dashboard
- [ ] Shows overview stats (funds count, investors count, compliance status)
- [ ] No empty states visible (seed enough demo data)
- [ ] Charts/metrics render correctly
- [ ] Responsive — doesn't break on resize
- [ ] Loading states use proper spinners (no blank flashes)

### Fund Management
- [ ] Fund list loads with 3 demo funds (realistic names)
- [ ] Click into a fund → shows details, investors, applicable frameworks
- [ ] Framework auto-detection works and displays correctly
- [ ] "Add Fund" flow works without errors
- [ ] No 500 errors on any action

### Investor Management (THE MONEY SHOT)
- [ ] Investor list shows 15-20 investors with varied types
- [ ] Each investor has: name, type, classification, compliance status
- [ ] "Run Compliance Check" button works
- [ ] Results show: all rules evaluated, pass/fail, evaluation time (<23ms)
- [ ] At least 1 investor is flagged (non-compliant) for dramatic effect
- [ ] Clicking a flagged investor shows clear explanation of why

### Audit Trail (THE DIFFERENTIATOR)
- [ ] Shows chronological list of all compliance decisions
- [ ] Each entry shows: timestamp, action, result, hash, previous hash
- [ ] Hash chain is visually clear (linked hashes)
- [ ] Clicking an entry shows full detail
- [ ] No empty state — seed at least 20 audit entries

### Reporting
- [ ] Annex IV report generation works
- [ ] PDF export works without errors
- [ ] Report content looks professional (not dev placeholder text)
- [ ] XML/XBRL export works (if implemented)

### Compliance Copilot (if shown)
- [ ] Loads without errors
- [ ] Prompt suggestions are relevant
- [ ] Response quality is acceptable

## Non-Critical but Important

### Navigation
- [ ] All nav links work
- [ ] Active page is highlighted
- [ ] No dead links or 404s
- [ ] Mobile: hamburger menu works

### Settings / Profile
- [ ] User profile shows correctly
- [ ] No sensitive data visible (other users, system info)

### Performance
- [ ] No page takes >3s to load
- [ ] No memory leaks (check after 5 minutes of clicking around)
- [ ] API calls resolve quickly

### Visual Polish
- [ ] Consistent typography (no font fallbacks visible)
- [ ] No text overflow or clipping
- [ ] Dark/light mode consistent (if applicable)
- [ ] No Lorem ipsum anywhere
- [ ] No "TODO" comments visible in UI
- [ ] Favicon set

## Known Issues to Fix
(Fill this in as you walk through the product)

1. 
2. 
3. 

## Demo Environment
- URL: https://www.caelith.tech
- Demo login: demo@caelith.tech / CaelithDemo2026!
- Admin login: admin@caelith.com / Admin1234
- Backend status: ⚠️ CHECK — Railway trial may have expired
