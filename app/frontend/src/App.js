import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(3).fill().map(() => Array(3).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('Player 1');

  const makeMove = async (x, y) => {
    const response = await fetch('http://backend-service:5000/move', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ x, y }),
    });
    const data = await response.json();
    setBoard(data.board);
    setCurrentPlayer(data.current_player);
  };

  const resetGame = async () => {
    const response = await fetch('http://backend-service:5000/reset', {
      method: 'POST',
    });
    const data = await response.json();
    setBoard(data.board);
    setCurrentPlayer(data.current_player);
  };

  return (
    <div className="App">
      <h1>Dots and Boxes</h1>
      <div className="board">
        {board.map((row, x) => (
          <div key={x} className="row">
            {row.map((cell, y) => (
              <div key={y} className="cell" onClick={() => makeMove(x, y)}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={resetGame}>Reset Game</button>
      <p>Current Player: {currentPlayer}</p>
    </div>
  );
}

export default App;
