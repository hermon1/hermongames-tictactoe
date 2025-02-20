import { useState, useEffect } from 'react';

export default function useMoveHandler(squares, setSquares, xIsNext, setXIsNext, setWinner, setScore) {
  const [moveHistory, setMoveHistory] = useState([]); // Store all moves
  const [countdown, setCountdown] = useState(null);
  const [timer, setTimer] = useState(null); // Timer reference

  useEffect(() => {
    // Only start the countdown if 3 moves have been made by each player and no winner yet
    if (moveHistory.length >= 6 && countdown === null) {
      startCountdown();
    }
  }, [moveHistory]);

  function startCountdown() {
    if (countdown !== null || moveHistory.length < 6) return; // Prevent early countdown
    setCountdown(3);

    let newTimer = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(newTimer);
          setWinner(xIsNext ? 'O' : 'X'); // Opponent wins if no move is made
          setScore(prevScore => ({
            ...prevScore,
            [xIsNext ? 'O' : 'X']: (prevScore[xIsNext ? 'O' : 'X'] || 0) + 1,
          }));
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    setTimer(newTimer);
  }

  function handleMove(i) {
    if (squares[i]) return; // Prevent moves on occupied squares

    if (timer) clearInterval(timer); // Stop previous countdown if move is made
    setCountdown(null); // Reset countdown for the next player

    setMoveHistory(prev => {
      const newHistory = [...prev, i];
      if (newHistory.length > 6) {
        const firstMoveIndex = newHistory.shift(); // Remove oldest move
        setSquares(prevSquares => {
          const newSquares = [...prevSquares];
          newSquares[firstMoveIndex] = null; // Clear that move
          return newSquares;
        });
      }
      return newHistory;
    });

    // **Switch turns after a move**
    setXIsNext(prev => !prev);

    // **Start countdown for the next player after 500ms only if 3 moves each have been made**
    setTimeout(() => {
      if (moveHistory.length >= 6) {
        startCountdown();
      }
    }, 500);
  }

  function resetHandler() {
    setMoveHistory([]); // Reset move history
    setCountdown(null); // Clear countdown
    if (timer) clearInterval(timer); // Stop any active countdown
  }

  return { handleMove, countdown, resetHandler };
}