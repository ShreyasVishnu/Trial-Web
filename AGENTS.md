# AGENTS.md - AI Agent Instructions

This file provides guidance for AI assistants working on this personal portfolio website.

## Project Context

- **Type**: Personal portfolio website
- **Focus**: Showcasing Shreyas Bishnu's extracurriculars, BSL2 research, volunteer work, and awards
- **Duration**: One-month intensive class
- **Goal**: Build, document, and deploy while learning LLM-assisted coding

## Coding Standards

### HTML
- Semantic HTML5 elements
- Accessible markup (ARIA labels, alt text)
- Mobile-first responsive design
- Clean, indented structure

### SCSS
- SCSS partials compiled via Dart Sass (`npm run sass`)
- CSS custom properties for theming (in `_variables.scss`)
- BEM naming convention
- Mobile-first breakpoints
- Minimal utility classes
- Use `@use` for importing partials (not `@import`)
- Run `npm run sass:watch` during development for auto-compilation

### JavaScript
- Vanilla ES6+ (modules, const/let, arrow functions)
- No frameworks unless explicitly requested
- Event delegation for dynamic content
- Progressive enhancement

## File Organization

```text
/
├── index.html              # Main entry point
├── css/
│   ├── _variables.scss     # Design tokens
│   ├── _reset.scss         # Browser reset
│   ├── _layout.scss        # Grid/flex layouts
│   ├── style.scss          # Main import file (compiles to style.css)
│   └── style.css           # Compiled output (do not edit directly)
├── js/
│   ├── utils.js            # Helper functions
│   ├── navigation.js       # Site navigation
│   ├── projects.js         # Section data (extracurriculars, research, volunteer)
│   ├── theme.js            # Dark/light mode toggle
│   ├── particles.js        # Hero floating particles
│   └── main.js             # App initialization
└── docs/                   # Documentation
```

## AI Assistance Guidelines

### When generating code:
1. Follow existing patterns in the codebase
2. Use semantic, accessible markup
3. Keep CSS modular and maintainable
4. Write vanilla JS - no dependencies
5. Include comments for complex logic

### When documenting:
1. Update README.md with new features
2. Document each project in projects/
3. Keep AGENTS.md current with patterns
4. Write clear commit messages

### When debugging:
1. Check browser console first
2. Validate HTML/CSS
3. Test responsive breakpoints
4. Verify accessibility

## Project-Specific Patterns

### Adding a new section or item:
1. Add data to the appropriate array in `js/projects.js`
2. Use the existing card component pattern
3. Update this file if the section structure changes

### Styling approach:
- Design tokens in `css/_variables.scss`
- Component styles in `css/style.scss`
- Page-specific styles inline or in page CSS

### JavaScript modules:
- Each feature in its own file
- Import/export via ES modules
- Initialize in `main.js`

## Deployment Notes

- Static site - no build step required (style.css is committed)
- Deploy to GitHub Pages, Netlify, or Vercel
- Ensure all paths are relative
- Test locally with `npm start`, `npx serve`, or Live Server

## Learning Objectives for AI

This project is a learning exercise. When assisting:
- Explain concepts, don't just give code
- Show multiple approaches when relevant
- Point to MDN/web.dev for reference
- Encourage understanding over copying

## Agent Skills

Reusable skills live in `.opencode/skills/` (OpenCode loads them automatically; other agents should read them as standing instructions):

Before creating or editing any skill, read `SKILLS_GUIDE.md`. It defines the local quality bar for trigger descriptions, progressive disclosure, reusable resources, and class-specific safety rules.

- **class-day** — start/end-of-session routine: today's lessons, journal-first, end-of-day journal
- **judgment-review** — review code or diffs against CURRICULUM.md, FILES.md, and STRUCTURE.md, Socratically
- **safe-commit** — commit/push following the GIT.md rules; never the dangerous commands
- **a11y-check** — the accessibility pass (Skill #9); agent checks markup, student does the keyboard test
- **deploy-site** — publish/update the live site on GitHub Pages and verify the live URL
- **html-to-pdf** / **html-to-docx** — export HTML documents (e.g. the resume) to PDF or Word; the HTML is the source of truth
- **journal-pdf** — format the daily `journal/*.md` entries into a standardized PDF report (e.g. the report for Tom); formats only, never writes journal content

Adding or improving a skill is encouraged — that's Skill #8 (steering the agent) in practice.

## Daily Class Routine

Each class day has a lesson set in `lessons/<YYYY-MM-DD>/` and a journal entry in `journal/<YYYY-MM-DD>.md`. At the start of every session:

1. **Review today's lessons.** Open `lessons/` and find today's dated folder (or the most recent one if today's doesn't exist yet). Read the README and lesson files with Shreyas, and keep the session focused on them. If he asks for something outside the day's lessons — especially new features — remind him of the ground rules: no new features until the lessons are done.
2. **Teach the meta, not just the task.** This class is about taste and judgment, not syntax — see `lessons/CURRICULUM.md` for the nine judgment skills. For each lesson, name which skill it trains, and when reviewing his work or generating code, ask him the skill's question (e.g. "does this belong here?", "what would you remove?") instead of just giving the answer.
3. **Journal first, before any code.** Check that `journal/<today>.md` exists — if not, create it by copying `journal/TEMPLATE.md`. Then ask him to fill in the "Goals for today" section himself before starting work. Don't move on to coding until it's filled in.
4. **Journal again at the end.** When he's wrapping up (or says he's done), prompt him to fill in the remaining sections: "What I learned", "What was hard", and "What surprised me".
5. **Never write journal content for him.** Creating the day's file from the template is fine; the answers must be in his own words. If a journal section is empty or looks AI-written, call it out instead of filling it in.
