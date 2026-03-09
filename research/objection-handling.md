# Objection Handling — Caelith Investor & Sales Conversations

---

## 1. "You're too early / no customers yet"

**Reframe:** Early for you means early-mover advantage for your portfolio companies.

**Evidence:**
- AIFMD II enforcement is April 12, 2026 — 44 days. The market can't wait for us to be "mature."
- Open-source package (open-annex-iv) already in use by developers — proves technical credibility.
- We're building in public with real regulatory schema compliance, not a mockup.
- Every compliance SaaS that's now dominant (Alloy, ComplyAdvantage, Sumsub) looked "too early" 18 months before their regulatory catalyst.

**Close:** "What specific milestones would move this from 'too early' to 'right time' for Finch? Let me hit them and come back."

---

## 2. "We already use anevis"

**Reframe:** Anevis is a reporting factory. Caelith is a compliance platform.

**Evidence:**
- Anevis is a managed service — you send them data, they generate reports. No self-serve, no API, no real-time screening.
- Anevis targets large asset managers and banks (Quintet, DJE Kapital, Bantleon). Their model doesn't scale down to sub-€500M AIFMs.
- No public API documentation. No open-source anything. No developer ecosystem.
- Anevis covers Annex IV as one of ~15 report types. We go deep on AIFMD II end-to-end: screening, classification, checklists, deadlines — not just the XML.

**Close:** "We're not competing with anevis on factsheets and PRIIPs KIDs. We're building the compliance OS for AIFMD II specifically. Different ICP, different architecture."

---

## 3. "We outsource compliance to our fund admin"

**Reframe:** Your fund admin outsources the hard parts too — and charges you for the privilege.

**Evidence:**
- Fund admins use the same legacy tools (or manual processes) under the hood. You're paying a margin on top of inefficiency.
- AIFMD II introduces new obligations (semi-professional investor classification, enhanced Annex IV) that many fund admins aren't ready for yet.
- With Caelith, you can verify your fund admin's work independently. Trust but verify.
- Trend: post-Wirecard, post-FTX, regulators want AIFMs to own their compliance — not blindly delegate.

**Close:** "Even if you keep your fund admin, Caelith gives you oversight. Think of it as compliance insurance — you see what they're filing before it goes to your NCA."

---

## 4. "What's your moat? Can't someone just copy this?"

**Reframe:** Can someone copy Stripe's API? Technically yes. Will they? The moat is execution speed + developer adoption + regulatory depth.

**Evidence:**
- Open-source Annex IV package creates developer lock-in and community — copying the code doesn't copy the ecosystem.
- Regulatory compliance requires deep domain expertise (ESMA schemas, NCA-specific quirks, sanctions list integration). This isn't a weekend project.
- First-mover into API-first AIFMD II tooling. Legacy players (anevis, Kneip, FE fundinfo) are architecturally incapable of shipping APIs at this speed.
- Network effects: every fund manager on the platform improves our data models and classification accuracy.

**Close:** "Our moat is the same as every vertical SaaS winner: go deep on a specific pain point before generalists notice. By the time they do, we own the workflow."

---

## 5. "Why would I trust a startup with regulatory filings?"

**Reframe:** You're not trusting us — you're trusting the ESMA schema validator and your own review.

**Evidence:**
- Annex IV XML is schema-validated against official ESMA technical standards. If it's invalid, the system rejects it before you ever see it.
- We provide audit trails for every action — screening, classification, generation. More traceable than email-based processes.
- Open-source core means you can inspect the logic. No black box.
- Fund managers still review and submit filings themselves. We generate; you approve. Same as using any tool.

**Close:** "Would you rather trust a spreadsheet with no validation, or a platform that enforces the schema and logs every step?"

---

## 6. "€990/mo is too expensive for what we get"

**Reframe:** €990/mo vs. what you're paying now.

**Evidence:**
- A compliance consultant charges €200–400/hour. One Annex IV filing takes 2–3 days manually = €3,200–9,600 per filing.
- Even one avoided regulatory fine pays for 10 years of Caelith. AIFMD fines start at €5M or 10% of annual turnover.
- €990/mo is €33/day. Less than a junior analyst's lunch budget in Luxembourg.
- Comparable vertical compliance SaaS (ComplyAdvantage, Sumsub, Alloy) charge €2,000–10,000/mo. We're positioned as the affordable entry point.

**Close:** "What's your current annual spend on AIFMD compliance — consultants, fund admin fees, internal time? I'd bet it's 10x our annual price."

---

## 7. "We'll wait until after AIFMD II deadline to evaluate"

**Reframe:** After April 12th, you're non-compliant. Regulators don't give grace periods for "evaluating tools."

**Evidence:**
- AIFMD II isn't optional. NCAs can and will enforce from day one — especially high-profile violations.
- Post-deadline, every AIFM will scramble simultaneously. Consultants will be booked out. Anevis has a 3-month onboarding cycle.
- Caelith can get you compliant in days, not months. But the earlier you start, the smoother the transition.
- Early adopters get white-glove onboarding and influence the product roadmap.

**Close:** "I understand wanting to wait. But the funds that wait will be the ones paying emergency consulting fees in May. The ones that act now will be filing clean on day one."

---

## 8. "How is this different from just using Excel?"

**Reframe:** How is Stripe different from a bank wire form?

**Evidence:**
- Excel can't: validate against ESMA XML schemas, screen against live sanctions lists, classify investors against AIFMD II criteria, generate audit trails, or update when regulations change.
- Excel errors in regulatory filings are the #1 cause of resubmissions and NCA scrutiny.
- AIFMD II adds complexity: new Annex IV fields, new investor categories, new reporting thresholds. Your spreadsheet doesn't know about these changes.
- Caelith stays current with regulatory updates automatically. Your Excel is frozen in time.

**Close:** "Excel works until it doesn't — and when it doesn't, it's a regulatory breach, not a formatting issue. We eliminate that risk."

---

## 9. "We need enterprise features (SSO, SLA, on-prem)"

**Reframe:** Totally fair. That's our Enterprise tier, and we're building to those specs.

**Evidence:**
- SSO (SAML/OIDC) is on the roadmap for Q3 2026 — if you need it sooner, we'll prioritize for a design partner.
- SLA: we offer 99.9% uptime commitment on Enterprise tier today.
- On-prem: our API architecture supports self-hosted deployment. We can discuss this for large-scale deployments.
- Many enterprise features are table stakes we'll ship as we grow. The question is: does the core product solve your problem today?

**Close:** "Let's separate 'must-have for pilot' from 'must-have for enterprise rollout.' We can start with the core product and add enterprise features as we scale together."

---

## 10. "AI will make compliance software obsolete"

**Reframe:** AI makes compliance software *better*, not obsolete. You still need structured output that regulators accept.

**Evidence:**
- Regulators don't accept ChatGPT output. They accept XML files that conform to specific schemas, with audit trails and data provenance.
- AI is great at: reading regulations, suggesting classifications, flagging anomalies. We use AI for exactly this — inside the platform.
- AI is terrible at: generating valid Annex IV XML, maintaining sanctions list freshness, providing legally defensible audit trails.
- The winning play is AI + structured compliance tooling. That's what Caelith is building. Pure AI without structure = liability.

**Close:** "We agree AI changes compliance. That's why we're embedding it — our screening uses fuzzy matching, our classification uses rule engines enhanced by ML. But the output is always structured, validated, and auditable. That's what regulators require."
