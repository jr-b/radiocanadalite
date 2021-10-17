---
layout: base.njk
pagination:
    data: ppagemtl
    size: 1
    alias: articles
permalink: "/mtl/articles/{{ articles.address.title | slug }}/"
---

<header>
  <h1>{{ articles.address.title }}</h1>
</header>
<main>
  <article>
    {{ articles.address.body.html | safe }}
  </article>
</main>