const Feed = require("rss-to-json");
const fetch = require("node-fetch");

const FEED_URL = "https://feeds.captivate.fm/practically-useless/";

const getTranscript = async (url) =>
  url && fetch(url).then((res) => res.text());

module.exports = async () => {
  const rss = await Feed.load(FEED_URL);

  return Promise.all(
    rss.items.map(async (episode) => ({
      ...episode,
      transcript: await getTranscript(episode.podcast_transcript),
    }))
  );
};
