import React, { useState } from 'react';
import Board from './Board';
import Celebration from './Celebration';
import useMoveHandler from './MoveHandler'; // Import new feature
import './styles.css';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return X or O as the winner
    }
  }
  return null; // No winner yet
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [playerXName, setPlayerXName] = useState('');
  const [playerOName, setPlayerOName] = useState('');
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ X: 0, O: 0 });

  const { handleMove, countdown, resetHandler } = useMoveHandler(
    squares, setSquares, xIsNext, setXIsNext, setWinner, setScore
  );

  function handleClick(i) {
    if (winner || squares[i]) return; // Ignore clicks on occupied or finished game

    const newSquares = [...squares];
    newSquares[i] = xIsNext ? 'X' : 'O';

    setSquares(newSquares);
    handleMove(i); // Track move **before** switching turns

    const winnerPlayer = calculateWinner(newSquares);
    if (winnerPlayer) {
      setWinner(winnerPlayer);
      setScore(prevScore => ({
        ...prevScore,
        [winnerPlayer]: (prevScore?.[winnerPlayer] || 0) + 1
      }));
    } else if (newSquares.every(square => square !== null)) {
      // 🚨 Force a winner if no moves remain (last player loses)
      const loser = xIsNext ? 'X' : 'O';
      const winnerAuto = loser === 'X' ? 'O' : 'X';
      setWinner(winnerAuto);
      setScore(prevScore => ({
        ...prevScore,
        [winnerAuto]: (prevScore?.[winnerAuto] || 0) + 1
      }));
    } else {
      setXIsNext(!xIsNext); // Ensure turn switches only if game isn't over
    }
  }

  function handleRematch() {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true); // Reset turn to X
    resetHandler(); // Correctly reset move history and countdown
  }

  return (
    <div className="App">
      <h1>Hermon Tic Tac Toe</h1>
      {!winner ? (
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
        </>
      ) : (
        <Celebration winner={winner === 'X' ? playerXName || 'X' : playerOName || 'O'} />
      )}

      {!winner && countdown !== null && (
        <div className="countdown">Move fast! {countdown} seconds left!</div>
      )}

      {!winner ? (
        <Board squares={squares} onClick={handleClick} playerXName={playerXName} playerOName={playerOName} />
      ) : (
        <button className="rematch-button" onClick={handleRematch}>Rematch</button>
      )}

      <div className="score">
        Score: 
        {playerXName || 'X'} (<span style={{ color: 'red' }}>{score?.X || 0}</span>) -
        {playerOName || 'O'} (<span style={{ color: 'green' }}>{score?.O || 0}</span>)
      </div>
    </div>
  );
}

export default App;