---
layout: one-column
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

Listen on [Apple Podcasts](https://podcasts.apple.com/us/podcast/practically-useless/id1552626100?l=es) • [Google Podcasts](https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5jYXB0aXZhdGUuZm0vcHJhY3RpY2FsbHktdXNlbGVzcy8) • [Spotify](https://open.spotify.com/show/0mtYElrOkNqQpeRIjETiiZ) • [Amazon Music](https://music.amazon.com/podcasts/a3d7e8ee-f914-4c96-b19a-186c8b556cd5/Practically-Useless) • [Overcast](https://overcast.fm/itunes1552626100)

## Sponsor

{{episode.sponsorText}}

## Transcript

<details>
    <summary>Click here to see the full transcript</summary>
    {{episode.transcript if episode.transcript else "Coming soon"}}
</details>

{% if episode.trivia %}

## Useless Trivia

{{episode.trivia}}
{% endif %}

## Credits

**Theme Music**: [Ryan Jones](https://www.fiverr.com/ryjones)

**Marketing Strategy**: [Aylin Ildir](https://vividmktng.com)

**Host**: [Charles Burgess](/about)

{% if episode.guest %}**Guest**: {{episode.guest}}{% endif %}
