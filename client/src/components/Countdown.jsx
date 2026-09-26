import React, { useState, useEffect } from 'react';

const Countdown = ({ onBack }) => {
  const [targetDate, setTargetDate] = useState('');
  const [title, setTitle] = useState('');
  const [saved, setSaved] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    if (!saved || !targetDate) return;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        d: Math.floor(distance / (1000 * 60 * 60 * 24)),
        h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [saved, targetDate]);

  return (
    <div className="glass-panel" style={{ padding: '32px', maxWidth: '600px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '24px', display: 'block' }}>&larr; Back to Dashboard</button>
      
      <h2 style={{ fontSize: '32px', marginBottom: '16px', background: 'var(--accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Milestone Countdown</h2>
      
      {!saved ? (
        <form onSubmit={e => {e.preventDefault(); if(title && targetDate) setSaved(true);}} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
          <input type="text" placeholder="What are we counting down to? (e.g. Anniversary)" className="input-field" value={title} onChange={e => setTitle(e.target.value)} />
          <input type="datetime-local" className="input-field" value={targetDate} onChange={e => setTargetDate(e.target.value)} />
          <button type="submit" className="btn-primary" disabled={!title || !targetDate}>Start Countdown</button>
        </form>
      ) : (
        <div style={{ padding: '40px 0' }}>
          <h3 style={{ fontSize: '24px', marginBottom: '32px', color: 'var(--text-secondary)' }}>{title}</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            {Object.entries(timeLeft).map(([unit, val]) => (
              <div key={unit} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px', width: '80px', border: '1px solid var(--glass-border)' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{val}</div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{unit}</div>
              </div>
            ))}
          </div>
          <button onClick={() => setSaved(false)} className="btn-primary" style={{ width: '200px', margin: '40px auto 0', background: 'rgba(255,255,255,0.1)', color: '#fff' }}>Reset</button>
        </div>
      )}
    </div>
  );
};
export default Countdown;
