<script lang="ts">
  const seekerLinks = [
    { label: "Live Site", href: "https://seeker.cityoftraitors.com", external: true, primary: true },
    { label: "Frontend", href: "https://github.com/cjjwisniewski/seeker.cityoftraitors.com", external: true, primary: false }
  ];

  const seekerHighlights = [
    {
      title: "Event-Driven Serverless Pipeline",
      detail:
        "Azure Functions with Queue Triggers and Table Storage orchestrate distributed stock polling and historical pricing ingestion across marketplaces."
    },
    {
      title: "Zero-Contamination Data Invariant",
      detail:
        "Client-side attribute verification strictly validates language, finish, set, and collector number so unfiltered upstream API responses never corrupt pricing history or trigger false alerts."
    },
    {
      title: "Edge, Auth & Egress Isolation",
      detail:
        "Protected by Azure API Management (APIM) and Discord OAuth, with WireGuard-routed scraping workers isolating marketplace egress and Terraform-managed infrastructure."
    }
  ];

  const seekerTags = [
    "Azure Functions",
    "Table & Queue Storage",
    "Azure APIM",
    "Terraform",
    "SvelteKit",
    "Python",
    "Discord OAuth"
  ];

  const statusTags = [
    "Cloudflare Workers",
    "Workers KV",
    "InfluxDB 2.7",
    "Grafana",
    "Telegraf",
    "SvelteKit"
  ];

  const cityOfTraitorsTags = [
    "SvelteKit",
    "Static Site",
    "Markdown",
    "Azure Storage"
  ];

  const pittImpsTags = [
    "Vite",
    "TypeScript",
    "Vanilla CSS",
    "Azure Storage"
  ];
</script>

<svelte:head>
  <title>Projects | undo.is</title>
  <meta
    name="description"
    content="Selected cloud architecture, serverless platform, and homelab observability projects by Cameron Wisniewski."
  />
  <meta property="og:title" content="Projects | undo.is" />
  <meta
    property="og:description"
    content="Selected cloud architecture, serverless platform, and homelab observability projects by Cameron Wisniewski."
  />
  <meta property="og:url" content="https://undo.is/projects/" />
</svelte:head>

<section class="container projects-page">
  <header class="page-header">
    <h1>Projects</h1>
    <p class="subtitle">
      Selected cloud architecture, serverless platforms, and homelab observability systems.
    </p>
  </header>

  <article class="glass-panel featured-card">
    <div class="card-header">
      <div>
        <span class="eyebrow">Featured Project</span>
        <h2>Seeker — Collectible Card Stock &amp; Pricing Platform</h2>
      </div>
      <span class="status-pill">Live</span>
    </div>

    <p class="lead">
      A multi-marketplace availability tracker and historical pricing engine built on Azure
      serverless primitives, strict data-integrity invariants, and Terraform IaC.
    </p>

    <div class="arch-diagram" role="img" aria-label="Seeker architecture: Edge and Discord OAuth through Azure APIM to Azure Functions, Queue and Table Storage, and WireGuard-isolated scraping workers.">
      <svg viewBox="0 0 760 112" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrow-seeker" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--accent-color)" />
          </marker>
        </defs>
        <!-- Node 1 -->
        <rect x="4" y="18" width="156" height="76" rx="8" fill="var(--bg-surface)" stroke="var(--border-color)" stroke-width="1.2" />
        <text x="82" y="46" text-anchor="middle" fill="var(--accent-color)" font-size="10" font-weight="600" letter-spacing="0.06em">EDGE &amp; AUTH</text>
        <text x="82" y="65" text-anchor="middle" fill="var(--text-primary)" font-size="12.5" font-weight="600">Azure APIM</text>
        <text x="82" y="81" text-anchor="middle" fill="var(--text-muted)" font-size="10.5">Discord OAuth</text>
        <!-- Arrow 1->2 -->
        <line x1="164" y1="56" x2="196" y2="56" stroke="var(--accent-color)" stroke-width="1.5" marker-end="url(#arrow-seeker)" />
        <!-- Node 2 -->
        <rect x="200" y="18" width="164" height="76" rx="8" fill="var(--bg-surface)" stroke="var(--border-color)" stroke-width="1.2" />
        <text x="282" y="46" text-anchor="middle" fill="var(--accent-color)" font-size="10" font-weight="600" letter-spacing="0.06em">COMPUTE</text>
        <text x="282" y="65" text-anchor="middle" fill="var(--text-primary)" font-size="12.5" font-weight="600">Azure Functions</text>
        <text x="282" y="81" text-anchor="middle" fill="var(--text-muted)" font-size="10.5">Python Serverless</text>
        <!-- Arrow 2->3 -->
        <line x1="368" y1="56" x2="400" y2="56" stroke="var(--accent-color)" stroke-width="1.5" marker-end="url(#arrow-seeker)" />
        <!-- Node 3 -->
        <rect x="404" y="18" width="164" height="76" rx="8" fill="var(--bg-surface)" stroke="var(--border-color)" stroke-width="1.2" />
        <text x="486" y="46" text-anchor="middle" fill="var(--accent-color)" font-size="10" font-weight="600" letter-spacing="0.06em">STATE &amp; QUEUES</text>
        <text x="486" y="65" text-anchor="middle" fill="var(--text-primary)" font-size="12.5" font-weight="600">Table &amp; Queue</text>
        <text x="486" y="81" text-anchor="middle" fill="var(--text-muted)" font-size="10.5">Price History + Jobs</text>
        <!-- Arrow 3->4 -->
        <line x1="572" y1="56" x2="604" y2="56" stroke="var(--accent-color)" stroke-width="1.5" marker-end="url(#arrow-seeker)" />
        <!-- Node 4 -->
        <rect x="608" y="18" width="148" height="76" rx="8" fill="var(--bg-surface)" stroke="var(--accent-color)" stroke-opacity="0.45" stroke-width="1.2" />
        <text x="682" y="46" text-anchor="middle" fill="var(--accent-color)" font-size="10" font-weight="600" letter-spacing="0.06em">EGRESS</text>
        <text x="682" y="65" text-anchor="middle" fill="var(--text-primary)" font-size="12.5" font-weight="600">WireGuard VPN</text>
        <text x="682" y="81" text-anchor="middle" fill="var(--text-muted)" font-size="10.5">Isolated Scrapers</text>
      </svg>
    </div>

    <div class="highlights-grid">
      {#each seekerHighlights as item}
        <div class="highlight-box">
          <h3>{item.title}</h3>
          <p>{item.detail}</p>
        </div>
      {/each}
    </div>

    <div class="tag-list">
      {#each seekerTags as tag}
        <span class="tag">{tag}</span>
      {/each}
    </div>

    <div class="card-actions">
      {#each seekerLinks as link}
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          class="action-link"
          class:primary={link.primary}
        >
          {link.label}
        </a>
      {/each}
    </div>
  </article>

  <article class="glass-panel project-card">
    <div class="card-header">
      <div>
        <span class="eyebrow">Observability &amp; Edge</span>
        <h2>undo.is Outage-Proof Status &amp; Telemetry</h2>
      </div>
      <span class="status-pill">Live</span>
    </div>

    <p class="lead">
      An edge-hosted status API and homelab telemetry stack engineered to report accurate health
      even during a full home-network or power outage. A local container pushes signed heartbeats
      to a Cloudflare Worker backed by Workers KV, while Telegraf, InfluxDB 2.7, and Grafana
      handle deep host and UPS metrics and Discord alerting.
    </p>

    <div class="arch-diagram" role="img" aria-label="undo.is status architecture: Local host sends signed heartbeats to Cloudflare Workers and KV for edge status, while Telegraf ships metrics to InfluxDB 2.7 and Grafana.">
      <svg viewBox="0 0 760 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrow-status" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--accent-color)" />
          </marker>
        </defs>
        <!-- Source Node -->
        <rect x="4" y="26" width="166" height="76" rx="8" fill="var(--bg-surface)" stroke="var(--border-color)" stroke-width="1.2" />
        <text x="87" y="54" text-anchor="middle" fill="var(--accent-color)" font-size="10" font-weight="600" letter-spacing="0.06em">HOMELAB HOST</text>
        <text x="87" y="73" text-anchor="middle" fill="var(--text-primary)" font-size="12.5" font-weight="600">Docker + UPS</text>
        <text x="87" y="89" text-anchor="middle" fill="var(--text-muted)" font-size="10.5">Signed Heartbeat</text>

        <!-- Split arrows -->
        <path d="M 174 48 L 218 32 L 246 32" stroke="var(--accent-color)" stroke-width="1.5" marker-end="url(#arrow-status)" />
        <path d="M 174 80 L 218 96 L 246 96" stroke="var(--accent-color)" stroke-width="1.5" marker-end="url(#arrow-status)" />

        <!-- Top Path: Edge -->
        <rect x="250" y="6" width="215" height="52" rx="8" fill="var(--bg-surface)" stroke="var(--accent-color)" stroke-opacity="0.45" stroke-width="1.2" />
        <text x="357" y="28" text-anchor="middle" fill="var(--text-primary)" font-size="12.5" font-weight="600">Cloudflare Worker + KV</text>
        <text x="357" y="45" text-anchor="middle" fill="var(--text-muted)" font-size="10.5">Outage-Proof Edge Status API</text>

        <line x1="469" y1="32" x2="516" y2="32" stroke="var(--accent-color)" stroke-width="1.5" marker-end="url(#arrow-status)" />

        <rect x="520" y="6" width="236" height="52" rx="8" fill="var(--bg-surface)" stroke="var(--border-color)" stroke-width="1.2" />
        <text x="638" y="28" text-anchor="middle" fill="var(--text-primary)" font-size="12.5" font-weight="600">undo.is/status</text>
        <text x="638" y="45" text-anchor="middle" fill="var(--text-muted)" font-size="10.5">Public Live Telemetry View</text>

        <!-- Bottom Path: Metrics -->
        <rect x="250" y="70" width="215" height="52" rx="8" fill="var(--bg-surface)" stroke="var(--border-color)" stroke-width="1.2" />
        <text x="357" y="92" text-anchor="middle" fill="var(--text-primary)" font-size="12.5" font-weight="600">Telegraf &rarr; InfluxDB 2.7</text>
        <text x="357" y="109" text-anchor="middle" fill="var(--text-muted)" font-size="10.5">Time-Series Host &amp; UPS Metrics</text>

        <line x1="469" y1="96" x2="516" y2="96" stroke="var(--accent-color)" stroke-width="1.5" marker-end="url(#arrow-status)" />

        <rect x="520" y="70" width="236" height="52" rx="8" fill="var(--bg-surface)" stroke="var(--border-color)" stroke-width="1.2" />
        <text x="638" y="92" text-anchor="middle" fill="var(--text-primary)" font-size="12.5" font-weight="600">Grafana + Discord</text>
        <text x="638" y="109" text-anchor="middle" fill="var(--text-muted)" font-size="10.5">Dashboards &amp; Incident Alerts</text>
      </svg>
    </div>

    <div class="tag-list">
      {#each statusTags as tag}
        <span class="tag">{tag}</span>
      {/each}
    </div>

    <div class="card-actions">
      <a href="/status" class="action-link primary">View Live Status</a>
      <a
        href="https://github.com/cjjwisniewski/undo.is_infra"
        target="_blank"
        rel="noopener noreferrer"
        class="action-link"
      >
        undo.is_infra
      </a>
    </div>
  </article>

  <article class="glass-panel project-card">
    <div class="card-header">
      <div>
        <span class="eyebrow">Editorial &amp; Community</span>
        <h2>City of Traitors — Premodern MTG Chronicles</h2>
      </div>
      <span class="status-pill">Live</span>
    </div>

    <p class="lead">
      A long-form tournament report and editorial hub for Premodern Magic: the Gathering, pairing
      clean digital typography with 1998 <em>Exodus</em> visual motifs and hosting the Seeker platform.
    </p>

    <div class="tag-list">
      {#each cityOfTraitorsTags as tag}
        <span class="tag">{tag}</span>
      {/each}
    </div>

    <div class="card-actions">
      <a
        href="https://cityoftraitors.com"
        target="_blank"
        rel="noopener noreferrer"
        class="action-link primary"
      >
        Visit Site
      </a>
    </div>
  </article>

  <article class="glass-panel project-card">
    <div class="card-header">
      <div>
        <span class="eyebrow">Local Community</span>
        <h2>Pitt Imps — Pittsburgh Premodern MTG</h2>
      </div>
      <span class="status-pill">Live</span>
    </div>

    <p class="lead">
      The home for Pittsburgh's Premodern Magic: the Gathering community, featuring a lightweight
      Markdown-driven event schedule, custom Pit Imp branding, and Discord coordination.
    </p>

    <div class="tag-list">
      {#each pittImpsTags as tag}
        <span class="tag">{tag}</span>
      {/each}
    </div>

    <div class="card-actions">
      <a
        href="https://pittimps.com"
        target="_blank"
        rel="noopener noreferrer"
        class="action-link primary"
      >
        Visit Site
      </a>
      <a
        href="https://github.com/cjjwisniewski/pittimps.com"
        target="_blank"
        rel="noopener noreferrer"
        class="action-link"
      >
        GitHub
      </a>
    </div>
  </article>
</section>

<style>
  .projects-page {
    padding: 3rem 2rem;
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }

  .page-header h1 {
    font-size: clamp(1.85rem, 4vw, 2.5rem);
    margin: 0 0 0.5rem;
    color: var(--text-primary);
  }

  .subtitle {
    color: var(--text-secondary);
    margin: 0;
    max-width: 62ch;
  }

  .featured-card,
  .project-card {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .featured-card {
    border-top: 2px solid rgba(56, 189, 248, 0.45);
  }

  .arch-diagram {
    background: rgba(2, 6, 23, 0.45);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 0.85rem 1rem;
    overflow-x: auto;
  }

  .arch-diagram svg {
    display: block;
    width: 100%;
    min-width: 560px;
    height: auto;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }

  .eyebrow {
    display: inline-block;
    font-size: 0.78rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent-color);
    margin-bottom: 0.35rem;
  }

  h2 {
    font-size: clamp(1.25rem, 2.5vw, 1.55rem);
    margin: 0;
    color: var(--text-primary);
    line-height: 1.3;
  }

  .status-pill {
    flex-shrink: 0;
    font-size: 0.78rem;
    font-weight: 600;
    padding: 0.25rem 0.65rem;
    border-radius: 999px;
    color: #4ade80;
    background: rgba(74, 222, 128, 0.12);
    border: 1px solid rgba(74, 222, 128, 0.28);
  }

  .lead {
    margin: 0;
    color: var(--text-secondary);
    line-height: 1.7;
  }

  .highlights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
    gap: 1rem;
  }

  .highlight-box {
    background: rgba(15, 23, 42, 0.55);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 1rem 1.15rem;
  }

  .highlight-box h3 {
    margin: 0 0 0.4rem;
    font-size: 0.98rem;
    color: var(--text-primary);
  }

  .highlight-box p {
    margin: 0;
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.55;
  }

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tag {
    font-size: 0.8rem;
    color: var(--text-secondary);
    background: var(--bg-surface);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 0.25rem 0.6rem;
  }

  .card-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding-top: 0.25rem;
  }

  .action-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.55rem 1rem;
    border-radius: var(--border-radius);
    font-size: 0.9rem;
    font-weight: 500;
    border: 1px solid var(--border-color);
    background: var(--bg-surface);
    color: var(--text-primary);
    transition: all 0.2s ease;
  }

  .action-link:hover {
    border-color: var(--accent-color);
    color: var(--accent-color);
    text-shadow: none;
  }

  .action-link.primary {
    background: var(--accent-color);
    border-color: var(--accent-color);
    color: var(--c-slate-950);
    font-weight: 600;
  }

  .action-link.primary:hover {
    background: var(--accent-hover);
    border-color: var(--accent-hover);
    color: var(--c-slate-950);
  }

  @media (max-width: 640px) {
    .projects-page {
      padding: 1.5rem 1rem;
    }

    .card-actions .action-link {
      flex: 1 1 auto;
    }
  }
</style>
