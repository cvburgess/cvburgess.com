---
layout: base
title: Podcast
socialImage: /img/podcast.jpg
---

# Practically Useless

{% for episode in practicallyUselessEpisodes %}

- [{{ episode.itunes_episode | episodeNumber }}: {{ episode.title }}](/podcast/practically-useless/{{ episode.itunes_episode }})

{% endfor %}
