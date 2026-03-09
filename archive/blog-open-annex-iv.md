# Why We Open-Sourced Our AIFMD Annex IV Engine

The AIFMD II deadline is April 16, 2026. If you manage alternative investment funds in Europe, you already know what that means: every AIFM needs to file Annex IV reports to their national competent authority. Quarterly or annually, depending on AUM thresholds. In XML. Following ESMA's technical standards to the letter.

We just published [open-annex-iv](https://www.npmjs.com/package/open-annex-iv) v1.0 — a zero-dependency TypeScript library that serializes plain JavaScript objects into ESMA-compliant Annex IV XML. It's open source under Apache 2.0. Here's why.

## The problem nobody talks about

Annex IV reporting is one of those regulatory obligations that sounds straightforward until you actually try to implement it. ESMA publishes XSD schemas. You read them. You think "I'll just generate some XML." Then you discover:

- The schema has 200+ element types across three interconnected XSD files
- Field mappings are ambiguous (what exactly is a "PredominantAIFType" code for a German Spezial-AIF?)
- ESMA's sample files are from 2014 and don't cover half the edge cases
- Your NCA has its own interpretation of "optional" fields
- One wrong element order and the whole submission gets rejected

The result? Every fund manager in Europe either pays €15–50K per year for enterprise reporting software, hires consultants to build bespoke XML pipelines, or — and I've seen this more than once — maintains a spreadsheet macro that somehow produces valid XML through sheer force of will.

There's no open-source alternative. We checked. Repeatedly.

## What we built

`open-annex-iv` is the Annex IV serialization engine we extracted from [Caelith](https://caelith.tech), our regulatory compliance platform for EU fund managers. It does one thing well: take a typed report object and produce valid ESMA XML.

```bash
npm install open-annex-iv
```

```typescript
import { serializeAnnexIVToXml } from 'open-annex-iv';

const xml = serializeAnnexIVToXml(report);
// → Valid XML that passes ESMA AIFMD_DATAIF_V1.2.xsd Rev 6
```

The library covers the full Annex IV reporting structure: AIF identification, investor concentration, principal exposures, leverage calculations, liquidity risk profiles, counterparty risk, geographic focus, and depositary information. It handles both single-fund reports and AIFM-level aggregates across multiple funds.

**Technical details:**

- **Zero dependencies.** The entire library is pure TypeScript with no runtime deps. Your bundle stays clean.
- **Pure functions.** No state, no side effects, no database connections. You bring the data, we produce XML.
- **Full type safety.** Every field, every ESMA code, every structure is typed. Your IDE catches errors before ESMA does.
- **XSD validated.** We test against the official ESMA AIFMD_DATAIF_V1.2.xsd Rev 6 schema. 179 tests passing, including full schema validation using `libxmljs2`.
- **ESMA code mappings built in.** Fund types, asset classes, depositary types, reporting frequencies — all mapped to the correct ESMA codes.

## Why give it away?

This is a deliberate business decision, not charity.

XML serialization is commodity infrastructure. Every fund manager needs it. Nobody should have to pay €50K for it. And nobody should have to reverse-engineer ESMA's XSD files for the third time this decade.

The real value in regulatory reporting isn't turning a JavaScript object into XML. It's everything around it:

- **Validation pipelines** that catch errors before submission — cross-field consistency checks, AUM threshold validation, reporting obligation classification
- **Sanctions screening** against EU, UN, and OFAC lists for every counterparty and investor
- **LEI verification** ensuring every Legal Entity Identifier is active and correctly mapped
- **Managed filing** to NCAs — BaFin, CSSF, AMF, CNMV — handling the submission protocols, acknowledgment tracking, and resubmission workflows
- **Audit trails** that satisfy your compliance officer and your regulator

That's what [Caelith](https://caelith.tech) does. The serializer gets your data into XML. The platform makes sure it's correct, compliant, and filed on time.

Open-sourcing the serializer is our open-core strategy. Free the infrastructure, sell the intelligence layer on top.

## The adoption thesis

We're betting that the best way to build a regulatory compliance platform is bottom-up. Not through enterprise sales cycles and RFP responses, but through developers.

If you're a fund administrator building internal tooling, you'll find `open-annex-iv` and save a week of work. When your compliance team asks "can we also do sanctions screening?" or "can we automate the CSSF submission?" — that's when Caelith enters the picture.

Free library → developer adoption → platform conversion. It's the Stripe playbook applied to regulatory compliance.

## What's next

The AIFMD II directive (2024/927) introduces new reporting requirements that take effect in 2026. We're already working on field extensions for the updated schema. The library will evolve with the regulation.

We're also looking at:

- CLI tooling for file-based report generation
- Python bindings for data science teams
- NCA-specific submission format variants

All of this will land in the open-source package.

## Try it

```bash
npm install open-annex-iv
```

The [GitHub repo](https://github.com/julianlaycock/open-annex-iv) has full documentation, type definitions, and example reports. Star it if you find it useful.

If you're a fund manager or fund administrator looking for end-to-end AIFMD compliance — from data ingestion through validation to NCA filing — check out [Caelith](https://caelith.tech).

The deadline is April 2026. The XML schema isn't going to serialize itself.

---

*Julian Laycock is the founder of [Caelith Technologies](https://caelith.tech), building compliance infrastructure for EU alternative investment fund managers.*
