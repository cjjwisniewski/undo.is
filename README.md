# undo.is 🌐

The personal website and technical portfolio of Cameron Wisniewski.

## Tech Stack
* **Framework**: [SvelteKit](https://kit.svelte.dev/)
* **Pre-processor**: TypeScript
* **Adapter**: `@sveltejs/adapter-static` (Generates raw HTML/CSS/JS with zero Node.js server dependencies)
* **Image Pipeline**: `vite-imagetools` (Auto WebP / AVIF compression)
* **Styling**: Vanilla CSS with customized design tokens and CSS variables.

## Key Features
* **Modern aesthetic**: Clean "Cool Grays" (Slate) color palette with responsive glassmorphism hover interactions.
* **Dark Mode**: Configured to natively default to a dark theme.
* **SEO & Socials**: Dynamically generates `/sitemap.xml` and statically structures `robots.txt` + Open Graph meta tags for X, iMessage, and Discord shareability.
* **Native Print Export**: The layout elegantly restructures itself for `window.print()` exporting via custom `@media print` CSS block logic, seamlessly acting as a digital to physical PDF resume generator.

## Local Development

Ensure you are running **Node.js 20+**. 

```bash
# Clean install the dependencies
npm ci

# Start the Vite development sever on localhost:5173
npm run dev
```

## Production Build & CI/CD Pipeline

This application is bundled statically directly into the `/dist` directory. The routing relies on Azure Blob storage mappings (`trailingSlash: 'always'`), ensuring URL endpoints perfectly match static folders like `/resume/index.html`.

```bash
# Compiles the raw HTML/CSS/JS static output to /dist
npm run build

# Localy preview the exact compiled payload
npm run preview
```

### Automated Deployment
The repository utilizes **GitHub Actions** (`.github/workflows/deploy.yml`) for automated deployments. 

When code is pushed to the `main` branch, the Node runner cleanly builds the static `/dist` payload and utilizes Azure OIDC (`azure/login@v2`) to perform an `az storage blob upload-batch` directly into the `$web` container of the `undoissite` Azure Storage Account.

## License
MIT License. See [LICENSE](LICENSE) for details.
