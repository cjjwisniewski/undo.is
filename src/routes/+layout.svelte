<script lang="ts">
  import { onMount } from "svelte";
  import "../app.css";
  let { children } = $props();

  let isLightMode = $state(false);

  onMount(() => {
    // Check local storage explicitly for light mode; otherwise default dark
    if (localStorage.getItem("theme") === "light") {
      isLightMode = true;
      document.documentElement.classList.add("light");
    }
  });

  function toggleTheme() {
    isLightMode = !isLightMode;
    if (isLightMode) {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  }
</script>

<header class="navbar">
  <div class="container nav-container">
    <div class="brand">
      <a href="/" class="brand-link">
        <img src="/undo.png" alt="undo.is logo" class="brand-logo" />
        <span class="brand-text">undo.is</span>
      </a>
    </div>
    <nav class="nav-links">
      <a href="/">Home</a>
      <a href="/resume">Resume</a>
      <button
        class="theme-toggle"
        onclick={toggleTheme}
        aria-label="Toggle theme"
      >
        {#if isLightMode}
          🌙
        {:else}
          ☀️
        {/if}
      </button>
    </nav>
  </div>
</header>

<main class="page-content">
  {@render children()}
</main>

<style>
  .navbar {
    background: var(--nav-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border-color);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
  }

  .brand-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--text-primary);
  }

  .brand-link:hover {
    color: var(--text-primary);
    text-shadow: none;
    opacity: 0.8;
  }

  .brand-logo {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    filter: invert(1);
    transition: filter 0.3s ease;
  }

  :global(.light) .brand-logo {
    filter: invert(0);
  }

  .brand-text {
    font-weight: 700;
    font-size: 1.25rem;
    letter-spacing: -0.02em;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .theme-toggle {
    display: none; /* Hidden by user request, keeping logic for future */
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 1.25rem;
    cursor: pointer;
    padding: 0 0.5rem;
    transition:
      transform 0.2s ease,
      filter 0.2s ease;
  }

  .theme-toggle:hover {
    transform: scale(1.1);
  }

  .nav-links a {
    color: var(--text-secondary);
    font-weight: 500;
    font-size: 0.95rem;
    padding: 0.5rem 0;
    position: relative;
  }

  .nav-links a:hover {
    color: var(--text-primary);
    text-shadow: none;
  }

  .nav-links a::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--accent-color);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  .nav-links a:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }

  .page-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
