import React from 'react';
import Square from './Square';

function Board({ squares, onClick, winningLine }) {
  function renderSquare(i) {
    const isWinningSquare = winningLine && winningLine.includes(i); // Check if the square is part of the winning line
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        className={`${squares[i] === 'X' ? 'X' : squares[i] === 'O' ? 'O' : ''} ${isWinningSquare ? 'winning-square' : ''}`}
      />
    );
  }

  return (
    <div className="board">
      <div className="row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

export default Board;