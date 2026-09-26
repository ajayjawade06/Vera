import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TicTacToe = ({ onBack }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isAiTurn, setIsAiTurn] = useState(false);

  const calculateWinner = (squares) => {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(Boolean);

  const handleClick = (i) => {
    if (board[i] || winner || isAiTurn) return;
    
    const newBoard = [...board];
    newBoard[i] = 'X';
    setBoard(newBoard);
    
    if (calculateWinner(newBoard) || newBoard.every(Boolean)) return;
    
    setIsAiTurn(true);
    
    setTimeout(() => {
      const emptyIndices = newBoard.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
      if (emptyIndices.length > 0) {
        const randomIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        newBoard[randomIdx] = 'O';
        setBoard([...newBoard]);
      }
      setIsAiTurn(false);
    }, 500);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsAiTurn(false);
  };

  return (
    <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button onClick={onBack} style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '24px' }}>&larr; Back to Dashboard</button>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '24px' }}>
        {board.map((cell, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(i)}
            style={{ width: '100px', height: '100px', fontSize: '40px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '16px', color: cell === 'X' ? '#f43f5e' : '#8b5cf6', cursor: 'pointer' }}
          >
            {cell}
          </motion.button>
        ))}
      </div>

      <div style={{ height: '24px', marginBottom: '24px', fontSize: '20px', fontWeight: 500 }}>
        {winner ? (winner === 'X' ? 'You won!' : 'Computer won!') : isDraw ? "It's a draw!" : isAiTurn ? "Computer is thinking..." : "Your turn (X)"}
      </div>
      
      <button onClick={resetGame} className="btn-primary" style={{ width: '200px' }}>Restart Game</button>
    </div>
  );
};

export default TicTacToe;
