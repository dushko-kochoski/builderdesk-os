# BuilderDesk OS Portfolio Summary

## What The App Does

BuilderDesk OS is a local-first command center for managing active builder work. It tracks projects, tasks, notes, saved links, calendar reminders, dynamic alerts, reusable AI prompts, and portfolio-ready project summaries in one polished dashboard.

## Who It Is For

BuilderDesk OS is for builders, indie hackers, AI toolmakers, developers, students, and portfolio-focused creators who are managing multiple projects at once. It is especially useful when a person has several repos, demos, prompts, deadlines, and notes scattered across different tools.

## Main Workflows

- Review the dashboard to see active projects, open tasks, due-today work, alerts, upcoming deadlines, and saved prompts.
- Add and edit projects with status, progress, next action, due date, and external project links.
- Track tasks, complete them, and keep completed work separated.
- Capture notes and saved links for research, launch materials, demos, and references.
- Add reminders for deadlines, milestones, follow-ups, and reviews.
- Use the attention panel to respond to overdue work, paused projects, missing next actions, and upcoming deadlines.
- Prepare portfolio summaries from project details in Portfolio Mode.
- Save, filter, favorite, edit, and copy reusable AI prompts in Prompt Vault.

## Technical Highlights

- Built with React, TypeScript, Vite, Tailwind CSS, and lucide-react.
- Uses browser `localStorage` for local-first persistence.
- Includes safe normalization for older or incomplete localStorage data.
- Keeps app state in React without backend, authentication, routing, or database dependencies.
- Uses utility modules for date logic, alert generation, portfolio readiness, prompt filtering, and data normalization.
- Includes Vitest coverage for core utility logic.
- Designed with a premium dark productivity UI inspired by modern developer tooling.

## Future Improvements

- Optional export/import for local workspace backups.
- Lightweight routing for deep-linkable views.
- Drag-and-drop task or project ordering.
- More detailed project templates for different build types.
- Optional cloud sync or account-based workspaces.
- Real calendar integration.
- Screenshot capture and portfolio publishing helpers.
