import React from "react";
import { weatherConfig } from "./helper/";

function Weather(props) {
  const getIcon = (main) => {
    const isDay = props.isDay;
    let type = main.toLowerCase();
    if (type in weatherConfig) {
      if (weatherConfig[type].day && weatherConfig[type].night) {
        return isDay
          ? weatherConfig[type].day.icon()
          : weatherConfig[type].night.icon();
      } else {
        return weatherConfig[type].icon();
      }
    } else {
      return <div></div>;
    }
  };
  const city_name = props.city.name;
  const state = props.city.state;
  const country = props.city.country;
  const main = props.info.weather[0].main;
  const temp = props.info.main.temp.toFixed(0);
  const feels_like = props.info.main.feels_like
    ? props.info.main.feels_like.toFixed(0)
    : undefined;
  const max = props.info.main.temp_max
    ? props.info.main.temp_max.toFixed(0)
    : undefined;
  const min = props.info.main.temp_min
    ? props.info.main.temp_min.toFixed(0)
    : undefined;
  const humidity = props.info.main.humidity
    ? props.info.main.humidity.toFixed(0)
    : undefined;
  const icon = getIcon(main);

  return (
    <>
      <p className="name">{city_name}</p>
      <p className="state-country">
        {country && state ? `${state}, ${country}` : `${country}`}
      </p>
      <div className="weather">
        <p className="temp">{temp}°C</p>
      </div>
      <p className="desc">
        <span className="icon">{icon}</span>
        {main}
      </p>
      {max && min && (
        <p className="max-min">
          <span>H:{max}°</span>
          <span>L:{min}°</span>
        </p>
      )}
      {feels_like && <p className="feels-like">Feels like: {feels_like}°</p>}
      {humidity && <p className="humidity">Humidity: {humidity}%</p>}
    </>
  );
}

export default Weather;
