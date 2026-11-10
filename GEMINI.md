# Rockets: Project Guidance & Operational Directives

## Automatic Deployment at End of Every Individual Task (Mandatory)
In this project (`rockets`), the project-level deployment policy is strictly configured to **`Auto-Deploy Per Task: true`**:

1. **Per-Task Deployment Mandate:**
   - In both single-task and multi-task prompts, **every individual task, feature, or bug fix MUST be automatically built and deployed to live production by its Task Lead (Step E) at the conclusion of that specific task**, BEFORE the parent orchestrator begins the next task.
   - The parent orchestrator must verify that Step E succeeded (exit code 0 and live URL confirmed) before launching the next Task Lead.

2. **Mandatory Step E Runbook per Task:**
   - **Unit Tests:** Ensure all unit tests pass cleanly: `npm run test:unit`.
   - **Proof of Work:** Confirm `git diff --stat` contains physical code changes on disk (never accept natural language assertions of completion without disk diffs).
   - **PWA Cache Invalidation:** If frontend assets/logic changed, increment `CACHE_NAME` in `public/sw.js` (e.g. `v13` -> `v14`) to prevent browser cache lockup.
   - **Compile Assets:** `npm run build`
   - **Deploy to GitHub Pages:** `npm run deploy` (publishes `dist/` to `gh-pages` branch)
   - **Commit & Push to Remote:**
     ```bash
     git add .
     git commit -m "<concise descriptive summary of the completed task>"
     git push origin main
     ```
   - **Confirm Live URL:** Report deployment status and live URL (`https://eitamaath-design.github.io/rockets/`) in the task completion handoff.
