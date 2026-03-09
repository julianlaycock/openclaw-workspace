# Caelith Landing Page — Design Audit

## Date: February 26, 2026

---

## What Works ✅

1. **Strong value proposition** — "€180K manual vs €11,880 with Caelith" is compelling and specific
2. **Technical credibility** — XSD validation, hash-chained audit trail, specific rule counts (13 rules, 6 frameworks) build trust
3. **Terminal animation** — Good developer/technical aesthetic that resonates with compliance tech buyers
4. **Countdown timer** — Creates genuine urgency with the April 16 AIFMD II deadline (49 days away)
5. **Comparison table** — Direct contrast with manual processes is effective
6. **Color palette** — The dark/accent blue/warm accent combo is sophisticated and financial-grade
7. **Custom cursor** — Adds a premium interactive feel (desktop only)
8. **Scroll-triggered animations** — Clip-path reveals and staggered entries feel modern

## What Doesn't Work ❌

1. **Page is WAY too long** — ~84KB of inline HTML/CSS/JS. Information overload. Too many sections competing for attention. Users won't scroll through all of this.
2. **Redundant trust sections** — There are 3-4 separate trust/credential sections that say similar things. Consolidate.
3. **Mixed design systems** — The "Why Trust Caelith" section uses completely different styling (inline styles, #00A3FF blue, #8CA3B5 text) that breaks the design system. Looks like it was added later and doesn't match.
4. **Custom cursor kills usability** — `cursor: none` on body is aggressive. Many users find custom cursors disorienting. Should be opt-in or removed.
5. **Emoji rendering issues** — Multiple emoji/unicode characters are rendering as broken sequences (dY?�, dYs?, etc.). This looks unprofessional.
6. **Hero is cluttered** — Label + H1 + subtitle + 2 CTAs + proof bar + terminal. Too much happening at once.
7. **No real social proof** — "HWR Berlin" and "Lanzadera" are good but feel small. No customer quotes, no logos of actual fund managers, no case studies.
8. **Pricing friction** — All CTAs go to mailto: links. No self-serve signup or instant demo access from the pricing cards.
9. **The SVG network diagram** — Cool idea but feels decorative rather than informative. Takes up significant viewport without adding conversion value.
10. **Statement marquee** — "Compliance is not a feature — it's the product" scrolling ticker feels like a 2020 design pattern. Dated.
11. **Feature accordions** — Hiding features behind accordions means most users never see them. The "code block" pseudo-YAML is confusing to non-developers.
12. **Mobile experience suffers** — Hero terminal hidden on mobile, hero proof stacks vertically, many animations disabled. Mobile users get a significantly degraded experience.
13. **Font loading** — 3 font families (Sora, Instrument Sans, JetBrains Mono) with multiple weights = slow initial load.
14. **No clear visual hierarchy** — Sections don't guide the eye. Equal weight given to everything.
15. **Browser mockup is static** — The fake dashboard is impressive but clearly fake. Better to use real screenshots or a video.

## What's Dated 📅

- Custom cursor (was trendy 2021-2023, now feels gimmicky)
- Horizontal scrolling marquee text
- Grain texture overlay (overdone)
- Terminal-style code blocks for non-developer audiences
- Clip-path reveal animations (now standard, not differentiating)

## Key Improvements Needed 🔧

1. **Cut 30-40% of content** — Focus on the 3-4 things that convert: urgency, cost savings, demo access, trust
2. **Fix the design system** — One consistent style throughout. No inline style sections.
3. **Stronger CTA hierarchy** — Primary: Try Demo (instant). Secondary: Book a Call.
4. **Real social proof** — Even "pilot customer" or "in discussions with X firms" is better than nothing
5. **Better mobile experience** — Mobile-first, not mobile-afterthought
6. **Fix broken emoji/unicode** — Either use SVG icons or proper emoji encoding
7. **Reduce page weight** — Target 40-60KB for faster load
8. **Simplify navigation** — Too many nav items for a landing page
9. **Video or animated GIF** — Show the actual product, not a coded mockup
10. **Urgency should be front-and-center** — 49 days is the strongest selling point right now

---

## Concept Directions

### Concept A: Evolution
Refine the current design. Keep what works (terminal, countdown, comparison), fix what doesn't (inconsistent styling, emoji issues, redundancy). Better spacing, cleaner hierarchy, consolidated trust signals.

### Concept B: Bold  
Dark-first design with glassmorphism and gradients. More dramatic hero with large typography. Animated gradient backgrounds. Feature cards with glass effect. Bold use of the warm accent (#E8A87C) as a highlight color.

### Concept C: Trust-First
Stripe/Linear-quality minimalism. Light background dominant. Lots of whitespace. Typography-driven. Numbers and proof points front and center. Enterprise-grade feel. Clean grid layouts. Subtle but refined animations.
