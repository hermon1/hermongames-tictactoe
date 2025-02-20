import React from 'react';
import './WinningLine.css';

const WinningLine = ({ winningLine }) => {
  if (!winningLine) return null; // No winner yet

  // Define positions based on index (0-8 board)
  const lineStyles = {
    0: { top: '15%', left: '50%', width: '80%', height: '5px', transform: 'translate(-50%)' }, // Top row
    1: { top: '50%', left: '50%', width: '80%', height: '5px', transform: 'translate(-50%)' }, // Middle row
    2: { top: '85%', left: '50%', width: '80%', height: '5px', transform: 'translate(-50%)' }, // Bottom row
    3: { top: '50%', left: '15%', width: '5px', height: '80%', transform: 'translateY(-50%)' }, // Left column
    4: { top: '50%', left: '50%', width: '5px', height: '80%', transform: 'translateY(-50%)' }, // Middle column
    5: { top: '50%', left: '85%', width: '5px', height: '80%', transform: 'translateY(-50%)' }, // Right column
    6: { top: '50%', left: '50%', width: '100%', height: '5px', transform: 'rotate(45deg)' }, // Diagonal (0,4,8)
    7: { top: '50%', left: '50%', width: '100%', height: '5px', transform: 'rotate(-45deg)' } // Diagonal (2,4,6)
  };

  return <div className="winning-line" style={lineStyles[winningLine]} />;
};

export default WinningLine;