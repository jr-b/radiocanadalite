---
title: Sports
layout: page.njk
---

<ul style="list-style: none;margin-block-start: 0px;padding-inline-start: 0px;">
{% for newsstories in sports %}
{% if newsstories.address.title %}
{% if newsstories.address.contentType.id == "11" %}
<li>— <a href="/sports/articles/{{ newsstories.address.title | slug }}/">{{ newsstories.address.title | safe }}</a></li>
{% endif %}
{% endif %}
{% endfor %}
</ul>