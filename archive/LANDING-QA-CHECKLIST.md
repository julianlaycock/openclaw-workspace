# Landing Page QA Checklist

Use this for every deploy. Test both EN (`/api/landing`) and DE (`/api/landing?lang=de`).
Mark pass ✅ or fail ❌. Date each run.

---

## Run Log
| Date | Tester | EN | DE | Notes |
|------|--------|----|----|-------|
| _YYYY-MM-DD_ | _name_ | _/14_ | _/14_ | |

---

## 1. Navigation (4 checks)
- [ ] **Logo** — clicking "Caelith" scrolls to top / reloads page
- [ ] **Nav links** — Features, Platform, API, Pricing, FAQ all smooth-scroll to correct section
- [ ] **Navbar morph** — scrolling past ~80px: nav shrinks into floating pill with frosted glass + border-radius
- [ ] **"Try Demo" button** — navigates to `/demo-dashboard`

## 2. Hero (7 checks)
- [ ] **Heading renders** — "Fund compliance, automated." (EN) / "Fonds-Compliance, automatisiert." (DE)
- [ ] **Gradient text** — "automated." / "automatisiert." shows accent→warm gradient (not solid color)
- [ ] **Terminal typing animation** — lines appear sequentially with ~800ms delays, loops every ~12s
- [ ] **Terminal content** — shows `caelith evaluate`, checkmarks, `caelith export`, "All checks passed"
- [ ] **Green pulse dot** — next to "AIFMD II COMPLIANCE PLATFORM" label, animates
- [ ] **CTA buttons** — "Try the Live Demo" (gradient) + "View API Docs" (outline) both link correctly
- [ ] **Scroll hint** — "Scroll" text + chevron visible at bottom, bounces

## 3. Features Section — Light (5 checks)
- [ ] **Readiness banner** — shows live countdown ("X days until enforcement →"), "Take the Readiness Check" button links to `/readiness-check`
- [ ] **6 feature cards** — Rules Engine, Audit Trail, Annex IV, Sanctions, LEI, EMT/EET/EPT
- [ ] **Card numbering** — 01 through 06, gradient text
- [ ] **Card hover** — translateY(-6px) lift + top accent bar appears + icon scales
- [ ] **Detail footers** — each card has monospace detail line (e.g. "13 rules · 6 frameworks · real-time")

## 4. Platform Section — Dark (6 checks)
- [ ] **Dashboard mockup** — topbar (Dashboard/Funds/Investors/Compliance/Annex IV), 3 stat boxes, compliance decision rows
- [ ] **Dashboard glow** — subtle pulsing box-shadow animation
- [ ] **FAIL row** — "INV-4892 — ELTIF 2.0 Suitability" shows red ✗ FAIL
- [ ] **"Explore the Demo"** button at dashboard bottom → `/demo-dashboard`
- [ ] **Copilot chat** — 4 messages (2 user, 2 bot) with typing indicator dots
- [ ] **"Try the Copilot"** button → `/api/copilot-demo`

## 5. Comparison Section — Light (3 checks)
- [ ] **Heading** — "€180K manual. Or €11,880 automated." with gradient numbers
- [ ] **Table** — 6 rows: Time to audit, Error rate, Framework coverage, Audit evidence, Template generation, Annual cost
- [ ] **Caelith column** — green-tinted background, all values present

## 6. API + Open Source Section — Dark (5 checks)
- [ ] **Feature list** — 5 items with checkmarks (versioned routes, API key auth, Swagger, Annex IV, npm)
- [ ] **Code block** — curl example with syntax highlighting (blue keywords, orange strings, grey comments)
- [ ] **Code block header** — shows "api-example.sh" + "bash"
- [ ] **npm inline** — `npm i open-annex-iv` in styled code box + "Apache 2.0" label
- [ ] **CTA buttons** — "View API Docs" → caelith.tech/api/docs, "GitHub" → github.com/julianlaycock

## 7. Pricing Section — Light (6 checks)
- [ ] **3 tiers** — Essentials (€990), Professional (€1,990), Enterprise (From €3,500)
- [ ] **Featured card** — Professional has gradient border + elevated + "MOST POPULAR" badge
- [ ] **Feature lists** — Essentials 5 items, Professional 7 items, Enterprise 5 items
- [ ] **Primary CTAs** — "Get started" (Essentials/Enterprise = outline, Professional = gradient)
- [ ] **Secondary CTAs** — "Book a demo" ghost button on each tier → Calendly link
- [ ] **Hover** — cards lift on hover

## 8. Trust + Resources Section — Dark (4 checks)
- [ ] **Trust pills** — 5 pills: ESMA XSD Compliant, Campus Founders Batch 4, Open Source Core, Made in Berlin 🇩🇪, EU-Hosted 🇪🇺
- [ ] **Section label** — "Standards & Recognition" (NOT "Trusted By")
- [ ] **Resource cards** — 2 cards: Annex IV XML guide + EU Sanctions guide
- [ ] **Card hover** — lift + border glow

## 9. CTA + FAQ Section — Dark (7 checks)
- [ ] **Countdown pill** — large number + "days until / AIFMD II enforcement" (warm color)
- [ ] **Countdown live** — number matches actual days until April 16, 2026
- [ ] **CTA buttons** — "Try the Live Demo" + "API Documentation"
- [ ] **Email fallback** — "Or email julian.laycock@caelith.tech" visible below CTAs
- [ ] **FAQ items** — 7 questions (frameworks, try without signup, API, EMT/EET/EPT, audit trail, AIFMD II date, data security)
- [ ] **FAQ toggle** — clicking expands answer, clicking again collapses, only one open at a time
- [ ] **FAQ accessibility** — keyboard Enter/Space toggles, aria-expanded updates, left border highlights active

## 10. Footer (4 checks)
- [ ] **5 columns** — Brand + tagline, Product, Resources, Legal, Connect
- [ ] **Social icons** — LinkedIn + GitHub SVGs, hover highlights
- [ ] **Footer links** — all href values correct (API Docs, Blog, GitHub, npm, Privacy, Terms, Imprint, LinkedIn, Email)
- [ ] **Bottom bar** — "Made in Berlin 🇩🇪" left, "© 2026 Caelith" right

## 11. Global Interactions (6 checks)
- [ ] **Scroll progress bar** — gradient bar at top of page, grows left→right as you scroll
- [ ] **Reveal animations** — elements fade-in + translateY as they enter viewport
- [ ] **Staggered delays** — cards animate in with 120ms stagger between siblings
- [ ] **Button glow follow** — mouse position tracked, radial gradient follows cursor on hover
- [ ] **Button arrow animation** — → shifts right 4px on hover
- [ ] **Cookie consent bar** — appears on first visit, dismiss stores in localStorage

## 12. Responsive (4 checks)
- [ ] **≤768px** — hamburger replaces nav links, single-column grids, featured pricing card flat
- [ ] **≤480px** — footer single column, hero meta stacks, trust pills stack
- [ ] **Hero height** — 100dvh on mobile (no address bar gap)
- [ ] **Scroll hint hidden** — not visible on mobile

## 13. EN/DE Parity (3 checks)
- [ ] **All section headings** — DE versions present and match EN structure
- [ ] **CTA text** — all buttons translated (e.g. "Live-Demo testen", "API-Dokumentation")
- [ ] **FAQ content** — all 7 questions translated to German

## 14. Performance (3 checks)
- [ ] **Page load** — < 300ms (no external JS deps except Google Fonts)
- [ ] **No layout shift** — no CLS on load (fonts preconnected, no lazy images above fold)
- [ ] **Doc size** — < 60KB (single HTML, no external CSS/JS files)

---

**Total: 67 checks across 14 categories**

Score: ___/67 EN | ___/67 DE
