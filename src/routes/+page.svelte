<script lang="ts">
    // Modern, sleek portfolio page
    const name = "Cameron Wisniewski";
    const eyebrow = "Enterprise Cloud & Platform Architecture";
    const title = "VP, Cloud Platform Architect";
    const email = "cameron@undo.is";
    const github = "https://github.com/cjjwisniewski";
    const linkedin = "https://linkedin.com/in/CameronWisniewski";
    const metaDescription =
        "Cameron Wisniewski, VP and Cloud Platform Architect specializing in multi-account AWS and Azure platforms, Zero Trust security, Terraform IaC, and regulated enterprise enablement.";

    // Optimized Vite asset imports via vite-imagetools
    import avatarWebp from "$lib/avatar.jpg?w=440&format=webp";
    import avatarJpeg from "$lib/avatar.jpg?w=440&format=jpeg";

    const description =
        "Technical leader specializing in enterprise cloud architecture, security-by-default infrastructure, and self-service platform engineering across AWS and Microsoft Azure. Proven track record leading high-ambiguity initiatives including zero-downtime cloud separations, Zero Trust access transformations, policy-as-code landing zones, and enterprise AI guardrails.";

    const focusAreas = [
        {
            label: "Architecture",
            title: "Multi-Tenant Cloud",
            detail: "High-availability AWS and Azure foundations built with Terraform landing zones, account isolation, and resilient hybrid-cloud patterns."
        },
        {
            label: "Governance",
            title: "Security-by-Default",
            detail: "Zero Trust access, least-privilege IAM guardrails, and policy-as-code compliance aligned with FFIEC, SOX, and SOC2 standards."
        },
        {
            label: "Enablement",
            title: "Platform Engineering",
            detail: "Self-service CI/CD blueprints, FinOps governance, and production AI guardrails that multiply engineering velocity at scale."
        }
    ];
    const structuredData = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": "https://www.undo.is/#website",
                url: "https://www.undo.is/",
                name: "undo.is",
                description: metaDescription
            },
            {
                "@type": "ProfilePage",
                "@id": "https://www.undo.is/#profilepage",
                url: "https://www.undo.is/",
                name: "Cameron Wisniewski | Cloud Platform Architect",
                isPartOf: { "@id": "https://www.undo.is/#website" },
                mainEntity: { "@id": "https://www.undo.is/#person" }
            },
            {
                "@type": "Person",
                "@id": "https://www.undo.is/#person",
                name,
                jobTitle: title,
                description: metaDescription,
                url: "https://www.undo.is/",
                email: `mailto:${email}`,
                image: "https://www.undo.is/og-card.png",
                knowsAbout: [
                    "Cloud Platform Architecture",
                    "Amazon Web Services (AWS)",
                    "Microsoft Azure",
                    "Zero Trust Security",
                    "Terraform Infrastructure as Code",
                    "Platform Engineering",
                    "Enterprise AI Guardrails"
                ],
                sameAs: [github, linkedin]
            }
        ]
    });
    const structuredDataTag = `<script type="application/ld+json">${structuredData}<\/script>`;
</script>

<svelte:head>
    <title>Cameron Wisniewski | Cloud Platform Architect</title>
    <meta name="description" content={metaDescription} />
    <link rel="canonical" href="https://www.undo.is/" />
    <meta property="og:title" content="Cameron Wisniewski | Cloud Platform Architect" />
    <meta property="og:description" content={metaDescription} />
    <meta property="og:url" content="https://www.undo.is/" />
    <meta name="twitter:title" content="Cameron Wisniewski | Cloud Platform Architect" />
    <meta name="twitter:description" content={metaDescription} />
    <meta name="twitter:url" content="https://www.undo.is/" />
    {@html structuredDataTag}
</svelte:head>

<div class="hero container">
    <div class="hero-stack">
        <section class="glass-panel profile-card">
            <div class="avatar-wrap">
                <picture>
                    <source srcset={avatarWebp} type="image/webp" />
                    <img
                        src={avatarJpeg}
                        alt="Cameron Wisniewski"
                        class="avatar"
                        width="220"
                        height="220"
                        fetchpriority="high"
                    />
                </picture>
            </div>

            <div class="info-container">
                <div class="identity">
                    <span class="eyebrow">{eyebrow}</span>
                    <h1>{name}</h1>
                    <h2 class="title">{title}</h2>
                </div>

                <p class="description">
                    {description}
                </p>

                <div class="actions">
                    <a href="/resume/" class="btn btn-primary">View Full Resume</a>
                    <a href="/projects/" class="btn btn-secondary">Explore Projects</a>
                    <a href="mailto:{email}" class="btn btn-secondary">Contact Me</a>
                </div>

                <div class="social-links">
                    <a
                        href={github}
                        target="_blank"
                        rel="me noopener noreferrer"
                        class="social-link"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                        GitHub
                    </a>
                    <a
                        href={linkedin}
                        target="_blank"
                        rel="me noopener noreferrer"
                        class="social-link"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        LinkedIn
                    </a>
                </div>
            </div>
        </section>

        <section class="focus-grid" aria-label="Core Focus Areas">
            {#each focusAreas as area}
                <div class="glass-panel focus-card">
                    <span class="eyebrow">{area.label}</span>
                    <h3>{area.title}</h3>
                    <p>{area.detail}</p>
                </div>
            {/each}
        </section>
    </div>
</div>

<style>
    .hero {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        padding-top: 2.5rem;
        padding-bottom: 3rem;
    }

    .hero-stack {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        width: 100%;
    }

    .profile-card {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 2.25rem;
        align-items: center;
    }

    .avatar-wrap {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
    }

    .avatar-wrap picture {
        display: contents;
    }

    .avatar-wrap::before {
        content: "";
        position: absolute;
        inset: -10px;
        border-radius: 14px;
        background: radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, transparent 70%);
        pointer-events: none;
    }

    .avatar {
        position: relative;
        width: 220px;
        height: auto;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        border-radius: var(--border-radius);
        border: 1px solid var(--border-color);
        transition: transform 0.35s ease;
    }

    @media (hover: hover) {
        .profile-card:hover .avatar {
            transform: scale(1.02);
        }
    }

    .info-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        min-width: 0;
    }

    .identity {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
    }

    .eyebrow {
        font-size: 0.78rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--accent-color);
    }

    h1 {
        font-size: clamp(1.85rem, 4vw, 2.5rem);
        line-height: 1.15;
        background: linear-gradient(
            135deg,
            var(--c-slate-50) 0%,
            var(--c-slate-300) 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .title {
        font-size: clamp(1.05rem, 2.5vw, 1.2rem);
        color: var(--text-secondary);
        font-weight: 500;
    }

    .description {
        font-size: 0.98rem;
        line-height: 1.7;
        max-width: 62ch;
    }

    .actions {
        display: flex;
        gap: 0.75rem;
        margin-top: 0.25rem;
        flex-wrap: wrap;
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
        cursor: pointer;
    }

    .btn-primary {
        background-color: var(--accent-color);
        color: var(--c-slate-950);
    }

    .btn-primary:hover {
        background-color: var(--accent-hover);
        box-shadow: 0 4px 14px rgba(56, 189, 248, 0.3);
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

    @media (hover: hover) {
        .btn-primary:hover,
        .btn-secondary:hover {
            transform: translateY(-1px);
        }
    }

    .social-links {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem 1.5rem;
        margin-top: 0.35rem;
        border-top: 1px solid var(--border-color);
        padding-top: 1.15rem;
        align-items: center;
    }

    .social-link {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        color: var(--text-muted);
        font-weight: 500;
        font-size: 0.9rem;
    }

    .social-link svg {
        width: 18px;
        height: 18px;
    }

    .social-link:hover {
        color: var(--accent-color);
        text-shadow: none;
    }

    .focus-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1.25rem;
    }

    .focus-card {
        padding: 1.35rem 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    .focus-card h3 {
        font-size: 1.05rem;
        color: var(--text-primary);
    }

    .focus-card p {
        font-size: 0.9rem;
        line-height: 1.55;
        color: var(--text-secondary);
    }

    @media (max-width: 768px) {
        .profile-card {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 1.5rem;
        }

        .avatar {
            width: min(210px, 60vw);
        }

        .description {
            margin: 0 auto;
        }

        .actions,
        .social-links {
            justify-content: center;
        }

        .focus-grid {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 640px) {
        .hero {
            padding-top: 1.25rem;
            padding-bottom: 2rem;
        }

        .description {
            text-align: left;
            font-size: 0.95rem;
        }

        .actions {
            flex-direction: column;
            width: 100%;
        }

        .actions .btn {
            width: 100%;
            min-height: 44px;
        }

        .social-link {
            min-height: 44px;
        }
    }
</style>
