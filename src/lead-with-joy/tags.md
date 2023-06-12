---
layout: base
pagination:
  data: collections
  size: 1
  alias: tag
permalink: /tags/{{ tag | slugify }}/
---

# Category is: _{{ tag }}_

<div class="card-container">
  {%- for post in collections[ tag ] | reverse -%}
    {% include "_card.html" %}
  {%- endfor -%}
</div>
