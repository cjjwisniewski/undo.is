<script lang="ts">
    import "@fontsource-variable/montserrat";
    import "./resume.css";
    import resumeDataRaw from "$lib/resumeData.json";

    interface ResumeBullet {
        bullet: string;
    }

    interface ResumeEntry {
        company?: string;
        location?: string;
        title: string;
        dates: string;
        description?: string;
        "description-bullets"?: ResumeBullet[];
    }

    interface ResumeSkillGroup {
        category: string;
        skills?: { item: string }[];
    }

    interface ResumeCertification {
        certification: string;
        "date-obtained": string;
    }

    interface ResumeEducation {
        school: string;
        location: string;
        "degree-type": string;
        major: string;
        minor?: string;
        dates: string;
    }

    interface ResumeInterestGroup {
        category: string;
        interests?: { item: string }[];
    }

    interface ResumeReference {
        name?: string;
        company?: string;
        title?: string;
        phone?: string;
        email?: string;
    }

    interface ResumeData {
        profile?: {
            name: string;
            title?: string | null;
            email?: string | null;
            phone?: string | null;
            linkedin?: string | null;
            personal_site?: string | null;
            address?: {
                street?: string | null;
                city?: string | null;
                state?: string | null;
                zip?: string | null;
                country?: string | null;
            };
        };
        objective?: { "section-title"?: string; content: string } | null;
        experience?: { "section-title"?: string; content: ResumeEntry[] } | null;
        projects?: { "section-title"?: string; content: ResumeEntry[] } | null;
        skills?: { "section-title"?: string; content: ResumeSkillGroup[] } | null;
        certifications?: { "section-title"?: string; content: ResumeCertification[] } | null;
        education?: { "section-title"?: string; content: ResumeEducation[] } | null;
        volunteering?: { "section-title"?: string; content: ResumeEntry[] } | null;
        interests?: { "section-title"?: string; content: ResumeInterestGroup[] } | null;
        references?: { "section-title"?: string; content: ResumeReference[] } | null;
    }

    const resumeData = resumeDataRaw as ResumeData;
    const {
        profile,
        objective,
        experience,
        projects,
        skills,
        certifications,
        education,
        volunteering,
        interests,
        references,
    } = resumeData;

    const metaDescription =
        "Resume of Cameron Wisniewski, VP and Cloud Platform Architect - experience across enterprise AWS and Azure architecture, Zero Trust security, Terraform IaC, and platform engineering.";

    function toHttpsUrl(value: string): string {
        return /^https?:\/\//i.test(value) ? value : `https://${value}`;
    }

    function printResume() {
        window.print();
    }
    const breadcrumbJsonLd = `<script type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.undo.is/" },
            { "@type": "ListItem", position: 2, name: "Resume", item: "https://www.undo.is/resume/" }
        ]
    })}<\/script>`;
</script>

<svelte:head>
    <title>Resume | Cameron Wisniewski</title>
    <meta name="description" content={metaDescription} />
    <link rel="canonical" href="https://www.undo.is/resume/" />
    <meta property="og:title" content="Resume | Cameron Wisniewski" />
    <meta property="og:description" content={metaDescription} />
    <meta property="og:url" content="https://www.undo.is/resume/" />
    <meta name="twitter:title" content="Resume | Cameron Wisniewski" />
    <meta name="twitter:description" content={metaDescription} />
    <meta name="twitter:url" content="https://www.undo.is/resume/" />
    {@html breadcrumbJsonLd}
</svelte:head>

<div class="resume-page">
    <div id="resume">
        <div class="resume-actions">
            <a
                href="/resume.pdf"
                download="Cameron_Wisniewski_Resume.pdf"
                class="btn-download"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download PDF
            </a>
            <button type="button" class="btn-print" onclick={printResume}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="6 9 6 2 18 2 18 9" />
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <rect x="6" y="14" width="12" height="8" />
                </svg>
                Print
            </button>
        </div>

        <article class="resume">
            {#if profile}
                <section class="content-section profile">
                    <h1 class="profile-name">{profile.name}</h1>
                    {#if profile.title}
                        <div class="profile-title"><p>{profile.title}</p></div>
                    {/if}
                    <div class="profile-info">
                        {#if profile.address?.city}
                            <span class="profile-address">
                                <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                                </svg>
                                <span>
                                    {#if profile.address.street}{profile.address.street}, {/if}{profile.address.city}{#if profile.address.state}, {profile.address.state}{/if}{#if profile.address.zip} {profile.address.zip}{/if}{#if profile.address.country}, {profile.address.country}{/if}
                                </span>
                            </span>
                        {/if}
                        <ul class="list-pipe">
                            {#if profile.linkedin}
                                <li>
                                    <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                    <a
                                        href={toHttpsUrl(profile.linkedin)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >{profile.linkedin}</a>
                                </li>
                            {/if}
                            {#if profile.email}
                                <li>
                                    <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                                    </svg>
                                    <a href="mailto:{profile.email}">{profile.email}</a>
                                </li>
                            {/if}
                            {#if profile.phone}
                                <li>
                                    <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z" />
                                    </svg>
                                    <span>{profile.phone}</span>
                                </li>
                            {/if}
                            {#if profile.personal_site}
                                <li>
                                    <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.93 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38a16.52 16.52 0 0 0-.14 2c0 .68.05 1.35.14 2H4.26zm.81 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 0 1 5.07 16zm2.95-8H5.07a7.987 7.987 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.02 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66a14.7 14.7 0 0 1-.16-2c0-.68.06-1.35.16-2h4.68c.1.65.16 1.32.16 2s-.06 1.35-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14c.09-.65.14-1.32.14-2 0-.68-.05-1.35-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" />
                                    </svg>
                                    <a
                                        href={toHttpsUrl(profile.personal_site)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >{profile.personal_site}</a>
                                </li>
                            {/if}
                        </ul>
                    </div>
                </section>
            {/if}

            {#if objective}
                <section class="content-section objective">
                    <div class="objective-section">
                        <h2 class="content-section-title objective-section-title">
                            <span>{@html objective["section-title"] || "Profile"}</span>
                        </h2>
                        <div class="content-section-content objective-section-content">
                            <p>{@html objective.content}</p>
                        </div>
                    </div>
                </section>
            {/if}

            {#if experience}
                <section class="content-section experience">
                    <div class="experience-section">
                        <h2 class="content-section-title experience-section-title">
                            <span>{@html experience["section-title"] || "Experience"}</span>
                        </h2>
                        <div class="experience-section-content">
                            <div class="css-grid">
                                {#each experience.content as exp}
                                    <div class="content-section-content experience-section-content-details">
                                        {#if exp.company}
                                            <p class="experience-section-content-details-company">
                                                {@html exp.company}
                                            </p>
                                        {/if}
                                        {#if exp.location}
                                            <p class="experience-section-content-details-location">
                                                {@html exp.location}
                                            </p>
                                        {/if}
                                        <p class="experience-section-content-details-title">
                                            {@html exp.title}
                                        </p>
                                        <p class="experience-section-content-details-dates">
                                            {@html exp.dates}
                                        </p>
                                        {#if exp.description}
                                            <p class="experience-section-content-details-description">
                                                {@html exp.description}
                                            </p>
                                        {/if}
                                        <div class="experience-section-content-details-description-bullets">
                                            {#if exp["description-bullets"]}
                                                <ul>
                                                    {#each exp["description-bullets"] as bulletPoint}
                                                        <li>{@html bulletPoint.bullet}</li>
                                                    {/each}
                                                </ul>
                                            {/if}
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                </section>
            {/if}

            {#if skills}
                <section class="content-section skills">
                    <div class="skills-section">
                        <h2 class="content-section-title skills-section-title">
                            <span>{@html skills["section-title"] || "Skills"}</span>
                        </h2>
                        <div class="skills-section-content">
                            <div class="css-grid">
                                {#each skills.content as skillGrp}
                                    <div class="content-section-content skills-section-content-details">
                                        <p>
                                            <span class="skills-section-content-details-category">
                                                {skillGrp.category}
                                            </span>
                                            {#if skillGrp.skills}
                                                |
                                                {#each skillGrp.skills as item, i}
                                                    <span class="skills-section-content-details-items">
                                                        {item.item}
                                                    </span>{#if i !== skillGrp.skills.length - 1},&nbsp;{/if}
                                                {/each}
                                            {/if}
                                        </p>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                </section>
            {/if}

            {#if certifications}
                <section class="content-section certifications">
                    <div class="certifications-section">
                        <h2 class="content-section-title certifications-section-title">
                            <span>{@html certifications["section-title"] || "Certifications"}</span>
                        </h2>
                        <div class="certifications-section-content">
                            <div class="css-grid">
                                {#each certifications.content as cert}
                                    <div class="content-section-content certifications-section-content-details">
                                        <p class="certifications-section-content-details-certification">
                                            {@html cert.certification}
                                        </p>
                                        <p class="certifications-section-content-details-date-obtained">
                                            {@html cert["date-obtained"]}
                                        </p>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                </section>
            {/if}

            {#if education}
                <section class="content-section education">
                    <div class="education-section">
                        <h2 class="content-section-title education-section-title">
                            <span>{@html education["section-title"] || "Education"}</span>
                        </h2>
                        <div class="education-section-content">
                            <div class="css-grid">
                                {#each education.content as edu}
                                    <div class="content-section-content education-section-content-details">
                                        <p class="education-section-content-details-school">
                                            {@html edu.school}
                                        </p>
                                        <p class="education-section-content-details-location">
                                            {@html edu.location}
                                        </p>
                                        <p class="education-section-content-details-degree-type">
                                            {@html edu["degree-type"]}
                                        </p>
                                        <p class="education-section-content-details-major">
                                            <b>Major:</b>
                                            {@html edu.major}
                                        </p>
                                        {#if edu.minor}
                                            <p class="education-section-content-details-minor">
                                                <b>Minor:</b>
                                                {@html edu.minor}
                                            </p>
                                        {/if}
                                        <p class="education-section-content-details-dates">
                                            {@html edu.dates}
                                        </p>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                </section>
            {/if}

            {#if volunteering}
                <section class="content-section volunteering">
                    <div class="volunteering-section">
                        <h2 class="content-section-title volunteering-section-title">
                            <span>{@html volunteering["section-title"] || "Volunteering"}</span>
                        </h2>
                        <div class="volunteering-section-content">
                            <div class="css-grid">
                                {#each volunteering.content as vol}
                                    <div class="content-section-content volunteering-section-content-details">
                                        <p class="volunteering-section-content-details-company">
                                            {@html vol.company}
                                        </p>
                                        <p class="volunteering-section-content-details-location">
                                            {@html vol.location}
                                        </p>
                                        <p class="volunteering-section-content-details-title">
                                            {@html vol.title}
                                        </p>
                                        <p class="volunteering-section-content-details-dates">
                                            {@html vol.dates}
                                        </p>
                                        {#if vol.description}
                                            <p class="volunteering-section-content-details-description">
                                                {@html vol.description}
                                            </p>
                                        {/if}
                                        <div class="volunteering-section-content-details-description-bullets">
                                            {#if vol["description-bullets"]}
                                                <ul>
                                                    {#each vol["description-bullets"] as volBullet}
                                                        <li>{@html volBullet.bullet}</li>
                                                    {/each}
                                                </ul>
                                            {/if}
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                </section>
            {/if}

            {#if projects}
                <section class="content-section projects">
                    <div class="projects-section">
                        <h2 class="content-section-title projects-section-title">
                            <span>{@html projects["section-title"] || "Personal Projects"}</span>
                        </h2>
                        <div class="projects-section-content">
                            <div class="css-grid">
                                {#each projects.content as project}
                                    <div class="content-section-content projects-section-content-details">
                                        <p class="projects-section-content-details-company">
                                            {@html project.company}
                                        </p>
                                        <p class="projects-section-content-details-location">
                                            {@html project.location}
                                        </p>
                                        <p class="projects-section-content-details-title">
                                            {@html project.title}
                                        </p>
                                        <p class="projects-section-content-details-dates">
                                            {@html project.dates}
                                        </p>
                                        {#if project.description}
                                            <p class="projects-section-content-details-description">
                                                {@html project.description}
                                            </p>
                                        {/if}
                                        <div class="projects-section-content-details-description-bullets">
                                            {#if project["description-bullets"]}
                                                <ul>
                                                    {#each project["description-bullets"] as projBullet}
                                                        <li>{@html projBullet.bullet}</li>
                                                    {/each}
                                                </ul>
                                            {/if}
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                </section>
            {/if}

            {#if interests}
                <section class="content-section interests">
                    <div class="interests-section">
                        <h2 class="content-section-title interests-section-title">
                            <span>{@html interests["section-title"] || "Interests"}</span>
                        </h2>
                        <div class="interests-section-content">
                            <div class="css-grid">
                                {#each interests.content as interestGrp}
                                    <div class="content-section-content interests-section-content-details">
                                        <p>
                                            <span class="interests-section-content-details-category">
                                                {interestGrp.category}
                                            </span>
                                            {#if interestGrp.interests}
                                                |
                                                {#each interestGrp.interests as item, i}
                                                    <span class="interests-section-content-details-items">
                                                        {item.item}{#if i !== interestGrp.interests.length - 1},{/if}
                                                    </span>
                                                {/each}
                                            {/if}
                                        </p>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                </section>
            {/if}

            {#if references}
                <section class="content-section references">
                    <div class="references-section">
                        <h2 class="content-section-title references-section-title">
                            <span>{@html references["section-title"] || "References"}</span>
                        </h2>
                        <div class="references-section-content">
                            <div class="css-grid">
                                {#each references.content as ref}
                                    <div class="content-section-content references-section-content-details">
                                        {#if ref.name}
                                            <div class="references-section-content-details-name">{ref.name}</div>
                                        {/if}
                                        {#if ref.company}
                                            <div class="references-section-content-details-company">{ref.company}</div>
                                        {/if}
                                        {#if ref.title}
                                            <div class="references-section-content-details-title">{ref.title}</div>
                                        {/if}
                                        <div class="references-section-content-details-contact">
                                            {#if ref.phone}{ref.phone}{/if}
                                            {#if ref.email}{ref.email}{/if}
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                </section>
            {/if}
        </article>
    </div>
</div>
