---
layout: base
title: Podcast
---

# Practically Useless

{% for episode in practicallyUselessEpisodes %}

- [{{ episode.itunes_episode | episodeNumber }}: {{ episode.title }}](/podcast/practically-useless/{{ episode.itunes_episode }})

{% endfor %}
