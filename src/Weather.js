import React from "react";

function Weather(props) {
  const getIcon = (main) => {
    const isDay = props.isDay;
    let type = main.toLowerCase();
    switch (type) {
      case "haze": {
        return <i className="fa-solid fa-smog"></i>;
      }
      case "smoke": {
        return <i className="fa-solid fa-smog"></i>;
      }
      case "rain": {
        return <i className="fa-solid fa-cloud-rain"></i>;
      }
      case "clouds": {
        return isDay ? (
          <i class="fa-solid fa-cloud-sun"></i>
        ) : (
          <i class="fa-solid fa-cloud-moon"></i>
        );
      }
      case "clear": {
        return isDay ? (
          <i className="fa-solid fa-sun"></i>
        ) : (
          <i class="fa-solid fa-moon"></i>
        );
      }
      case "snow": {
        return <i className="fa-solid fa-cloud-snow"></i>;
      }
      case "mist": {
        return <i className="fa-solid fa-cloud"></i>;
      }
      default: {
        return <i className="fa-solid fa-rainbow"></i>;
      }
    }
  };

  const main = props.info.weather[0].main;
  const temp = props.info.main.temp.toFixed(0);
  const icon = getIcon(main);

  return (
    <>
      <p className="name">
        {props.info.name}, {props.info.sys.country}
      </p>
      <div className="weather">
        <p className="temp">{temp}°C</p>
      </div>
      <p className="desc">
        <span className="icon">{icon}</span>
        {main}
      </p>
    </>
  );
}

export default Weather;
