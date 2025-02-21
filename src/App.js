import React, { useState } from 'react';
import Board from './Board';
import Celebration from './Celebration';
import Countdown from './Countdown'; // Import the Countdown component
import useMoveHandler from './MoveHandler'; // Import new feature
import WinningLine from './WinningLine'; // Import new feature
import './styles.css';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningLine: lines[i] }; // Return winner & winning squares
    }
  }
  return null;
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [playerXName, setPlayerXName] = useState('');
  const [playerOName, setPlayerOName] = useState('');
  const [xIsNext, setXIsNext] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState(null);
  const [score, setScore] = useState({ X: 0, O: 0 });

  const { handleMove, countdown, resetHandler } = useMoveHandler(
    squares, setSquares, xIsNext, setXIsNext, (winner) => {
      if (!winnerInfo) { // ✅ Prevent multiple updates
        setWinnerInfo(winner); 
        setScore(prevScore => ({
          ...prevScore,
          [winner.winner]: (prevScore?.[winner.winner] || 0) + 1
        }));
      }
    }, 
    setScore
  );

  function handleClick(i) {
    if (winnerInfo || squares[i]) return;

    const newSquares = [...squares];
    newSquares[i] = xIsNext ? 'X' : 'O';

    setSquares(newSquares);
    handleMove(i);

    const result = calculateWinner(newSquares);
    if (result && !winnerInfo) { // ✅ Ensure winner is only stored once
      setWinnerInfo(result);
      setScore(prevScore => ({
        ...prevScore,
        [result.winner]: (prevScore?.[result.winner] || 0) + 1
      }));
    } else {
      setXIsNext(!xIsNext);
    }
  }

  function handleRematch() {
    setSquares(Array(9).fill(null));
    setWinnerInfo(null);
    setXIsNext(true);
    resetHandler();
  }

  return (
    <div className="App">
      <h1>Hermon Tic Tac Toe</h1>
      {!winnerInfo ? (
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
        <Celebration winner={winnerInfo?.winner === 'X' ? playerXName || 'X' : playerOName || 'O'} />
      )}

      {!winnerInfo && countdown !== null && (
        <Countdown timeLeft={countdown} /> 
      )}

      <div className="board-container">
        {!winnerInfo ? (
          <Board squares={squares} onClick={handleClick} playerXName={playerXName} playerOName={playerOName} winningLine={winnerInfo?.winningLine} />
        ) : (
          <button className="rematch-button" onClick={handleRematch}>Rematch</button>
        )}
        {winnerInfo && <WinningLine winningLine={winnerInfo.winningLine} />}
      </div>

      <div className="score">
        Score: 
        {playerXName || 'X'} (<span style={{ color: 'red' }}>{score?.X || 0}</span>) -
        {playerOName || 'O'} (<span style={{ color: 'green' }}>{score?.O || 0}</span>)
      </div>
    </div>
  );
}

export default App;