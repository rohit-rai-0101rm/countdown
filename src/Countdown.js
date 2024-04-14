import React, { useState, useEffect } from "react";

function CountdownTimer() {
  const [targetDate, setTargetDate] = useState(new Date());
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerId, setTimerId] = useState(null);

  const startCountdown = () => {
    const currentTime = new Date().getTime();
    const targetTime = targetDate.getTime();
    const remaining = targetTime - currentTime;
    setTimeRemaining(remaining);

    const id = setInterval(() => {
      const currentTime = new Date().getTime();
      const remaining = targetTime - currentTime;
      setTimeRemaining(remaining);
      if (remaining <= 0) {
        clearInterval(id);
      }
    }, 1000);

    setTimerId(id);
  };

  const stopCountdown = () => {
    clearInterval(timerId);
    setTimeRemaining(0);
    setTimerId(null);
  };

  useEffect(() => {
    return () => clearInterval(timerId);
  }, [timerId]);

  const formatTime = (time) => {
    if (time < 0) return "00:00:00";
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <div className="countdown-container">
      <h1 className="title">Countdown Timer</h1>
      <div className="countdown">{formatTime(timeRemaining)}</div>
      <div className="input-container">
        <label htmlFor="date">Select Target Date:</label>
        <input
          type="date"
          id="date"
          value={targetDate.toISOString().split("T")[0]}
          onChange={(e) => setTargetDate(new Date(e.target.value))}
        />
        <label htmlFor="time">Select Target Time:</label>
        <input
          type="time"
          id="time"
          value={`${targetDate
            .getHours()
            .toString()
            .padStart(2, "0")}:${targetDate
            .getMinutes()
            .toString()
            .padStart(2, "0")}`}
          onChange={(e) =>
            setTargetDate(
              new Date(
                `${targetDate.toISOString().split("T")[0]}T${e.target.value}`
              )
            )
          }
        />
      </div>
      <div className="button-container">
        <button className="start-button" onClick={startCountdown}>
          Start Countdown
        </button>
        <button className="stop-button" onClick={stopCountdown}>
          Stop Countdown
        </button>
      </div>
    </div>
  );
}

export default CountdownTimer;
