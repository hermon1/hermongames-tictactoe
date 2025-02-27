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

  const { handleMove, countdown, resetHandler, onCountdownComplete } = useMoveHandler(
    squares,
    setSquares,
    xIsNext,
    setXIsNext,
    setWinner,
    setScore
  );

  function handleClick(i) {
    if (winner || squares[i]) return;

    if (!audioUnlocked) {
      const audio = new Audio();
      audio.src = 'data:audio/mpeg;base64,/+MYxAAAAANIAAAAAExBTUUzLjEwMAQoAAAAAAAAAAAVCCQCkAABAB5t/';
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
      <h1 className="game-title">Hermon Tic Tac Toe Game</h1>

      {!winner || !showCelebration ? (
        <>
          <div className="player-label">
            <label className="x-label">
              <span className="player-name">Player X </span>
              <span className="x-score">({playerXName || 'X'})</span>:
              <input type="text" value={playerXName} onChange={(e) => setPlayerXName(e.target.value)} />
            </label>
          </div>
          <div className="player-label">
            <label className="o-label">
              <span className="player-name">Player O </span>
              <span className="o-score">({playerOName || 'O'})</span>:
              <input type="text" value={playerOName} onChange={(e) => setPlayerOName(e.target.value)} />
            </label>
          </div>

          {countdown !== null && <Countdown timeLeft={countdown} onComplete={onCountdownComplete} />}

          <div className="board-container">
            <Board
              squares={squares}
              onClick={handleClick}
              winningLine={winner ? calculateWinner(squares)?.winningLine : null}
              winner={winner}
            />
          </div>

          <div className="score">
            <span className="player-name x-name">{playerXName || 'X'}</span>
            <span className="x-score">{score.X || 0}</span>
            <span className="separator">-</span>
            <span className="player-name o-name">{playerOName || 'O'}</span>
            <span className="o-score">{score.O || 0}</span>
          </div>
        </>
      ) : (
        <Celebration
          winner={winner} // Pass original winner ('X' or 'O')
          displayWinner={winner === 'X' ? (playerXName || 'X') : (playerOName || 'O')} // Pass display name
          onRematch={handleRematch}
        />
      )}
    </div>
  );
}

export default App;