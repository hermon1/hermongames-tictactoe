

// Celebration.js
import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import Confetti from 'react-confetti';
import './Celebration.css'; // Import CSS for celebration animation
import nipSong from './music/nip.mp3';

function Celebration({ winner }) {
  useEffect(() => {
    const audio = new Audio(nipSong); // Replace '/path/to/your/song.mp3' with the path to your audio file
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 20000); // Stop playing after 20 seconds
  }, []); // This effect runs once when the component mounts

  return (
    <div className="celebration">
      <h2>{winner} wins!</h2>
      <div className="confetti-container">
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false} // Prevents confetti from reappearing after falling off-screen
          timeout={10000} // Duration for confetti (10 seconds)
        />
      </div>
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
          url="https://www.youtube.com/watch?v=VIDEO_ID"
          width="100%"
          height="100%"
          playing
        />
      </div>
    </div>
  );
}

export default Celebration;
