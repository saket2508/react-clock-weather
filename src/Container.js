import React, { useState, useEffect } from "react";
import Clock from "./Clock";
import Weather from "./Weather";
import {
  weatherConfig,
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
  if (type in weatherConfig) {
    if (weatherConfig[type].day && weatherConfig[type].night) {
      isDay ? weatherConfig[type].day.bg() : weatherConfig[type].night.bg();
    } else {
      weatherConfig[type].bg();
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
    setData((prev) => ({
      ...prev,
      coordinates: { lat, lon },
      city,
    }));
  };

  useEffect(() => {
    if (data.coordinates !== null) {
      return;
    }
    const getUserLocation = async () => {
      let coordinates;
      const location = await getGPSCoordinates();
      if (location === undefined) {
        coordinates = {
          lat: 28.6139,
          lon: 77.209,
        };
      } else {
        coordinates = { ...location };
      }
      setData({
        ...data,
        coordinates,
      });
    };
    getUserLocation();
  }, []);

  useEffect(() => {
    let unmounted = false;
    if (data.coordinates === null) {
      return;
    }
    const getWeatherData = async () => {
      try {
        const weather = await getWeatherFromCoordinates(
          data.coordinates.lat,
          data.coordinates.lon
        );
        const isDay = checkIfDay(weather.timezone);
        const city = data.city !== null ? data.city : {
          name: weather.name,
          country: countryList[weather.sys.country]
        };
        changeBodyBg(weather.weather[0].main, isDay);
        if (!unmounted) {
          setData((prev) => ({
            ...prev,
            city,
            isDay,
            weather,
            loading: false,
            timezone: weather.timezone,
          }));
        }
      } catch (e) {
        console.error(e);
        setData((prev) => ({
          ...prev,
          loading: false,
          error: true
        }));
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