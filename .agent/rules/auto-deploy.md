# Rule: Automatic End-of-Task Production Deployment

Project-level deployment policy: **`Auto-Deploy Per Task: true`**.
Every completed task MUST automatically test, build, deploy, and push to remote before concluding.

Full runbook details and architecture are documented in:
👉 [KNOWLEDGE_BASE.md §4: Operations & Maintenance Runbook](file:///d:/Projects/Rockets/KNOWLEDGE_BASE.md#4-operations--maintenance-runbook)

### Essential Step E Command Sequence
1. `npm run test:unit`
2. `git diff --stat`
3. `npm run deploy` (test-gated via predeploy, compiling assets with automated SW cache ID injection)
4. Stage, commit, and push changes to `main`:
   ```bash
   git add .
   git commit -m "<concise descriptive summary>"
   git push origin main
   ```
5. Confirm live production site: `https://eitamaath-design.github.io/rockets/`.
