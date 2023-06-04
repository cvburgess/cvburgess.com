---
eleventyImport:
  collections: ["post"]
layout: one-column
socialImage: podcast.jpg
title: Lead With Joy
---

# Title

Paragraph

<ul>
  {% for post in collections.post %}
    {% include "_card.html" %}
  {% endfor %}
</ul>
