interface Props {
  title: string;
  description?: string;
  icon?: string;
  imgUrl?: string;
  url?: string;
}

export default function Card(
  { title, description = "", icon = "", imgUrl = "", url = "" }: Props,
) {
  const isExternal = url.startsWith("http");
  return (
    <div
      className="card round shadow clickable"
      data-href={url}
    >
      <div className="card-container">
        <div className="center">
          <a
            href={url}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
          >
            {imgUrl && <img src={imgUrl} alt={`Image for ${title}`} />}
            {icon && (
              <img
                src={`/img/icons/${icon}.svg`}
                alt={icon}
                class="no-shadow"
              />
            )}
          </a>
        </div>
        <div className="card-details">
          <a
            href={url}
            className="margin-none card-title max-lines-2"
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
          >
            {title}
          </a>
          {description && (
            <p className="margin-none max-lines-3">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
