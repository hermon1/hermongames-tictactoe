// App.js
import React, { useState } from 'react';
import Board from './Board';
import Celebration from './Celebration';
import './styles.css'; // Import the CSS file

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [playerXName, setPlayerXName] = useState('');
  const [playerOName, setPlayerOName] = useState('');
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ X: 0, O: 0 });

  function handleClick(i) {
    if (winner || squares[i]) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const winnerPlayer = calculateWinner(newSquares);
    if (winnerPlayer) {
      setWinner(winnerPlayer);
      setScore(prevScore => ({
        ...prevScore,
        [winnerPlayer]: prevScore[winnerPlayer] + 1,
      }));
    }
  }

  function handleRematch() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  }

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      {!winner ? (
        <>
          <div>
            <label>
              Player X (X):{' '}
              <input
                type="text"
                value={playerXName}
                onChange={(e) => setPlayerXName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Player O (O):{' '}
              <input
                type="text"
                value={playerOName}
                onChange={(e) => setPlayerOName(e.target.value)}
              />
            </label>
          </div>
        </>
      ) : (
        <Celebration winner={winner === 'X' ? playerXName : playerOName} />
      )}
      <div className="status">
        {!winner ? (
          `Next player: ${xIsNext ? playerXName : playerOName}`
        ) : (
          <>
            <div>{winner} wins!</div>
            <button onClick={handleRematch}>Rematch</button>
          </>
        )}
      </div>
      <Board squares={squares} onClick={handleClick} />
      <div className="score">
        Score: X ({score.X}) - O ({score.O})
      </div>
    </div>
  );
}

export default App;
