import React, { useEffect, useState } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, [time]);

  const displayTime = () => {
    let timeStr = time.toLocaleTimeString("en-US");
    let sub = timeStr.split(" ");
    let suff = sub[1];
    let hhmm = sub[0].split(":").slice(0, 2);
    return hhmm.join(":") + " " + suff;
  };

  const displayDate = () => {
    let dateStr = new Date().toDateString();
    let sub = dateStr.split(" ");
    if (sub[2].length === 1) {
      sub[2] = "0" + sub[2];
    }
    return `${sub[0]}, ${sub[1]} ${sub[2]}`;
  };

  return (
    <>
      <div className="clock">
        <p className="time">{displayTime()}</p>
      </div>
      <p className="date">{displayDate()}</p>
    </>
  );
}

export default Clock;
