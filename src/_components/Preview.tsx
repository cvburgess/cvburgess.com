import type { OGData } from "../utils/fetchOgData.ts";

export default function Preview(
  { title, description, favicon, hostname, url }: OGData,
) {
  return (
    <div
      className="card preview round shadow clickable"
      data-href={url}
    >
      <div className="card-container">
        <div className="center">
          <a href={url}>
            {favicon && (
              <img
                alt={`Icon for ${title}`}
                class="no-shadow"
                src={favicon}
              />
            )}
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
