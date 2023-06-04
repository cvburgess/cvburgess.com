---
eleventyImport:
  collections: ["post"]
layout: one-column
title: Lead With Joy
---

<link rel="stylesheet" href="{{ '/css/card.css' | url }}" />

# Lead with Joy Resources

Here's a bunch of stuff, I hope you like it.

<div class="card-container">
  {%- for post in collections.post -%}
    {% include "_card.html" %}
  {%- endfor -%}
</div>
