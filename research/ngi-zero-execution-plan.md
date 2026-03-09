# NGI Zero Commons Fund — Execution Plan

**Deadline: April 1, 2026 12:00 CEST (noon)**
**Days remaining: 36**

---

## Parallel Work Assignments

### 🔵 = JULIAN | 🟢 = MATE | 🟡 = BOTH

---

## Phase 1: Research & Architecture (Feb 24-28)

### Day 1-2 (Feb 24-25)

🟢 **MATE: Draft full proposal text** (ready for Julian's review)
- Abstract, budget breakdown, technical approach, ecosystem engagement
- Reference: https://nlnet.nl/propose/ (submission form)
- Reference: https://nlnet.nl/commonsfund/guideforapplicants/ (criteria)

🟢 **MATE: Research existing open-source Annex IV tools**
- Confirm there's genuinely NOTHING out there (validate the "gap" claim)
- Check GitHub, GitLab, npm, PyPI for any ESMA/AIFMD/Annex IV libraries
- Document findings for the "compare with existing efforts" field

🟢 **MATE: Identify additional commons gaps** (see Section below)

🔵 **JULIAN: Review the proposal strategy in `research/ngi-zero-proposal-analysis.md`**
- Decide: which open-source license? (Apache 2.0 recommended, EUPL also valid)
- Decide: project name? (`annex-iv-tools`? `open-annex-iv`? `esma-reporting-toolkit`?)
- Decide: request amount? (€40K recommended, can adjust)

🔵 **JULIAN: Read the Guide for Applicants carefully**
- https://nlnet.nl/commonsfund/guideforapplicants/
- https://nlnet.nl/commonsfund/faq/
- https://nlnet.nl/commonsfund/eligibility/

### Day 3-4 (Feb 26-27)

🟢 **MATE: Extract Annex IV code from Caelith into standalone library structure**
- Create `annex-iv-tools/` directory with clean separation
- Ensure it has NO dependency on Caelith's proprietary code
- Set up package.json, TypeScript config, basic README

🟢 **MATE: Download ESMA XSD schema and validate current XML output**
- Get schema from ESMA technical guidance
- Run validation, document any issues
- This proves technical feasibility for the proposal

🔵 **JULIAN: Write your version of the abstract** (in your own words)
- The form asks: "Can you explain the whole project and its expected outcome(s)"
- Write 300-500 words. Be concrete about WHAT you'll build.
- Don't overthink it — they say "our reviewers don't care about spelling errors, only about great ideas"

🟡 **BOTH: Review & iterate on proposal draft**

### Day 5 (Feb 28)

🟡 **BOTH: Finalize proposal draft v1**
- All form fields filled
- Budget breakdown with milestones
- Technical approach documented

---

## Phase 2: Polish & Validate (Mar 1-15)

### Week of Mar 1-7

🟢 **MATE: Build proof-of-concept standalone library**
- Working npm package that generates Annex IV XML independently
- Basic test suite proving XSD validation
- This becomes an attachment / evidence of feasibility

🔵 **JULIAN: Create GitHub repo for the open-source project**
- Public repo (can be empty initially, or with skeleton)
- Add LICENSE (Apache 2.0)
- Link in proposal under "Website / wiki"

🔵 **JULIAN: Write the "ecosystem engagement" section**
- How will you promote this? (BVI events, LinkedIn, ESMA community)
- Who else benefits? (Fund admins, compliance consultants, other RegTech)
- Will you engage with ESMA on standards?

### Week of Mar 8-14

🟢 **MATE: Prepare budget attachment** (optional but recommended)
- Detailed breakdown: hours × rate for each milestone
- Make rates explicit (they ask for this)
- Keep rates reasonable — NGI Zero funds individual developers, not consultancies

🟡 **BOTH: Full proposal review — stress test every claim**
- Does it align with NGI vision? https://nlnet.nl/NGI/vision
- Is the European dimension clear?
- Is it standalone (not dependent on proprietary Caelith)?
- Is every technical claim verifiable?

---

## Phase 3: Submit (Mar 15-31)

### Mar 15-25

🔵 **JULIAN: Final rewrite of proposal in your voice**
- The reviewers want to hear from YOU, not an AI
- Keep it concrete, technical, direct
- "Don't waste too much time on this. Really." (their words about attachments)

🟢 **MATE: Prepare GenAI disclosure**
- Log of all AI-assisted research (this conversation, sub-agent outputs)
- Dates, prompts, outputs — they require this if GenAI was used
- Be transparent — they respect honesty

### Mar 25-31

🟡 **BOTH: Final review**
- One last pass for accuracy, completeness, alignment with call

🔵 **JULIAN: Submit at https://nlnet.nl/propose/**
- Select: "NGI0 Commons Fund"
- Fill all fields
- Attach: budget breakdown (PDF), any supporting docs
- Attach: GenAI disclosure log
- ⚠️ Submit by **April 1, 12:00 CEST** — don't wait until the last hour

---

## Key Links

| What | URL |
|------|-----|
| **Submit proposal** | https://nlnet.nl/propose/ |
| **Guide for Applicants** | https://nlnet.nl/commonsfund/guideforapplicants/ |
| **FAQ** | https://nlnet.nl/commonsfund/faq/ |
| **Eligibility** | https://nlnet.nl/commonsfund/eligibility/ |
| **Funded projects (examples)** | https://nlnet.nl/thema/NGI0CommonsFund.html |
| **NGI Vision (must align)** | https://nlnet.nl/NGI/vision |
| **GenAI policy** | https://nlnet.nl/foundation/policies/generativeAI/ |
| **Sample MoU** | https://nlnet.nl/foundation/request/sample_MoU.pdf |
| **Main fund page** | https://nlnet.nl/commonsfund/ |
| **ESMA AIFMD reporting** | https://www.esma.europa.eu/databases-library/esma-library (search Annex IV) |
| **CORDIS project page** | https://cordis.europa.eu/project/id/101092990 |

---

## Additional Commons Gaps (Potential Future Proposals)

### Gap 1: `eu-regulatory-calendar` — Open EU Fund Regulatory Deadline Tracker
**What:** Structured, machine-readable dataset of ALL EU fund regulatory deadlines — AIFMD II transposition dates per country, Annex IV filing windows, SFDR reporting dates, DORA deadlines, ELTIF 2.0 dates, national NCA-specific deadlines.
**Why it's a gap:** This information is scattered across 27 NCA websites, ESMA publications, and EUR-Lex. No single open dataset exists. Fund managers manually track this in spreadsheets.
**Format:** JSON/YAML dataset + simple web viewer + iCal feed
**NGI fit:** Open data, EU digital sovereignty, transparency in regulation
**Benefit to Caelith:** Powers the compliance calendar feature; positions Caelith as the reference source
**Estimated ask:** €15-20K

### Gap 2: `esma-register-api` — Open-Source Client for ESMA Public Registers
**What:** TypeScript/Python library to query ESMA's public AIFM Register, AIF Register, and MiFID Register. These are publicly accessible databases but have no proper API or developer tooling.
**Why it's a gap:** ESMA publishes register data but the interface is clunky web forms. No programmatic access exists. Researchers, journalists, regulators, and compliance tools all need this data.
**Format:** npm/PyPI package with typed responses
**NGI fit:** Open data access, transparency, accountability in financial regulation
**Benefit to Caelith:** Auto-populate fund/AIFM data from ESMA registers; validate regulatory IDs
**Estimated ask:** €15-20K

### Gap 3: `aifmd-compliance-rules` — Open Compliance Rule Engine for EU Fund Regulation
**What:** Machine-readable rule definitions for AIFMD/KAGB/UCITS compliance checks. E.g., "An AIFM managing leveraged AIFs must report quarterly" encoded as structured rules that any system can evaluate.
**Format:** JSON/YAML rule definitions + TypeScript evaluation engine
**Why it's a gap:** Every compliance tool reinvents these rules internally. No shared, auditable, open-source rule set exists. Regulators and industry could validate and contribute.
**NGI fit:** Regulatory transparency, standards, reducing cost of compliance for SMEs
**Benefit to Caelith:** Powers the compliance monitoring engine; community-validated rules = trust
**Estimated ask:** €25-35K

### Recommendation: Start with `annex-iv-tools` (€40K)
If successful → apply for Gap 1 or Gap 2 in the next round (they have calls every 2 months). The lifetime cap per applicant is €500K — plenty of room to grow.
