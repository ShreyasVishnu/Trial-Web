---
name: website-structure
description: Audit and report on the static-site file structure (where HTML, CSS, JS, and assets live). Use when the student adds a new page, asks "is this organized?", before committing a new feature, or when something lands at the root that might not belong there. Triggers on "organize my site", "where should this go", "is my site structure right", or proactively after multi-file features are committed.
---

# Website Structure

The "where things live" judgment at folder scale — Skill #1 from `lessons/CURRICULUM.md` applied to the whole repo instead of one file. The source of truth for what belongs where is `lessons/STRUCTURE.md`. This skill reports; it does not move.

## Workflow

Run these in order:

1. **Inventory** — list every HTML, CSS, JS, asset, and config file in the repo. Skip `node_modules`, `.git`, `test-results/`, and other generated artifacts. Build a tree.
2. **Classify the root** — anything at the repo root that isn't `index.html`, a top-level doc (`README.md`, `AGENTS.md`, `SKILLS_GUIDE.md`), a config file (`package.json`, `.gitignore`, `.nojekyll`), the `.opencode/` folder, or another folder is a candidate for moving. Cross-reference `lessons/STRUCTURE.md` for the full standard.
3. **Check duplication** — find pages or files with copy-pasted structure (same nav block, same footer, same CSS variables redefined per file, same `<head>` boilerplate). They are candidates for shared partials. **Don't refactor without asking.**
4. **Check shared structure consistency** — is there a navigation pattern, a CSS reset, or a JS entry point that every page should share? If pages disagree on something simple (e.g., the `<title>` format, the nav link list, the footer text), note the inconsistency.
5. **Cross-check with module rules** — `mediapipe-lab/README.md` says the module must be framework-independent and module-local. Don't propose changes that violate those.
6. **Report** — produce findings, ordered by user impact, not file order. For each finding, ask the judgment question first ("this file is at the root — does it belong here?") and let the student answer before suggesting a move.

## What the student must do personally

- **Make the move decisions.** The skill reports; the student decides. If you reorganize without asking, you've stolen the lesson.
- **Decide what "done" looks like.** Three root HTML files might be fine for a small site — that's a judgment call, not a rule violation.
- **Decide which duplications are worth fixing.** Sometimes a copy-pasted block is genuinely the simpler choice for a one-page site.

## Hard limits

- **Do not move, rename, or delete any file.** Reporting is the entire job. Movement happens only after explicit "yes" from the student.
- **Do not move `index.html`.** Web servers look for it at the root.
- **Do not touch `mediapipe-lab/`** unless the student is actively working on that module and you've checked `mediapipe-lab/README.md` for constraints. That module has its own structure rules.
- **Do not propose changes that conflict with `lessons/STRUCTURE.md`.** That's the source of truth.
- **Do not create shared partials automatically.** Duplication is a *finding*, not an action item.

## Done when

- [ ] A tree of the current site structure has been produced.
- [ ] Each root-level file has been classified (belongs / doesn't belong).
- [ ] Duplication and shared-structure concerns have been listed.
- [ ] The student has answered at least one judgment question before any file was moved.
- [ ] No file has been moved, renamed, or modified.
