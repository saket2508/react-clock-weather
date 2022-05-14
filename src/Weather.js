import React from "react";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: props.info,
      isDay: props.isDay,
    };
  }

  getIcon = (main) => {
    let type = main.toLowerCase();
    switch(type){
      case 'haze': {
        return <i className="fa-solid fa-smog"></i>
      }
      case 'rain': {
        return <i className="fa-solid fa-cloud-rain"></i>
      }
      case 'clouds': {
        return <i class="fa-solid fa-cloud-sun"></i>
      }
      case 'clear': {
        return <i className="fa-solid fa-sun"></i>
      }
      case 'snow': {
        return <i className="fa-solid fa-cloud-snow"></i>
      }
      case 'mist': {
        return <i className="fa-solid fa-cloud"></i>
      }
      default: {
        return <i className="fa-solid fa-rainbow"></i>
      }
    }
  }

  render() {
    const main = this.state.info.weather[0].main;
    const temp = this.state.info.main.temp.toFixed(0);
    const icon = this.getIcon(main);

    return (
      <div className="weather">
        <p className="temp">
          <span className="icon">
            {icon}
          </span>
          {temp}°C
        </p>
      </div>
    );
  }
}

export default Weather;
