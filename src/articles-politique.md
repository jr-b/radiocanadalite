---
layout: base.njk
pagination:
    data: politique
    size: 1
    alias: articles
permalink: "/politique/articles/{{ articles.address.title | slug }}/"
---
<header>
  <h1>{{ articles.address.title }}</h1>
</header>
<main>
  <article>
    {{ articles.address.body.html | safe }}
  </article>
</main>