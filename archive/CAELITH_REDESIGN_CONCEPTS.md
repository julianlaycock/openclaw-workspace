# Caelith Landing Page Redesign — Concept Document

**Prepared by:** Studio Eleven, New York
**Client:** Julian Laycock, CEO — Caelith
**Date:** February 18, 2026
**Project scope:** Full landing page redesign, $50K engagement

---

## 1. Current State Audit

### What Works

- **Regulatory depth is real.** The content isn't faking expertise — hash-chain provenance visualization, code-style rule examples, and six regulatory framework badges signal genuine domain authority. Most regtech competitors have vague marketing copy. Caelith has substance. Don't lose this.
- **Typography stack is solid.** Space Grotesk + Instrument Serif + JetBrains Mono is a well-chosen triad — technical credibility (mono), editorial authority (serif), and modern UI (grotesk). This is a keeper.
- **The countdown timer is smart.** AIFMD II deadline urgency is a legitimate conversion lever. 56 days creates real FOMO in a way that feels earned, not manufactured.
- **Pricing transparency.** Showing €299/€799/Custom openly builds trust with an audience tired of "contact sales" black boxes. The glow border on the recommended tier is a fine touch.
- **Warm parchment palette (#F5F2EA + #D8BA8E gold).** Unusual for SaaS. It avoids the "dark mode developer tool" cliché and nods at the legislative/document heritage of the compliance world. It's differentiated.

### What Doesn't Work

- **Every section has the same rhythm.** Heading → subtext → 3-column grid → spacing → repeat. After the third section, the eye glazes over. There's no pacing — no moment of tension, release, surprise. The page reads like a bulleted spec sheet, not a narrative.
- **Scroll animations are all identical.** `translateY(12px)` fade-in on every element creates a "PowerPoint slide deck" feel. When everything moves the same way, nothing moves at all. The animation vocabulary is one word repeated.
- **No loading experience.** The page just… appears. For a product selling precision and control, the first 0.5 seconds should demonstrate that precision. A branded loader signals craft.
- **Hero is generic.** "Stock-style" hero image is the single biggest credibility leak. Compliance officers have pattern-matched stock imagery to "this company is small and hasn't invested in their brand." It reads startup-template, not enterprise-grade.
- **Zero social proof.** No client logos, no testimonials, no "trusted by X fund managers," no case studies. For B2B fintech, this is a conversion killer. Compliance officers don't buy tools their peers haven't validated. This is the #1 content gap.
- **Comparison table is a wall of text.** Nobody reads a text-heavy comparison table. It needs visual hierarchy — checkmarks, color coding, or a dramatically simpler structure.
- **No video or motion content.** The product is a compliance *engine* — it does things. Showing it doing things (even a 15-second screen recording loop) would outperform any amount of static explanation.
- **Mobile menu is an afterthought.** Basic overlay = "we didn't think about mobile." 60%+ of initial page views — even in B2B — happen on mobile (exec checks link from email on phone). This needs real attention.
- **Card hover lift is the only interactive element.** No cursor effects, no magnetic buttons, no parallax, no scroll-triggered state changes. The page is passive. Premium pages make you feel like you're *interacting with a system*, not reading a document.
- **Section backgrounds don't alternate.** Everything sits on the same parchment. No dark/light chapter rhythm. No visual breathing. The page is one long scroll of sameness.

### The Core Problem

The current page has **excellent content trapped in a generic container**. The information architecture is sound. The copy is strong. But the visual and interaction design is template-tier — it could be any SaaS product. For a tool that costs €799/month and deals with regulatory consequences, the craft of the page must match the gravity of the product.

**The page tells you Caelith is precise and trustworthy. It doesn't *feel* precise and trustworthy.**

---

## 2. Six Concept Proposals

---

### Concept A: "The Vault"

**Pitch:** A dark, dense, impenetrably precise interface that feels like stepping inside a regulatory operating system.

#### Visual Mood

- **Primary:** #0A0A0F (near-black) with #F5F2EA (warm off-white text)
- **Accent:** #D8BA8E (gold, carried over — continuity signal)
- **Secondary accent:** #2A5C3F (deep institutional green for success states)
- **Typography:** Space Grotesk 700 at massive scale (96–144px hero), JetBrains Mono for all labels/metadata, Instrument Serif *only* for pull-quotes and the single testimonial block
- **Imagery:** No photography. Zero. All UI — product screenshots, data visualizations, code blocks, and custom SVG diagrams of regulatory flows. If there's an image, it's a screen.

#### Key Design Elements & Interactions

- **Branded loader (0.8s):** Black screen → gold Caelith logomark draws itself stroke-by-stroke (SVG path animation) → screen wipes up revealing hero. Feels like a vault door opening.
- **Hero:** Full-viewport dark. Oversized headline "AIFMD II compliance. Solved." in Space Grotesk 700, 120px, tracking -0.03em. Below: countdown timer with flip-clock animation (each digit in its own mono-spaced card). No image — just type, timer, and two buttons: "Book Demo" (gold fill) + "See How It Works" (ghost). Subtle particle field in background (canvas-based, low density — like dust motes in a vault).
- **Scroll behavior:** Lenis smooth scroll throughout. Sections use GSAP ScrollTrigger pinning — each "chapter" pins to viewport, content animates in, then releases to next chapter. Creates a presentation-like cadence without hijacking scroll.
- **Social proof bar:** Immediately after hero — dark charcoal (#111) strip. "Trusted by compliance teams managing €14B+ in AUM" + 6 client/partner logos (monochrome white). Logos scroll horizontally on infinite loop (marquee, not carousel).
- **Product showcase (pinned section):** A large laptop mockup (3D CSS transform, slight isometric tilt) centered on screen. As user scrolls, the screen content changes — cycling through 3 key product views (rule builder, audit trail, reporting dashboard). Each transition is a smooth crossfade. Descriptive text updates on the left in a sticky sidebar.
- **Process steps:** Numbered with JetBrains Mono (`// 01`, `// 02`, `// 03`). Each step is a horizontal card that slides in from the right on scroll, stacking vertically. Gold accent line connects them.
- **Hash-chain visualization:** This is Caelith's killer feature — give it a dedicated fullscreen section. Animated SVG: blocks link together left-to-right as user scrolls, each block revealing a compliance event. Terminal-style mono text labels. This section alone justifies the redesign.
- **Comparison:** Two columns, dark. Left: "Without Caelith" (red-tinted, ✗ marks, pain points). Right: "With Caelith" (green-tinted, ✓ marks). Minimal text. Icon-driven.
- **Pricing:** Three cards on dark background. Recommended tier has gold border glow (animated, subtle pulse). Scarcity line below Enterprise: "3 onboarding slots remaining in Q2."
- **FAQ:** Accordion with gold `+`/`−` toggle. JetBrains Mono question labels.
- **Final CTA:** Full-viewport gold background (#D8BA8E). Black text. "56 days until AIFMD II. Are you ready?" Single button: "Book Your Demo."
- **Footer:** Minimal. Dark. Keyboard shortcut hint: `Press D to book a demo` (actually functional — easter egg).
- **Cursor:** Custom cursor — small gold dot with trailing ghost. On interactive elements, expands to a ring.

#### Differentiation from Current

Inverts the entire palette (dark-first), eliminates all photography, turns the page into a *product experience* rather than a marketing brochure. The pinned scroll sections break the monotonous rhythm entirely.

#### Premium Patterns Borrowed

- good-fella.com: branded loader, numbered process steps with mono labels, comparison table, scarcity signals, dark/light alternation, intentional whitespace
- Stripe: product screenshot-as-hero, technical depth as marketing asset
- Linear: dark UI-as-brand, custom cursor, pinned scroll storytelling
- Vercel: terminal-aesthetic credibility, code-first visual language

#### Section Breakdown (scroll order)

1. Loader (0.8s)
2. Hero — headline, countdown, dual CTA
3. Social proof logo bar
4. Problem statement — "The AIFMD II compliance gap" (text + animated stat counters)
5. Product showcase — pinned laptop mockup with 3 screen transitions
6. Hash-chain provenance visualization — fullscreen animated SVG
7. Process steps — 4 numbered horizontal cards
8. Regulatory framework badges — grid of 6 with expand-on-hover details
9. Comparison — two-column with/without
10. Pricing — 3 tiers + scarcity signal
11. Testimonial — single powerful quote, large serif type, name + title + company
12. FAQ accordion
13. Final CTA — gold fullscreen
14. Footer — minimal + newsletter capture + keyboard hint

#### Estimated Effort: **High**

Custom cursor, Lenis scroll, GSAP ScrollTrigger pinning, SVG path animations, canvas particle field, flip-clock timer, 3D CSS mockup transitions — this is 6–8 weeks of frontend development with a senior engineer.

#### Risk / Tradeoff Analysis

- **Risk:** Dark interfaces can feel "developer tool" rather than "institutional finance." Compliance officers in their 50s may find it intimidating.
- **Mitigation:** The gold warmth and Instrument Serif moments soften it. The content remains accessible — it's the container that's dark, not the language.
- **Risk:** Pinned scroll sections can feel disorienting on trackpads with high-inertia scroll.
- **Mitigation:** Lenis normalizes scroll velocity. Pin durations are short (3–4 scroll-lengths max). Mobile falls back to standard scroll with fade-in.
- **Tradeoff:** No photography means the page feels abstract. Some visitors want to see "people" to feel trust.
- **Tradeoff:** High dev effort = longer timeline and higher cost. This is the most expensive concept.

---

### Concept B: "The Brief"

**Pitch:** A restrained, editorial layout that reads like a McKinsey white paper got redesigned by Stripe's team — authority through simplicity.

#### Visual Mood

- **Primary:** #FFFFFF (white) and #F5F2EA (warm off-white for alternating sections)
- **Text:** #1A1A1A (near-black)
- **Accent:** #1A3D5C (deep navy) — replacing gold as primary accent
- **Secondary accent:** #D8BA8E (gold, demoted to highlights only — borders, rule lines, the countdown timer)
- **Typography:** Instrument Serif for all headlines (editorial authority), Space Grotesk for body, JetBrains Mono for data/labels. Headlines at 64–80px, generous line-height (1.15).
- **Imagery:** One hero image only — a *custom* overhead photograph of a regulation document with Caelith's interface overlaid on a tablet sitting on the document. Everything else is product UI, data viz, and typographic.

#### Key Design Elements & Interactions

- **No loader.** Page renders instantly. Speed *is* the brand signal. First contentful paint under 1s.
- **Hero:** Split — left 60% is headline + subtext + CTA, right 40% is the custom photograph. Headline in Instrument Serif: "The compliance engine for AIFMD II." Below in Space Grotesk: the countdown timer (simple, inline — "56 days remaining" with the number in gold JetBrains Mono). One CTA: "Book a Demo" (navy fill, white text, subtle magnetic pull on hover).
- **Scroll behavior:** Standard smooth scroll (CSS `scroll-behavior: smooth`). Animations are *text-only* — lines of text reveal word-by-word using `clip-path` as they enter viewport. Cards and images simply appear (no translateY). The restraint *is* the design.
- **Social proof:** "Trusted by compliance teams at" + logo strip. Below: single testimonial in large Instrument Serif italic, with gold quotation marks. Name, title, company in mono below.
- **Content sections alternate white/off-white.** Each section has a thin gold rule (1px) at top. Section labels in JetBrains Mono: `01 — THE PROBLEM`, `02 — THE SOLUTION`, etc.
- **Feature blocks:** Two-column, text-left / product-screenshot-right, alternating sides. No cards. No grids. Just clean editorial layout with generous margins (200px+ side padding on desktop).
- **Hash-chain section:** Presented as a code block — actual styled `<pre>` element showing the hash chain in JetBrains Mono with syntax highlighting. Below: plain-English explanation. The code *is* the visual.
- **Pricing:** Horizontal layout — three columns, no cards, no borders. Just the tier name (serif), price (mono, large), feature list (grotesk), and CTA button. Recommended tier has a subtle navy background.
- **FAQ:** Not accordion. Just a two-column layout — question on left (bold), answer on right. All visible. Scannability over interaction.
- **Final CTA:** Centered text on white. Instrument Serif, 72px: "Ready?" One button.

#### Differentiation from Current

Strips away all decorative elements — no grain overlay, no glow borders, no gradient text. Bets entirely on typography, whitespace, and content quality. The anti-SaaS-template approach.

#### Premium Patterns Borrowed

- good-fella.com: restrained palette, intentional whitespace, client logo strip, numbered section labels
- Stripe: editorial layout, screenshot-driven feature explanation, speed-as-brand
- Ramp: financial-services restraint, navy palette, authority through simplicity

#### Section Breakdown

1. Hero — split layout, custom photo, headline, countdown, CTA
2. Social proof — logos + single testimonial
3. `01 — THE PROBLEM` — AIFMD II pain points, animated counter stats
4. `02 — THE SOLUTION` — product overview, left-text / right-screenshot
5. `03 — HOW IT WORKS` — 4-step process, numbered, sequential
6. `04 — THE ENGINE` — hash-chain code block + plain-English explanation
7. `05 — FRAMEWORKS` — regulatory badges in a clean grid
8. `06 — PRICING` — horizontal three-tier layout
9. `07 — FAQ` — two-column, all visible
10. Final CTA — single word, single button
11. Footer — newsletter capture, nav links, legal

#### Estimated Effort: **Low–Medium**

No complex animations, no custom cursor, no WebGL. The challenge is purely typographic craft and responsive layout. 3–4 weeks with a strong frontend developer. The custom photography is the main production cost.

#### Risk / Tradeoff Analysis

- **Risk:** May feel *too* minimal for a product with this much to communicate. Compliance officers want detail — can they find it?
- **Mitigation:** Content is all present, just laid out editorially rather than in cards/grids. Information density is the same; visual density is lower.
- **Risk:** Without interaction, the page may not feel "modern" enough to signal Caelith is a technology company.
- **Mitigation:** The word-by-word text reveals and the code block section signal engineering craft without being flashy.
- **Tradeoff:** This concept relies heavily on content quality. Bad copy can't hide behind animation. Every word must earn its space.

---

### Concept C: "The War Room"

**Pitch:** A high-density, data-rich command center layout that treats the landing page like a real-time compliance dashboard — the product *is* the marketing.

#### Visual Mood

- **Primary:** #0D1117 (GitHub dark) with sections on #161B22
- **Accent:** #58A6FF (electric blue — data/link color) + #D8BA8E (gold for urgency/warnings)
- **Alert:** #F85149 (red for deadline/risk indicators)
- **Typography:** JetBrains Mono *as primary* for headlines (radical choice — everything feels like a terminal readout). Space Grotesk for body text. Instrument Serif eliminated entirely.
- **Imagery:** Zero photography. All data visualization — animated charts, live-updating counters, terminal-style logs, grid layouts with monospaced data.

#### Key Design Elements & Interactions

- **Loader:** Terminal boot sequence. Black screen, mono text types out line-by-line: `> initializing caelith compliance engine...` / `> loading AIFMD II ruleset (2,847 rules)...` / `> system ready.` Then wipes to hero. 1.5 seconds. *Sounds* optional (keyboard click on each line).
- **Hero:** Fullscreen dark. Top-left: Caelith logo. Top-right: live-updating timestamp in JetBrains Mono (`2026-02-18T07:15:32Z`). Center: massive countdown — not just "56 days" but a full millisecond-precision timer ticking down in real time. Below: `AIFMD II ENFORCEMENT: 2026-04-15T00:00:00Z`. Two buttons: `[BOOK DEMO]` and `[VIEW DOCUMENTATION]` styled as terminal commands.
- **Dashboard strip:** Immediately below hero — a horizontal band divided into 4 cells, each showing a live-animated metric: "2,847 Rules Monitored" / "14 Jurisdictions" / "99.97% Audit Accuracy" / "< 4min Report Generation." Numbers roll up on scroll-enter.
- **Scroll behavior:** No smooth scroll library — intentionally snappy. Sections are separated by thin 1px lines (#2D333B). Content appears instantly on scroll (no fade delays). Speed and precision over elegance.
- **Product demo section:** An *interactive* embedded prototype. A simplified version of the Caelith rule builder rendered in the page — user can click through 3 pre-built scenarios. Not a video. Not a screenshot. A working slice of the product. (This is the bold move.)
- **Regulatory radar:** A custom SVG/Canvas visualization — a radar/sunburst chart showing all 6 regulatory frameworks, with AIFMD II pulsing in gold. Hover reveals framework details. This replaces the badge grid with something memorable.
- **Comparison:** Styled as a terminal diff — `- Manual compliance (deprecated)` in red, `+ Caelith engine (recommended)` in green. Mono throughout.
- **Pricing:** Three "cards" styled as terminal windows with title bars. `$ caelith --plan starter` / `$ caelith --plan professional` / `$ caelith --plan enterprise`. Features listed as command flags.
- **Social proof:** Client logos in a grid with hover-reveal case study snippets. Below: GitHub-style contribution graph showing "compliance events processed" over the past 12 months (styled, not real data — but visually compelling).
- **CTA (multiple):** Every section ends with a subtle inline CTA: `→ book a demo` in blue. Final section is a fullscreen terminal prompt: `$ caelith demo --schedule` with a blinking cursor and a real form that slides open.
- **Easter eggs:** `Ctrl+K` opens a command palette (like Linear/Vercel) with options: "Book Demo," "View Pricing," "Read Docs." Keyboard-first UX signals engineering DNA.

#### Differentiation from Current

Completely abandons the warm/editorial feel. Positions Caelith as an *engineering product*, not a financial services brochure. The interactive product demo is the biggest differentiator of any concept in this document.

#### Premium Patterns Borrowed

- good-fella.com: numbered process, comparison table, scarcity, rolling counters
- Linear: command palette, dark UI, keyboard shortcuts, terminal aesthetic
- Vercel: dashboard-as-marketing, real-time data, developer-culture signaling
- GitHub: data visualization, contribution graphs, dark palette

#### Section Breakdown

1. Terminal boot loader (1.5s)
2. Hero — precision countdown, terminal-styled CTAs
3. Dashboard metric strip — 4 animated counters
4. Problem statement — AIFMD II risk explained with data points
5. Interactive product demo — embedded 3-scenario prototype
6. Hash-chain visualization — animated block linkage with terminal labels
7. Regulatory radar — SVG sunburst of 6 frameworks
8. Process steps — `// step_01` through `// step_04`, mono labels
9. Comparison — terminal diff style
10. Social proof — logo grid + activity graph
11. Pricing — terminal window cards
12. FAQ — expandable, mono-styled
13. Final CTA — terminal prompt with form
14. Footer — minimal, keyboard shortcut hints, newsletter

#### Estimated Effort: **Very High**

Interactive product prototype, command palette, custom SVG radar, canvas activity graph, terminal boot animation — this is 8–10 weeks minimum with a senior frontend engineer + design system work. The interactive demo alone is a 2-week project.

#### Risk / Tradeoff Analysis

- **Risk:** Alienates non-technical buyers. A CFO or compliance director may find the terminal aesthetic off-putting or confusing. "This looks like a developer tool" is a real objection in enterprise sales.
- **Mitigation:** Body text remains in Space Grotesk (readable). The terminal styling is aesthetic, not functional — users never need to "type" anything.
- **Risk:** Interactive product demo is a maintenance burden. Every product update potentially breaks the landing page.
- **Mitigation:** Scope the demo to 3 fixed scenarios with mocked data. Decouple from production codebase.
- **Risk:** The highest-cost concept. If the interactive demo gets descoped, the page loses its centerpiece.
- **Tradeoff:** This concept filters hard. People who love it will *really* love it (technical fund admins, quant compliance teams). People who don't will bounce fast. That might be fine — Caelith's product is technical.

---

### Concept D: "The Institution"

**Pitch:** Quiet, immovable confidence — the landing page equivalent of a private bank's lobby. Marble and glass, not chrome and neon.

#### Visual Mood

- **Primary:** #F5F2EA (warm parchment — retained from current) and #FFFFFF
- **Text:** #2C2C2C
- **Accent:** #1B3A4B (dark teal — institutional, replacing gold as primary CTA color)
- **Secondary:** #D8BA8E (gold retained for the countdown timer and section dividers only)
- **Typography:** New addition — a custom-licensed serif: *Canela* (or similar high-end editorial serif) for headlines at 56–72px. Space Grotesk for body. JetBrains Mono for data labels.
- **Imagery:** High-end abstract photography — aerial shots of European financial districts (Frankfurt, Luxembourg), close-ups of architectural details (marble columns, glass facades), all desaturated and warm-toned. Overlaid with subtle grain texture.

#### Key Design Elements & Interactions

- **No loader.** Instant render. The page itself is the statement.
- **Hero:** Full-viewport parchment background. Centered layout. Canela serif headline: "Compliance infrastructure for the new regulatory era." Smaller: "AIFMD II enforcement begins April 15, 2026." Countdown timer in gold JetBrains Mono — understated, in the header bar, not the hero center. Below headline: single CTA "Schedule a Consultation" (teal fill, rounded corners 4px — not pill-shaped). Background: extremely subtle parallax on a desaturated Frankfurt skyline photo (5% movement max).
- **Scroll behavior:** CSS scroll-driven animations only (no JS library). Elements fade in with `opacity` transitions — no translateY. Parallax on select images (CSS-only, `background-attachment: fixed` or `scroll-timeline`). The motion is glacial, deliberate, unhurried. Luxury pacing.
- **Social proof (priority section):** Immediately after hero. Full-width warm white band. "Trusted by compliance leaders across Europe" + 8–10 logos (monochrome, warm gray). Below: two testimonial cards side-by-side — name, photo (headshot), title, company, quote. Real people, real faces. This is the highest-priority content addition.
- **Feature sections:** Single-column, centered text (max-width 680px). Each feature gets a full viewport. Headline, 2-line description, and a device mockup (iPad showing the relevant product screen). The mockup has a subtle shadow and sits on the parchment surface. No grids, no cards, no columns. One idea per screen.
- **Trust signals section:** A horizontal scroll gallery (the one experimental element) — regulatory badges, security certifications, partnership logos, in a horizontal track that responds to scroll. Each item is a card with embossed-style gold border.
- **Process:** Vertical timeline — gold line on left, steps on right. Each step has a number in Canela serif (large, light gray) and description in Space Grotesk. Minimal animation — dots on the timeline fill with gold as they enter viewport.
- **Pricing:** Three cards on white background. Thin teal borders. No glow, no gradients. Recommended tier has a subtle teal fill header bar. Below pricing: "Speak with our team for custom enterprise arrangements."
- **Comparison:** Not a table. A single-column "Before / After" narrative — two short paragraphs. "Before Caelith, compliance teams manually…" / "With Caelith, the same process takes…" Let the writing do the work.
- **Final CTA:** Parchment background, centered Canela headline: "The deadline is real. The solution is ready." Teal button. Gold countdown underneath.
- **Footer:** Warm, generous. Company info, regulatory disclaimers (important for trust), EU data residency note, SOC 2 badge.

#### Differentiation from Current

Same warmth, completely different craft level. Replaces the card-grid SaaS layout with a single-column editorial flow. Adds real photography, real testimonials, and real social proof. Feels like it costs more because *it does* — the photography alone signals investment.

#### Premium Patterns Borrowed

- good-fella.com: intentional whitespace, client logo strip, CTA layering
- Ramp: financial-services warmth, testimonial emphasis, trust-first hierarchy
- Private banking websites (Julius Baer, Lombard Odier): photography style, serif headlines, glacial pacing
- Apple: single-feature-per-viewport, device mockup centering

#### Section Breakdown

1. Hero — centered headline, subtle countdown in nav, minimal parallax
2. Social proof — logo strip + 2 testimonial cards with headshots
3. Problem narrative — "The AIFMD II challenge" in centered editorial text
4. Feature 1 — rule engine (single column, iPad mockup)
5. Feature 2 — audit trail / hash-chain (single column, iPad mockup)
6. Feature 3 — reporting dashboard (single column, iPad mockup)
7. Trust signals — horizontal scroll badge gallery
8. Process — vertical gold timeline, 4 steps
9. Before/After narrative — two paragraphs
10. Pricing — three teal-bordered cards
11. FAQ — accordion, restrained styling
12. Final CTA — deadline urgency + button
13. Footer — warm, trust-heavy, regulatory disclaimers

#### Estimated Effort: **Medium**

No complex JS. CSS-only animations and scroll-driven effects. The main investments are: custom photography (2-day shoot or premium stock licensing, ~$3–5K), testimonial sourcing (requires client outreach), and the horizontal scroll gallery. 4–5 weeks frontend.

#### Risk / Tradeoff Analysis

- **Risk:** May feel slow or boring to younger / more technical evaluators. "This looks like a bank website" could be a compliment or a criticism depending on the buyer.
- **Mitigation:** The audience *is* institutional. Banks don't look like Linear, and they shouldn't.
- **Risk:** Single-column layout wastes screen real estate on desktop. Could feel like a mobile layout stretched wide.
- **Mitigation:** Max-width container (680px body, 1200px for full-bleed elements) with generous whitespace creates a magazine-reading experience that's intentional, not lazy.
- **Risk:** Relies on real social proof that may not exist yet (client logos, testimonials, headshots).
- **Mitigation:** Launch with "founding partners" framing if client roster is thin. Even 3–4 logos is better than zero.
- **Tradeoff:** This is the safest concept. It won't win design awards. It will convert well with the target audience.

---

### Concept E: "The Scroll"

**Pitch:** A single continuous narrative told through sticky scroll storytelling — the user doesn't browse sections, they experience a story that builds to an inevitable conclusion: they need Caelith.

#### Visual Mood

- **Primary:** White (#FAFAF9) and black (#111111), alternating in large blocks
- **Accent:** #E63946 (regulatory red — urgent, serious, impossible to ignore) + #D8BA8E (gold for success/resolution moments)
- **Typography:** Space Grotesk 800 for headlines at 80–160px (kinetic, massive). Instrument Serif for narrative body text (18px, 1.7 line-height — optimized for reading). JetBrains Mono for data.
- **Imagery:** Custom data visualizations and kinetic typography only. No photos. No mockups until the "solution" section. The problem must be *felt* through abstract tension before the product is revealed.

#### Key Design Elements & Interactions

- **Loader:** White screen. Gold circle expands from center to fill viewport, then shrinks to reveal the page. 0.6s. Smooth, confident.
- **Hero:** White. Absolutely massive type. "AIFMD II" in Space Grotesk 800, 160px, filling the width. Below in Instrument Serif, 24px: "The most significant regulatory change in European fund management in a decade. Enforcement begins in 56 days." No CTA in hero. No button. Just the weight of the statement. The countdown ticks in red.
- **Scroll structure:** This is where the concept lives. The page uses GSAP ScrollTrigger with extensive pinning to create a "scrollytelling" experience:
  - **Act I: The Problem (dark sections).** As user scrolls, stat counters animate in sequence: "€2.1T in AUM affected" → "47% of fund managers are not ready" → "Fines up to €5M per violation." Each stat gets a full viewport. Red accents. The scroll *pace* creates dread. Between stats, short text paragraphs in Instrument Serif explain the regulatory landscape.
  - **Act II: The Complexity (split-screen pinned section).** Screen splits vertically. Left side: a scrolling list of AIFMD II requirements (dozens of items, scrolling endlessly). Right side: pinned text that says "This is what your compliance team is expected to handle. Manually." The sheer volume of the left column is the argument.
  - **Act III: The Solution (white sections, gold accents).** Transition: black screen fades to white. Gold particles dissolve in. The Caelith logo appears. "There's an engine for this." Product screenshots fade in on scroll — the rule builder, the audit trail, the dashboard. Each is introduced with a one-line description and a 10-second looping video clip showing it in action.
  - **Act IV: The Proof.** Social proof section. Client logos. A single testimonial. The comparison (Before/After). Pricing. FAQ. All in rapid succession — the story has been told, now the logistics.
  - **Act V: The Close.** Black screen. Red countdown timer, large. "April 15, 2026." Below: "Book your demo before it's too late." Gold button. Nothing else on the viewport.
- **Cursor:** Minimal — custom crosshair cursor (thin, gold lines) that subtly expands on hover states.
- **Kinetic typography:** In Act I, key phrases in body text animate — words slide in from the left, replacing each other: "complex → overwhelming → unmanageable → Caelith." GSAP SplitText for word-level animation control.
- **Mobile adaptation:** Scrollytelling simplifies to full-viewport sections with snap-scroll. Split-screen becomes sequential. Video clips become static screenshots with play buttons.

#### Differentiation from Current

Transforms the landing page from a feature directory into a persuasion arc. The user doesn't scan — they scroll through a story with rising tension and resolution. No section feels "samey" because each has a unique scroll mechanic.

#### Premium Patterns Borrowed

- New York Times interactive stories ("Snowfall" lineage): scrollytelling, pinned narrative sections
- Apple product pages: video-on-scroll, massive type, single-idea-per-viewport
- good-fella.com: numbered structure, dark/light alternation, rolling counters, whitespace
- Linear: kinetic type, cursor effects, dark confidence
- Stripe: data-driven persuasion, animated stats

#### Section Breakdown

1. Loader (0.6s)
2. Hero — massive AIFMD II type, countdown, no CTA
3. Act I — 3 stat viewports (scrollytelling, pinned)
4. Act I continued — regulatory narrative text
5. Act II — split-screen scrolling requirements list
6. Transition — black to white, gold particles
7. Act III — product introduction with tagline
8. Act III — rule builder (screenshot + video loop)
9. Act III — audit trail (screenshot + video loop)
10. Act III — reporting dashboard (screenshot + video loop)
11. Act IV — social proof logos + testimonial
12. Act IV — comparison (before/after)
13. Act IV — pricing (3 tiers)
14. Act IV — FAQ accordion
15. Act V — fullscreen countdown + CTA
16. Footer

#### Estimated Effort: **Very High**

GSAP ScrollTrigger with complex pinning, SplitText animations, split-screen scroll mechanics, 3 product video loops (production cost), particle transition, custom cursor — this is 8–10 weeks of senior frontend work. Video production adds another 1–2 weeks and $5–8K.

#### Risk / Tradeoff Analysis

- **Risk:** Scrollytelling can feel slow and annoying if the user just wants to find pricing. "Let me just scroll to the price" — and they can't because the page is pinned.
- **Mitigation:** Add a sticky nav with anchor links that bypass the scroll animations. "Skip to Pricing" is always available.
- **Risk:** The "Act" structure may feel pretentious for a compliance tool. "This isn't a movie, it's a SaaS product."
- **Mitigation:** The acts are invisible to the user — they're a design framework, not visible labels. The user just experiences "problem → solution → proof → buy."
- **Risk:** Extremely scroll-heavy on mobile. Battery drain from video autoplay. Performance on mid-tier devices.
- **Mitigation:** Mobile gets simplified version — snap-scroll sections, no pinning, static images with optional video play. Ship with performance budget: <200KB JS, lazy-load everything below fold.
- **Tradeoff:** This is the highest-risk, highest-reward concept. If it works, it's memorable and highly converting. If it doesn't, it feels gimmicky. Execution quality is everything.

---

### Concept F: "The Standard"

**Pitch:** Do exactly what Stripe, Vercel, and Linear do — but for regtech. No experiments. No gimmicks. Just the current industry gold standard for B2B SaaS, executed flawlessly.

#### Visual Mood

- **Primary:** #FAFAFA (cool white) and #111111 (sections alternate)
- **Accent:** #6C5CE7 (deep violet — unexpected in fintech, memorable, signals modernity without being frivolous)
- **Secondary:** #D8BA8E (gold, for the countdown timer and urgency moments only)
- **Typography:** Inter (yes, Inter — the industry standard, chosen deliberately. When Stripe uses it, nobody calls it boring). 600/700 weights. Headlines at 56–72px. JetBrains Mono for code elements and the countdown timer.
- **Imagery:** Product screenshots in styled browser frames (light chrome border, rounded corners). One hero animation — a subtle, slow-moving gradient mesh (CSS only, like the Linear homepage).

#### Key Design Elements & Interactions

- **No loader.** Instant paint.
- **Hero:** Light section. Left-aligned headline: "Automate AIFMD II compliance before the deadline." Subtext: "The compliance engine that monitors, validates, and reports — so your team doesn't have to." Below: two buttons — "Book a Demo" (violet fill) and "Watch 2-min Overview" (ghost, opens modal video). Right side: product screenshot in a browser frame, with a subtle gradient mesh animating behind it. Countdown timer in the sticky nav bar — always visible.
- **Scroll behavior:** Framer Motion `whileInView` animations. Elements fade up with 20px translateY and 0.6s duration, but *staggered* — in a grid of 3 cards, the left appears first, middle 100ms later, right 200ms later. This stagger is the difference between "template" and "craft."
- **Social proof:** Two-part. (1) Logo strip: "Trusted by teams managing €XX billion" + logos. (2) Below the fold: rotating testimonial carousel (3 testimonials, auto-rotate every 5s with manual arrows). Each has photo, name, title, company, and a 2-line quote.
- **Feature grid:** 2×3 grid of feature cards. Each card: icon (custom, line-style, violet stroke), headline, 2-line description. Hover: card lifts (translateY -4px), shadow deepens, icon fills with violet. One of the six cards is "highlighted" — larger, spanning 2 columns, containing a mini product screenshot.
- **Product deep-dive (tabbed):** A sticky section where the left side has 3 tabs ("Rule Engine," "Audit Trail," "Reporting"). Clicking a tab swaps the right-side screenshot with a crossfade. As user scrolls, tabs auto-activate sequentially (scroll-triggered tab switching). This is the Stripe playbook.
- **Hash-chain section:** A dedicated visual — animated horizontal chain of blocks, SVG, that builds as user scrolls. Each block has a hash preview. Below: code-style rule example in a styled terminal block.
- **Comparison:** Clean table. Two columns: "Manual Compliance" vs "With Caelith." Rows: Time to audit, Error rate, Regulatory coverage, Cost per report, Scalability. Checkmarks and values. Simple, scannable, effective.
- **Pricing:** Three cards, light background. Violet border on recommended. Toggle: Monthly/Annual. Annual shows savings badge. Below cards: "All plans include SOC 2 compliance, EU data residency, and dedicated onboarding."
- **CTA sections (3 total):** After features, after pricing, and as final section. Each slightly different copy. Final: dark section, white text, "AIFMD II enforcement begins April 15. Your competitors are already preparing." Violet button.
- **Magnetic buttons:** All primary CTAs have subtle magnetic pull — cursor within 80px causes button to drift 4–6px toward cursor. Small detail, big polish signal.
- **FAQ:** Standard accordion. Clean. Fast.
- **Footer:** Full footer — product links, company links, legal links, SOC 2 badge, GDPR badge, newsletter signup, social icons. The footer signals legitimacy.

#### Differentiation from Current

This isn't a radical departure — it's a *competence upgrade*. Same warmth (optional — could keep parchment tones), but with: proper social proof, staggered animations, tabbed product showcase, comparison table, multiple CTA touchpoints, and the magnetic button polish that separates "good" from "premium."

#### Premium Patterns Borrowed

- Stripe: tabbed product showcase, scroll-triggered tab switching, browser-frame screenshots, gradient mesh hero
- Vercel: developer-culture code blocks, clean comparison tables, dark CTA sections
- Linear: magnetic buttons, staggered motion, Inter typography confidence
- good-fella.com: rolling counters, comparison table, CTA layering, FAQ accordion, logo strip, scarcity signals
- Ramp: financial-services trust signals, testimonial carousel, footer completeness

#### Section Breakdown

1. Sticky nav with countdown timer
2. Hero — headline, dual CTA, screenshot + gradient mesh
3. Social proof — logo strip
4. Feature grid — 2×3 cards with one highlighted
5. Product deep-dive — 3-tab sticky showcase
6. Hash-chain visualization — scroll-built SVG + code block
7. Stat counters — 4 metrics, rolling number animation
8. Comparison table — manual vs Caelith
9. Testimonial carousel — 3 rotating quotes
10. Pricing — 3 tiers with monthly/annual toggle
11. CTA mid-page — dark section
12. FAQ accordion
13. Final CTA — urgency-driven, dark section
14. Full footer — links, badges, newsletter, social

#### Estimated Effort: **Medium**

Framer Motion (or GSAP) for stagger animations and magnetic buttons. Tabbed product showcase is straightforward. SVG chain animation is moderate. No WebGL, no heavy scroll pinning. 4–6 weeks with a senior frontend developer.

#### Risk / Tradeoff Analysis

- **Risk:** "This looks like every other SaaS landing page." The violet helps differentiate, but the structure is familiar.
- **Mitigation:** Familiar *converts*. Users know where to look for pricing, how to book a demo, where the FAQ is. Novelty has a cost — usability.
- **Risk:** Inter feels generic if the rest of the craft isn't perfect. It's a font that rewards flawless execution and punishes mediocrity.
- **Mitigation:** Alternatively, keep Space Grotesk. It's just as functional and more distinctive. The concept works with either.
- **Tradeoff:** This is the "safe bet with high floor, moderate ceiling" concept. It will perform well. It won't be remembered. For a compliance product with a ticking deadline, performance matters more than memorability.

---

## 3. Recommendation Matrix

| Concept | Vibe | Risk | Effort | Conversion Confidence | Best For |
|---------|------|------|--------|-----------------------|----------|
| A: The Vault | Dark, precise, premium | Medium | High (6–8 wk) | Medium-High | Technical buyers, quant teams |
| B: The Brief | Editorial, minimal, confident | Low | Low-Med (3–4 wk) | Medium | Content-driven launch, fast timeline |
| C: The War Room | Terminal, data-dense, engineering | High | Very High (8–10 wk) | Medium | Developer-heavy compliance teams |
| D: The Institution | Warm, institutional, trustworthy | Low | Medium (4–5 wk) | High | Conservative enterprise buyers |
| E: The Scroll | Narrative, cinematic, urgent | High | Very High (8–10 wk) | Medium-High | Brand differentiation, memorability |
| **F: The Standard** | **Modern SaaS, polished, proven** | **Low** | **Medium (4–6 wk)** | **Highest** | **Broad audience, deadline-driven conversion** |

## 4. My Take

Julian — if you're optimizing for **conversion before April 15**, ship **Concept F** ("The Standard") with select elements from **Concept D** ("The Institution"): keep the warm parchment palette, add the real testimonials and social proof, use the Stripe-style tabbed showcase, and add magnetic buttons. That hybrid gets you 80% of the premium signal at 40% of the cost of the more experimental concepts.

If you're optimizing for **long-term brand differentiation** and have the timeline/budget, **Concept A** ("The Vault") or **Concept E** ("The Scroll") will make Caelith the most memorable regtech brand in Europe. But they take 8+ weeks and need flawless execution.

**The one non-negotiable across all concepts: add social proof.** Logos, testimonials, or both. Nothing else on this page matters as much as a compliance officer seeing that other compliance officers trust this tool. Get 3–5 client quotes before the redesign ships, even if they're from beta users.

---

*Studio Eleven, New York — February 2026*
*This document is confidential and prepared exclusively for Caelith.*
