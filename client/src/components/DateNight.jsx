import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ideas = [
  "Build a blanket fort and watch a movie",
  "Cook a 3-course meal together",
  "Go for a midnight drive with no destination",
  "Have a picnic under the stars",
  "Bake a cake and decorate it blindly",
  "Take a pottery or painting class",
  "Create a time capsule for your future selves",
  "Recreate your very first date"
];

const DateNight = ({ onBack }) => {
  const [idea, setIdea] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const generateIdea = () => {
    setIsSpinning(true);
    setTimeout(() => {
      const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
      setIdea(randomIdea);
      setIsSpinning(false);
    }, 1000);
  };

  return (
    <div className="glass-panel" style={{ padding: '32px', maxWidth: '600px', margin: '0 auto', textAlign: 'center', width: '100%' }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '24px', display: 'block' }}>&larr; Back to Dashboard</button>
      <h2 style={{ fontSize: '32px', marginBottom: '16px', background: 'var(--accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Date Night Generator</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Not sure what to do tonight? Let fate decide!</p>
      
      <div style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '24px' }}>
        {isSpinning ? (
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ fontSize: '32px' }}>🎲</motion.div>
        ) : (
          <h3 style={{ fontSize: '24px', fontWeight: 500 }}>{idea || "Click below to roll the dice!"}</h3>
        )}
      </div>
      
      <button onClick={generateIdea} disabled={isSpinning} className="btn-primary" style={{ width: '250px', margin: '0 auto' }}>
        {idea ? "Roll Again" : "Generate Date Idea"}
      </button>
    </div>
  );
};
export default DateNight;
