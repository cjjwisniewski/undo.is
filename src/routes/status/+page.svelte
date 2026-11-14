<script lang="ts">
  import { onMount } from "svelte";

  interface HostStatus {
    id: string;
    label: string;
    role: string;
    status: "online" | "offline";
    uptime: number | null;
  }

  interface StatusPayload {
    overall: "operational" | "degraded" | "offline";
    stale: boolean;
    updated_at: number | null;
    hosts: HostStatus[];
  }

  let data = $state<StatusPayload | null>(null);
  let loading = $state(true);
  let error = $state<string | null>(null);

  const bannerText = $derived.by(() => {
    if (!data) return "Checking status...";
    if (data.overall === "operational") return "All Systems Operational";
    if (data.overall === "degraded") return "Partial System Outage";
    return "Homelab Offline";
  });

  function formatUptime(seconds: number | null): string {
    if (seconds === null || seconds < 0) return "—";
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (days > 0) return `${days}d ${hours}h ${mins}m`;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  }

  function formatUpdated(ts: number | null): string {
    if (!ts) return "Never";
    return new Date(ts).toLocaleString();
  }

  async function fetchStatus() {
    try {
      const res = await fetch("https://status.undo.is/api/status", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      data = (await res.json()) as StatusPayload;
      error = null;
    } catch (err) {
      error = err instanceof Error ? err.message : "Failed to load status";
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    fetchStatus();
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchStatus();
      }
    }, 30_000);
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchStatus();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  });
</script>

<svelte:head>
  <title>Status | undo.is</title>
  <meta name="description" content="Live availability status for undo.is homelab servers." />
  <meta property="og:title" content="System Status | undo.is" />
  <meta property="og:description" content="Live availability status for undo.is homelab servers." />
  <meta property="og:url" content="https://undo.is/status/" />
</svelte:head>

<section class="container status-page">
  <div class="header">
    <h1>System Status</h1>
    <p class="subtitle">Live availability for undo.is servers and game hosts.</p>
  </div>

  {#if loading && !data}
    <div class="banner loading">Checking system availability...</div>
  {:else if error && !data}
    <div class="banner offline">Unable to reach status API ({error})</div>
  {:else if data}
    <div class="banner {data.overall}">
      <span class="dot"></span>
      <span>{bannerText}</span>
    </div>

    <div class="grid">
      {#each data.hosts as host (host.id)}
        <div class="card">
          <div class="card-top">
            <div>
              <h2>{host.label}</h2>
              <span class="role">{host.role}</span>
            </div>
            <span class="badge {host.status}">
              <span class="dot"></span>
              {host.status === "online" ? "Online" : "Offline"}
            </span>
          </div>
          <div class="card-meta">
            <span>Uptime</span>
            <strong>{formatUptime(host.uptime)}</strong>
          </div>
        </div>
      {/each}
    </div>

    <p class="updated">
      Last heartbeat: {formatUpdated(data.updated_at)}
      {#if data.stale}
        <span class="stale-note">(stale - heartbeat older than 3 minutes)</span>
      {/if}
    </p>
  {/if}
</section>

<style>
  .status-page {
    padding: 3rem 2rem;
    max-width: 900px;
    margin: 0 auto;
  }

  .header {
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 2rem;
    margin: 0 0 0.5rem;
    color: var(--text-primary);
  }

  .subtitle {
    color: var(--text-secondary);
    margin: 0;
  }

  .banner {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    border-radius: var(--border-radius);
    font-weight: 600;
    margin-bottom: 2rem;
    border: 1px solid var(--border-color);
    background: var(--bg-surface);
  }

  .banner.operational {
    border-color: rgba(34, 197, 94, 0.4);
    color: #4ade80;
  }

  .banner.degraded {
    border-color: rgba(245, 158, 11, 0.4);
    color: #fbbf24;
  }

  .banner.offline {
    border-color: rgba(239, 68, 68, 0.4);
    color: #f87171;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
    gap: 1rem;
  }

  .card {
    background: var(--bg-surface);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.75rem;
  }

  h2 {
    font-size: 1.05rem;
    margin: 0;
    color: var(--text-primary);
  }

  .role {
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.25rem 0.65rem;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .badge.online {
    background: rgba(34, 197, 94, 0.15);
    color: #4ade80;
  }

  .badge.offline {
    background: rgba(239, 68, 68, 0.15);
    color: #f87171;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
  }

  .card-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    color: var(--text-secondary);
    border-top: 1px solid var(--border-color);
    padding-top: 0.75rem;
  }

  .updated {
    margin-top: 1.5rem;
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  .stale-note {
    color: #f87171;
    margin-left: 0.25rem;
  }

  @media (max-width: 640px) {
    .status-page {
      padding: 1.5rem 1rem;
    }
  }
</style>
