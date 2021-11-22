---
title: Justice et faits divers
layout: page.njk
---

<ul>
{% for newsstories in justice %}
{% if newsstories.address.title %}
{% if newsstories.address.contentType.id == "11" %} <!-- permet de valider que seuls les news-stories sont affichées (pour retirer les vidéos, audios, extrats, etc.) -->
<li>— <a href="/justice-et-faits-divers/articles/{{ newsstories.address.title | slug }}/">{{ newsstories.address.title | safe }}</a></li>
{% endif %}
{% endif %}
{% endfor %}
</ul>