---
title: Insolite
layout: page.njk
---

<ul>
{% for newsstories in insolite %}
<li><a href="/insolite/articles/{{ newsstories.address.title | slug }}/">{{ newsstories.address.title | safe }}</a></li>
{% endfor %}
</ul>