const Feed = require("rss-to-json");

const FEED_URL = "https://feeds.captivate.fm/practically-useless/";

module.exports = () => Feed.load(FEED_URL).then((rss) => rss.items);
