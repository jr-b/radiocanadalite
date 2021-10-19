---
title: Santé
layout: page.njk
---

<ul>
{% for newsstories in sante %}
<li><a href="/sante/articles/{{ newsstories.address.title | slug }}/">{{ newsstories.address.title | safe }}</a></li>
{% endfor %}
</ul>