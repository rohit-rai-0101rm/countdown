import React, { useState, useEffect } from "react";

function CountdownTimer() {
  const [targetDate, setTargetDate] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerId, setTimerId] = useState(null);

  const startCountdown = () => {
    const targetTime = new Date(targetDate).getTime();
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
    <div>
      <h1>Countdown Timer</h1>
      <div>Countdown Timer: {formatTime(timeRemaining)}</div>
      <label htmlFor="datetime">Enter Target Date and Time:</label>
      <input
        type="datetime-local"
        id="datetime"
        value={targetDate}
        onChange={(e) => setTargetDate(e.target.value)}
      />
      <button onClick={startCountdown}>Start Countdown</button>
      <button onClick={stopCountdown}>Stop Countdown</button>
    </div>
  );
}

export default CountdownTimer;
