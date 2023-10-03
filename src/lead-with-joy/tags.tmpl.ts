const categories = ["Crash Course", "Deep Dive", "Guide", "Playbook"];

const pluralize = (str: string) => str + "s";
const slugify = (str: string) => str.toLowerCase().replace(" ", "-");

export default function* ({ search }) {
  for (const category of categories) {
    yield {
      layout: "search.njk",
      posts: search.pages(`type=${slugify(category)}`),
      term: category,
      title: pluralize(category),
      url: `/tags/${slugify(category)}/`,
    };
  }
}
