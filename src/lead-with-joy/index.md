---
eleventyImport:
  collections: ["post"]
layout: base
title: Lead With Joy
---

# Lead with Joy Resources

Here's a bunch of stuff, I hope you like it.

<div class="card-container">
  {%- for post in collections.post | reverse -%}
    {% include "_card.html" %}
  {%- endfor -%}
</div>
