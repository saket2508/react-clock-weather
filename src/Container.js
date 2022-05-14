import React from "react";
import Clock from "./Clock";
import Weather from "./Weather";
import { getGPSCoordinates, getWeatherFromCoordinates } from "./helper";

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDay: this.checkDay(),
      coordinates: null,
      weather: {},
      isLoading: true,
      isError: false,
    };
  }

  checkDay() {
    const hour = new Date().getHours();
    if (hour < 6 || hour >= 18) {
      return false;
    }
    return true;
  }

  changeBodyBg = (main) => {
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
        if (this.state.isDay) {
          document.body.setAttribute("class", "clear");
        } else {
          document.body.setAttribute("class", "clear-night");
        }
        return;
      }
      case "clouds": {
        if (this.state.isDay) {
          document.body.setAttribute("class", "clouds");
        } else {
          document.body.setAttribute("class", "clouds-night");
        }
        return;
      }
      case 'mist': {
        if(this.state.isDay){
          document.body.setAttribute('class', 'mist');
        } else {
          document.body.setAttribute('class', 'clouds-night');
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

  async componentDidMount() {
    try {
      let coordinates;
      const location = await getGPSCoordinates();
      if (!location) {
        coordinates = {
          lat: 12.97,
          lon: 77.59,
        };
      }
      else {
        coordinates = {
          ...location,
        };
      }
      const weather = await getWeatherFromCoordinates(
        coordinates.lat,
        coordinates.lon
      );
      this.changeBodyBg(weather.weather[0].main);
      this.setState({
        coordinates,
        weather,
        isLoading: false,
        isError: false,
      });
    } catch (error) {
      console.error(error);
      this.setState({
        isLoading: false,
        isError: true,
      });
    }
  }

  render() {
    const { isLoading, isError, weather, isDay } = this.state;
    if (isLoading) {
      return <div className="container">{/* show spinner */}</div>;
    }
    if (isError) {
      return (
        <div className="container">
          <Clock />
          <p className="msg">could not get weather data</p>
        </div>
      );
    }
    return (
      <div className="container">
        <Weather info={weather} isDay={isDay} />
        <Clock />
        <p className="name">
          {weather.name}, {weather.sys.country}
        </p>
      </div>
    );
  }
}

export default Container;
