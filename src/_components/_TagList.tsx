interface Props {
  tags?: string[];
}

export default function TagList({ tags }: Props) {
  if (!tags) return null;

  const skippedTags = ["post"]; // "crash course", "deep dive", "guide", "playbook"

  return (
    <div className="tags">
      {tags.filter((tag) => !skippedTags.includes(tag)).map((tag) => (
        <a href="/tags/{{tag | slugify}}">
          <span className="tag">{tag.toUpperCase()}</span>
        </a>
      ))}
    </div>
  );
}
