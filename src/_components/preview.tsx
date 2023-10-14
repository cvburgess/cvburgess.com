interface Props {
  title: string;
  subtitle: string;
  image: string;
  hostname: string;
  url: string;
}

export default function (
  { title, subtitle, image, hostname, url }: Props,
) {
  return (
    <div
      className="card preview round shadow clickable"
      onClick={() => {
        location.href = url;
      }}
    >
      <div className="card-container">
        <div className="center">
          <a href={url} alt={`Image or icon link to: ${title}`}>
            {image && <img src={image} alt={`Image for ${title}`} />}
          </a>
        </div>
        <div className="card-details">
          <a href={url} className="margin-none card-title">{title}</a>
          {subtitle && <p className="margin-none max-lines-3">{subtitle}</p>}
          <p className="push-down preview-url">{hostname}</p>
        </div>
      </div>
    </div>
  );
}
