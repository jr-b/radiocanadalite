---
title: Techno
layout: page.njk
---

<ul>
{% for newsstories in techno %}
<li><a href="/techno/articles/{{ newsstories.address.title | slug }}/">{{ newsstories.address.title | safe }}</a></li>
{% endfor %}
</ul>