import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const OtpInput = ({ length = 6, onComplete, error }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    const combinedOtp = newOtp.join('');
    if (combinedOtp.length === length) {
      onComplete(combinedOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length).split('');
    const newOtp = [...otp];
    pastedData.forEach((char, i) => {
      if (!isNaN(char)) newOtp[i] = char;
    });
    setOtp(newOtp);
    if (pastedData.length === length) {
      onComplete(newOtp.join(''));
    }
  };

  return (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', margin: '20px 0' }}>
      {otp.map((value, index) => (
        <motion.input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
          transition={{ duration: 0.4 }}
          style={{
            width: '48px',
            height: '56px',
            textAlign: 'center',
            fontSize: '24px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: `1px solid ${error ? 'var(--error)' : 'var(--glass-border)'}`,
            color: '#fff',
            outline: 'none',
          }}
          onFocus={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.06)';
            e.target.style.borderColor = error ? 'var(--error)' : 'rgba(255, 255, 255, 0.2)';
            e.target.style.boxShadow = error ? 'none' : '0 0 0 4px rgba(255, 255, 255, 0.05)';
          }}
          onBlur={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.03)';
            e.target.style.borderColor = error ? 'var(--error)' : 'var(--glass-border)';
            e.target.style.boxShadow = 'none';
          }}
        />
      ))}
    </div>
  );
};

export default OtpInput;
