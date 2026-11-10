# Rule: Automatic End-of-Task Production Deployment

Whenever modifying, fixing, or enhancing any aspect of the **Rockets** codebase:
- **Mandatory Deployment**: Once code changes and verification tests pass, changes **MUST** be deployed automatically at the end of the turn.
- **Commands**:
  1. `npm run test:unit`
  2. `npm run build` (automated Vite plugin replaces `__BUILD_ID__` in `dist/sw.js` with git SHA + timestamp)
  3. `npm run deploy` (deploys compiled `dist/` directly to GitHub Pages via `gh-pages`)
  4. Stage, commit, and push source changes to `main`:
     ```bash
     git add -A
     git commit -m "<concise descriptive summary>"
     git push origin main
     ```
- Never leave completed changes unbuilt or undeployed. Always update the user with the live site link: `https://eitamaath-design.github.io/rockets/`.
