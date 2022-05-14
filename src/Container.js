import React, { useState, useEffect } from "react";
import Clock from "./Clock";
import Weather from "./Weather";
import { getGPSCoordinates, getWeatherFromCoordinates } from "./helper";
import Search from "./Search";

function Container() {
  const checkIfDay = () => {
    const hours = new Date().getHours();
    if (hours < 6 || hours >= 18) {
      return false;
    }
    return true;
  };

  const [data, setData] = useState({
    isDay: checkIfDay(),
    coordinates: null,
    weather: null,
    loading: true,
    error: false,
  });

  const handleSelect = () => {}

  const changeBodyBg = (main) => {
    const type = main.toLowerCase();
    switch (type) {
      case "haze": {
        document.body.setAttribute("class", "haze");
        return;
      }
      case "rain": {
        document.body.setAttribute("class", "rain");
        return;
      }
      case "clear": {
        if (data.isDay) {
          document.body.setAttribute("class", "clear");
        } else {
          document.body.setAttribute("class", "clear-night");
        }
        return;
      }
      case "clouds": {
        if (data.isDay) {
          document.body.setAttribute("class", "clouds");
        } else {
          document.body.setAttribute("class", "clouds-night");
        }
        return;
      }
      case "mist": {
        if (data.isDay) {
          document.body.setAttribute("class", "mist");
        } else {
          document.body.setAttribute("class", "clouds-night");
        }
        return;
      }
      case "snow": {
        document.body.setAttribute("class", "snow");
        return;
      }
      default: {
        return;
      }
    }
  };

  useEffect(() => {
    let unmounted = false;
    const init = async () => {
      try {
        let coordinates;
        const location = await getGPSCoordinates();
        if (location === undefined) {
          coordinates = {
            lat: 12.97,
            lon: 77.59,
          };
        } else {
          coordinates = { ...location };
        }
        const weather = await getWeatherFromCoordinates(
          coordinates.lat,
          coordinates.lon
        );
        changeBodyBg(weather.weather[0].main);
        if (!unmounted) {
          setData({
            ...data,
            weather,
            coordinates,
            loading: false,
          });
        }
      } catch (error) {
        console.error(error);
        if (!unmounted) {
          setData({
            ...data,
            loading: false,
            error: true,
          });
        }
      }
    };
    init();
    return () => {
      unmounted = true;
    };
  }, []);

  if (data.loading || data.weather === null) {
    return <div className="container">{/* show spinner */}</div>;
  }

  if (data.error) {
    <div className="container">
      <Clock />
      <p className="msg">could not get weather data</p>
    </div>;
  }

  return (
    <div className="container">
      <Search handleSelect={handleSelect}/>
      <Weather info={data.weather} isDay={data.isDay} />
      <Clock />
    </div>
  );
}

export default Container;
