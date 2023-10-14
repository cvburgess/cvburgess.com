interface Props {
  title: string;
  subtitle?: string;
  icon?: string;
  imgUrl?: string;
  url?: string;
}

export default function Card(
  { title, subtitle = "", icon = "", imgUrl = "", url = "" }: Props,
) {
  return (
    <div
      className="card round shadow clickable"
      data-href={url}
    >
      <div className="card-container">
        <div className="center">
          <a href={url}>
            {imgUrl && <img src={imgUrl} alt={`Image for ${title}`} />}
            {icon && <img src={`/img/icons/${icon}.svg`} alt={icon} />}
          </a>
        </div>
        <div className="card-details">
          <a href={url} className="margin-none card-title">{title}</a>
          {subtitle && <p className="margin-none max-lines-3">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
