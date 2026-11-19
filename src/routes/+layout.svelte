<script lang="ts">
  import { page } from "$app/state";
  import "@fontsource-variable/inter";
  import ContactModal from "$lib/components/ContactModal.svelte";
  import { openContactModal } from "$lib/contactModal.svelte";
  import undoLockup from "$lib/undo-lockup.png?w=240&format=webp";
  import "../app.css";
  let { children } = $props();
</script>

<a href="#main-content" class="skip-link">Skip to main content</a>

<header class="navbar">
  <div class="container nav-container">
    <div class="brand">
      <a href="/" class="brand-link" aria-label="undo.is home">
        <img src={undoLockup} alt="undo.is" class="brand-logo" width="64" height="40" />
      </a>
    </div>
    <nav class="nav-links">
      <a href="/" class:active={page.url.pathname === "/"}>Home</a>
      <a href="/projects/" class:active={page.url.pathname.startsWith("/projects")}>Projects</a>
      <a href="/resume/" class:active={page.url.pathname.startsWith("/resume")}>Resume</a>
      <a href="/status/" class:active={page.url.pathname.startsWith("/status")}>Status</a>
    </nav>
  </div>
</header>

<main id="main-content" class="page-content" tabindex="-1">
  {@render children()}
</main>

<footer class="site-footer">
  <div class="container footer-container">
    <span>© {new Date().getFullYear()} Cameron Wisniewski</span>
    <div class="footer-links">
      <a href="/projects/">Projects</a>
      <a href="/resume/">Resume</a>
      <a href="/status/">Status</a>
      <a href="https://github.com/cjjwisniewski" target="_blank" rel="me noopener noreferrer">GitHub</a>
      <a href="https://linkedin.com/in/CameronWisniewski" target="_blank" rel="me noopener noreferrer">LinkedIn</a>
      <button type="button" class="footer-link-btn" onclick={() => openContactModal()}>Contact</button>
    </div>
  </div>
</footer>

<ContactModal />

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
    padding: 0.75rem 2rem;
  }

  .brand-link {
    display: flex;
    align-items: center;
    color: var(--text-primary);
  }

  .brand-link:hover {
    color: var(--text-primary);
    text-shadow: none;
    opacity: 0.85;
  }

  .brand-logo {
    height: 38px;
    width: auto;
    display: block;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .nav-links a {
    color: var(--text-secondary);
    font-weight: 500;
    font-size: 0.95rem;
    padding: 0.5rem 0;
    position: relative;
  }

  .nav-links a:hover,
  .nav-links a.active {
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

  .nav-links a:hover::after,
  .nav-links a.active::after {
    transform: scaleX(1);
    transform-origin: left;
  }

  @media (max-width: 640px) {
    .nav-container {
      padding: 0.65rem 1rem;
    }

    .brand-logo {
      height: 32px;
    }

    .nav-links {
      gap: 0.85rem;
    }

    .nav-links a {
      font-size: 0.875rem;
    }
  }

  .page-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .site-footer {
    border-top: 1px solid var(--border-color);
    color: var(--text-secondary);
    font-size: 0.85rem;
  }

  .footer-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem 2rem;
    flex-wrap: wrap;
  }

  .footer-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1.25rem;
  }

  .footer-links a,
  .footer-link-btn {
    color: var(--text-secondary);
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .footer-links a:hover,
  .footer-link-btn:hover {
    color: var(--text-primary);
  }

  @media (max-width: 640px) {
    .footer-container {
      padding: 1rem;
    }
  }
</style>
