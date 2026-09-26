import React, { useState } from 'react';
import { motion } from 'framer-motion';

const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

const Horoscope = ({ onBack }) => {
  const [sign1, setSign1] = useState('Aries');
  const [sign2, setSign2] = useState('Aries');
  const [result, setResult] = useState(null);

  const checkMatch = () => {
    const score = Math.floor(Math.random() * 50) + 50; 
    setResult({ score, desc: "The stars say you two bring out a fiery, passionate energy in one another. Embrace the cosmos!" });
  };

  return (
    <div className="glass-panel" style={{ padding: '32px', maxWidth: '600px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '24px', display: 'block' }}>&larr; Back to Dashboard</button>
      <h2 style={{ fontSize: '32px', marginBottom: '24px', background: 'var(--accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Cosmic Compatibility</h2>
      
      {!result ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <select className="input-field" value={sign1} onChange={e => setSign1(e.target.value)} style={{ width: '150px' }}>
              {signs.map(s => <option key={s} value={s} style={{color: '#000'}}>{s}</option>)}
            </select>
            <div style={{ fontSize: '24px', alignSelf: 'center' }}>+</div>
            <select className="input-field" value={sign2} onChange={e => setSign2(e.target.value)} style={{ width: '150px' }}>
              {signs.map(s => <option key={s} value={s} style={{color: '#000'}}>{s}</option>)}
            </select>
          </div>
          <button onClick={checkMatch} className="btn-primary" style={{ width: '250px', margin: '0 auto' }}>Read the Stars ✨</button>
        </div>
      ) : (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div style={{ fontSize: '64px', fontWeight: 'bold', background: 'var(--accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{result.score}%</div>
          <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>{sign1} & {sign2}</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.5 }}>{result.desc}</p>
          <button onClick={() => setResult(null)} className="btn-primary" style={{ width: '200px', margin: '0 auto' }}>Check Again</button>
        </motion.div>
      )}
    </div>
  );
};
export default Horoscope;
