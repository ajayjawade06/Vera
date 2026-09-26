import React, { useState } from 'react';
import { motion } from 'framer-motion';

const moods = [
  { emoji: '😍', label: 'Loved' },
  { emoji: '😊', label: 'Happy' },
  { emoji: '🥺', label: 'Soft' },
  { emoji: '🤪', label: 'Silly' },
  { emoji: '😴', label: 'Tired' },
  { emoji: '😡', label: 'Grumpy' }
];

const MoodCheck = ({ onBack }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="glass-panel" style={{ padding: '32px', maxWidth: '600px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '24px', display: 'block' }}>&larr; Back to Dashboard</button>
      <h2 style={{ fontSize: '32px', marginBottom: '16px', background: 'var(--accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Daily Vibe Check</h2>
      
      {selected ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '40px 0' }}>
          <div style={{ fontSize: '80px', marginBottom: '16px' }}>{selected.emoji}</div>
          <h3 style={{ fontSize: '24px', marginBottom: '32px' }}>You're feeling {selected.label} today!</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Vibe logged successfully.</p>
        </motion.div>
      ) : (
        <>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>How are you feeling right now?</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {moods.map(m => (
              <motion.div 
                key={m.label} 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelected(m)}
                style={{ background: 'rgba(255,255,255,0.05)', padding: '24px', borderRadius: '16px', border: '1px solid var(--glass-border)', cursor: 'pointer' }}
              >
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>{m.emoji}</div>
                <div style={{ fontSize: '14px', fontWeight: 500 }}>{m.label}</div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default MoodCheck;
