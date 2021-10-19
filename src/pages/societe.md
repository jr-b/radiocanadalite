---
title: Société
layout: page.njk
---

<ul>
{% for newsstories in societe %}
<li><a href="/societe/articles/{{ newsstories.address.title | slug }}/">{{ newsstories.address.title | safe }}</a></li>
{% endfor %}
</ul>