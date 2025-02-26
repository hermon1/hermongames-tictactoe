import React, { useRef, useEffect, useState } from 'react';
import './Countdown.css';

function Countdown({ timeLeft, onComplete }) {
  const progressBarRef = useRef(null);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const [displaySeconds, setDisplaySeconds] = useState(3);

  useEffect(() => {
    if (timeLeft === null) {
      // Reset state when countdown is inactive
      setDisplaySeconds(3);
      if (progressBarRef.current) {
        progressBarRef.current.style.width = '100%';
      }
      return;
    }

    // Cancel any existing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    startTimeRef.current = performance.now();
    const duration = 3000; // 3 seconds

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTimeRef.current;
      const progressPercent = Math.max(100 - (elapsed / duration) * 100, 0);
      const secondsLeft = Math.ceil((progressPercent / 100) * 3);

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progressPercent}%`;
      }
      setDisplaySeconds(secondsLeft);

      if (elapsed < duration) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
        if (progressBarRef.current) {
          progressBarRef.current.style.width = '0%';
        }
        setDisplaySeconds(0);
        onComplete(); // Only call when 3 seconds are fully up
      }
    };

    // Start fresh animation
    animationFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [timeLeft, onComplete]); // Re-run on every timeLeft change

  return (
    <div className="countdown-container">
      <div className="progress-bar" ref={progressBarRef} style={{ width: '100%' }}></div>
      <span className="countdown-text">{displaySeconds}s</span>
    </div>
  );
}

export default Countdown;