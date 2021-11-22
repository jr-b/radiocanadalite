---
title: Insolite
layout: page.njk
---

<ul>
{% for newsstories in insolite %}
{% if newsstories.address.title %}
{% if newsstories.address.contentType.id == "11" %}<li>— <a href="/insolite/articles/{{ newsstories.address.title | slug }}/">{{ newsstories.address.title | safe }}</a></li>
{% endif %}
{% endif %}
{% endfor %}
</ul>