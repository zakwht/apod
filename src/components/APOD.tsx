import React, { useState, useEffect } from "react";
import "./styles.css";
import { IAPODHistory, IAPODResponse, ISettings } from "../types";
import { Label } from "./Label.component";
import { Panel } from "./Panel.component";
import { getLatest, getRandom } from "../APODClient";

export const APOD: React.FC = () => {
  const [apodHistory, setApodHistory] = useState<IAPODResponse[]>([]);
  const [apod, setApod] = useState<IAPODResponse>();
  const [panelOpen, setPanelOpen] = useState(false);
  const [fade, setFade] = useState(false);
  const [settings, setSettings] = React.useState<ISettings>({
    background: "initial",
    disableTransitions: false,
    disableTransparency: false
  });

  const updatePhoto = (newAPOD: IAPODResponse) => {
    setFade(!settings.disableTransitions);
    const img = new Image();
    img.src = newAPOD.url;
    img.onload = () =>
      setTimeout(
        () => {
          setApod(newAPOD);
          setFade(false);
        },
        settings.disableTransitions ? 0 : 500
      );
  };

  useEffect(() => {
    const cached = localStorage.getItem("APODHistory");
    if (!cached)
      return getLatest((res: IAPODResponse[]) => {
        updatePhoto(res[res.length - 1]);
        setApodHistory(res);
      });
    const storedHistory: IAPODHistory = JSON.parse(cached);
    if (new Date().getDate() - new Date(storedHistory.timestamp).getDate()) {
      updatePhoto(storedHistory.data[storedHistory.data.length - 1]);
      return getLatest(setApodHistory);
    }
    updatePhoto(storedHistory.data[storedHistory.data.length - 1]);
    setApodHistory(storedHistory.data);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const storedSettings = localStorage.getItem("APODSettings");
    if (!storedSettings) return;
    const parsedSettings: ISettings = JSON.parse(storedSettings);
    setSettings(parsedSettings);
    if (parsedSettings.disableTransitions) {
      document.documentElement.style.setProperty("--transition-delay-1", "0s");
      document.documentElement.style.setProperty("--transition-delay-2", "0s");
    }
    if (parsedSettings.disableTransparency)
      document.documentElement.style.setProperty("--background-black", "black");
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > 12) setPanelOpen(e.deltaX > 0);
  };

  if (!apod) return <div className="placeholder" />;

  return (
    <>
      <Label apod={apod} />
      {apod.media_type === "image" ? (
        <img
          src={apod.url}
          alt={apod.title}
          className="APOD"
          style={{ opacity: fade ? 0 : 1, objectFit: settings.background }}
          onWheel={handleWheel}
        />
      ) : (
        <iframe
          src={apod.url}
          title={apod.title}
          width="96%"
          height="100%"
        ></iframe>
      )}
      <Panel
        isOpen={panelOpen}
        setPanelOpen={setPanelOpen}
        apodHistory={apodHistory}
        setApod={updatePhoto}
        getRandom={() =>
          getRandom((res: IAPODResponse[]) => updatePhoto(res[0]))
        }
        settings={settings}
        setSettings={setSettings}
      />
    </>
  );
};
