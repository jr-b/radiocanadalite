---
title: À la une

layout: page.njk
---

<ul>
{% for newsstories in ppagemtl %}
<li><a href="/a-la-une/articles/{{ newsstories.address.title | slug }}/">{{ newsstories.address.title | safe }}</a></li>
{% endfor %}
</ul>