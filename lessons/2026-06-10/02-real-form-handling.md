# Lesson 2: Make the Contact Form Real

**Trains:** Skill #9 — The quality AI skips, and Skill #5 — Defining "done" and proving it — see [CURRICULUM.md](../CURRICULUM.md)
**Time estimate:** 1–2 hours

## The problem

The contact form falls back to `mailto:` and relies on HTML `required` alone. No real submission, no error feedback, no success state. Notice the pattern: this site has lavish animation polish and minimal investment in the one feature where something can actually *fail*. Real engineering effort goes where failure goes — and that's exactly where AI under-invests unless you demand it.

## The exercise

This lesson is about writing **acceptance criteria** — the new core skill. The agent will write the code; you define what "working" means, completely, before it starts.

1. Pick a form backend ([Formspree](https://formspree.io/) free tier is the easy call) and create the endpoint.
2. **Write the spec as states.** A real form has four, and your spec must define what the user sees in each:
   - **Pending** — submission in flight (button disabled? spinner?)
   - **Success** — form cleared, confirmation shown
   - **Server rejected it** (4xx/5xx) — what message, and can the user retry?
   - **Network failed** (offline, timeout) — a *different* message, form re-enabled
   Plus: validation errors shown inline next to the field (no `alert()` popups), and everything announced properly to screen readers — put that requirement in the spec and let the agent figure out the ARIA.
3. Agent implements against your spec.
4. **You personally trigger all four states in the browser:** a real successful send, empty fields, a bad email, and a network failure (DevTools → Network → Offline). The states you didn't test are the states that don't work.

## Done when

- [ ] You've seen all four states with your own eyes and can demo them
- [ ] No silent failures anywhere — every outcome shows the user something
- [ ] You can explain the difference between a server error and a network error, and why the user should see different messages
