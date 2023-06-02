---
layout: one-column
title: Podcast
socialImage: podcast.jpg
---

# Practically Useless

{% for episode in practicallyUselessEpisodes %}

- [{{ episode.itunes_episode | episodeNumber }}: {{ episode.title }}](/podcast/practically-useless/{{ episode.itunes_episode }})

{% endfor %}
