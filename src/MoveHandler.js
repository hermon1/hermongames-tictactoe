import { useState, useEffect, useCallback } from 'react';

export default function useMoveHandler(squares, setSquares, xIsNext, setXIsNext, setWinner, setScore) {
  const [moveHistory, setMoveHistory] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const startCountdown = useCallback(() => {
    setCountdown(100); // Trigger a fresh 3-second countdown
  }, []);

  const handleCountdownComplete = useCallback(() => {
    setCountdown(null);
    // Determine winner as the player whose turn just ended (opposite of xIsNext)
    const activePlayer = xIsNext ? 'O' : 'X'; // Fixed: Winner is the previous player
    const result = calculateWinner(squares);
    if (result) {
      setWinner(result.winner);
      setScore(prevScore => ({
        ...prevScore,
        [result.winner]: (prevScore[result.winner] || 0) + 1,
      }));
    } else {
      setWinner(activePlayer);
      setScore(prevScore => ({
        ...prevScore,
        [activePlayer]: (prevScore[activePlayer] || 0) + 1,
      }));
    }
    setGameOver(true);
  }, [squares, xIsNext, setWinner, setScore]);

  function handleMove(i) {
    if (squares[i] || gameOver) return;

    const newSquares = [...squares];
    let newHistory = [...moveHistory];

    // Add the new move
    newSquares[i] = xIsNext ? 'X' : 'O';
    newHistory.push(i);

    // If this is the 6th move (O's turn), remove X's oldest move immediately
    if (newHistory.length === 6 && !xIsNext) {
      const oldestXIndex = newHistory.findIndex((_, index) => index % 2 === 0); // X moves are at even indices
      if (oldestXIndex !== -1) {
        const moveToRemove = newHistory.splice(oldestXIndex, 1)[0];
        newSquares[moveToRemove] = null; // Clear X's oldest move
      }
    }
    // If there are more than 5 moves (after 6th), remove the oldest move of the current player
    else if (newHistory.length > 5) {
      const oldestMoveIndex = newHistory.findIndex((_, index) => (xIsNext ? index % 2 === 0 : index % 2 === 1));
      if (oldestMoveIndex !== -1) {
        const moveToRemove = newHistory.splice(oldestMoveIndex, 1)[0];
        newSquares[moveToRemove] = null; // Clear the oldest move of the current player
      }
    }

    // Update state
    setSquares(newSquares);
    setMoveHistory(newHistory);

    setCountdown(null); // Reset before starting new countdown

    const result = calculateWinner(newSquares);
    if (result) {
      setWinner(result.winner);
      setScore(prevScore => ({
        ...prevScore,
        [result.winner]: (prevScore[result.winner] || 0) + 1,
      }));
      setGameOver(true);
    } else {
      setXIsNext(prev => !prev);
      setTimeout(() => startCountdown(), 0); // Start fresh countdown
    }
  }

  function resetHandler() {
    setMoveHistory([]);
    setCountdown(null);
    setGameStarted(false);
    setGameOver(false);
  }

  useEffect(() => {
    if (moveHistory.length === 1 && !gameStarted) {
      setGameStarted(true);
      startCountdown();
    }
  }, [moveHistory, gameStarted, startCountdown]);

  return { handleMove, countdown, resetHandler: resetHandler, onCountdownComplete: handleCountdownComplete };
}

export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningLine: lines[i] };
    }
  }
  return null;
}