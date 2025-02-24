---
layout: resume_page
title: Resume
description: Resume
navigation_weight: 2
---
{% assign profile = site.data.profile %}
{% assign objective = site.data.objective %}
{% assign experience = site.data.experience %}
{% assign internships = site.data.internships %}
{% assign skills = site.data.skills %}
{% assign certifications = site.data.certifications %}
{% assign education = site.data.education %}
{% assign volunteering = site.data.volunteering %}
{% assign references = site.data.references %}
{% assign interests = site.data.interests %}

<article class="resume">

{% if profile and site.enable_profile%}
<section class="content-section profile">

    <div class="profile-name">{{ profile.name }}</div>
    {% if profile.title %}<div class="profile-title"><p>{{ profile.title }}</p></div>{% endif %}
    <div class="profile-info">
        {% if profile.address.city %}
        {% if site.fontawesome_link and site.fontawesome_enable_header %}<i class="fas fa-map-marker-alt fontawesome-icon"></i>{% endif %}
        <a>
            {% if profile.address.street %}{{ profile.address.street }}{% endif %}<!--
            -->{% if profile.address.city %}, {{ profile.address.city }}{% endif %}<!--
            -->{% if profile.address.state %}, {{ profile.address.state }}{% endif %}<!--
            -->{% if profile.address.zip %} {{ profile.address.zip }}{% endif %}<!--
            -->{% if profile.address.country %}, {{ profile.address.country }}{% endif %}
        </a>
        {% endif %}
        <ul class="list-pipe">
            {% if profile.linkedin %}{% if site.fontawesome_link and site.fontawesome_enable_header %}<i class="fab fa-linkedin fontawesome-icon"></i>{% endif %}<li>{{ profile.linkedin }}</li>{% endif %}
            {% if profile.email %}{% if site.fontawesome_link and site.fontawesome_enable_header %}<i class="fas fa-envelope fontawesome-icon"></i>{% endif %}<li>{{ profile.email }}</li>{% endif %}
            {% if profile.phone %}{% if site.fontawesome_link and site.fontawesome_enable_header %}<i class="fas fa-phone-alt fontawesome-icon"></i>{% endif %}<li>{{ profile.phone }}</li>{% endif %}
            {% if profile.personal_site %}{% if site.fontawesome_link and site.fontawesome_enable_header %}<i class="fas fa-globe-americas fontawesome-icon"></i>{% endif %}<li>{{ profile.personal_site }}</li>{% endif %}
        </ul>
    </div>

</section>
{% endif %}

{% if objective and site.enable_objective %}
<section class="content-section objective">
    <article class="objective-section">

        <section class="content-section-title objective-section-title">
            <div>{{ objective.section-title }}</div>
        </section>

        <section class="content-section-content objective-section-content">
            <p>{{ objective.content }}</p>
        </section>

    </article>
</section>
{% endif %}

{% if experience and site.enable_experience %}
<section class="content-section experience">
    <article class="experience-section">

        <section class="content-section-title experience-section-title">
            <div>{{ experience.section-title }}</div>
        </section>
        
        <section class="experience-section-content">
            <article class="css-grid">
            {% for experience in experience.content %}
                <section class="content-section-content experience-section-content-details">
                    <p class="experience-section-content-details-company">{{ experience.company }}</p>
                    <p class="experience-section-content-details-location">{% if site.fontawesome_link and site.fontawesome_enable_content %}<i class="fas fa-map-marker-alt fontawesome-icon"></i>{% endif %}{{ experience.location }}</p>
                    <p class="experience-section-content-details-title">{{ experience.title }}</p>
                    <p class="experience-section-content-details-dates">{% if site.fontawesome_link and site.fontawesome_enable_content %}<i class="fas fa-calendar-alt fontawesome-icon"></i>{% endif %}{{ experience.dates }}</p>
                    <p class="experience-section-content-details-description">{{ experience.description }}</p>
                    <a class="experience-section-content-details-description-bullets">
                        {% if experience.description-bullets %}
                        <ul>
                            {% for bullets in experience.description-bullets %}
                            <li>{{ bullets.bullet }}</li>
                            {% endfor %}
                        </ul>
                        {% endif %}
                    </a> 
                </section>
            {% endfor %}
            </article>
        </section>

    </article>
</section>
{% endif %}

{% if internships and site.enable_internships %}
<section class="content-section internships">
    <article class="internships-section">

        <section class="content-section-title internships-section-title">
            <div>{{ internships.section-title }}</div>
        </section>
        
        <section class="internships-section-content">
            <article class="css-grid">
            {% for internships in internships.content %}
                <section class="content-section-content internships-section-content-details">
                    <p class="internships-section-content-details-company">{{ internships.company }}</p>
                    <p class="internships-section-content-details-location">{% if site.fontawesome_link and site.fontawesome_enable_content %}<i class="fas fa-map-marker-alt fontawesome-icon"></i>{% endif %}{{ internships.location }}</p>
                    <p class="internships-section-content-details-title">{{ internships.title }}</p>
                    <p class="internships-section-content-details-dates">{% if site.fontawesome_link and site.fontawesome_enable_content %}<i class="fas fa-calendar-alt fontawesome-icon"></i>{% endif %}{{ internships.dates }}</p>
                    <p class="internships-section-content-details-description">{{ internships.description }}</p>
                    <a class="internships-section-content-details-description-bullets">
                        {% if internships.description-bullets %}
                        <ul>
                            {% for bullets in internships.description-bullets %}
                            <li>{{ bullets.bullet }}</li>
                            {% endfor %}
                        </ul>
                        {% endif %}
                    </a> 
                </section>
            {% endfor %}
            </article>
        </section>

    </article>
</section>
{% endif %}


{% if skills and site.enable_skills %}
<section class="content-section skills">
    <article class="skills-section">

        <section class="content-section-title skills-section-title">
            <div>{{ skills.section-title }}</div>
        </section>
        
        <section class="skills-section-content">
            <article class="css-grid">
            {% for skills in skills.content %}
                <section class="content-section-content skills-section-content-details">
                    <p>
                        <a class="skills-section-content-details-category">{{ skills.category }}</a>
                        
                        {% if skills.skills %} | <!-- Pipe separates skill category from skills -->
                            {% for items in skills.skills%}
                            <a class="skills-section-content-details-items">{{ items.item }}{% if forloop.last != true %},{% endif %}</a>
                            {% endfor %}
                        {% endif %}
                    </p>
                </section>
            {% endfor %}
            </article>
        </section>

    </article>
</section>
{% endif %}

{% if certifications and site.enable_certifications %}
<section class="content-section certifications">
    <article class="certifications-section">

        <section class="content-section-title certifications-section-title">
            <div>{{ certifications.section-title }}</div>
        </section>
        
        <section class="certifications-section-content">
            <article class="css-grid">
            {% for certifications in certifications.content %}
                <section class="content-section-content certifications-section-content-details">
                    <p class="certifications-section-content-details-certification">{{ certifications.certification }}</p>
                    <p class="certifications-section-content-details-date-obtained">{% if site.fontawesome_link and site.fontawesome_enable_content %}<i class="fas fa-calendar-alt fontawesome-icon"></i>{% endif %}{{ certifications.date-obtained }}</p>
                </section>
            {% endfor %}
            </article>
        </section>

    </article>
</section>
{% endif %}

{% if education and site.enable_education %}
<section class="content-section education">
    <article class="education-section">

        <section class="content-section-title education-section-title">
            <div>{{ education.section-title }}</div>
        </section>
        
        <section class="education-section-content">
            <article class="css-grid">
            {% for education in education.content %}
                <section class="content-section-content education-section-content-details">
                    <p class="education-section-content-details-school">{{ education.school }}</p>
                    <p class="education-section-content-details-location">{% if site.fontawesome_link and site.fontawesome_enable_content %}<i class="fas fa-map-marker-alt fontawesome-icon"></i>{% endif %}{{ education.location }}</p>
                    <p class="education-section-content-details-degree-type">{{ education.degree-type }}</p>
                    <p class="education-section-content-details-major"><b>Major:</b> {{ education.major }}</p>
                    <p class="education-section-content-details-minor"><b>Minor:</b> {{ education.minor }}</p>
                    <p class="education-section-content-details-dates">{% if site.fontawesome_link and site.fontawesome_enable_content %}<i class="fas fa-calendar-alt fontawesome-icon"></i>{% endif %}{{ education.dates }}</p>
                </section>
            {% endfor %}
            </article>
        </section>

    </article>
</section>
{% endif %}

{% if volunteering and site.enable_volunteering %}
<section class="content-section volunteering">
    <article class="volunteering-section">

        <section class="content-section-title volunteering-section-title">
            <div>{{ volunteering.section-title }}</div>
        </section>
        
        <section class="volunteering-section-content">
            <article class="css-grid">
            {% for volunteering in volunteering.content %}
                <section class="content-section-content volunteering-section-content-details">
                    <p class="volunteering-section-content-details-company">{{ volunteering.company }}</p>
                    <p class="volunteering-section-content-details-location">{% if site.fontawesome_link and site.fontawesome_enable_content %}<i class="fas fa-map-marker-alt fontawesome-icon"></i>{% endif %}{{ volunteering.location }}</p>
                    <p class="volunteering-section-content-details-title">{{ volunteering.title }}</p>
                    <p class="volunteering-section-content-details-dates">{% if site.fontawesome_link and site.fontawesome_enable_content %}<i class="fas fa-calendar-alt fontawesome-icon"></i>{% endif %}{{ volunteering.dates }}</p>
                    <p class="volunteering-section-content-details-description">{{ volunteering.description }}</p>
                    <a class="volunteering-section-content-details-description-bullets">
                        {% if volunteering.description-bullets %}
                        <ul>
                            {% for bullets in volunteering.description-bullets %}
                            <li>{{ bullets.bullet }}</li>
                            {% endfor %}
                        </ul>
                        {% endif %}
                    </a>
                </section>
            {% endfor %}
            </article>
        </section>

    </article>
</section>
{% endif %}

{% if interests and site.enable_interests %}
<section class="content-section interests">
    <article class="interests-section">

        <section class="content-section-title interests-section-title">
            <div>{{ interests.section-title }}</div>
        </section>
        
        <section class="interests-section-content">
            <article class="css-grid">
            {% for interests in interests.content %}
                <section class="content-section-content interests-section-content-details">
                    <p>
                        <a class="interests-section-content-details-category">{{ interests.category }}</a>
                        
                        {% if interests.interests %} | <!-- Pipe separates interest category from interests -->
                            {% for items in interests.interests%}
                            <a class="interests-section-content-details-items">{{ items.item }}{% if forloop.last != true %},{% endif %}</a>
                            {% endfor %}
                        {% endif %}
                    </p>
                </section>
            {% endfor %}
            </article>
        </section>

    </article>
</section>
{% endif %}

{% if references and site.enable_references %}
<section class="content-section references">
    <article class="references-section">

        <section class="content-section-title references-section-title">
            <div>{{ references.section-title }}</div>
        </section>
        
        <section class="references-section-content">
            <article class="css-grid">
            {% for references in references.content %}
                <section class="content-section-content references-section-content-details">
                    {% if references.name %}<a class="references-section-content-details-name">{{ references.name }}</a>{% endif %}
                    {% if references.company %}<a class="references-section-content-details-company">{{ references.company }}</a>{% endif %}
                    {% if references.title %}<a class="references-section-content-details-title">{{ references.title }}</a>{% endif %}
                    <a class="references-section-content-details-contact">{% if references.phone %} {% if site.fontawesome_link and site.fontawesome_enable_content %}<i class="fas fa-phone-alt fontawesome-icon"></i>{% endif %}{{ references.phone }} {% endif %} {% if references.email %} {% if site.fontawesome_link and site.fontawesome_enable_content %}<i class="fas fa-envelope fontawesome-icon"></i>{% endif %}{{ references.email }} {% endif %}</a>
                    
                </section>
            {% endfor %}
            </article>
        </section>

    </article>
</section>
{% endif %}

</article>



