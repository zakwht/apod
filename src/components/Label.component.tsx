import React from "react";
import { IAPODResponse } from "../types";

export interface ILabelProps {
  apod: IAPODResponse;
}

export const Label: React.FC<ILabelProps> = ({ apod }: ILabelProps) => {
  const unembed = (url: string): string => {
    if (url.match("www.youtube.com")) return url.replace("embed/", "watch?v=");
    if (url.match("player.vimeo.com"))
      return url.replace("/video", "").replace("player.", "");
    return url;
  };

  return (
    <label className="APODlabel">
      <h3>{apod.title}</h3>
      <p>{apod.explanation}</p>
      <div className="labelButtons">
        <a
          href={`https://apod.nasa.gov/apod/ap${apod.date
            .replace(/-/g, "")
            .slice(2)}.html`}
          title="See this photo in context"
        >
          APOD
        </a>
        {apod.media_type === "image" ? (
          <a href={apod.hdurl} title="See this photo in HD">
            HD
          </a>
        ) : (
          <a href={unembed(apod.url)} title="See video">
            Watch
          </a>
        )}
        <address>{`© ${apod.copyright || "NASA"}`}</address>
      </div>
    </label>
  );
};
