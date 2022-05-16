import React, { useState, useEffect } from "react";
import Clock from "./Clock";
import Weather from "./Weather";
import {
  getGPSCoordinates,
  getWeatherFromCoordinates,
  countryList,
} from "./helper";
import Search from "./Search";

const checkIfDay = (timezone = undefined) => {
  let date;
  let hours;
  if (timezone) {
    const intDate = new Date().getTime() + (timezone * 1000);
    date = new Date(intDate);
    hours = date.getUTCHours();
  } else {
    date = new Date();
    hours = date.getHours();
  }
  if (hours < 6 || hours >= 18) {
    return false;
  }
  return true;
};

const changeBodyBg = (main, isDay) => {
  const type = main.toLowerCase();
  switch (type) {
    case "haze": {
    }
    case "smoke": {
      document.body.setAttribute("class", "haze");
      break;
    }
    case "rain": {
      document.body.setAttribute("class", "rain");
      break;
    }
    case 'thunderstorm': {
      document.body.setAttribute("class", "thunderstorm");
      break;
    }
    case "clear": {
      if (isDay) {
        document.body.setAttribute("class", "clear");
      } else {
        document.body.setAttribute("class", "clear-night");
      }
      break;
    }
    case "clouds": {
      if (isDay) {
        document.body.setAttribute("class", "clouds");
      } else {
        document.body.setAttribute("class", "clouds-night");
      }
      break;
    }
    case "mist": {
    }
    case "fog": {
      if (isDay) {
        document.body.setAttribute("class", "mist");
      } else {
        document.body.setAttribute("class", "clouds-night");
      }
      break;
    }
    case "snow": {
      document.body.setAttribute("class", "snow");
      break;
    }
    default: {
      break;
    }
  }
};

function Container() {
  const [data, setData] = useState({
    city: null,
    timezone: null,
    isDay: false,
    coordinates: null,
    weather: null,
    loading: true,
    error: false,
  });

  const selectCoordinates = (lat, lon, city) => {
    setData({
      ...data,
      coordinates: {
        lat,
        lon,
      },
      city,
    });
  };

  useEffect(() => {
    let unmounted = false;
    const getUserLocation = async () => {
      let coordinates;
      const location = await getGPSCoordinates();
      if (location === undefined) {
        coordinates = {
          lat: 28.6139,
          lon: 77.2090,
        };
      } else {
        coordinates = { ...location };
      }
      if(!unmounted){
        setData({
          ...data,
          coordinates,
        });
      }
    };
    getUserLocation();
    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    if (data.coordinates === null) {
      return;
    }
    let unmounted = false;
    const getWeatherData = async () => {
      try {
        const weather = await getWeatherFromCoordinates(
          data.coordinates.lat,
          data.coordinates.lon
        );
        const isDay = checkIfDay(weather.timezone);
        changeBodyBg(weather.weather[0].main, isDay);
        if(!unmounted){
          setData({
            ...data,
            city: data.city
              ? data.city
              : `${weather.name}, ${countryList[weather.sys.country]}`,
            isDay,
            weather,
            loading: false,
            timezone: weather.timezone,
          });
        }
      } catch (e) {
        console.error(e);
        setData({
          ...data,
          loading: false,
          error: true,
        });
      }
    };
    getWeatherData();
    return () => {
      unmounted = true;
    };
  }, [data.coordinates]);

  if (data.loading || data.weather === null) {
    return <div className="container">{/* show spinner */}</div>;
  }

  if (data.error) {
    <div className="container">
      <Search selectCoordinates={selectCoordinates} />
      <Clock />
      <p className="msg">could not get weather data</p>
    </div>;
  }

  return (
    <div className="container">
      <Search selectCoordinates={selectCoordinates} />
      <Weather info={data.weather} isDay={data.isDay} city={data.city} />
      <Clock timezone={data.timezone} />
    </div>
  );
}

export default Container;