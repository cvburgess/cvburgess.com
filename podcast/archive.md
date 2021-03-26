---
layout: one-column
title: Podcast
socialImage: podcast.jpg
---

{% section %}

# Practically Useless

{% for episode in practically-useless-episodes %}

- [{{ episode.itunes_episode | episodeNumber }}: {{ episode.title }}](/podcast/practically-useless/{{ episode.itunes_episode }})

{% endfor %}

{% endsection %}
