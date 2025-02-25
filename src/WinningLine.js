import React from 'react';
import './WinningLine.css';

const WinningLine = ({ winningLine }) => {
  if (!winningLine) return null; // No winner yet

  // **Map winning lines to positions**
  const positions = {
    0: { top: '16%', left: '50%', width: '80%', height: '5px', transform: 'translate(-50%)' }, // Row 1
    1: { top: '50%', left: '50%', width: '80%', height: '5px', transform: 'translate(-50%)' }, // Row 2
    2: { top: '84%', left: '50%', width: '80%', height: '5px', transform: 'translate(-50%)' }, // Row 3
    3: { top: '50%', left: '16%', width: '5px', height: '80%', transform: 'translateY(-50%)' }, // Column 1
    4: { top: '50%', left: '50%', width: '5px', height: '80%', transform: 'translateY(-50%)' }, // Column 2
    5: { top: '50%', left: '84%', width: '5px', height: '80%', transform: 'translateY(-50%)' }, // Column 3
    6: { top: '50%', left: '50%', width: '100%', height: '5px', transform: 'rotate(45deg)' }, // Diagonal \
    7: { top: '50%', left: '50%', width: '100%', height: '5px', transform: 'rotate(-45deg)' } // Diagonal /
  };

  return <div className="winning-line" style={positions[winningLine]} />;
};

export default WinningLine;