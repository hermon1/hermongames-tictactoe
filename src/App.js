import React, { useState, useEffect } from 'react';
import Board from './Board';
import Celebration from './Celebration';
import Countdown from './Countdown';
import useMoveHandler from './MoveHandler';
import { calculateWinner } from './MoveHandler';
import './styles.css';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [playerXName, setPlayerXName] = useState('');
  const [playerOName, setPlayerOName] = useState('');
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [showCelebration, setShowCelebration] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  const { handleMove, countdown, resetHandler } = useMoveHandler(
    squares,
    setSquares,
    xIsNext,
    setXIsNext,
    setWinner,
    setScore
  );

  function handleClick(i) {
    if (winner || squares[i]) return;

    // Unlock audio on first click if not already unlocked
    if (!audioUnlocked) {
      const audio = new Audio(); // Dummy audio
      audio.src = 'data:audio/mpeg;base64,/+MYxAAAAANIAAAAAExBTUUzLjEwMAQoAAAAAAAAAAAVCCQCkAABAB5t/'; // Tiny silent audio
      audio.play()
        .then(() => {
          setAudioUnlocked(true);
          console.log('Audio context unlocked for Chrome/Safari');
        })
        .catch(error => console.error('Error unlocking audio:', error));
    }

    handleMove(i);
  }

  function handleRematch() {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
    setShowCelebration(false);
    resetHandler();
  }

  useEffect(() => {
    if (winner && !showCelebration) {
      const timer = setTimeout(() => {
        setShowCelebration(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [winner, showCelebration]);

  return (
    <div className="App">
      <h1>Hermon Tic Tac Toe</h1>

      {!winner || !showCelebration ? (
        <>
          <div className="player-label">
            <label style={{ color: 'red' }}>
              Player X ({playerXName || 'X'}):{' '}
              <input type="text" value={playerXName} onChange={(e) => setPlayerXName(e.target.value)} />
            </label>
          </div>
          <div className="player-label">
            <label style={{ color: 'green' }}>
              Player O ({playerOName || 'O'}):{' '}
              <input type="text" value={playerOName} onChange={(e) => setPlayerOName(e.target.value)} />
            </label>
          </div>

          {countdown !== null && <Countdown timeLeft={countdown} />}

          <div className="board-container">
            <Board squares={squares} onClick={handleClick} winningLine={winner ? calculateWinner(squares)?.winningLine : null} />
          </div>

          <div className="score">
            Score: 
            {playerXName || 'X'} (<span style={{ color: 'red' }}>{score.X || 0}</span>) -
            {playerOName || 'O'} (<span style={{ color: 'green' }}>{score.O || 0}</span>)
          </div>
        </>
      ) : (
        <Celebration winner={winner === 'X' ? playerXName || 'X' : playerOName || 'O'} />
      )}

      {winner && <button className="rematch-button" onClick={handleRematch}>Rematch</button>}
    </div>
  );
}

export default App;