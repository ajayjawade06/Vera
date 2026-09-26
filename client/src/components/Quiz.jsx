import React, { useState } from 'react';
import { motion } from 'framer-motion';

const questions = [
  { q: "What is the most important foundation of a lasting, deeply romantic relationship?", options: ["Expensive gifts", "Mutual trust and respect", "Physical appearance", "Matching hobbies"], a: 1 },
  { q: "When you truly love someone, how do you feel when they experience pure joy?", options: ["Jealous of them", "Indifferent", "Genuinely happy for them", "Anxious"], a: 2 },
  { q: "Which of the following is considered one of the most intimate, timeless ways to express deep feelings?", options: ["A quick text", "A handwritten love letter", "An email", "A social media post"], a: 1 },
  { q: "What does it truly mean when someone says you are their 'soulmate'?", options: ["You are their only friend", "You share a profound, natural affinity", "You look identical", "You never argue"], a: 1 },
  { q: "True, profound love is most often described as being which of the following?", options: ["Conditional", "Temporary", "Unconditional", "Fleeting"], a: 2 },
  { q: "What is the term for the fluttery, nervous feeling you get in your stomach when you look at someone you love?", options: ["Butterflies", "Spiders", "Chills", "Heartburn"], a: 0 },
  { q: "In a deeply loving relationship, what is the best way to handle a disagreement?", options: ["Giving the silent treatment", "Open and vulnerable communication", "Raising your voice", "Keeping score of past mistakes"], a: 1 },
  { q: "Which simple act of physical touch is scientifically proven to release the 'bonding hormone' (oxytocin)?", options: ["A 20-second hug", "A high five", "A firm handshake", "A quick pat on the back"], a: 0 },
  { q: "What is often considered the absolute most precious gift you can give to your partner?", options: ["Expensive jewelry", "Your undivided time and attention", "Designer clothes", "A luxury vacation"], a: 1 },
  { q: "When you are completely in love, what typically happens to your perception of your partner's flaws?", options: ["They become unbearable", "You accept and embrace them as part of who they are", "You constantly try to fix them", "You ignore them completely"], a: 1 },
  { q: "What is the deeply romantic concept that two people were destined to find each other by fate?", options: ["Coincidence", "Serendipity", "Being 'Meant to be'", "Blind luck"], a: 2 },
  { q: "Looking deeply into your partner's eyes for a prolonged period is known to create what?", options: ["Awkwardness", "An intense emotional and soulful connection", "Sleepiness", "Confusion"], a: 1 },
  { q: "A small, unexpected romantic gesture—like leaving a sweet note—is a powerful sign of what?", options: ["Guilt", "Boredom", "Deep thoughtfulness and caring", "Obligation"], a: 2 },
  { q: "What does true emotional intimacy absolutely require from both partners?", options: ["Keeping secrets to protect each other", "Complete vulnerability and openness", "Always agreeing on everything", "Hiding your true feelings"], a: 1 },
  { q: "Ultimately, what is the most beautiful realization when you find true, authentic love?", options: ["That you never have to be alone again", "That you can change them to be perfect", "That you are loved exactly as you are", "That you will never have problems again"], a: 2 }
];

const Quiz = ({ onBack }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (idx) => {
    if (idx === questions[currentQ].a) {
      setScore(s => s + 1);
    }
    if (currentQ + 1 < questions.length) {
      setCurrentQ(c => c + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="glass-panel" style={{ padding: '32px', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '24px' }}>&larr; Back to Dashboard</button>
      
      {showResult ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '16px', background: 'var(--accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Quiz Completed!</h2>
          <p style={{ fontSize: '24px', marginBottom: '32px' }}>You scored {score} out of {questions.length}</p>
          <button onClick={resetQuiz} className="btn-primary" style={{ width: '200px', margin: '0 auto' }}>Play Again</button>
        </div>
      ) : (
        <div>
          <h2 style={{ fontSize: '16px', marginBottom: '12px', color: 'var(--text-secondary)' }}>Question {currentQ + 1} of {questions.length}</h2>
          <h3 style={{ fontSize: '28px', marginBottom: '32px', lineHeight: 1.3 }}>{questions[currentQ].q}</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {questions[currentQ].options.map((opt, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(i)}
                style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '16px', color: '#fff', textAlign: 'left', cursor: 'pointer', fontSize: '18px', transition: 'background 0.2s' }}
              >
                {opt}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
