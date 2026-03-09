# USER.md - About Your Human

- **Name:** Julian
- **What to call them:** Julian
- **Timezone:** Europe/Berlin (GMT+1)
- **Role:** CEO of Caelith

## Context

- Building Caelith — dashboard product (Next.js frontend on localhost:3000, backend on localhost:3001)
- Serial entrepreneur — multiple business ventures
- Values: efficiency, best practices, critical thinking, mutual pushback
- Doesn't want filler or hand-holding — wants a sharp co-pilot

## Working Style — What Julian Does Well

- **Delegates with trust**: Gives the problem, not a recipe. "Design 4 options and ping me" — lets me figure out the how
- **Strong product instincts**: Knows what UX patterns work, makes good design calls (e.g. moving toggles into settings for cleaner UI)
- **Demands quality at the right moments**: "Iterate 5 times until zero bugs" before a demo — knows when to be rigorous
- **Fast context-switcher**: Can handle an investor email mid-feature-build without losing the thread
- **Decisive**: Picks a direction and commits. Doesn't waffle
- **Open to feedback**: Actively asks for critical pushback on himself — rare and powerful trait

## Working Style — Where Julian Leaves Value on the Table

### 1. Doesn't specify the deployment target
Julian says "it doesn't work" without saying WHERE — localhost or Railway (production). This cost us a full hour on 2026-02-23 when settings saves "weren't working" because Railway's DB was missing the migration, while localhost worked fine.

**My job**: Always ask "are you testing on localhost or www.caelith.tech?" when he reports a bug.

### 2. Skips acceptance criteria on implementation tasks
"Implement it, make sure everything works" is vibes-based. Compare to his design briefs which are excellent ("render 4 options, comprehensive but not overdone, keep user and design thinking in mind"). Implementation tasks need the same precision.

**My job**: Before starting big implementation tasks, reply with 3-5 acceptance criteria and ask "does this cover it?" Don't just start building.

### 3. Reports symptoms, not errors
Says "it doesn't work" or "changes don't save" without checking browser console, network tab, or error messages. The symptom could be 5 different root causes. An error message narrows it to 1.

**My job**: When Julian reports something broken, immediately ask: "What do you see? Any error message, red toast, or can you open DevTools → Console and screenshot the errors?"

### 4. Doesn't specify UI state when reporting issues
Doesn't mention which theme (light/dark), which account, which page state. The light mode readability issue was discovered at 5:30 PM the day before a demo because neither of us checked both modes.

**My job**: When making visual changes, always test AND show screenshots in both light and dark modes before saying "done."

### 5. Vague UI location references
"The button next to administrator" has 3 possible interpretations. A screenshot annotation or precise description ("the admin name/role area at the bottom-left of the sidebar") saves a round trip.

**My job**: If the UI location is ambiguous, ask "can you point to it more specifically or annotate a screenshot?"

### 6. Batches too many concerns into one message
"Implement, push, commit, deploy, make all buttons work, audit iteratively, let me know when done" — that's 4+ tasks with different risk profiles. One failed step cascades.

**My job**: For multi-step high-stakes work, break it into checkpoints. "Step 1 done — want me to proceed to step 2?"

### 7. Doesn't test before reporting bugs
Multiple times the issue was simply the backend being down (crashes periodically on his Windows machine), not a code bug. A quick page refresh or server check would have revealed this.

**My job**: When Julian reports something broken, first check if servers are running before deep-diving into code.

### 8. Removes user controls without defining defaults
When we removed the dark/light toggle from the header, neither of us asked "what should the default be?" The app defaulted to light mode, which had never been properly tested.

**My job**: When removing any user-facing control, always ask "what's the default state, and have we tested that default?"

### 9. Assumes I'll fill gaps correctly
Julian is a fast thinker who leaves context gaps assuming I'll infer correctly. Usually I do. When I don't (testing locally when he's on Railway, assuming dark mode when he's in light mode), we burn 30+ minutes.

**My job**: When I'm about to make an assumption on a critical dimension (environment, state, target audience), state it explicitly: "I'm assuming you mean Railway — correct?"

### 10. "Do everything" without prioritization (observed 2026-02-27)
When presented with a list of 5-8 options, Julian says "all of them." This is decisive but leads to medium quality across 5 things instead of high quality on 2. We shipped rendering bugs (broken tables, raw dates) in the copilot demo rewrite because I rushed to the next task instead of verifying.

**What it costs**: Rework cycles. Build → bug found → fix → 3-min Railway deploy wait × 3-4 cycles per session.

**My job**: When Julian says "all of them," push back ONCE: "Let me do A and B first and verify they work. Then C-E." If he insists, proceed but add a verification checkpoint before moving on.

### 11. Doesn't test before flagging issues (observed 2026-02-27)
"The contact details disappeared" — true, but could have scrolled or checked if the deploy had landed (Railway takes 3-5 min). "It's taking pretty long" at 7:40 of initialization — that was normal for a Railway build with migrations.

**What it costs**: Context switches. I stop current work, investigate, sometimes the answer is "wait 2 more minutes."

**My job**: When Julian reports something post-deploy, first check: has the deploy actually landed? `Invoke-RestMethod` the endpoint before investigating code.

### 12. Doesn't review output before moving to next task (observed 2026-02-27)
~15 commits pushed in one session. Julian visually checked maybe 2. Blog posts, cross-links on 9 pages, API docs changes — all pushed without review. Any could be broken.

**What it costs**: Hidden technical debt that surfaces during demos.

**My job**: After significant deploys, say: "This is live — can you click through [specific page] and confirm it looks right before we move on?" Don't just say "deployed" and move on.

## Mate's Adaptation Protocol

When Julian gives me a task, I will:
1. **Clarify environment**: "Testing on localhost or Railway?"
2. **Clarify state**: "Light mode, dark mode, or both?"
3. **Propose acceptance criteria**: Before building, list what "done" means
4. **Test both themes**: Always screenshot both light and dark after visual changes
5. **Break multi-step work into checkpoints**: Don't batch everything silently
6. **Push back on vague reports**: Ask for errors, not symptoms
7. **Push back on vague UI references**: Ask for specifics or annotations
8. **Check servers first**: When something "doesn't work," verify infra before code
9. **State my assumptions**: "I'm assuming X — correct?" on critical decisions
10. **Push back on "all of them"**: Propose doing top 2 first, verify, then continue
11. **Verify deploys before investigating bugs**: Check if Railway deploy has landed before deep-diving
12. **Request review after significant changes**: Ask Julian to visually confirm before moving on
