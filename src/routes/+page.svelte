<script lang="ts">
    // Modern, sleek portfolio page
    const name = "Cameron Wisniewski";
    const title = "Technical Leader / Cloud Architect";
    const email = "cameron@undo.is";
    const github = "https://github.com/cjjwisniewski";
    const linkedin = "https://linkedin.com/in/CameronWisniewski";
    const bluesky = "https://bsky.app/profile/undo.is";

    // Optimized Vite asset import (automatically handles format/compression)
    import avatar from "$lib/avatar.jpg?enhanced";

    const description = `Technical leader with fifteen years of experience designing, securing, and scaling enterprise cloud platforms. Specialized in multi-tenant cloud architecture, security-by-default infrastructure, and platform enablement for large engineering organizations. Expert-level proficiency in AWS, Microsoft Azure, and Infrastructure as Code. Proven record of leading high-ambiguity initiatives, defining long-term technical direction, and creating force-multipliers to enable engineering organizations.`;
</script>

<svelte:head>
    <title>Cameron Wisniewski | Portfolio</title>
    <meta name="description" content="Cameron Wisniewski - {title}" />
</svelte:head>

<div class="hero container">
    <div class="hero-content">
        <div class="avatar-container glass-panel">
            <img src={avatar} alt="Cameron Wisniewski" class="avatar" />
        </div>

        <div class="info-container glass-panel">
            <h1>{name}</h1>
            <h2 class="title">{title}</h2>

            <p class="description">
                {description}
            </p>

            <div class="actions">
                <a href="/resume" class="btn btn-primary">View Full Resume</a>
                <a href="mailto:{email}" class="btn btn-secondary">Contact Me</a
                >
            </div>

            <div class="social-links">
                <a
                    href={bluesky}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="social-link"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path
                            d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566 1.055 0 2.158 0 5.494c0 1.954 1.411 7.234 1.895 7.828.535.655 1.549.851 3.257.653-2.617 1.838-2.664 2.87-2.502 3.654.18.868 1.159 1.503 2.502 1.503 2.193 0 6.64-4.045 6.848-4.22.208.175 4.655 4.22 6.848 4.22 1.343 0 2.322-.635 2.502-1.503.162-.784.115-1.816-2.502-3.654 1.708.198 2.722.002 3.257-.653.484-.594 1.895-5.874 1.895-7.828 0-3.336-2.566-4.439-5.202-2.811-2.752 1.942-5.711 5.881-6.798 7.995z"
                        />
                    </svg>
                    Bluesky
                </a>
                <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="social-link"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor"
                        ><path
                            d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                        /></svg
                    >
                    GitHub
                </a>
                <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="social-link"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor"
                        ><path
                            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                        /></svg
                    >
                    LinkedIn
                </a>
            </div>
        </div>
    </div>
</div>

<style>
    .hero {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        min-height: calc(100vh - 80px); /* minus header */
    }

    .hero-content {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        width: 100%;
        align-items: center;
        text-align: center;
    }

    @media (min-width: 768px) {
        .hero-content {
            max-width: 800px;
            margin: 0 auto;
        }
    }

    .avatar-container {
        flex-shrink: 0;
        padding: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .avatar {
        width: 320px;
        height: 320px;
        object-fit: cover;
        border-radius: var(--border-radius);
        transition: transform 0.4s ease;
    }

    .avatar-container:hover .avatar {
        transform: scale(1.05) rotate(-2deg);
    }

    .info-container {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    h1 {
        font-size: 2.5rem;
        background: linear-gradient(
            135deg,
            var(--c-slate-50) 0%,
            var(--c-slate-300) 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .title {
        font-size: 1.25rem;
        color: var(--accent-color);
        font-weight: 500;
    }

    .description {
        font-size: 1.05rem;
        line-height: 1.7;
        margin-bottom: 0.5rem;
    }

    .actions {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
        flex-wrap: wrap;
        justify-content: center;
    }

    .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem 1.5rem;
        border-radius: var(--border-radius);
        font-weight: 600;
        transition: all 0.2s ease;
        cursor: pointer;
    }

    .btn-primary {
        background-color: var(--accent-color);
        color: var(--c-slate-950);
    }

    .btn-primary:hover {
        background-color: var(--accent-hover);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(56, 189, 248, 0.3);
        color: var(--c-slate-950);
        text-shadow: none;
    }

    .btn-secondary {
        background-color: transparent;
        border: 1px solid var(--border-color);
        color: var(--text-primary);
    }

    .btn-secondary:hover {
        background-color: rgba(255, 255, 255, 0.05);
        border-color: var(--text-primary);
        transform: translateY(-2px);
    }

    .social-links {
        display: flex;
        gap: 1.5rem;
        margin-top: 1rem;
        border-top: 1px solid var(--border-color);
        padding-top: 1.5rem;
        justify-content: center;
    }

    .social-link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--text-muted);
        font-weight: 500;
    }

    .social-link svg {
        width: 20px;
        height: 20px;
    }

    .social-link:hover {
        color: var(--accent-color);
        text-shadow: none;
        transform: translateY(-2px);
    }
</style>
