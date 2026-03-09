# Daily Strategic Intelligence — Cron Task Instructions

## Purpose
Every morning at 8:30 AM CET, deliver a strategic intelligence brief that stress-tests Caelith's assumptions against real-world developments and gives Julian concrete things to act on TODAY.

## Context Files to Read First
1. `C:\Users\julia\openclaw-workspace\MEMORY.md` — for Caelith's current positioning, features, pricing, strategy
2. `C:\Users\julia\openclaw-workspace\memory\outreach-tracker.md` — pipeline state
3. Any recent `memory/2026-*.md` files from the last 3 days

## Core Assumptions to Test (update these as strategy evolves)

### Product Assumptions
- Small/mid KVGs in Germany are underserved by current compliance tools
- Excel + fund admin bundles are the real competitor, not anevis
- AIFMD II April 16 deadline is a forcing function for buying decisions
- Open-core model (open schemas, paid infrastructure) is the right approach
- Self-service mid-market positioning differentiates from anevis (enterprise/managed)

### Market Assumptions
- 700+ KVGs in BaFin registry = large enough addressable market
- Compliance officers at KVGs have budget authority or strong influence
- €990-3,500/mo pricing is in the right range for mid-market KVGs
- Fund admins are the mid-term scale play (1 deal = €50-200K ARR)
- Late AIFMD II transposers (Spain, Italy etc.) = second wave opportunity

### Business Assumptions
- 3 paying customers achievable within 6 months
- Cold outreach to compliance officers is the right channel
- Germany first → Luxembourg → Ireland is the right expansion sequence
- Accelerator funding (Campus Founders €25K) bridges to first revenue

## Research Steps (every run)

### 1. News Scan
Search for developments from the LAST 24 HOURS on:
- "AIFMD II" — new guidance, transposition updates, enforcement news
- "BaFin KVG" or "BaFin Kapitalverwaltung" — any regulatory actions or announcements
- "ESMA fund reporting" — new standards, consultations, guidance
- "CSSF AIFM" — Luxembourg regulatory updates
- "compliance fintech" or "regtech funding" — new competitors, funding rounds
- "fund administration technology" — market moves in our adjacent space

### 2. Assumption Validation
For each piece of news found, check:
- Does this CONFIRM or CHALLENGE any of our core assumptions above?
- Does this create an OPPORTUNITY we should act on today?
- Does this represent a THREAT we need to respond to?

### 3. Tool & Feature Scan
Search for:
- New open-source regulatory tools or libraries (GitHub, npm, PyPI)
- New APIs or data sources relevant to fund compliance
- AI/LLM applications in compliance or regulatory reporting
- Any tools that could be integrated to increase Caelith's value

### 4. Competitive Moves
Check for:
- anevis solutions — any news, job postings (signal of expansion), partnerships
- New entrants in AIFMD compliance space
- Fund admin platforms adding compliance features (threat of bundling)

## Output Format

Deliver to Discord #research channel in this exact structure:

```
🧠 **Daily Strategic Intel — {date}**

## 🎯 Today's Focus
{1-3 concrete things Julian should prioritize TODAY based on what's happening}

## ✅ Assumptions Confirmed
{Any assumption validated by today's news, with source}

## ⚠️ Assumptions Challenged  
{Any assumption that took a hit, with evidence and recommended response}

## 💡 Opportunities Identified
{New opportunities: pivots to consider, features to build, partnerships to pursue, markets to enter}

## 🔧 Tools & Integrations
{New tools, APIs, libraries, or data sources worth evaluating}

## 🏴 Competitive Moves
{What competitors or adjacent players are doing}

## 📰 Raw Signal
{Brief summary of each news item found, with links}
```

## Rules
- Be SPECIFIC and ACTIONABLE. Not "consider expanding" but "BaFin published X today — update the landing page to reference this by EOD"
- If nothing challenges assumptions, say so — but explain WHY the absence of signal is itself a signal
- If a pivot opportunity is identified, score it: effort (1-5) vs impact (1-5)
- Always connect back to "what should Julian DO today"
- Skip weekends (deliver Mon-Fri only)
- If truly nothing happened in the last 24h, say "quiet day — stay the course" and keep it short
