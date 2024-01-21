// ----------  String formatting ---------- //

const pluralize = (str: string) => str + "s";

const capitalizeFirstLetter = (word: string) =>
  word[0].toUpperCase() + word.substring(1);

const beautify = (str: string) =>
  pluralize(str).split("-").map(capitalizeFirstLetter).join(" ");

// ----------  Generate pages dynamically for all post "types" ---------- //

export default function* ({ search }) {
  const categories = search.values("type");

  for (const category of categories) {
    yield {
      layout: "collection.njk",
      posts: search.pages(`type=${category}`),
      title: beautify(category),
      url: `/tags/${category}/`,
    };
  }
}
