---
title: À la une
layout: page.njk
---

<ul style="list-style: none;margin-block-start: 0px;padding-inline-start: 0px;">
{% for newsstories in ppagemtl %}
{% if newsstories.address.body.html %} <!-- permet d'exclure les articles qui n'ont pas de contenu (à cause d'une structure json différente) -->
<li>— <a href="/a-la-une/articles/{{ newsstories.address.title | slug }}/">{{ newsstories.address.title | safe }}</a></li>
{% endif %}
{% endfor %}
</ul>