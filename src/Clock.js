import React from "react";

class Clock extends React.Component {
  // by binding the below methods, you give them access to the class 'this' context
  // so you can invoke other class methods, properties etc from callbacks.
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
    };
  }

  updateTime() {
    this.setState({
      time: new Date(),
    });
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.updateTime(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  displayTime = () => {
    let timeStr = this.state.time.toLocaleTimeString("en-US");
    let sub = timeStr.split(" ");
    let suff = sub[1];
    let hhmm = sub[0].split(":").slice(0, 2);
    return hhmm.join(":") + " " + suff;
  };

  displayDate = () => {
    let dateStr = new Date().toDateString();
    let sub = dateStr.split(" ");
    if (sub[2].length === 1) {
      sub[2] = "0" + sub[2];
    }
    return `${sub[0]}, ${sub[1]} ${sub[2]}`;
  };

  render() {
    return (
      <>
        <div className="clock">
          <p className="time">{this.displayTime()}</p>
        </div>
        <p className="date">{this.displayDate()}</p>
      </>
    );
  }
}

export default Clock;
