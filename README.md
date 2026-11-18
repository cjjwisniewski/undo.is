# undo.is 🌐

The personal website and technical portfolio of Cameron Wisniewski.

## Tech Stack
* **Framework**: [SvelteKit](https://kit.svelte.dev/)
* **Pre-processor**: TypeScript
* **Adapter**: `@sveltejs/adapter-static` (Generates raw HTML/CSS/JS with zero Node.js server dependencies)
* **Image Pipeline**: `vite-imagetools` (Auto WebP / AVIF compression)
* **Styling**: Vanilla CSS with customized design tokens and CSS variables.

## Key Features
* **Modern Aesthetic**: Dark slate color palette (`#020617`) with a `48px` architectural grid backdrop, two-tone ambient glows, and translucent glassmorphism panels (documented in [STYLE_GUIDE.md](STYLE_GUIDE.md)).
* **Profile & Core Focus (`/`)**: Split profile hero with optimized WebP/JPEG avatar, core architecture focus areas, and direct links to projects, resume, and contact.
* **Projects & Architecture (`/projects/`)**: Showcases **Seeker**, **undo.is Outage-Proof Status & Telemetry**, **City of Traitors**, and **Pitt Imps**, complete with responsive CSS architecture diagrams.
* **Live System Status (`/status/`)**: Client-side telemetry view polling the edge-hosted Cloudflare Worker status API.
* **Automated Resume PDF & Print Export (`/resume/`)**: Restructures cleanly for `@media print` and automatically generates `/resume.pdf` in CI via headless Chromium after `vite build`.
* **SEO & Socials**: Prerenders `/sitemap.xml` alongside `robots.txt`, canonical links, and Open Graph/Twitter meta tags.

## Local Development

Ensure you are running **Node.js 20+**.

```bash
# Clean install the dependencies
npm ci

# Start the Vite development server on localhost:5173
npm run dev
```

## Production Build & CI/CD Pipeline

This application is bundled statically directly into the `/dist` directory. The routing relies on Azure Blob storage mappings (`trailingSlash: 'always'`), ensuring URL endpoints perfectly match static folders like `/resume/index.html`.

```bash
# Compile the raw HTML/CSS/JS static output to /dist
npm run build

# Generate /dist/resume.pdf from the built /resume/ route (requires Chrome/Chromium)
npm run generate-pdf

# Locally preview the exact compiled payload
npm run preview
```

### Verification & CI-Only Tests
The repository includes a CI-only automated test suite (`tests/site.test.mjs`) executed via `scripts/run-tests.mjs`. Tests enforce `GITHUB_ACTIONS === 'true'` and run exclusively in GitHub Actions before deployment:

```bash
# Typecheck and Svelte diagnostics
npm run check

# Automated tests (GitHub Actions CI only)
npm run test
```

### Automated Deployment
The repository utilizes **GitHub Actions** (`.github/workflows/deploy.yml`) for automated verification and deployments.

Both `push` (to `main`) and `pull_request` events run the `test` job (`npm run check` and `npm run test`). On `main` pushes or `repository_dispatch` (`resume_updated`) from `personal_resume`, the `build-and-deploy` job syncs resume YAML data, builds `/dist`, renders `/dist/resume.pdf` via headless Chromium, and utilizes Azure OIDC (`azure/login@v2`) to run `az storage blob upload-batch` into the `$web` container of the `undoissite` Azure Storage Account.

## License
MIT License. See [LICENSE](LICENSE) for details.
