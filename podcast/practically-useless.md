---
layout: one-column
title: Practically Useless
pagination:
  data: practically-useless-episodes
  size: 1
  alias: episode
permalink: "podcast/practically-useless/{{episode.number}}/"
---

# {{episode.title}}

{{episode.description}}

<div style="width: 100%; height: 170px; margin: 40px 0; border-radius: 10px; overflow: hidden;">
  <iframe style="width: 100%; height: 170px;" frameborder="no" scrolling="no" seamless src="https://player.captivate.fm/episode/{{episode.id}}/"></iframe>
</div>

## Sponsor

{{episode.sponsorText}}

## Transcript

{{episode.transcript if episode.transcript else "Coming soon"}}

{% if episode.trivia %}
## Useless Trivia

{{episode.trivia}}
{% endif %}

## Credits

**Theme Music**: [Ryan Jones](https://www.fiverr.com/ryjones)

**Marketing Strategy**: [Aylin Ildir](https://vividmktng.com)

**Host**: [Charles Burgess](/about)

{% if episode.guest %}**Guest**: {{episode.guest}}{% endif %}
