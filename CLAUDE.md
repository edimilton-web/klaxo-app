@AGENTS.md
# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

## 5. Git & Deploy Workflow (project-specific)

**Setup — already configured. Do not ask about any of this again.**

- Remote: `git@github.com:edimilton-web/klaxo-app.git`, production branch `main`.
- Git identity is set locally in this repo (`user.name=Edimilton`, `user.email=eddie.varjao.reis@gmail.com`). Never set it globally, never ask for it.
- SSH auth works from this machine (`~/.ssh/id_ed25519`, registered on the GitHub account).
- Deploy is automatic: the Vercel project `klaxo-app` (team `tecfixe`) is connected to this GitHub repo. **Push to `main` = production deploy.**
- Do NOT use the Vercel CLI. Do not run `vercel`, `vercel --prod`, or `vercel link`. There is no `.vercel` folder and there should not be one.
- Other branches auto-deploy as Vercel previews. Production only ever comes from `main`.

**Execution rule:** once the user confirms a change is ready, run `git add` → `git commit` → `git push origin main` as one uninterrupted flow. Do not stop to ask for confirmation after the commit, do not report a commit as "pending push", and do not treat the deploy as a separate step to confirm or monitor — the push is the deploy.

**The one gate before pushing:** run `npx tsc --noEmit` first. If it fails, stop and report — do not commit or push broken types. This is the only thing that should interrupt the flow.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.