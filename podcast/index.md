---
layout: two-column
title: Podcast
socialImage: podcast.jpg
---

{% section %}

# Practically <br> Useless

Start your day with a quick and easy listen that mixes practical life tips and some fun, useless trivia!

Topics include tips for:

- Higher productivity
- Deeper connections
- Optimal health and fitness
- Mindful living
- Simple ways to automate the little things

Hosted with love, sass, and plenty of laughs, it's worth subscribing to yet another podcast - pinky promise.

{% button "Apple Podcasts", "https://practically-useless.captivate.fm/apple", "inline" %}
{% button "Spotify", "https://practically-useless.captivate.fm/spotify", "inline" %}
{% button "Go to the archives", "/podcast/archive" %}

{% endsection %}

{% section %}

<div class="podcast-player" style="width: 100%; height: 400px; border-radius: 10px; overflow: hidden;"><iframe style="width: 100%; height: 100%;" frameborder="no" scrolling="no" seamless src="https://player.captivate.fm/show/f368b04e-dde4-47b9-84fc-116c56251601/" title="Podcast player"></iframe></div>

{% endsection %}

{% section %}

# Now let's <br> hear from you

- Do you have a tip of your own you'd like to share?
- Are there things in your life you'd like help with?
- Know some useless trivia that needs to be known?
- Want to sponsor the show or give some feedback?

If you answered "yes" to any of these, this is the form for you!

If not, I still want you to feel included, so I added an "other" option just for you.

{% endsection %}

{% section %}

<form class="podcast-form" name="podcast-form" method="POST" netlify>
  <label for="type">Type</label>
  <select name="type" required>
    <option value="topic">Tip or Question</option>
    <option value="trivia">Trivia</option>
    <option value="sponsor">Sponsorship</option>
    <option value="feedback">Feedback</option>
    <option value="other">Other</option>
  </select>
  <label for="name">Name + City =  Get a shout-out</label>
  <input name="name" placeholder="Charles from Tampa"></input>
  <label for="message">Submission</label>
  <textarea name="message" rows="6" required></textarea>
  <button type="submit">Submit</button>
</form>

{% endsection %}
