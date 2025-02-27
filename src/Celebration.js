import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import Confetti from 'react-confetti';
import './Celebration.css';
import nipSong from './music/nip.mp3';
import nipviclap from './music/nipviclap.mp3';

function Celebration({ winner, onRematch }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    audioRef.current = new Audio(winner === 'X' || winner.includes('X') ? nipSong : nipviclap);

    const playAudio = async () => {
      try {
        await audioRef.current.play();
        console.log('Audio playing:', winner.includes('X') ? 'nipSong' : 'nipviclap');
      } catch (error) {
        console.error('Initial play failed:', error);
        setTimeout(async () => {
          try {
            await audioRef.current.play();
            console.log('Retry successful:', winner.includes('X') ? 'nipSong' : 'nipviclap');
          } catch (retryError) {
            console.error('Retry failed:', retryError);
          }
        }, 100);
      }
    };

    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.src = '';
        audioRef.current = null;
        console.log('Audio cleaned up');
      }
    };
  }, [winner]);

  return (
    <>
      <div className="confetti-container">
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          timeout={10000}
        />
      </div>
      <div className="celebration">
        <h2 className={winner === 'X' || winner.includes('X') ? 'x-winner' : 'o-winner'}>{winner} wins!</h2>
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            url="https://www.youtube.com/watch?v=VIDEO_ID"
            width="100%"
            height="100%"
            playing
          />
        </div>
        <button className="rematch-button" onClick={onRematch}>Rematch</button>
      </div>
    </>
  );
}

export default Celebration;