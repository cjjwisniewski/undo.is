<script lang="ts">
  import { page } from "$app/state";

  const status = $derived(page.status || 404);
  const isNotFound = $derived(status === 404);
  const heading = $derived(isNotFound ? "Page Not Found" : "Something Went Wrong");
  const detail = $derived(
    isNotFound
      ? "The page you requested does not exist or may have moved."
      : page.error?.message || "An unexpected error occurred while loading this page."
  );
</script>

<svelte:head>
  <title>{status} - {heading} | undo.is</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<section class="container error-page">
  <div class="glass-panel error-card">
    <span class="eyebrow">HTTP {status}</span>
    <h1>{heading}</h1>
    <p class="detail">{detail}</p>
    <div class="actions">
      <a href="/" class="btn btn-primary">Return Home</a>
      <a href="/projects/" class="btn btn-secondary">Explore Projects</a>
      <a href="/resume/" class="btn btn-secondary">View Resume</a>
    </div>
  </div>
</section>

<style>
  .error-page {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
  }

  .error-card {
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: left;
  }

  .eyebrow {
    font-family: var(--font-mono);
    font-size: 0.76rem;
    font-weight: 500;
    letter-spacing: 0.03em;
    color: var(--text-muted);
  }

  h1 {
    font-size: clamp(1.85rem, 4vw, 2.5rem);
    line-height: 1.15;
    color: var(--text-primary);
  }

  .detail {
    color: var(--text-secondary);
    line-height: 1.7;
    max-width: 52ch;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.65rem 1.25rem;
    border-radius: var(--border-radius);
    font-weight: 600;
    font-size: 0.92rem;
    transition: all 0.2s ease;
  }

  .btn-primary {
    background-color: var(--accent-color);
    color: var(--c-slate-950);
  }

  .btn-primary:hover {
    background-color: var(--accent-hover);
    color: var(--c-slate-950);
    text-shadow: none;
  }

  .btn-secondary {
    background-color: var(--bg-surface);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
  }

  .btn-secondary:hover {
    background-color: var(--bg-surface-hover);
    border-color: var(--accent-color);
    color: var(--text-primary);
    text-shadow: none;
  }

  @media (max-width: 640px) {
    .error-page {
      padding: 1.5rem 1rem;
    }

    .actions {
      flex-direction: column;
    }

    .actions .btn {
      width: 100%;
      min-height: 44px;
    }
  }
</style>
