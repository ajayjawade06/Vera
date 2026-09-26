import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const SuccessModal = ({ isOpen, onContinue }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="glass-panel"
            style={{
              padding: '40px',
              textAlign: 'center',
              width: '100%',
              maxWidth: '420px',
              margin: '20px'
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ delay: 0.2, type: 'spring' }}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 0 20px rgba(82, 196, 26, 0.4)'
              }}
            >
              <Check size={32} color="#fff" />
            </motion.div>
            
            <h2 style={{ marginBottom: '8px', fontSize: '24px' }}>You're in ✨</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>Welcome back.</p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '14px' }}>Your account has been successfully verified.</p>
            
            <button className="btn-primary" onClick={onContinue}>
              Continue
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
