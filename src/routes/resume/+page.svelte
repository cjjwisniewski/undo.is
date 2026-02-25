<script lang="ts">
    import "./resume.css";
    import resumeDataRaw from "$lib/resumeData.json";

    const resumeData: any = resumeDataRaw;

    const {
        profile,
        objective,
        experience,
        skills,
        certifications,
        education,
        volunteering,
        interests,
        references,
    } = resumeData;
</script>

<svelte:head>
    <title>Resume | Cameron Wisniewski</title>
    <!-- Include Montserrat font and FontAwesome for the resume -->
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;800&display=swap"
    />
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    />
</svelte:head>

<div class="resume-page">
    <div id="resume">
        <div class="resume-actions">
            <button class="btn-download" onclick={() => window.print()}>
                <i class="fas fa-file-pdf"></i> Download PDF
            </button>
        </div>
        <article class="resume">
            {#if profile}
                <section class="content-section profile">
                    <div class="profile-name">{profile.name}</div>
                    {#if profile.title}
                        <div class="profile-title"><p>{profile.title}</p></div>
                    {/if}
                    <div class="profile-info">
                        {#if profile.address?.city}
                            <i class="fas fa-map-marker-alt fontawesome-icon"
                            ></i>
                            <span>
                                {#if profile.address.street}{profile.address
                                        .street}{/if}<!--
                            -->{#if profile.address.city},
                                    {profile.address
                                        .city}{/if}<!--
                            -->{#if profile.address.state},
                                    {profile.address
                                        .state}{/if}<!--
                            -->{#if profile.address.zip}
                                    {profile.address
                                        .zip}{/if}<!--
                            -->{#if profile.address.country},
                                    {profile.address.country}{/if}
                            </span>
                        {/if}
                        <ul class="list-pipe">
                            {#if profile.linkedin}
                                <i class="fab fa-linkedin fontawesome-icon"></i>
                                <li>{profile.linkedin}</li>
                            {/if}
                            {#if profile.email}
                                <i class="fas fa-envelope fontawesome-icon"></i>
                                <li>{profile.email}</li>
                            {/if}
                            {#if profile.phone}
                                <i class="fas fa-phone-alt fontawesome-icon"
                                ></i>
                                <li>{profile.phone}</li>
                            {/if}
                            {#if profile.personal_site}
                                <i
                                    class="fas fa-globe-americas fontawesome-icon"
                                ></i>
                                <li>{profile.personal_site}</li>
                            {/if}
                        </ul>
                    </div>
                </section>
            {/if}

            {#if objective}
                <section class="content-section objective">
                    <article class="objective-section">
                        <section
                            class="content-section-title objective-section-title"
                        >
                            <div>
                                {objective["section-title"] || "Objective"}
                            </div>
                        </section>
                        <section
                            class="content-section-content objective-section-content"
                        >
                            <p>{@html objective.content}</p>
                        </section>
                    </article>
                </section>
            {/if}

            {#if experience}
                <section class="content-section experience">
                    <article class="experience-section">
                        <section
                            class="content-section-title experience-section-title"
                        >
                            <div>
                                {experience["section-title"] || "Experience"}
                            </div>
                        </section>
                        <section class="experience-section-content">
                            <article class="css-grid">
                                {#each experience.content as exp}
                                    <section
                                        class="content-section-content experience-section-content-details"
                                    >
                                        <p
                                            class="experience-section-content-details-company"
                                        >
                                            {@html exp.company}
                                        </p>
                                        <p
                                            class="experience-section-content-details-location"
                                        >
                                            {@html exp.location}
                                        </p>
                                        <p
                                            class="experience-section-content-details-title"
                                        >
                                            {@html exp.title}
                                        </p>
                                        <p
                                            class="experience-section-content-details-dates"
                                        >
                                            {@html exp.dates}
                                        </p>
                                        <p
                                            class="experience-section-content-details-description"
                                        >
                                            {@html exp.description}
                                        </p>
                                        <div
                                            class="experience-section-content-details-description-bullets"
                                        >
                                            {#if exp["description-bullets"]}
                                                <ul>
                                                    {#each exp["description-bullets"] as bulletPoint}
                                                        <li>
                                                            {@html bulletPoint.bullet}
                                                        </li>
                                                    {/each}
                                                </ul>
                                            {/if}
                                        </div>
                                    </section>
                                {/each}
                            </article>
                        </section>
                    </article>
                </section>
            {/if}

            <!-- SKILLS -->
            {#if skills}
                <section class="content-section skills">
                    <article class="skills-section">
                        <section
                            class="content-section-title skills-section-title"
                        >
                            <div>{skills["section-title"] || "Skills"}</div>
                        </section>
                        <section class="skills-section-content">
                            <article class="css-grid">
                                {#each skills.content as skillGrp}
                                    <section
                                        class="content-section-content skills-section-content-details"
                                    >
                                        <p>
                                            <span
                                                class="skills-section-content-details-category"
                                                >{skillGrp.category}</span
                                            >
                                            {#if skillGrp.skills}
                                                |
                                                {#each skillGrp.skills as item, i}
                                                    <span
                                                        class="skills-section-content-details-items"
                                                        >{item.item}{#if i !== skillGrp.skills.length - 1},
                                                        {/if}</span
                                                    >
                                                {/each}
                                            {/if}
                                        </p>
                                    </section>
                                {/each}
                            </article>
                        </section>
                    </article>
                </section>
            {/if}

            <!-- CERTIFICATIONS -->
            {#if certifications}
                <section class="content-section certifications">
                    <article class="certifications-section">
                        <section
                            class="content-section-title certifications-section-title"
                        >
                            <div>
                                {certifications["section-title"] ||
                                    "Certifications"}
                            </div>
                        </section>
                        <section class="certifications-section-content">
                            <article class="css-grid">
                                {#each certifications.content as cert}
                                    <section
                                        class="content-section-content certifications-section-content-details"
                                    >
                                        <p
                                            class="certifications-section-content-details-certification"
                                        >
                                            {@html cert.certification}
                                        </p>
                                        <p
                                            class="certifications-section-content-details-date-obtained"
                                        >
                                            {@html cert["date-obtained"]}
                                        </p>
                                    </section>
                                {/each}
                            </article>
                        </section>
                    </article>
                </section>
            {/if}

            <!-- EDUCATION -->
            {#if education}
                <section class="content-section education">
                    <article class="education-section">
                        <section
                            class="content-section-title education-section-title"
                        >
                            <div>
                                {education["section-title"] || "Education"}
                            </div>
                        </section>
                        <section class="education-section-content">
                            <article class="css-grid">
                                {#each education.content as edu}
                                    <section
                                        class="content-section-content education-section-content-details"
                                    >
                                        <p
                                            class="education-section-content-details-school"
                                        >
                                            {@html edu.school}
                                        </p>
                                        <p
                                            class="education-section-content-details-location"
                                        >
                                            {@html edu.location}
                                        </p>
                                        <p
                                            class="education-section-content-details-degree-type"
                                        >
                                            {@html edu["degree-type"]}
                                        </p>
                                        <p
                                            class="education-section-content-details-major"
                                        >
                                            <b>Major:</b>
                                            {@html edu.major}
                                        </p>
                                        {#if edu.minor}
                                            <p
                                                class="education-section-content-details-minor"
                                            >
                                                <b>Minor:</b>
                                                {@html edu.minor}
                                            </p>
                                        {/if}
                                        <p
                                            class="education-section-content-details-dates"
                                        >
                                            {@html edu.dates}
                                        </p>
                                    </section>
                                {/each}
                            </article>
                        </section>
                    </article>
                </section>
            {/if}

            <!-- VOLUNTEERING -->
            {#if volunteering}
                <section class="content-section volunteering">
                    <article class="volunteering-section">
                        <section
                            class="content-section-title volunteering-section-title"
                        >
                            <div>
                                {volunteering["section-title"] ||
                                    "Volunteering"}
                            </div>
                        </section>
                        <section class="volunteering-section-content">
                            <article class="css-grid">
                                {#each volunteering.content as vol}
                                    <section
                                        class="content-section-content volunteering-section-content-details"
                                    >
                                        <p
                                            class="volunteering-section-content-details-company"
                                        >
                                            {@html vol.company}
                                        </p>
                                        <p
                                            class="volunteering-section-content-details-location"
                                        >
                                            {@html vol.location}
                                        </p>
                                        <p
                                            class="volunteering-section-content-details-title"
                                        >
                                            {@html vol.title}
                                        </p>
                                        <p
                                            class="volunteering-section-content-details-dates"
                                        >
                                            {@html vol.dates}
                                        </p>
                                        <p
                                            class="volunteering-section-content-details-description"
                                        >
                                            {@html vol.description}
                                        </p>
                                        <div
                                            class="volunteering-section-content-details-description-bullets"
                                        >
                                            {#if vol["description-bullets"]}
                                                <ul>
                                                    {#each vol["description-bullets"] as volBullet}
                                                        <li>
                                                            {@html volBullet.bullet}
                                                        </li>
                                                    {/each}
                                                </ul>
                                            {/if}
                                        </div>
                                    </section>
                                {/each}
                            </article>
                        </section>
                    </article>
                </section>
            {/if}

            <!-- INTERESTS -->
            {#if interests}
                <section class="content-section interests">
                    <article class="interests-section">
                        <section
                            class="content-section-title interests-section-title"
                        >
                            <div>
                                {interests["section-title"] || "Interests"}
                            </div>
                        </section>
                        <section class="interests-section-content">
                            <article class="css-grid">
                                {#each interests.content as interestGrp}
                                    <section
                                        class="content-section-content interests-section-content-details"
                                    >
                                        <p>
                                            <span
                                                class="interests-section-content-details-category"
                                                >{interestGrp.category}</span
                                            >
                                            {#if interestGrp.interests}
                                                |
                                                {#each interestGrp.interests as item, i}
                                                    <span
                                                        class="interests-section-content-details-items"
                                                        >{item.item}{#if i !== interestGrp.interests.length - 1},
                                                        {/if}</span
                                                    >
                                                {/each}
                                            {/if}
                                        </p>
                                    </section>
                                {/each}
                            </article>
                        </section>
                    </article>
                </section>
            {/if}

            <!-- REFERENCES -->
            {#if references}
                <section class="content-section references">
                    <article class="references-section">
                        <section
                            class="content-section-title references-section-title"
                        >
                            <div>
                                {references["section-title"] || "References"}
                            </div>
                        </section>
                        <section class="references-section-content">
                            <article class="css-grid">
                                {#each references.content as ref}
                                    <section
                                        class="content-section-content references-section-content-details"
                                    >
                                        {#if ref.name}<div
                                                class="references-section-content-details-name"
                                            >
                                                {ref.name}
                                            </div>{/if}
                                        {#if ref.company}<div
                                                class="references-section-content-details-company"
                                            >
                                                {ref.company}
                                            </div>{/if}
                                        {#if ref.title}<div
                                                class="references-section-content-details-title"
                                            >
                                                {ref.title}
                                            </div>{/if}
                                        <div
                                            class="references-section-content-details-contact"
                                        >
                                            {#if ref.phone}
                                                {ref.phone}
                                            {/if}
                                            {#if ref.email}
                                                {ref.email}
                                            {/if}
                                        </div>
                                    </section>
                                {/each}
                            </article>
                        </section>
                    </article>
                </section>
            {/if}
        </article>
    </div>
</div>
