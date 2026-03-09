# Open-Source AI/NLP, Workflow & UX Tools for Caelith

> Research completed 2026-02-25 | For Caelith compliance platform (Next.js + Express + PostgreSQL)

---

## 1. Regulatory NLP & Text Analysis

### 🏆 Recommended: Hugging Face Legal Models + Custom Pipeline

There's no single "regulatory NLP platform" in open source. The best approach is composing from these:

#### a) **LegalBERT / InLegalBERT**
- **Source:** `nlpaueb/legal-bert-base-uncased` on Hugging Face
- **Stars/Activity:** Very active in academic NLP; thousands of citations
- **What it does:** Pre-trained BERT models on legal corpora (EU legislation, court cases). Can be fine-tuned for: obligation extraction, clause classification, regulatory entity recognition
- **Caelith integration:** Fine-tune on AIFMD II / KAGB text to classify obligations, extract deadlines, identify regulatory entities. Run via a Python microservice called from Express backend
- **License:** MIT (model weights)
- **Maturity:** Production-ready for classification tasks; requires fine-tuning for regulatory domain

#### b) **spaCy + custom NER pipeline**
- **GitHub:** https://github.com/explosion/spaCy (~31k ⭐)
- **What it does:** Industrial-strength NLP library. Train custom entity recognizers for regulatory concepts (deadlines, fund types, obligation verbs, BaFin references)
- **Caelith integration:** Python microservice that processes regulation PDFs. Extract structured obligations → store in PostgreSQL. Expose via REST API
- **License:** MIT
- **Maturity:** Very mature, production-grade

#### c) **diff-match-patch** (for regulation version tracking)
- **GitHub:** https://github.com/google/diff-match-patch (~7k ⭐)
- **What it does:** Robust text diffing library. Track changes between regulation versions (e.g., AIFMD I vs AIFMD II)
- **Caelith integration:** Highlight regulatory changes for compliance officers. Show "what changed" between regulation versions in the UI
- **License:** Apache 2.0
- **Maturity:** Very mature, Google-maintained

---

## 2. PDF Report Generation

### 🏆 Recommended: Puppeteer/Playwright HTML→PDF + pdf-lib for manipulation

#### a) **Puppeteer** (HTML → PDF)
- **GitHub:** https://github.com/puppeteer/puppeteer (~93.6k ⭐)
- **What it does:** Headless Chrome API. Render HTML/CSS templates as pixel-perfect PDFs with charts, tables, headers, footers, branded layouts
- **Caelith integration:** Design Annex IV reports, compliance summaries, audit bundles as HTML templates (can use React/Next.js SSR). Render to PDF server-side. Supports charts via embedded Chart.js/D3 in HTML
- **License:** Apache 2.0
- **Maturity:** Extremely mature, Google-maintained

#### b) **pdf-lib**
- **GitHub:** https://github.com/Hopding/pdf-lib (~7k ⭐)
- **What it does:** Create and modify PDFs in pure JavaScript (Node + browser). Add text, images, pages, forms, metadata. Merge PDFs
- **Caelith integration:** Post-process PDFs: add digital stamps, page numbers, merge multiple reports into audit bundles, fill PDF form templates, add watermarks
- **License:** MIT
- **Maturity:** Mature, stable API, works in any JS environment

#### c) **react-pdf (@react-pdf/renderer)**
- **GitHub:** https://github.com/diegomura/react-pdf (~15k ⭐)
- **What it does:** Build PDFs using React components with a flexbox-like layout model. Write JSX → get PDF
- **Caelith integration:** Since Caelith is React/Next.js, your team can write PDF templates in the same language as the UI. Define Annex IV report layout as React components. Include styled tables, headers, logos
- **License:** MIT
- **Maturity:** Mature, actively maintained

#### d) **Typst** (alternative for complex documents)
- **GitHub:** https://github.com/typst/typst (~38k ⭐)
- **What it does:** Modern typesetting system (LaTeX alternative). Produces professional, publication-quality PDFs from markup
- **Caelith integration:** For complex regulatory reports with precise formatting requirements. Template-based approach. Has a Rust core with WASM compilation possible
- **License:** Apache 2.0
- **Maturity:** Rapidly maturing, very active development

---

## 3. Workflow / Task Management Engines

### 🏆 Recommended: bpmn-engine (JS-native) or n8n (self-hosted automation)

#### a) **bpmn-engine**
- **GitHub:** https://github.com/paed01/bpmn-engine (~1k ⭐)
- **What it does:** Pure JavaScript BPMN 2.0 execution engine. Supports user tasks, service tasks, gateways, timers, sub-processes. Embeddable in Node.js
- **Caelith integration:** **Best fit for Caelith.** Embed directly in Express backend. Model compliance workflows as BPMN: "Annex IV due → data collection task → review task → approval → submission". Persist state to PostgreSQL. Lightweight, no JVM needed
- **License:** MIT
- **Maturity:** Active, well-tested, BPMN 2.0 compliant

#### b) **n8n**
- **GitHub:** https://github.com/n8n-io/n8n (~53k ⭐)
- **What it does:** Workflow automation platform with 400+ integrations, visual builder, AI capabilities. Self-hostable
- **Caelith integration:** Use for background automations: email notifications, calendar sync, BaFin API integration, deadline monitoring. Visual workflow editor for compliance admins. Connect to Caelith via webhooks/API
- **License:** Sustainable Use License (fair-code, **not pure OSS** — free for self-hosting but restrictions on competing products)
- **Maturity:** Very mature, enterprise-ready

#### c) **BullMQ** (task queue/scheduler)
- **GitHub:** https://github.com/taskforcesh/bullmq (~6k ⭐)
- **What it does:** Redis-based message queue for Node.js. Job scheduling, retries, rate limiting, delayed jobs, cron-like repeatable jobs
- **Caelith integration:** Schedule compliance deadlines: "Run Annex IV check every quarter", "Send reminder 30 days before filing deadline". Pair with bpmn-engine for task execution
- **License:** MIT
- **Maturity:** Very mature, production-proven

#### d) **Temporal** (durable workflow engine)
- **GitHub:** https://github.com/temporalio/temporal (~12k ⭐)
- **What it does:** Durable execution platform. Long-running workflows that survive failures. Has TypeScript SDK
- **Caelith integration:** For complex multi-step compliance workflows that span days/weeks (quarterly filing processes). Overkill for simple tasks, great for mission-critical flows
- **License:** MIT
- **Maturity:** Very mature, used at Netflix, Uber scale

---

## 4. Notification & Alerting

### 🏆 Recommended: Novu + BullMQ cron jobs

#### a) **Novu**
- **GitHub:** https://github.com/novuhq/novu (~35k ⭐)
- **What it does:** Open-source notification infrastructure. Multi-channel: email, SMS, push, in-app, chat. Template engine, preference management, digest/batching
- **Caelith integration:** Central notification hub for Caelith. Send deadline reminders via email + in-app. Let KVG users configure notification preferences. Digest weekly compliance summaries. Has Node.js SDK
- **License:** MIT
- **Maturity:** Mature, well-funded, actively developed

#### b) **Cal.com** (calendar integration)
- **GitHub:** https://github.com/calcom/cal.com (~34k ⭐)
- **What it does:** Open-source scheduling platform with calendar integration (Google Cal, Outlook, CalDAV)
- **Caelith integration:** Sync compliance deadlines to users' calendars. Embed scheduling for compliance review meetings. iCal feed generation for regulatory deadlines
- **License:** AGPLv3 (⚠️ copyleft — use via API only to avoid license infection)
- **Maturity:** Very mature

#### c) **node-cron + custom deadline service**
- **GitHub:** https://github.com/node-cron/node-cron (~3k ⭐)
- **What it does:** Cron-like job scheduler for Node.js
- **Caelith integration:** Simple approach: store deadlines in PostgreSQL, run cron jobs to check approaching deadlines, trigger Novu notifications. Lightweight, no external dependency
- **License:** ISC (MIT-compatible)
- **Maturity:** Mature, simple

---

## 5. Data Visualization for Compliance

### 🏆 Recommended: Recharts (primary) + D3.js (custom visualizations)

#### a) **Recharts**
- **GitHub:** https://github.com/recharts/recharts (~24k ⭐)
- **What it does:** React-based charting library built on D3. Composable, declarative charts: bar, line, area, pie, radar, treemap, heatmap
- **Caelith integration:** **Best fit for Next.js stack.** Build compliance dashboards: filing status bars, risk score trends, AUM breakdown pies, deadline timeline charts. Composable React components match your stack perfectly
- **License:** MIT
- **Maturity:** Very mature, widely used

#### b) **Apache ECharts**
- **GitHub:** https://github.com/apache/echarts (~62k ⭐)
- **What it does:** Enterprise-grade charting library. Massive feature set: heatmaps, Sankey diagrams, gauges, treemaps, 3D charts. Great for financial dashboards
- **Caelith integration:** For more complex visualizations: risk heatmaps, compliance score gauges, fund flow Sankey diagrams. Has React wrapper. Better for data-dense financial dashboards than Recharts
- **License:** Apache 2.0
- **Maturity:** Extremely mature, Apache Foundation project

#### c) **Nivo**
- **GitHub:** https://github.com/plouc/nivo (~13k ⭐)
- **What it does:** React data visualization components built on D3. Beautiful defaults, great for dashboards. Includes: heatmap, waffle, radar, bump charts
- **Caelith integration:** Particularly good for compliance scorecards (waffle charts), risk matrices (heatmaps), and comparative dashboards. Server-side rendering support for PDF generation
- **License:** MIT
- **Maturity:** Mature, actively maintained

#### d) **TanStack Table** (for data tables)
- **GitHub:** https://github.com/TanStack/table (~26k ⭐)
- **What it does:** Headless table/datagrid library. Sorting, filtering, pagination, grouping, column pinning
- **Caelith integration:** Investor tables, fund listings, compliance checklists, audit logs. Headless = full styling control with your design system
- **License:** MIT
- **Maturity:** Very mature

---

## 6. E-Signature & Document Signing

### 🏆 Recommended: DocuSeal

#### a) **DocuSeal**
- **GitHub:** https://github.com/docusealco/docuseal (~8k ⭐)
- **What it does:** Open-source DocuSign alternative. PDF form builder (WYSIWYG), 12 field types including signature, multi-submitter documents, automated emails, API + webhooks, mobile-optimized
- **Caelith integration:** **Excellent fit.** Self-host alongside Caelith. Sign compliance documents, board resolutions, regulatory filings. Embed signing forms in Caelith UI via React/Angular/Vue components. API integration for programmatic document creation. PostgreSQL storage compatible
- **License:** AGPLv3 (⚠️ copyleft — but self-hosted as separate service avoids license issues. Pro features available commercially)
- **Maturity:** Mature, actively maintained, Docker deployment

#### b) **OpenSign**
- **GitHub:** https://github.com/OpenSignLabs/OpenSign (~8k ⭐)
- **What it does:** Another DocuSign alternative. PDF signing, templates, audit trails, API
- **Caelith integration:** Similar to DocuSeal. Less mature but fully open source. Good backup option
- **License:** AGPLv3
- **Maturity:** Growing, less mature than DocuSeal

---

## 7. Multi-Tenant SaaS Infrastructure

### 🏆 Recommended: Lago (billing) + PostgreSQL Row-Level Security (tenancy)

#### a) **Lago**
- **GitHub:** https://github.com/getlago/lago (~9k ⭐)
- **What it does:** Open-source metering & usage-based billing. Event-based metering, subscription plans, coupons, invoicing, prepaid credits, payment orchestration (Stripe, GoCardless, Adyen)
- **Caelith integration:** **Critical for SaaS monetization.** Meter per-KVG usage (funds managed, reports generated, API calls). Tiered subscription plans (Starter/Professional/Enterprise). Automated invoicing. Self-hostable
- **License:** AGPLv3 (⚠️ use as separate service)
- **Maturity:** Mature, YC-backed, production-ready

#### b) **PostgreSQL Row-Level Security (RLS)** — built-in
- **What it does:** Native Postgres feature for tenant data isolation. Each query automatically filtered by tenant_id
- **Caelith integration:** **Already in your stack.** Add `tenant_id` to all tables, enable RLS policies. Zero additional infrastructure. Battle-tested approach used by Supabase, Neon, etc.
- **License:** PostgreSQL License (permissive)
- **Maturity:** Extremely mature

#### c) **Keycloak** (identity/auth for multi-tenant)
- **GitHub:** https://github.com/keycloak/keycloak (~25k ⭐)
- **What it does:** Open-source identity and access management. SSO, OIDC, SAML, multi-realm (one realm per tenant), user federation, fine-grained authorization
- **Caelith integration:** Each KVG = one Keycloak realm. User management, role-based access (Compliance Officer, Fund Manager, Auditor, Admin). SSO for enterprise KVGs. Integrates with Express via passport-openidconnect
- **License:** Apache 2.0
- **Maturity:** Extremely mature, Red Hat-backed

---

## 8. AI Copilot Enhancement (RAG)

### 🏆 Recommended: LangChain.js + Qdrant + Sentence Transformers

#### a) **LangChain.js**
- **GitHub:** https://github.com/langchain-ai/langchainjs (~13k ⭐)
- **What it does:** TypeScript/JavaScript framework for building LLM applications. Chains, agents, RAG pipelines, tool use, memory. 100+ integrations
- **Caelith integration:** **Best fit — native to your stack.** Build the compliance copilot RAG pipeline entirely in TypeScript. Ingest AIFMD II, KAGB, ELTIF 2.0 texts → chunk → embed → store in vector DB → retrieve relevant context → generate answers. LangGraph.js for multi-step agent reasoning
- **License:** MIT
- **Maturity:** Mature, extremely active, well-documented

#### b) **Qdrant**
- **GitHub:** https://github.com/qdrant/qdrant (~22k ⭐)
- **What it does:** High-performance vector database written in Rust. Filtering, payload storage, multi-tenancy, horizontal scaling. REST + gRPC APIs
- **Caelith integration:** Store regulatory document embeddings. Filter by regulation type, date, jurisdiction. Multi-tenant support built in (one collection per KVG or filtered by payload). Has JS client. Docker deployment
- **License:** Apache 2.0
- **Maturity:** Very mature, production-ready

#### c) **ChromaDB** (simpler alternative)
- **GitHub:** https://github.com/chroma-core/chroma (~16k ⭐)
- **What it does:** Simple vector database optimized for AI applications. Python + JS clients. In-memory or persistent. Auto-handles embedding
- **Caelith integration:** Simpler than Qdrant, good for prototyping. Embed and query regulatory documents. May not scale as well for production multi-tenant usage
- **License:** Apache 2.0
- **Maturity:** Mature for dev/small-scale, Qdrant better for production

#### d) **LlamaIndex.TS**
- **GitHub:** https://github.com/run-llama/LlamaIndexTS (~3k ⭐)
- **What it does:** TypeScript data framework for LLM applications. Document loaders, indexes, query engines, agents. Strong on document ingestion and structured extraction
- **Caelith integration:** Alternative to LangChain.js. Stronger on document parsing (PDF regulations) and structured extraction (extracting compliance obligations from text). LlamaParse for complex PDF processing
- **License:** MIT
- **Maturity:** Growing, good but less ecosystem than LangChain.js

#### e) **Embedding Models (self-hosted)**
- **multilingual-e5-large** or **BGE-M3** from Hugging Face — run via Ollama or TEI (Text Embeddings Inference)
- **GitHub (TEI):** https://github.com/huggingface/text-embeddings-inference (~3k ⭐)
- **What it does:** Run embedding models locally. No API costs, data stays on-premise (important for German compliance data!)
- **Caelith integration:** Embed regulatory texts in German without sending data to OpenAI. Multilingual models handle EU regulation text in DE/EN. Run alongside Qdrant in Docker
- **License:** Apache 2.0
- **Maturity:** Production-ready

---

## Priority Implementation Roadmap

| Phase | Tools | Impact |
|-------|-------|--------|
| **Phase 1 (MVP)** | LangChain.js + Qdrant + TEI (copilot), Recharts + TanStack Table (dashboard), BullMQ (task scheduling), PostgreSQL RLS (multi-tenancy) | Core product differentiation |
| **Phase 2 (Beta)** | bpmn-engine (compliance workflows), Puppeteer + react-pdf (PDF reports), Novu (notifications) | Workflow automation |
| **Phase 3 (Launch)** | DocuSeal (e-signatures), Lago (billing/metering), Keycloak (enterprise auth) | SaaS monetization |
| **Phase 4 (Scale)** | spaCy + LegalBERT (regulatory NLP), Apache ECharts (advanced viz), Temporal (complex workflows) | Advanced AI features |

---

## License Summary

| Tool | License | Safe for Commercial SaaS? |
|------|---------|--------------------------|
| LangChain.js | MIT | ✅ Yes |
| Qdrant | Apache 2.0 | ✅ Yes |
| bpmn-engine | MIT | ✅ Yes |
| Recharts | MIT | ✅ Yes |
| pdf-lib | MIT | ✅ Yes |
| BullMQ | MIT | ✅ Yes |
| Novu | MIT | ✅ Yes |
| Keycloak | Apache 2.0 | ✅ Yes |
| Puppeteer | Apache 2.0 | ✅ Yes |
| TanStack Table | MIT | ✅ Yes |
| DocuSeal | AGPLv3 | ⚠️ Self-host as separate service |
| Lago | AGPLv3 | ⚠️ Self-host as separate service |
| n8n | Sustainable Use | ⚠️ Check restrictions |
| Cal.com | AGPLv3 | ⚠️ Use via API only |
