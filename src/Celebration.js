import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import Confetti from 'react-confetti';
import './Celebration.css';
import nipSong from './music/nip.mp3';
import nipviclap from './music/nipviclap.mp3';

function Celebration({ winner }) {
  useEffect(() => {
    let audio;
    // Check if winner includes 'X' (either as 'X' or playerXName containing 'X')
    if (winner === 'X' || winner.includes('X')) {
      audio = new Audio(nipSong);
    } else {
      audio = new Audio(nipviclap);
    }

    // Attempt to play audio
    const playAudio = async () => {
      try {
        await audio.play();
        console.log('Audio playing:', winner.includes('X') ? 'nipSong' : 'nipviclap');
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    };

    playAudio();

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0; // Reset to start for next play
      }
    };
  }, [winner]);

  return (
    <div className="celebration">
      <h2>{winner} wins!</h2>
      <div className="confetti-container">
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          timeout={10000}
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