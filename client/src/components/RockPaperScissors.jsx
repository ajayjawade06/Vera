import React, { useState } from 'react';
import { motion } from 'framer-motion';

const choices = [
  { name: 'Rock', emoji: '🪨' },
  { name: 'Paper', emoji: '📄' },
  { name: 'Scissors', emoji: '✂️' }
];

const RockPaperScissors = ({ onBack }) => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [score, setScore] = useState({ player: 0, computer: 0 });

  const playGame = (choice) => {
    const computerRandom = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setComputerChoice(computerRandom);
    
    if (choice.name === computerRandom.name) {
      setResult("It's a tie!");
    } else if (
      (choice.name === 'Rock' && computerRandom.name === 'Scissors') ||
      (choice.name === 'Paper' && computerRandom.name === 'Rock') ||
      (choice.name === 'Scissors' && computerRandom.name === 'Paper')
    ) {
      setResult('You win!');
      setScore(s => ({ ...s, player: s.player + 1 }));
    } else {
      setResult('Computer wins!');
      setScore(s => ({ ...s, computer: s.computer + 1 }));
    }
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
    setScore({ player: 0, computer: 0 });
  };

  return (
    <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <button onClick={onBack} style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '24px' }}>&larr; Back to Dashboard</button>
      
      <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Rock, Paper, Scissors</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Score - You: {score.player} | Computer: {score.computer}</p>
      
      <div style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
        {choices.map((c) => (
          <motion.button
            key={c.name}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => playGame(c)}
            style={{ width: '80px', height: '80px', fontSize: '32px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '16px', cursor: 'pointer' }}
          >
            {c.emoji}
          </motion.button>
        ))}
      </div>

      {playerChoice && computerChoice && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '40px' }}>{playerChoice.emoji}</div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>You</div>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>VS</div>
            <div>
              <div style={{ fontSize: '40px' }}>{computerChoice.emoji}</div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>CPU</div>
            </div>
          </div>
          <h3 style={{ fontSize: '24px', color: result === 'You win!' ? 'var(--success)' : result === 'Computer wins!' ? 'var(--error)' : 'var(--text-primary)' }}>
            {result}
          </h3>
        </motion.div>
      )}
      
      <button onClick={resetGame} className="btn-primary" style={{ width: '200px' }}>Reset Score</button>
    </div>
  );
};

export default RockPaperScissors;
