---
title: Économie
layout: page.njk
---

<ul>
{% for newsstories in economie %}
{% if newsstories.address.body.html %} <!-- permet d'exclure les éléments qui n'ont pas de body (à cause d'une structure json différente) -->
<li><a href="/economie/articles/{{ newsstories.address.title | slug }}/">{{ newsstories.address.title | safe }}</a></li>
{% endif %}
{% endfor %}
</ul>