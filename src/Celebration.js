import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import Confetti from 'react-confetti';
import './Celebration.css'; // Import CSS for celebration animation
import nipSong from './music/nip.mp3';
import nipviclap from './music/nipviclap.mp3'; // Import the other song

function Celebration({ winner }) {
  useEffect(() => {
    if (winner !== 'Draw') {
      let audio;
      if (winner === 'X') {
        audio = new Audio(nipSong);
      } else {
        audio = new Audio(nipviclap);
      }
      audio.play().catch(error => console.error('Error playing audio:', error));
      return () => {
        audio.pause();
      };
    }
  }, [winner]); // This effect runs whenever the 'winner' prop changes

  return (
    <div className="celebration">
      {winner !== 'Draw' ? (
        <>
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
        </>
      ) : (
        <h2>It's a draw!</h2>
      )}
    </div>
  );
}

export default Celebration;
