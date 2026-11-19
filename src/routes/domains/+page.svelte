<script lang="ts">
  import { onMount } from "svelte";
  import { openContactModal } from "$lib/contactModal.svelte";

  interface DomainListing {
    name: string;
    category: string;
    summary: string;
    priceNote: string;
    status: "Available" | "Reserved";
  }

  const domains: DomainListing[] = [
    {
      name: "naiad.io",
      category: "Short Brandable .io",
      summary:
        "Clean 5-letter mythological name suited for developer tools, AI/data platforms, cloud infrastructure, or water/ocean-tech startups.",
      priceNote: "Open to reasonable offers",
      status: "Available"
    }
  ];

  let referredDomain = $state<string | null>(null);

  const matchedReferred = $derived(
    referredDomain
      ? domains.find((d) => d.name.toLowerCase() === referredDomain?.toLowerCase()) ?? null
      : null
  );

  function openDomainInquiry(domainName: string) {
    openContactModal({
      heading: `Inquire about ${domainName}`,
      subject: `Domain Inquiry: ${domainName}`,
      domain: domainName
    });
  }

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = (params.get("from") || params.get("domain") || "").trim().toLowerCase();
    // Accept only syntactically valid domain strings
    if (raw && /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9-]{2,})+$/.test(raw)) {
      referredDomain = raw;
    }
  });

  const metaDescription =
    "Curated domain names owned by Cameron Wisniewski that are currently available for acquisition, including naiad.io.";

  const breadcrumbJsonLd = `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.undo.is/" },
      { "@type": "ListItem", position: 2, name: "Domains", item: "https://www.undo.is/domains/" }
    ]
  })}<\/script>`;
</script>

<svelte:head>
  <title>Domains for Sale | undo.is</title>
  <meta name="robots" content="noindex, nofollow" />
  <meta name="description" content={metaDescription} />
  <link rel="canonical" href="https://www.undo.is/domains/" />
  <meta property="og:title" content="Domains for Sale | undo.is" />
  <meta property="og:description" content={metaDescription} />
  <meta property="og:url" content="https://www.undo.is/domains/" />
  <meta name="twitter:title" content="Domains for Sale | undo.is" />
  <meta name="twitter:description" content={metaDescription} />
  <meta name="twitter:url" content="https://www.undo.is/domains/" />
  {@html breadcrumbJsonLd}
</svelte:head>

<section class="container domains-page">
  <header class="page-header">
    <span class="eyebrow">Domain Portfolio</span>
    <h1>Domains for Sale</h1>
    <p class="subtitle">
      Select domains I own and am open to parting with. Transfers are handled cleanly via standard
      registrar transfer or escrow.
    </p>
  </header>

  {#if referredDomain}
    <div class="glass-panel redirect-banner" role="status" aria-live="polite">
      <div class="redirect-copy">
        <span class="eyebrow">Redirected Domain</span>
        <p>
          {#if matchedReferred}
            You arrived from <strong>{matchedReferred.name}</strong> — this domain is currently
            available for acquisition.
          {:else}
            You arrived from <strong>{referredDomain}</strong>. Reach out directly if you'd like to
            inquire about availability.
          {/if}
        </p>
      </div>
      <button
        type="button"
        class="action-link primary"
        onclick={() => openDomainInquiry(referredDomain!)}
      >
        Inquire about {referredDomain}
      </button>
    </div>
  {/if}

  <div class="domains-grid">
    {#each domains as domain (domain.name)}
      <article
        class="glass-panel domain-card"
        class:highlighted={referredDomain === domain.name.toLowerCase()}
      >
        <div class="card-header">
          <div>
            <span class="eyebrow">{domain.category}</span>
            <h2>{domain.name}</h2>
          </div>
          <span class="status-pill">{domain.status}</span>
        </div>

        <p class="summary">{domain.summary}</p>

        <div class="card-footer">
          <span class="price-note">{domain.priceNote}</span>
          <button
            type="button"
            class="action-link primary"
            onclick={() => openDomainInquiry(domain.name)}
          >
            Make an Offer
          </button>
        </div>
      </article>
    {/each}
  </div>

  <div class="glass-panel info-panel">
    <h2>How Transfers Work</h2>
    <p>
      Serious inquiries only. Once we agree on terms, transfers can be completed directly via
      registrar push / EPP auth code or through a reputable escrow service (such as Escrow.com) for
      buyer and seller protection.
    </p>
  </div>
</section>

<style>
  .domains-page {
    padding: 3rem 2rem;
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }

  .page-header {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .eyebrow {
    display: inline-block;
    font-size: 0.78rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent-color);
  }

  h1 {
    font-size: clamp(1.85rem, 4vw, 2.5rem);
    line-height: 1.15;
    color: var(--text-primary);
  }

  .subtitle {
    color: var(--text-secondary);
    max-width: 62ch;
    line-height: 1.65;
  }

  .redirect-banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.25rem;
    flex-wrap: wrap;
    border-color: rgba(56, 189, 248, 0.45);
  }

  .redirect-copy {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    max-width: 56ch;
  }

  .redirect-copy strong {
    color: var(--text-primary);
  }

  .domains-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr));
    gap: 1.25rem;
  }

  .domain-card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .domain-card.highlighted {
    border-color: var(--accent-color);
    border-top: 2px solid var(--accent-color);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }

  .domain-card h2 {
    font-size: clamp(1.35rem, 2.5vw, 1.65rem);
    color: var(--text-primary);
    margin-top: 0.25rem;
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

  .summary {
    color: var(--text-secondary);
    line-height: 1.65;
    flex: 1;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    padding-top: 0.85rem;
    border-top: 1px solid var(--border-color);
  }

  .price-note {
    font-size: 0.88rem;
    color: var(--text-muted);
    font-weight: 500;
  }

  .action-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.6rem 1.15rem;
    border-radius: var(--border-radius);
    border: none;
    font: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .action-link.primary {
    background: var(--accent-color);
    color: var(--c-slate-950);
  }

  .action-link.primary:hover {
    background: var(--accent-hover);
    color: var(--c-slate-950);
    text-shadow: none;
  }

  .info-panel {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .info-panel h2 {
    font-size: 1.15rem;
    color: var(--text-primary);
  }

  .info-panel p {
    font-size: 0.94rem;
    line-height: 1.65;
    max-width: 66ch;
  }

  @media (max-width: 640px) {
    .domains-page {
      padding: 1.5rem 1rem;
    }

    .redirect-banner .action-link,
    .card-footer .action-link {
      width: 100%;
      min-height: 44px;
    }
  }
</style>
