interface Props {
  tags?: string[];
}

export default function ({ tags }: Props) {
  if (!tags) return null;

  const skippedTags = ["post"]; // "crash course", "deep dive", "guide", "playbook"

  return (
    <div class="tags">
      {tags.filter((tag) => !skippedTags.includes(tag)).map((tag) => (
        <a href="/tags/{{tag | slugify}}">
          <span class="tag">{tag.toUpperCase()}</span>
        </a>
      ))}
    </div>
  );
}
