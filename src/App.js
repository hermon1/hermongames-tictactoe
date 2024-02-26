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

function isBoardFull(squares) {
  return squares.every(square => square !== null);
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
    } else if (isBoardFull(newSquares)) {
      setWinner('Draw');
    }
  }

  function handleRematch() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  }

  const winnerName = winner === 'X' ? playerXName : winner === 'O' ? playerOName : winner === 'Draw' ? 'Draw' : null;

  return (
    <div className="App">
      <h1>Hermon Tic Tac Toe</h1>
      {!winner ? (
        <>
          <div className="player-label">
            <label style={{ color: 'red' }}>
              Player X ({playerXName || 'Player X'}):{' '}
              <input
                type="text"
                value={playerXName}
                onChange={(e) => setPlayerXName(e.target.value)}
              />
            </label>
          </div>
          <div className="player-label">
            <label style={{ color: 'green' }}>
              Player O ({playerOName || 'Player O'}):{' '}
              <input
                type="text"
                value={playerOName}
                onChange={(e) => setPlayerOName(e.target.value)}
              />
            </label>
          </div>
        </>
      ) : (
        <Celebration winner={winnerName} />
      )}
      <div className="status">
        <span style={{ color: 'black' }}>Next player: </span>
        <span style={{ color: xIsNext ? 'red' : 'green' }}>{xIsNext ? playerXName : playerOName}</span>
      </div>
      {!winner ? (
        <Board squares={squares} onClick={handleClick} playerXName={playerXName} playerOName={playerOName} />
      ) : winner === 'Draw' ? (
        <button className="rematch-button" onClick={handleRematch}>Rematch</button>  // Styled rematch button
      ) : (
        <>
          <div>{winnerName} wins!</div>
          <button className="rematch-button" onClick={handleRematch}>Rematch</button>  
        </>
      )}
      <div className="score">
        Score: <span style={{ color: 'black' }}>{playerXName || 'Player X'} (<span style={{ color: 'red' }}>{score.X}</span>)</span> - <span style={{ color: 'black' }}>{playerOName || 'Player O'} (<span style={{ color: 'green' }}>{score.O}</span>)</span>
      </div>
    </div>
  );
}

export default App;
