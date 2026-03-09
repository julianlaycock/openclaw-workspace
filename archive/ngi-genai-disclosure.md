# GenAI Disclosure — open-annex-iv NGI Zero Commons Fund Proposal

**Model:** Claude (Anthropic, claude-opus-4-6) via OpenClaw CLI assistant
**Dates:** February 24, 2026
**Applicant:** Julian Laycock

---

## Session: Proposal Drafting (2026-02-24, 15:16–16:26 CET)

### Prompt 1 (15:42)
**Purpose:** Draft abstract for NGI Zero application form
**Prompt:** "yes" (in response to assistant offering to draft the Abstract field)
**Context:** Assistant had full context of the open-annex-iv project from prior conversation (library structure, codebase, research documents on GTM strategy and NGI proposal analysis)
**Output:** ~320 word abstract covering the problem (no open-source Annex IV tools), the prototype status (31 passing tests), and proposed funded work (XSD validation, CLI, AIFMD II extensions, multi-NCA docs). Applicant requested condensing to 1200 chars max.
**Edit:** Condensed to ~780 characters. Approved by applicant without further changes.

### Prompt 2 (15:53)
**Purpose:** Draft "relevant experience" section
**Prompt:** Applicant provided link to BaFin MVP Portal web service handbook PDF and stated "i worked in this project at capgemini in 2020-2022"
**Output:** Initial short draft (~350 chars). Applicant requested longer, more technical version (max 2500 chars). Applicant then provided detailed bullet points of actual engineering work performed (SOAP integration, XML generation, ETL pipelines, testing).
**Edit:** Assistant structured applicant's bullet points into narrative prose (~2,350 chars). Approved by applicant without changes.

### Prompt 3 (15:59)
**Purpose:** Draft budget breakdown
**Prompt:** "approve, next question" (continuing through form fields)
**Output:** Milestone-based budget at €65/hr for €40K total. Applicant corrected rate to €100/hr, then requested increasing to €50K (maximum allowed).
**Edit:** Redistributed to 7 milestones totaling €50,000 at €100/hr (500 hours). Approved by applicant.

### Prompt 4 (16:05)
**Purpose:** Draft "compare with existing efforts" section
**Prompt:** "Compare your own project with existing or historical efforts"
**Output:** ~1,850 character comparison covering proprietary vendors (anevis, Deloitte, KNEIP), in-house solutions at fund administrators, adjacent open-source (XBRL tools), and differentiation points.
**Edit:** Approved by applicant without changes.

### Prompt 5 (16:11)
**Purpose:** Draft "technical challenges" section
**Prompt:** Applicant requested ~2000 chars, "make sure they get that we are technically 10 steps ahead"
**Output:** ~2,050 characters covering schema complexity, NCA-specific divergence, validation error quality, AIFMD II forward-compatibility, and code list maintenance.
**Edit:** Approved by applicant without changes.

### Prompt 6 (16:15)
**Purpose:** Draft "ecosystem and engagement" section
**Prompt:** "make sure it looks like a human wrote it, break with ai writing patterns"
**Output:** ~1,650 characters describing three user groups, direct KVG outreach already underway, npm publishing, technical blog content, and regtech community engagement.
**Edit:** Approved by applicant without changes.

### Prompt 7 (16:21)
**Purpose:** Generate sample XML attachment
**Prompt:** "yes" (in response to offer to generate sample XML)
**Output:** Ran the open-annex-iv library to produce a realistic Annex IV XML file for a fictional German Spezial-AIF (€280M AUM, 18 investors, BaFin reporting). Output saved as ngi-attachment-sample-annex-iv.xml.
**Edit:** No changes to generated XML.

### Prompt 8 (16:22)
**Purpose:** Draft GenAI disclosure text
**Prompt:** Continuation of form field walkthrough
**Output:** Short disclosure paragraph identifying model, usage scope, and review process.
**Edit:** Approved by applicant.

---

## Codebase Assistance (2026-02-24, 15:16–15:31 CET)

The AI assistant also helped with:
- Updating package.json repository URL for the open-annex-iv GitHub repo
- Writing the README.md for the public repository
- Creating .gitignore for the standalone repo
- Providing git commands for cloning, copying, and pushing the repo
- Troubleshooting GitHub org permissions and push authentication

The open-annex-iv library code (serializer, types, helpers, tests) was written in a prior session (2026-02-22/23) with AI assistance as part of the Caelith project development.

---

## Summary

All proposal text was generated collaboratively: the applicant provided direction, constraints, domain expertise, and detailed technical input (especially the Capgemini experience section). The AI assistant structured, drafted, and iterated. Every section was reviewed and explicitly approved by the applicant before inclusion in the submission.
