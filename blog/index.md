---
layout: page
title: Blog
description: Some thoughts on technology and other stuff.
navigation_weight: 2
---
<section class="wrapper alt style1">

	{% for post in site.posts%}{% if site.tiles-source == 'posts' %}

	<section class="spotlight">
		<div class="image">{% if post.image %}<img src="{% if site.featured-image-source %}{{ post.image | prepend: site.featured-image-source | absolute_url }}{% else %}{{ "" | absolute_url }}/assets/images/{{ post.image }}{% endif %}" alt="" />{% endif %}</div>
		<div class="content">
			<h2><a href="{{ post.url | relative_url }}" class="link">{{ post.title }}</a></h2>
			<p>{{ post.date | date_to_string }}</p>
            <p>{{ post.content | strip_html | st | truncatewords:50}}</p>
		</div>
	</section>

	{% endif %}{% endfor %}
	{% for page in site.pages%}{% if site.tiles-source == 'pages' %}{% if page.layout == 'default' %}{% continue %}{% endif %}

	<section class="spotlight">
		<div class="image">{% if page.image %}<img src="{% if site.featured-image-source %}{{ page.image | prepend: site.featured-image-source | absolute_url }}{% else %}{{ "" | absolute_url }}/assets/images/{{ page.image }}{% endif %}" alt="" />{% endif %}</div>
		<div class="content">
			<h2><a href="{{ page.url | relative_url }}" class="link">{{ page.title }}</a></h2>
			<p>{{ post.date | date_to_string }}</p>
            <p>{{ post.content | strip_html | st | truncatewords:50}}</p>
		</div>
	</section>

	{% endif %}{% endfor %}

</section>