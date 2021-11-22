---
title: Économie
layout: page.njk
---

<ul>
{% for newsstories in economie %}
{% if newsstories.address.body.html %}
<li>— <a href="/economie/articles/{{ newsstories.address.title | slug }}/">{{ newsstories.address.title | safe }}</a></li>
{% endif %}
{% endfor %}
</ul>