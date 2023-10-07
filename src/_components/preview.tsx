import { fetchOgData } from "../utils/fetchOgData.ts";

interface Props {
  url: string;
}

export default async function ({ url }: Props) {
  const { title, subtitle, image, hostname } = await fetchOgData(url);

  console.log({ title, subtitle, image, hostname });

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
            {image && <img src={image} alt={`Image for ${title}`} />}
          </a>
        </div>
        <div class="card-details">
          <a href={url} class="margin-none card-title">{title}</a>
          {subtitle && <p class="margin-none max-lines-3">{subtitle}</p>}
          <p class="push-down preview-url">{hostname}</p>
        </div>
      </div>
    </div>
  );
}
