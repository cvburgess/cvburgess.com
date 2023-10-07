interface Props {
  title: string;
  subtitle?: string;
  icon?: string;
  imgUrl?: string;
  url?: string;
}

export default function (
  { title, subtitle = "", icon = "", imgUrl = "", url = "" }: Props,
) {
  return (
    <div
      class="card round shadow clickable"
      onClick={() => {
        location.href = url;
      }}
    >
      <div class="card-container">
        <div class="center">
          <a href={url} alt={`Image or icon link to: ${title}`}>
            {imgUrl && <img src={imgUrl} alt={`Image for ${title}`} />}
            {icon && <img src={`/img/icons/${icon}.svg`} alt={icon} />}
          </a>
        </div>
        <div class="card-details">
          <a href={url} class="margin-none card-title">{title}</a>
          {subtitle && <p class="margin-none max-lines-3">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
