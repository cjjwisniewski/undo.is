# undo.is Style Guide for Agents

This document defines the visual, structural, and code conventions for **undo.is** so new pages, components, and copy stay consistent with the existing site.

---

## 1. Visual Identity & Aesthetic

* **Theme:** Dark-only, high-contrast slate aesthetic (`#020617` canvas with a `48px` architectural grid in `body::before` and subtle sky-blue + lower-left indigo ambient glows) with translucent glassmorphism surfaces and a single vibrant sky-blue accent (`#38bdf8`).
* **Brand & Logo:**
  * **Navbar:** Uses the full Cloud + `UNDO` lockup (`src/lib/undo-lockup.png` imported via `vite-imagetools` `?w=240&format=webp`, `38px` height on desktop / `32px` on mobile) in `#f8fafc` + `#38bdf8`.
  * **Favicon:** Uses the tightly cropped Cloud + Undo-Arrow mark (`static/favicon.png`, `128×128`) in `#64748b` + `#0ea5e9` for legibility on both light and dark browser tabs.
  * **Resume:** Keep the resume sheet (`/resume/`) text-only; `@media print` hides `.navbar` and `.site-footer` in `resume.pdf`.
* **Tone:** Clean, restrained, engineering-focused. Avoid heavy gradients, neon clutter, or gratuitous animations.

---

## 2. Color Tokens & Semantic Palette

Always reference the CSS custom properties defined in [src/app.css](src/app.css):

| Token | Dark Value (Default) | Usage |
| :--- | :--- | :--- |
| `--bg-color` | `#020617` (`--c-slate-950`) | Page background |
| `--bg-surface` | `#0f172a` (`--c-slate-900`) | Solid inner cards, tags, secondary buttons |
| `--bg-surface-hover` | `#1e293b` (`--c-slate-800`) | Hover state for solid surfaces |
| `--bg-inset` | `rgba(2, 6, 23, 0.45)` | Nested diagram containers |
| `--bg-elevated` | `rgba(15, 23, 42, 0.55)` | Nested highlight sub-cards |
| `--text-primary` | `#f8fafc` (`--c-slate-50`) | Headings, primary labels, active nav links |
| `--text-secondary` | `#cbd5e1` (`--c-slate-300`) | Body copy, descriptions, subtitles |
| `--text-muted` | `#94a3b8` (`--c-slate-400`) | De-emphasized metadata, social links |
| `--accent-color` | `#38bdf8` | Primary CTAs, eyebrows, active indicators, links |
| `--accent-hover` | `#0ea5e9` | Hover state for accent elements |
| `--border-color` | `#1e293b` (`--c-slate-800`) | Hairline dividers, secondary button borders, tags |
| `--glass-bg` | `rgba(30, 41, 59, 0.4)` | `.glass-panel` background |
| `--glass-border` | `rgba(255, 255, 255, 0.05)` | `.glass-panel` border |
| `--glass-shadow` | `rgba(0, 0, 0, 0.5)` | Hover elevation shadow |
| `--nav-bg` | `rgba(15, 23, 42, 0.8)` | Sticky header background |

### Semantic Status Colors
For operational/status indicators (e.g. `/projects` and `/status`):
* **Online / Live / Operational:** `#4ade80` text with `rgba(74, 222, 128, 0.12)` background and `rgba(74, 222, 128, 0.28)` border.
* **Degraded / Offline:** Follow the same tinted-pill pattern (translucent fill + subtle matching border + crisp foreground text).

---

## 3. Typography

* **Font Family:** `'Inter Variable', 'Inter', system-ui, -apple-system, sans-serif` (self-hosted via `@fontsource-variable/inter` in [src/routes/+layout.svelte](src/routes/+layout.svelte)).
* **Headings (`h1`–`h6`):** `font-weight: 700`, `letter-spacing: -0.02em`, `color: var(--text-primary)`.
  * Page `h1`: Use fluid sizing with `clamp(...)` (e.g., `clamp(1.85rem, 4vw, 2.5rem)`).
  * Section `h2`: `clamp(1.25rem, 2.5vw, 1.55rem)`, `line-height: 1.3`.
* **Body Copy:** `line-height: 1.6`–`1.7`, `color: var(--text-secondary)`. Constrain long prose paragraphs to `max-width: 62ch` for readability.
* **Eyebrow Labels:** `0.78rem`, `font-weight: 600`, `text-transform: uppercase`, `letter-spacing: 0.08em`, `color: var(--accent-color)`.
* **Links:** `color: var(--accent-color)`, `text-decoration: none`. Global `a:hover` applies `--accent-hover` and a subtle sky-blue `text-shadow`; suppress `text-shadow: none` on button-styled links and nav items.

---

## 4. Layout, Spacing & Responsiveness

* **Document Shell:** Defined in [src/routes/+layout.svelte](src/routes/+layout.svelte) — sticky blurred `.navbar`, flex-growing `<main class="page-content">`, and bottom `.site-footer`.
* **Containers:**
  * Standard `.container`: `max-width: 900px`, `margin: 0 auto`, `padding: 2rem` (`1rem` at `max-width: 640px`).
  * Wider content pages (like `/projects`): `max-width: 960px`, `padding: 3rem 2rem` (`1.5rem 1rem` at `max-width: 640px`).
* **Vertical Rhythm:** Use `flex-direction: column` with `gap: 1.75rem` between major cards and `gap: 1.25rem` inside cards.
* **Border Radius:** Standardize on `var(--border-radius)` (`8px`) for cards, buttons, and avatars; `6px` for compact tags; `999px` for status pills.
* **Breakpoints:**
  * `max-width: 640px` — Mobile adjustments (reduced padding, stacked action buttons / full-width CTAs, tighter nav gap).
  * `min-width: 768px` — Tablet/desktop sizing adjustments.
* **Hover Guard:** Wrap lift/scale hover animations on cards and images in `@media (hover: hover)` so touch devices don't get stuck in hover states.

---

## 5. Component & Surface Patterns

* **Primary Cards (`.glass-panel`):**
  Use the global `.glass-panel` class from [src/app.css](src/app.css) (`backdrop-filter: blur(12px)`, `1px solid var(--glass-border)`, `8px` radius, `2rem` padding / `1.25rem` on mobile). On hover, it lifts `-2px` and highlights its border with `var(--accent-color)`.
* **Nested Sub-Cards (`.highlight-box`):**
  Inside a `.glass-panel`, use `background: var(--bg-elevated)`, `border: 1px solid var(--border-color)`, `border-radius: var(--border-radius)`, and `padding: 1rem 1.15rem` in a responsive grid:
  `grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr))`.
* **Buttons & Action Links:**
  * **Primary:** `background: var(--accent-color)`, `color: var(--c-slate-950)`, `font-weight: 600`, hover `var(--accent-hover)`.
  * **Secondary:** `background: var(--bg-surface)` or `transparent`, `border: 1px solid var(--border-color)`, `color: var(--text-primary)`, hover `border-color: var(--accent-color)`.
* **Tags:** Compact `0.8rem` chips with `var(--bg-surface)`, `1px solid var(--border-color)`, `border-radius: 6px`, `padding: 0.25rem 0.6rem`.
* **Architecture Diagrams (`.arch-diagram`):** On `/projects/`, use responsive CSS flexbox node-and-arrow diagrams (`.flow-linear`, `.flow-branch`) styled with CSS custom properties (`var(--bg-inset)`, `var(--bg-surface)`, `var(--border-color)`, `var(--accent-color)`) that stack vertically on mobile.
* **Icons:** Inline SVGs (e.g., `18px × 18px` with `fill="currentColor"`) rather than adding external icon font CDNs.

---

## 6. SvelteKit & TypeScript Conventions

* **Svelte 5 Runes:** Use `$state`, `$derived`, `$derived.by`, `$props`, and `{@render children()}` (see [src/routes/+layout.svelte](src/routes/+layout.svelte) and [src/routes/status/+page.svelte](src/routes/status/+page.svelte)). Use `onclick={...}` rather than `on:click`.
* **TypeScript:** Use `<script lang="ts">` with explicit `interface` definitions for API payloads and component data.
* **SEO & Head Metadata:** Every route must define `<svelte:head>` with:
  * `<title>{Page Name} | undo.is</title>`
  * `<meta name="description" content="..." />`
  * `<link rel="canonical" href="https://www.undo.is/..." />`
  * Open Graph and Twitter tags (`og:title`, `og:description`, `og:url`, `twitter:title`, `twitter:description`, `twitter:url`) using canonical `https://www.undo.is/...` URLs
* **External Links:** Always include `target="_blank" rel="noopener noreferrer"`.
* **Navigation & Sitemap:** When adding a new top-level route, update [src/routes/+layout.svelte](src/routes/+layout.svelte) (if it belongs in the navbar/footer) and [src/routes/sitemap.xml/+server.ts](src/routes/sitemap.xml/+server.ts).
* **Static Adapter Compatibility:** `undo.is` builds as a static site (`@sveltejs/adapter-static`). Client-only data fetching (like `/status/`) must run inside `onMount` and handle loading, error, and visibility-aware refresh states gracefully.

---

## 7. Copy & Content Voice

* **Architecture-First:** Lead with what a system does, its reliability/security properties, and the concrete stack used - avoid vague marketing fluff.
* **Formatting:**
  * Use standard hyphens (`-`) for project titles (`Seeker - Collectible Card Stock & Pricing Platform`) and an em dash (`—`) only for missing/null metric values (`—`).
  * Keep card highlight bullets scannable: short bolded title + 1-2 sentence technical explanation.

---

## 8. Agent Pre-Commit Checklist

1. No hardcoded colors where a `--*` CSS variable exists in [src/app.css](src/app.css).
2. Checked layout at both desktop (`>= 768px`) and mobile (`<= 640px`) widths; hover-only transforms wrapped in `@media (hover: hover)`.
3. `<svelte:head>` includes `<title>`, `description`, `canonical`, `og:*`, and `twitter:*` tags.
4. External links have `target="_blank" rel="noopener noreferrer"`.
5. Run `npm run check` and `npm run build` (when Node/npm is available) before committing.
