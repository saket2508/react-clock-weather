import React from "react";
import { weatherConfig } from './helper/';

function Weather(props) {
  const getIcon = (main) => {
    const isDay = props.isDay;
    let type = main.toLowerCase();
    if(type in weatherConfig){
      if(weatherConfig[type].day && weatherConfig[type].night){
        return isDay ? weatherConfig[type].day.icon() : weatherConfig[type].night.icon()
      } else {
        return weatherConfig[type].icon();
      }
    } else {
      return <div></div>
    };
  };
  const city = props.city;
  const main = props.info.weather[0].main;
  const temp = props.info.main.temp.toFixed(0);
  const feels_like = props.info.main.feels_like.toFixed(0);
  const icon = getIcon(main);

  return (
    <>
      <p className="name">
        {city}
      </p>
      <div className="weather">
        <p className="temp">{temp}°C</p>
      </div>
      <p className="desc">
        <span className="icon">{icon}</span>
        {main}
      </p>
      <p className="feels-like">
        Feels like {feels_like}°
      </p>
    </>
  );
}

export default Weather;
