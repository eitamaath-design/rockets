# Rockets: Project Guidance & Operational Directives

## Automatic Deployment at End of Changes (Mandatory)
For all tasks, features, and bug fixes in this project (`rockets`):
1. **Always Verify**: Ensure all unit tests (`npm run test:unit`) and production build (`npm run build`) pass cleanly before releasing.
2. **Always Deploy Automatically**: At the conclusion of every change, the agent **MUST** automatically commit, push, and deploy to live production without waiting to be asked:
   - Compile production assets: `npm run build`
   - Deploy to GitHub Pages: `npm run deploy` (publishes `dist/` to `gh-pages` branch)
   - Commit and push to repository:
     ```bash
     git add .
     git commit -m "<concise descriptive summary>"
     git push origin main
     ```
3. **Confirm Live URL**: Report deployment status and live URL (`https://eitamaath-design.github.io/rockets/`) to the user.
