# Rockets: Project Guidance & Operational Directives

## Automatic Deployment at End of Every Individual Task (Mandatory)
In this project (`rockets`), the project-level deployment policy is strictly configured to **`Auto-Deploy Per Task: true`**.

Every task, feature, or bug fix must be verified and automatically deployed to live production by its Task Lead (Step E) before concluding.

For full architectural details, service worker cache derivation, and operational guidelines, consult the single source of truth:
👉 [KNOWLEDGE_BASE.md §4: Operations & Maintenance Runbook](file:///d:/Projects/Rockets/KNOWLEDGE_BASE.md#4-operations--maintenance-runbook)

### Essential Step E Release Sequence
```bash
npm run test:unit
git diff --stat
npm run deploy
git add .
git commit -m "<concise descriptive summary of completed task>"
git push origin main
```
Confirm deployment exit code 0 and live URL: `https://eitamaath-design.github.io/rockets/`.
