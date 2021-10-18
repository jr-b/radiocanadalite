---
layout: base.njk
pagination:
    data: ppagemtl
    size: 1
    alias: articles
permalink: "/a-la-une/articles/{{ articles.address.title | slug }}/"
---
<header>
  <h1>{{ articles.address.title }}</h1>
</header>
<main>
<address>Un article écrit par {% if articles.address.signaturesV2[0].person.name %}{{ articles.address.signaturesV2[0].person.name }}{% else %}Radio-Canada{% endif %}</address>
  <article>
    {{ articles.address.body.html | safe }}
  </article>
    <aside><a href="{{ articles.address.canonicalWebLink.href | safe }}">Lisez l'article sur Radio-Canada.ca</a></aside>
</main>