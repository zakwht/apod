import React, { useState } from "react";
import { IAPODResponse, ISettings } from "../types";
import { SettingsPanel } from "./SettingsPanel.component";
import { AiOutlineHistory } from "react-icons/ai"
import { BsChevronRight } from "react-icons/bs";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";

export interface IPanelProps {
  isOpen: boolean;
  setPanelOpen: (state: boolean) => void;
  apodHistory: IAPODResponse[];
  setApod: (state: IAPODResponse) => void;
  getRandom: () => void;
  settings: ISettings;
  setSettings: (state: ISettings) => void;
}

export const Panel: React.FC<IPanelProps> = ({
  isOpen,
  setPanelOpen,
  apodHistory,
  getRandom,
  settings,
  setApod,
  setSettings
}: IPanelProps) => {
  const [panelContent, setPanelContent] = useState<"archive" | "options">();
  const [showMenu, setShowMenu] = useState(false);

  const handleArchiveClick = () => {
    if (isOpen && panelContent === "archive") return setPanelOpen(false);
    setPanelOpen(true);
    setPanelContent("archive");
  };
  const handleOptionsClick = () => {
    if (isOpen && panelContent === "options") return setPanelOpen(false);
    setPanelOpen(true);
    setPanelContent("options");
  };

  return (
    <>
      <div className={`sidePanel ${isOpen && "show"}`}>
        {panelContent === "archive" ? (
          <>
            {apodHistory
              .filter((a) => a.media_type === "image")
              .reverse()
              .map((a) => (
                <button
                  onClick={() => setApod(a)}
                  data-title={a.title}
                  key={`archive-${a.date}`}
                >
                  <img alt={a.title} src={a.url} />
                  <time dateTime={a.date}>{a.date}</time>
                </button>
              ))}
            <a href="https://apod.nasa.gov/apod/archivepixFull.html">See All</a>
          </>
        ) : (
          <SettingsPanel settings={settings} setSettings={setSettings} />
        )}
      </div>
      <div
        className={`menu ${(showMenu || isOpen) && "show"}`}
        onMouseOver={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >
        <button onClick={handleArchiveClick}>
          {isOpen && panelContent === "archive" ? (
            <BsChevronRight />
          ) : (
            <AiOutlineHistory/>
          )}
        </button>
        <button onClick={getRandom}>
          <GiPerspectiveDiceSixFacesRandom />
        </button>
        <button onClick={handleOptionsClick}>
          {isOpen && panelContent === "options" ? (
            <BsChevronRight />
          ) : (
            <FiSettings />
          )}
        </button>
      </div>
    </>
  );
};
