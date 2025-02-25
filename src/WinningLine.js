import React from 'react';
import './WinningLine.css';

const WinningLine = ({ winningLine }) => {
  if (!winningLine) return null; // No winner yet

  // Map the winningLine array (e.g., [0, 1, 2]) to the correct index (0-7)
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];
  const lineIndex = lines.findIndex(line =>
    line.every((pos, idx) => pos === winningLine[idx])
  );

  if (lineIndex === -1) return null; // Safety check

  const positions = {
    0: { top: '16.67%', left: '50%', width: '80%', height: '5px', transform: 'translate(-50%)' }, // Row 1
    1: { top: '50%', left: '50%', width: '80%', height: '5px', transform: 'translate(-50%)' },    // Row 2
    2: { top: '83.33%', left: '50%', width: '80%', height: '5px', transform: 'translate(-50%)' }, // Row 3
    3: { top: '50%', left: '16.67%', width: '5px', height: '80%', transform: 'translateY(-50%)' }, // Col 1
    4: { top: '50%', left: '50%', width: '5px', height: '80%', transform: 'translateY(-50%)' },    // Col 2
    5: { top: '50%', left: '83.33%', width: '5px', height: '80%', transform: 'translateY(-50%)' }, // Col 3
    6: { top: '50%', left: '50%', width: '113%', height: '5px', transform: 'translate(-50%, -50%) rotate(45deg)' },  // Diagonal \
    7: { top: '50%', left: '50%', width: '113%', height: '5px', transform: 'translate(-50%, -50%) rotate(-45deg)' }  // Diagonal /
  };

  return <div className="winning-line" style={positions[lineIndex]} />;
};

export default WinningLine;