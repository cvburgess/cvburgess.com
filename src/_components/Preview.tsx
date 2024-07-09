interface Props {
  title: string;
  description: string;
  image: string;
  hostname: string;
  url: string;
}

export default function Preview(
  { title, description, image, hostname, url }: Props,
) {
  return (
    <div
      className="card preview round shadow clickable"
      data-href={url}
    >
      <div className="card-container">
        <div className="center">
          <a href={url}>
            {image && <img src={image} alt={`Image for ${title}`} />}
          </a>
        </div>
        <div className="card-details">
          <a href={url} className="margin-none card-title max-lines-2">
            {title}
          </a>
          {description && (
            <p className="margin-none max-lines-3">{description}</p>
          )}
          <p className="push-down preview-url">{hostname}</p>
        </div>
      </div>
    </div>
  );
}
