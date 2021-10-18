---
title: Politique
layout: page.njk
---

<ul>
{% for newsstories in politique %}
<li><a href="/politique/articles/{{ newsstories.address.title | slug }}/">{{ newsstories.address.title | safe }}</a></li>
{% endfor %}
</ul>