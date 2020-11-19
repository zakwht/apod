import { samplePhotos } from "./data/samplePhotos";
import { IAPODResponse } from "./types";

const sendRequest = (url: string, onLoad: (req: XMLHttpRequest) => void) => {
  const req = new XMLHttpRequest();
  req.open("GET", `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY${url}`);
  req.send();
  req.onload = () => onLoad(req);
};

//Get 30 latest photos
export const getLatest = (callback: (state: IAPODResponse[]) => void) => {
  const todayPDT = new Date().getTime() - 7 * 60 * 60 * 1000;
  const monthAgoPDT = new Date(todayPDT - 30 * 24 * 60 * 60 * 1000);
  const endQuery = new Date(todayPDT).toISOString().slice(0, 10);
  const startQuery = new Date(monthAgoPDT).toISOString().slice(0, 10);

  sendRequest(
    `&start_date=${startQuery}&end_date=${endQuery}`,
    (req: XMLHttpRequest) => {
      const response: IAPODResponse[] =
        req.status === 200
          ? JSON.parse(req.response)
          : samplePhotos[Math.floor(Math.random() * samplePhotos.length)];
      callback(response);
      localStorage.setItem(
        "APODHistory",
        JSON.stringify({
          timestamp: new Date().getTime(),
          data: response
        })
      );
    }
  );
};

//Get 100 random photos
export const getRandom = (callback: (state: IAPODResponse[]) => void) => {
  const cached = localStorage.getItem("APODRandom");
  if (cached) {
    const response: IAPODResponse[] = JSON.parse(cached);
    callback(response);
    if (response.length)
      return localStorage.setItem(
        "APODRandom",
        JSON.stringify(response.slice(1))
      );
  }
  sendRequest("&count=100", (req: XMLHttpRequest) => {
    const response: IAPODResponse[] =
      req.status === 200
        ? JSON.parse(req.response)
        : [samplePhotos[Math.floor(Math.random() * samplePhotos.length)]];
    localStorage.setItem("APODRandom", JSON.stringify(response.slice(1)));
    if (!cached) callback(response);
  });
};
