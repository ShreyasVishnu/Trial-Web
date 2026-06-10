# Lesson 1: The CSS Audit — Delete Dead Code

**Trains:** Skill #3 — Deletion and restraint (*"what would I remove?"*) — see [CURRICULUM.md](../CURRICULUM.md)
**Time estimate:** ~1 hour

## The problem

Your SCSS defines 15+ keyframe animations; several are never used. This is the classic AI pattern — "here's everything you might want" — and unused code isn't free: it's noise you read past every time, and it makes future-you afraid to delete anything because you can't tell what's load-bearing.

AI only ever adds. Subtraction is your job, and this lesson is pure subtraction.

## The exercise

1. **Demand evidence.** Have your agent produce a table: every `@keyframes` name → where it's used (file and selector), or "unused." Spot-check two rows yourself by asking the agent to show you the actual usage — trust, but verify.
2. **You make the call on every row.** Keep or kill. The agent doesn't get a vote. "Might be nice someday" is not a keep — git remembers everything, you can always get it back.
3. Agent deletes; you rebuild and click through every page. Nothing should look different.
4. **The bigger verdict.** The page-transition system intercepts *every* link click and syncs direction via sessionStorage. Decide whether that complexity earns its keep versus a simple CSS fade-in on load. Write your verdict in 3–4 sentences either way — and if the verdict is "doesn't earn it," have the agent simplify it.

## Done when

- [ ] Every surviving `@keyframes` has a real usage you can point to
- [ ] The compiled CSS got measurably smaller — note the before/after size
- [ ] Your written keep-or-kill verdict on the transition system exists, with reasons
