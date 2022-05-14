const API = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/weather",
};

export async function getWeatherFromCoordinates(lat, lon, unit = "metric") {
  try {
    const res = await fetch(
      `${API.base}?lat=${lat}&lon=${lon}&appid=${API.key}&units=${unit}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Could not fetch data");
  }
}

export function getGPSCoordinates() {
  return new Promise((resolve) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (!pos) {
            resolve(undefined);
          }
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          resolve({
            lat,
            lon,
          });
        },
        (e) => {
          console.error(e);
          resolve(undefined);
        }
      );
    } else {
      resolve(undefined);
    }
  });
}
