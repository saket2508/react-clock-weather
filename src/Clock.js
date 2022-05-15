import React, { useEffect, useState } from "react";

const getDatetimeFromOffset = (timezone) => {
  const intDate = new Date().getTime() + (timezone * 1000);
  return new Date(intDate);
};

const displayTime = (datetime, timezoneProvided) => {
  if (timezoneProvided) {
    let suff;
    let hh = datetime.getUTCHours();
    let mm = datetime.getUTCMinutes();
    if (hh >= 0 && hh < 12) {
      suff = "AM";
    } else {
      suff = "PM";
    }
    if (hh > 12) {
      hh -= 12;
    }
    hh = hh.toString();
    mm = mm.toString();
    if(hh === '0'){
      hh = '12';
    }
    if(mm.length === 1){
      mm = `0${mm}`;
    }
    return `${hh}:${mm} ${suff}`;
  } else {
    let timeStr = datetime.toLocaleTimeString("en-US");
    let sub = timeStr.split(" ");
    let suff = sub[1];
    let hhmm = sub[0].split(":").slice(0, 2);
    return hhmm.join(":") + " " + suff;
  }
};

const displayDate = (datetime, timezoneProvided) => {
  if (timezoneProvided) {
    let dateStr = datetime.toUTCString();
    let sub = dateStr.split(" ");
    return `${sub[0]} ${sub[2]} ${sub[1]}`;
  } else {
    let dateStr = datetime.toDateString();
    let sub = dateStr.split(" ");
    if (sub[2].length === 1) {
      sub[2] = "0" + sub[2];
    }
    return `${sub[0]}, ${sub[1]} ${sub[2]}`;
  }
};

function Clock({ timezone }) {
  const [time, setTime] = useState(
    timezone === null ? new Date() : getDatetimeFromOffset(timezone)
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      if (timezone) {
        setTime(getDatetimeFromOffset(timezone));
      } else {
        setTime(new Date());
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, [time]);

  return (
    <>
      <div className="clock">
        <p className="time">{displayTime(time, timezone !== null)}</p>
      </div>
      <p className="date">{displayDate(time, timezone !== null)}</p>
    </>
  );
}

export default Clock;
