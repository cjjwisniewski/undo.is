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
      title: "Edge Security & IaC",
      detail:
        "Protected by Azure API Management (APIM) and Discord OAuth, with all serverless and storage infrastructure provisioned declaratively via Terraform."
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

  const seekerFlow = [
    { eyebrow: "EDGE & AUTH", title: "Azure APIM", subtitle: "Discord OAuth" },
    { eyebrow: "COMPUTE", title: "Azure Functions", subtitle: "Python Serverless" },
    { eyebrow: "STATE & QUEUES", title: "Table & Queue", subtitle: "Price History + Jobs" },
    { eyebrow: "DELIVERY", title: "Discord Alerts", subtitle: "Restocks & Drops", accent: true }
  ];

  const statusBranches = [
    [
      { title: "Cloudflare Worker + KV", subtitle: "Outage-Proof Edge Status API", accent: true },
      { title: "undo.is/status", subtitle: "Public Live Telemetry View" }
    ],
    [
      { title: "Telegraf → InfluxDB 2.7", subtitle: "Time-Series Host & UPS Metrics" },
      { title: "Grafana + Discord", subtitle: "Dashboards & Incident Alerts" }
    ]
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
  <link rel="canonical" href="https://www.undo.is/projects/" />
  <meta property="og:title" content="Projects | undo.is" />
  <meta
    property="og:description"
    content="Selected cloud architecture, serverless platform, and homelab observability projects by Cameron Wisniewski."
  />
  <meta property="og:url" content="https://www.undo.is/projects/" />
  <meta name="twitter:title" content="Projects | undo.is" />
  <meta
    name="twitter:description"
    content="Selected cloud architecture, serverless platform, and homelab observability projects by Cameron Wisniewski."
  />
  <meta name="twitter:url" content="https://www.undo.is/projects/" />
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
        <h2>Seeker - Collectible Card Stock &amp; Pricing Platform</h2>
      </div>
      <span class="status-pill">Live</span>
    </div>

    <p class="lead">
      A multi-marketplace availability tracker and historical pricing engine built on Azure
      serverless primitives, strict data-integrity invariants, and Terraform IaC.
    </p>

    <div class="arch-diagram" aria-label="Seeker architecture: Edge and Discord OAuth through Azure APIM to Azure Functions, Queue and Table Storage, and Discord alert delivery.">
      <div class="flow-linear">
        {#each seekerFlow as node, i}
          <div class="flow-node" class:accent={node.accent}>
            <span class="node-eyebrow">{node.eyebrow}</span>
            <span class="node-title">{node.title}</span>
            <span class="node-subtitle">{node.subtitle}</span>
          </div>
          {#if i < seekerFlow.length - 1}
            <div class="flow-arrow" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 9H14M14 9L9.5 4.5M14 9L9.5 13.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          {/if}
        {/each}
      </div>
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

    <div class="arch-diagram" aria-label="undo.is status architecture: Local host sends signed heartbeats to Cloudflare Workers and KV for edge status, while Telegraf ships metrics to InfluxDB 2.7 and Grafana.">
      <div class="flow-branch">
        <div class="flow-node flow-source">
          <span class="node-eyebrow">HOMELAB HOST</span>
          <span class="node-title">Docker + UPS</span>
          <span class="node-subtitle">Signed Heartbeat</span>
        </div>

        <div class="flow-arrow flow-split-arrow" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 9H14M14 9L9.5 4.5M14 9L9.5 13.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>

        <div class="flow-branches">
          {#each statusBranches as branch}
            <div class="flow-branch-row">
              {#each branch as node, i}
                <div class="flow-node compact" class:accent={node.accent}>
                  <span class="node-title">{node.title}</span>
                  <span class="node-subtitle">{node.subtitle}</span>
                </div>
                {#if i < branch.length - 1}
                  <div class="flow-arrow" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3 9H14M14 9L9.5 4.5M14 9L9.5 13.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                {/if}
              {/each}
            </div>
          {/each}
        </div>
      </div>
    </div>

    <div class="tag-list">
      {#each statusTags as tag}
        <span class="tag">{tag}</span>
      {/each}
    </div>

    <div class="card-actions">
      <a href="/status/" class="action-link primary">View Live Status</a>
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
        <h2>City of Traitors - Premodern MTG Chronicles</h2>
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
        <h2>Pitt Imps - Pittsburgh Premodern MTG</h2>
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
    background: var(--bg-inset);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 0.9rem 1rem;
  }

  .flow-linear,
  .flow-branch,
  .flow-branch-row {
    display: flex;
    align-items: stretch;
    gap: 0.5rem;
  }

  .flow-branches {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    flex: 1;
    min-width: 0;
  }

  .flow-node {
    flex: 1;
    min-width: 0;
    background: var(--bg-surface);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 0.75rem 0.65rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 0.2rem;
  }

  .flow-node.compact {
    padding: 0.55rem 0.75rem;
  }

  .flow-node.accent {
    border-color: rgba(56, 189, 248, 0.45);
  }

  .flow-source {
    flex: 0 0 185px;
  }

  .node-eyebrow {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: var(--accent-color);
    text-transform: uppercase;
  }

  .node-title {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-primary);
    line-height: 1.25;
  }

  .node-subtitle {
    font-size: 0.72rem;
    color: var(--text-muted);
    line-height: 1.25;
  }

  .flow-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-color);
    flex-shrink: 0;
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
    background: var(--bg-elevated);
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

    .flow-linear,
    .flow-branch,
    .flow-branch-row {
      flex-direction: column;
      gap: 0.35rem;
    }

    .flow-source {
      flex: 1 1 auto;
    }

    .flow-branches {
      gap: 0.75rem;
    }

    .flow-branch-row {
      border-left: 2px solid rgba(56, 189, 248, 0.3);
      padding-left: 0.65rem;
    }

    .flow-arrow svg {
      transform: rotate(90deg);
    }

    .card-actions .action-link {
      flex: 1 1 auto;
    }
  }
</style>
