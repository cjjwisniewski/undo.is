# undo.is Backlog

Running backlog for frontend security, build pipeline, and CI/CD hardening in `/home/cwisniewski/undo.is`.

## Status Legend
- `[ ]` Planned
- `[~]` In Progress
- `[x]` Done

---

## 1. CI/CD & Supply Chain Hardening (`.github/workflows/deploy.yml`)
- [ ] **Scope GitHub Actions `GITHUB_TOKEN` permissions to least privilege**: downgrade top-level `contents: write` to `contents: read` in `.github/workflows/deploy.yml` (the workflow only reads the repository and uploads `./dist` to Azure Blob Storage via OIDC)
- [ ] **Pin GitHub Actions to full commit SHAs**: pin `actions/checkout`, `actions/setup-node`, `azure/login`, and `azure/CLI` in `.github/workflows/deploy.yml` to immutable commit SHAs

## 2. Build & Template Sanitization (`scripts/sync-resume.js`, `src/routes/resume/+page.svelte`)
- [ ] **Sanitize HTML in resume sync pipeline**: sanitize or restrict allowed inline HTML tags (e.g., `<b>`, `<strong>`, `<em>`, `<a>`) in `scripts/sync-resume.js` when generating `src/lib/resumeData.json` so `{@html ...}` blocks in `src/routes/resume/+page.svelte` cannot inject unexpected scripts or markup during client rendering or headless Chromium (`--no-sandbox`) PDF generation
