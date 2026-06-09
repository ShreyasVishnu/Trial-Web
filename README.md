# Shreyas Bishnu — Personal Portfolio

A personal portfolio website showcasing Shreyas Bishnu's journey — research, volunteer work, extracurriculars, and achievements as a Clear Lake High School sophomore.

## Purpose

This site is a living snapshot of what Shreyas does outside the classroom:
- **Extracurriculars** — HOSA, Science NHS, Archery Captain, Boy Scouts Patrol Leader, VEX Robotics, and more
- **Research** — 2 years of BSL2 lab research in cancer biology and microbiology
- **Volunteer** — 134+ hours at UTMB Hospital, Houston Food Bank, STEM Siblings Club, and more
- **Timeline** — Key milestones from district science fairs to Worlds VEX Robotics

## Tech Stack

- **Frontend**: HTML5, SCSS (Dart Sass), Vanilla JavaScript
- **Deployment**: GitHub Pages / Netlify / Vercel
- **Version Control**: Git + GitHub
- **AI Assistance**: LLM-assisted coding for development and documentation

## Project Structure

```
.
├── index.html              # Main landing page
├── css/
│   ├── _variables.scss     # Design tokens (dark/light theme)
│   ├── _reset.scss         # Browser reset
│   ├── _layout.scss        # Grid/flex layout utilities
│   ├── style.scss          # Main import file (compiles to style.css)
│   └── style.css           # Compiled output (do not edit directly)
├── js/
│   ├── main.js             # App init, timeline, hero counters
│   ├── utils.js            # DOM helpers, animations, visibility
│   ├── navigation.js       # Header scroll effect
│   ├── projects.js         # Section data (extracurriculars, research, volunteer)
│   ├── theme.js            # Dark/light mode toggle
│   └── particles.js        # Hero background particles
├── AGENTS.md               # AI agent instructions
└── README.md               # This file
```

## Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Compile SCSS: `npm run sass`
4. For live development: `npm run sass:watch` (auto-compiles on save)
5. Open `index.html` in a browser, or use a local server (`npm start`, `npx serve`, or Live Server)

## Features

- **Dark / Light mode** with persistent toggle (saved to localStorage)
- **Animated hero** with floating particles and gradient text
- **Scroll-triggered animations** for cards and timeline
- **Responsive grid layout** that adapts to mobile, tablet, and desktop
- **Animated counters** on hero stats

---

*Built during a one-month LLM-assisted coding class*
