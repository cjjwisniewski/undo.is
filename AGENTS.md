# undo.is — Agent Guidelines & Repository Specifics

This repository contains the static SvelteKit portfolio and status site for **`https://www.undo.is`** (`cjjwisniewski/undo.is`).

## 1. Git, CI/CD & Documentation Continuity
- **Commit & Push**: Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat(scope):`, `fix(scope):`, `chore(scope):`, `docs(scope):`, `style(scope):`) and push to `origin/main`.
- **Auto-Deploy on `main`**: Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds `dist/` and syncs it to the `$web` container of Azure Storage Account `undoissite` via Azure OIDC (`az storage blob upload-batch --overwrite`).
- **Keep BookStack up to date**: When routes, build/deploy behavior, or the resume sync / status integration change, update the **`undo.is`** book in BookStack (`HomeLab` shelf, via `bookstack-mcp` at `http://127.0.0.1:8002/mcp`).

## 2. Architecture & Static Hosting Invariants
- **Static Adapter & Trailing Slashes**:
  - `svelte.config.js` uses `@sveltejs/adapter-static` outputting to `dist/` with `fallback: '404.html'` and `strict: true`.
  - `src/routes/+layout.ts` sets `prerender = true` and `trailingSlash = 'always'`. **Do not remove `trailingSlash = 'always'`** — Azure Blob Storage `$web` static hosting requires `/route/index.html` directory mappings.
  - `svelte.config.js` intentionally suppresses prerender 404 errors for `/resume.pdf` (`prerender.handleHttpError`).
- **Sitemap & Navigation**:
  - When adding or removing top-level routes, update both `src/routes/+layout.svelte` (navbar/footer if applicable) and `src/routes/sitemap.xml/+server.ts`.
- **Client-Only Data Fetching**:
  - Because the site is 100% static, dynamic data (such as `src/routes/status/+page.svelte` polling `https://status.undo.is/api/status`) must run inside `onMount` with `cache: 'no-store'` and visibility-aware polling.

## 3. Resume Data Sync (`personal_resume`)
- `src/lib/resumeData.json` is committed to the repo so local `npm run dev` / `npm run build` works standalone.
- In CI (`.github/workflows/deploy.yml`), the workflow checks out the private `cjjwisniewski/personal_resume` repo (using `secrets.RESUME_SYNC_TOKEN`) into `resume-data/` and runs `npm run sync-resume` (`scripts/sync-resume.js`) to regenerate `src/lib/resumeData.json` from `resume-data/_data/*.yml` before building.
- The workflow also triggers on `repository_dispatch` (`types: [resume_updated]`) from `personal_resume`. Avoid breaking the JSON schema expected by `src/routes/resume/+page.svelte` when editing `scripts/sync-resume.js`.

## 4. UI, Svelte 5 & Verification
- **Follow `STYLE_GUIDE.md`**: Read `STYLE_GUIDE.md` before editing UI/CSS. Use CSS custom properties from `src/app.css` (no hardcoded dark colors so `:root.light` stays intact), Svelte 5 runes (`$state`, `$derived`, `$derived.by`, `$props`, `{@render children()}`), `onclick={...}` syntax, `<svelte:head>` SEO/OG tags on every route, and `target="_blank" rel="noopener noreferrer"` on external links.
- **Pre-commit checks**: When Node.js 20+ / `npm` is available in the environment, run `npm run check` and `npm run build` before committing.
