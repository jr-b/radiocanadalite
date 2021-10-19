---
title: Justice et faits divers
layout: page.njk
---

<ul>
{% for newsstories in justice %}
<li><a href="/justice/articles/{{ newsstories.address.title | slug }}/">{{ newsstories.address.title | safe }}</a></li>
{% endfor %}
</ul>