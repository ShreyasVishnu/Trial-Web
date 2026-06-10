# Lesson 3: Performance Pass and First Tests

**Trains:** Skill #5 — Defining "done" and proving it (*"how do I know this works?"*) — see [CURRICULUM.md](../CURRICULUM.md)
**Time estimate:** 2–3 hours

## The problem

Two gaps every professional codebase covers and almost no learning project does:

- **Performance is unmeasured.** Thirty hero particles, liquid-glass backdrop filters — and zero evidence about what any of it costs. Polish that costs frame rate isn't polish.
- **Zero tests.** Every change is verified by you clicking around. That doesn't scale.

## The exercise

**Part A — Measure, then decide (~45 min):**

The browser DevTools are *your* territory, even when the editor belongs to the agent.

1. Run Lighthouse on the home page. Record the performance score and top opportunities.
2. Record a few seconds of the hero in the Performance panel. Look at the frame rate.
3. Make one **evidence-based decision** about the particles: keep as-is, reduce, pause when off-screen, or remove. The numbers you measured are your justification — write the decision down, then hand it to the agent to implement.
4. Ask the agent what other quick performance wins it sees (lazy-loading, image formats, explicit dimensions) — then make it justify each one before approving.

**Part B — First smoke tests (~45 min):**

1. **You write the test specs** — three statements that should always be true about this site:
   - every nav link leads to a page with a heading (no broken nav)
   - the theme toggle flips the theme and it survives a reload
   - submitting the contact form empty shows a validation error (from Lesson 2)
2. Have the agent set up Playwright and implement your three specs, runnable with `npm test`. Read the test code: does it actually test what you specified, or something easier?
3. **Break the site on purpose** — rename a nav link's target, run the tests, watch one fail. Fix it back. That moment is the entire point of tests.

## Done when

- [ ] Before/after Lighthouse scores written down, and one performance decision backed by your own measurements
- [ ] `npm test` runs three green tests that match *your* specs
- [ ] You broke the site once and a test caught it — and you can say which one

## After this

You're ready for a backend project: a small API + database + deployment. Pick something you'd actually use, and we'll scope it together.
