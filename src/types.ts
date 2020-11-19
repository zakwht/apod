export interface IAPODResponse {
  title: string;
  copyright?: string;
  explanation: string;
  media_type: "image" | "video";
  url: string;
  date: string;
  hdurl?: string;
  service_version?: "v1"
}

export interface IAPODHistory {
  timestamp: number;
  data: IAPODResponse[];
}

export interface ISettings {
  background?: "cover" | "contain" | "initial";
  disableTransitions?: boolean;
  disableTransparency?: boolean;
}