<script lang="ts">
  import { contactModal, closeContactModal } from "$lib/contactModal.svelte";

  let name = $state("");
  let email = $state("");
  let subject = $state("");
  let message = $state("");
  let website = $state(""); // Honeypot field

  let submitting = $state(false);
  let submitted = $state(false);
  let error = $state<string | null>(null);

  let dialogEl = $state<HTMLDivElement | null>(null);
  let nameInputEl = $state<HTMLInputElement | null>(null);
  let lastFocusedEl: HTMLElement | null = null;

  $effect(() => {
    if (contactModal.open) {
      lastFocusedEl =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      document.body.style.overflow = "hidden";
      subject = contactModal.subject;
      submitted = false;
      error = null;
      submitting = false;
      queueMicrotask(() => {
        nameInputEl?.focus();
      });

      return () => {
        document.body.style.overflow = "";
        lastFocusedEl?.focus();
        lastFocusedEl = null;
      };
    }
  });

  function handleKeydown(event: KeyboardEvent) {
    if (!contactModal.open) return;
    if (event.key === "Escape" && !submitting) {
      closeContactModal();
      return;
    }
    if (event.key === "Tab" && dialogEl) {
      const focusables = Array.from(
        dialogEl.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget && !submitting) {
      closeContactModal();
    }
  }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (submitting) return;

    error = null;
    submitting = true;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim() || contactModal.subject,
          domain: contactModal.domain || undefined,
          message: message.trim(),
          website
        })
      });

      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };

      if (!response.ok || !data.ok) {
        throw new Error(data.error || `Request failed (HTTP ${response.status})`);
      }

      submitted = true;
      name = "";
      email = "";
      message = "";
      website = "";
    } catch (err) {
      error = err instanceof Error ? err.message : "Unable to send your message right now.";
    } finally {
      submitting = false;
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if contactModal.open}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="modal-backdrop" onclick={handleBackdropClick}>
    <div
      bind:this={dialogEl}
      class="glass-panel modal-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div class="modal-header">
        <div>
          <span class="eyebrow">
            {contactModal.domain ? `Domain Inquiry - ${contactModal.domain}` : "Contact"}
          </span>
          <h2 id="contact-modal-title">{contactModal.heading}</h2>
        </div>
        <button
          type="button"
          class="close-btn"
          aria-label="Close contact dialog"
          onclick={closeContactModal}
          disabled={submitting}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {#if submitted}
        <div class="success-state" role="status" aria-live="polite">
          <div class="success-badge">Message Sent</div>
          <p>
            Thanks for reaching out. Your message has been delivered and I'll reply to your email as
            soon as I can.
          </p>
          <div class="modal-actions">
            <button type="button" class="btn btn-primary" onclick={closeContactModal}>
              Done
            </button>
          </div>
        </div>
      {:else}
        <form class="contact-form" onsubmit={handleSubmit}>
          <div class="field-row">
            <label class="field">
              <span>Name</span>
              <input
                bind:this={nameInputEl}
                type="text"
                name="name"
                bind:value={name}
                required
                maxlength="100"
                autocomplete="name"
                placeholder="Your name"
                disabled={submitting}
              />
            </label>

            <label class="field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                bind:value={email}
                required
                maxlength="254"
                autocomplete="email"
                placeholder="you@example.com"
                disabled={submitting}
              />
            </label>
          </div>

          <label class="field">
            <span>Subject</span>
            <input
              type="text"
              name="subject"
              bind:value={subject}
              required
              maxlength="140"
              placeholder="What is this regarding?"
              disabled={submitting}
            />
          </label>

          <!-- Honeypot field hidden from human users -->
          <div class="hp-field" aria-hidden="true">
            <label>
              <span>Website</span>
              <input type="text" name="website" bind:value={website} tabindex="-1" autocomplete="off" />
            </label>
          </div>

          <label class="field">
            <span>Message</span>
            <textarea
              name="message"
              bind:value={message}
              required
              minlength="10"
              maxlength="4000"
              rows="5"
              placeholder={contactModal.domain
                ? `Share your offer or questions regarding ${contactModal.domain}...`
                : "How can I help?"}
              disabled={submitting}
            ></textarea>
          </label>

          {#if error}
            <p class="form-error" role="alert">
              {error}
            </p>
          {/if}

          <div class="modal-actions">
            <button
              type="button"
              class="btn btn-secondary"
              onclick={closeContactModal}
              disabled={submitting}
            >
              Cancel
            </button>
            <button type="submit" class="btn btn-primary" disabled={submitting}>
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      {/if}
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 500;
    background: rgba(2, 6, 23, 0.78);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.25rem;
    overflow-y: auto;
  }

  .modal-dialog {
    width: 100%;
    max-width: 560px;
    background: rgba(15, 23, 42, 0.96);
    border: 1px solid var(--border-color);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.65);
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .modal-dialog:hover {
    transform: none;
    border-color: var(--border-color);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }

  .eyebrow {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent-color);
    margin-bottom: 0.2rem;
  }

  h2 {
    font-size: clamp(1.25rem, 2.5vw, 1.5rem);
    color: var(--text-primary);
    line-height: 1.25;
  }

  .close-btn {
    background: transparent;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    color: var(--text-muted);
    width: 36px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: all 0.2s ease;
  }

  .close-btn:hover {
    color: var(--text-primary);
    border-color: var(--accent-color);
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .field-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.85rem;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .field span {
    font-size: 0.84rem;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .field input,
  .field textarea {
    width: 100%;
    padding: 0.65rem 0.8rem;
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    background: var(--bg-color);
    color: var(--text-primary);
    font: inherit;
    font-size: 0.92rem;
    line-height: 1.5;
    transition: border-color 0.2s ease;
  }

  .field textarea {
    resize: vertical;
    min-height: 110px;
  }

  .field input:focus,
  .field textarea:focus {
    outline: none;
    border-color: var(--accent-color);
  }

  .field input::placeholder,
  .field textarea::placeholder {
    color: var(--text-muted);
  }

  .hp-field {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  .form-error {
    color: #f87171;
    background: rgba(239, 68, 68, 0.12);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: var(--border-radius);
    padding: 0.65rem 0.85rem;
    font-size: 0.88rem;
  }

  .success-state {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .success-badge {
    align-self: flex-start;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.25rem 0.7rem;
    border-radius: 999px;
    color: #4ade80;
    background: rgba(74, 222, 128, 0.12);
    border: 1px solid rgba(74, 222, 128, 0.28);
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 0.25rem;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.65rem 1.25rem;
    border-radius: var(--border-radius);
    font-weight: 600;
    font-size: 0.92rem;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid transparent;
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-primary {
    background-color: var(--accent-color);
    color: var(--c-slate-950);
  }

  .btn-primary:hover:not(:disabled) {
    background-color: var(--accent-hover);
  }

  .btn-secondary {
    background-color: var(--bg-surface);
    border-color: var(--border-color);
    color: var(--text-primary);
  }

  .btn-secondary:hover:not(:disabled) {
    background-color: var(--bg-surface-hover);
    border-color: var(--accent-color);
  }

  @media (max-width: 640px) {
    .field-row {
      grid-template-columns: 1fr;
    }

    .modal-actions {
      flex-direction: column-reverse;
    }

    .modal-actions .btn {
      width: 100%;
      min-height: 44px;
    }
  }
</style>
