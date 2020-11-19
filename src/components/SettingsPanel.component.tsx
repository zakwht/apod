import React from "react";
import { ISettings } from "../types";
import { NasaLogo } from "./NasaLogo.component";

export interface ISettingsPanelProps {
  settings: ISettings;
  setSettings: (value: ISettings) => void;
}

export const SettingsPanel: React.FC<ISettingsPanelProps> = ({
  settings,
  setSettings
}: ISettingsPanelProps) => {
  const updateSettings = (newSettings: ISettings) => {
    const settingsA = localStorage.getItem("APODSettings");
    localStorage.setItem(
      "APODSettings",
      JSON.stringify({
        ...(settingsA && JSON.parse(settingsA)),
        ...newSettings
      })
    );
    setSettings({ ...settings, ...newSettings });
  };

  const handleToggleTransitions = (e: React.ChangeEvent<HTMLInputElement>) => {
    document.documentElement.style.setProperty(
      "--transition-delay-1",
      e.target.checked ? "0s" : "1s"
    );
    document.documentElement.style.setProperty(
      "--transition-delay-2",
      e.target.checked ? "0s" : "0.5s"
    );
    updateSettings({ disableTransitions: e.target.checked });
  };

  const handleToggleTransparency = (e: React.ChangeEvent<HTMLInputElement>) => {
    document.documentElement.style.setProperty(
      "--background-black",
      e.target.checked ? "black" : "rgba(0,0,0,0.5)"
    );
    updateSettings({ disableTransparency: e.target.checked });
  };

  const handleSelectBackground = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ background: e.target.value as any });
  };

  return (
    <div className="settingsPanel">
      <h2>Settings</h2>
      <label>
        <span>Background</span>
        <select onChange={handleSelectBackground} value={settings.background}>
          <option value="initial">Auto</option>
          <option value="cover">Fit</option>
          <option value="contain">Fill</option>
        </select>
      </label>
      <label>
        <span>Disable transitions</span>
        <div className="toggle">
          <input
            type="checkbox"
            onChange={handleToggleTransitions}
            defaultChecked={settings.disableTransitions}
          />
          <div className="slider" />
        </div>
      </label>
      <label>
        <span> Disable transparency</span>
        <div className="toggle">
          <input
            type="checkbox"
            onChange={handleToggleTransparency}
            defaultChecked={settings.disableTransparency}
          />
          <div className="slider" />
        </div>
      </label>
      <a href="https://apod.nasa.gov/apod/" className="nasaLogo">
        <NasaLogo />
      </a>
    </div>
  );
};
