---
title: Covid-19
layout: page.njk
---

<ul>
{% for newsstories in covid %}
{% if newsstories.address.title %}
{% if newsstories.address.contentType.id == "11" %} <!-- permet de valider que seuls les news-stories sont affichées (pour retirer les vidéos, audios, extrats, etc.) -->
<li><a href="/covid/articles/{{ newsstories.address.title | slug }}/">{{ newsstories.address.title | safe }}</a></li>
{% endif %}
{% endif %}
{% endfor %}
</ul>