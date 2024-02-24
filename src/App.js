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
  // Example state for the squares array, player names, current player, wins, and losses
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [playerXName, setPlayerXName] = useState('');
  const [playerOName, setPlayerOName] = useState('');
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winsX, setWinsX] = useState(0);
  const [winsO, setWinsO] = useState(0);

  function handleClick(i) {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      // If there's a winner or the square is already filled, do nothing
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    const winner = calculateWinner(newSquares);
    if (winner) {
      setWinner(winner);
      if (winner === 'X') {
        setWinsX(winsX + 1);
      } else {
        setWinsO(winsO + 1);
      }
    }
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setWinner(null);
  }

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div>
        <label>
          Player X ({playerXName || 'Player X'}):{' '}
          <input
            type="text"
            value={playerXName}
            onChange={(e) => setPlayerXName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Player O ({playerOName || 'Player O'}):{' '}
          <input
            type="text"
            value={playerOName}
            onChange={(e) => setPlayerOName(e.target.value)}
          />
        </label>
      </div>
      {winner && (
        <div className="score">
          <p>
            {playerXName || 'Player X'} Wins: {winsX}
          </p>
          <p>
            {playerOName || 'Player O'} Wins: {winsO}
          </p>
        </div>
      )}
      <div className="status">
        {winner ? (
          <>
            <p>{winner === 'X' ? `${playerXName || 'Player X'} wins!` : `${playerOName || 'Player O'} wins!`}</p>
            <button onClick={resetGame}>Rematch</button>
          </>
        ) : (
          <p>Next player: {xIsNext ? `${playerXName || 'Player X'}` : `${playerOName || 'Player O'}`}</p>
        )}
      </div>
      <Board squares={squares} onClick={handleClick} />
      {winner && <Celebration winner={winner === 'X' ? playerXName || 'Player X' : playerOName || 'Player O'} />}
    </div>
  );
}

export default App;
