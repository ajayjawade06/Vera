import React, { useState } from 'react';

const LoveLetter = ({ onBack }) => {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!recipient || !message) return;
    setSent(true);
  };

  return (
    <div className="glass-panel" style={{ padding: '32px', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '24px' }}>&larr; Back to Dashboard</button>
      
      {sent ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>💌</div>
          <h2 style={{ fontSize: '28px', marginBottom: '16px', color: 'var(--success)' }}>Letter Sent!</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Your heartfelt message is on its way to {recipient}.</p>
          <button onClick={() => {setSent(false); setMessage(''); setRecipient('');}} className="btn-primary" style={{ width: '200px', margin: '0 auto' }}>Send Another</button>
        </div>
      ) : (
        <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '8px', background: 'var(--accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Secret Love Letter</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>Write something sweet and we'll send it securely.</p>
          
          <input 
            type="email" 
            placeholder="Partner's Email Address" 
            className="input-field" 
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
          />
          <textarea 
            placeholder="My dearest..." 
            className="input-field" 
            style={{ height: '150px', resize: 'none', fontFamily: 'inherit' }}
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          
          <button type="submit" className="btn-primary" disabled={!recipient || !message} style={{ marginTop: '8px' }}>Send Letter 💌</button>
        </form>
      )}
    </div>
  );
};
export default LoveLetter;
