import React from 'react';
import './Countdown.css';

function Countdown({ timeLeft }) {
  return (
    <div className="countdown-container">
      <div 
        className="progress-bar" 
        style={{ width: `${(timeLeft / 3) * 100}%` }}
      ></div>
      <span className="countdown-text">{timeLeft} Seconds Left!</span>
    </div>
  );
}

export default Countdown;