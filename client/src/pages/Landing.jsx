import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Mail, Phone, ArrowLeft, Loader2, Heart, Sparkles, Shield, Zap, Star, Users, ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import OtpInput from '../components/OtpInput';
import SuccessModal from '../components/SuccessModal';

/* ─── HERO LANDING (shown first) ─── */
const HeroLanding = ({ onGetStarted }) => {
  const stats = [
    { num: '10K+', label: 'Couples Joined' },
    { num: '50K+', label: 'Love Letters Sent' },
    { num: '99%', label: 'Happiness Rate' },
  ];

  const featureCards = [
    { icon: <Heart size={20} />, title: 'Love Quiz', desc: 'Test your romantic knowledge with 15 heartfelt questions', color: '#f43f5e' },
    { icon: <Sparkles size={20} />, title: 'Cosmic Match', desc: 'Discover your zodiac compatibility with your partner', color: '#8b5cf6' },
    { icon: <Star size={20} />, title: 'Date Ideas', desc: 'Never run out of creative and fun date night plans', color: '#f59e0b' },
    { icon: <Shield size={20} />, title: 'Love Letters', desc: 'Write and send secret heartfelt notes to your love', color: '#10b981' },
  ];

  return (
    <motion.div
      key="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {/* ─ NAV ─ */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '24px 60px', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        backdropFilter: 'blur(12px)', background: 'rgba(15,23,42,0.6)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
            <Heart size={24} fill="#f43f5e" color="#f43f5e" />
          </motion.div>
          <span style={{ fontSize: '20px', fontWeight: 800, background: 'var(--accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>VÉRA</span>
        </div>
        <div className="nav-container" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <span className="nav-link" style={{ color: 'var(--text-secondary)', fontSize: '14px', cursor: 'pointer' }}>Features</span>
          <span className="nav-link" style={{ color: 'var(--text-secondary)', fontSize: '14px', cursor: 'pointer' }}>About</span>
          <motion.button
            onClick={onGetStarted}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff', padding: '10px 24px', borderRadius: '10px', cursor: 'pointer',
              fontSize: '14px', fontWeight: 600, transition: 'all 0.2s',
            }}
          >
            Sign In
          </motion.button>
        </div>
      </nav>

      {/* ─ HERO SECTION ─ */}
      <section className="hero-section" style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center', padding: '140px 40px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Ambient blobs */}
        <div style={{ position: 'absolute', top: '10%', left: '15%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(244,63,94,0.12) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '15%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', top: '40%', right: '30%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(40px)' }} />

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.15)',
            borderRadius: '50px', padding: '8px 20px', marginBottom: '32px',
          }}
        >
          <Sparkles size={14} color="#f43f5e" />
          <span style={{ fontSize: '13px', color: '#f43f5e', fontWeight: 500 }}>Built for love, designed for two</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 900, lineHeight: 1.0,
            letterSpacing: '-3px', marginBottom: '28px', maxWidth: '800px',
          }}
        >
          Your love story,{' '}
          <span style={{ background: 'var(--accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            one app.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ fontSize: '20px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '560px', marginBottom: '48px' }}
        >
          Quizzes, games, secret love letters, milestone countdowns, and cosmic compatibility — all in one beautifully private space.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ display: 'flex', gap: '16px', marginBottom: '80px' }}
        >
          <motion.button
            onClick={onGetStarted}
            whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(244,63,94,0.25)' }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary"
            style={{ padding: '16px 40px', fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            Get Started <ArrowRight size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03, background: 'rgba(255,255,255,0.08)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '16px 32px', fontSize: '16px', fontWeight: 600,
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px', color: '#fff', cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ display: 'flex', gap: '48px' }}
        >
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, background: 'var(--accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.num}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ─ FEATURES SECTION ─ */}
      <section className="features-section" style={{ padding: '80px 60px 100px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h2 style={{ fontSize: '40px', fontWeight: 800, marginBottom: '16px', letterSpacing: '-1px' }}>
            Everything you need,{' '}
            <span style={{ background: 'var(--accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>nothing you don't.</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '17px', maxWidth: '500px', margin: '0 auto' }}>
            Built with intention. Every feature is crafted to bring you closer together.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {featureCards.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, borderColor: `${f.color}40` }}
              style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '20px', padding: '32px', transition: 'all 0.3s ease',
              }}
            >
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: `${f.color}15`, border: `1px solid ${f.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: f.color, marginBottom: '20px',
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─ BOTTOM CTA STRIP ─ */}
      <section className="cta-section" style={{
        padding: '60px', textAlign: 'center',
        background: 'linear-gradient(180deg, transparent 0%, rgba(244,63,94,0.04) 100%)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}>
        <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '16px' }}>Ready to begin?</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '16px' }}>Join thousands of couples who made their love smarter.</p>
        <motion.button
          onClick={onGetStarted}
          whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(244,63,94,0.25)' }}
          whileTap={{ scale: 0.97 }}
          className="btn-primary"
          style={{ padding: '16px 48px', fontSize: '16px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '10px' }}
        >
          Get Started Free <ArrowRight size={18} />
        </motion.button>
      </section>
    </motion.div>
  );
};

/* ─── AUTH SCREEN (shown after "Get Started") ─── */
const AuthScreen = ({ onBack }) => {
  const [step, setStep] = useState('options');
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [instaId, setInstaId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const { api, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (countdown > 0) timer = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const changeStep = (newStep, dir = 1) => { setError(''); setDirection(dir); setStep(newStep); };

  const handleInstaRequestOtp = async (e) => {
    e.preventDefault();
    if (!instaId || !email || !phone || !password) { setError('All fields are required'); return; }
    setLoading(true); setError('');
    try {
      await api.post('/auth/instagram/request-otp', { instagramId: instaId, password, email, phone });
      setCountdown(300); changeStep('insta_verify', 1);
    } catch (err) { setError(err.response?.data?.message || 'Failed to send OTP'); }
    finally { setLoading(false); }
  };

  const handleInstaVerifyOtp = async (otpValue) => {
    setLoading(true); setError('');
    try {
      const res = await api.post('/auth/instagram/verify-otp', { instagramId: instaId, password, email, phone, otp: otpValue });
      login(res.data.user); setShowSuccess(true);
    } catch (err) { setError(err.response?.data?.message || "That code doesn't look right."); }
    finally { setLoading(false); }
  };

  const handleEmailRequestOtp = async (e) => {
    e.preventDefault();
    if (!email || !phone) { setError('Email and phone number are required'); return; }
    setLoading(true); setError('');
    try {
      await api.post('/auth/email/request-otp', { email, phone });
      setCountdown(300); changeStep('email_verify', 1);
    } catch (err) { setError(err.response?.data?.message || 'Failed to send OTP'); }
    finally { setLoading(false); }
  };

  const handleEmailVerifyOtp = async (otpValue) => {
    setLoading(true); setError('');
    try {
      const res = await api.post('/auth/email/verify-otp', { email, phone, otp: otpValue });
      login(res.data.user); setShowSuccess(true);
    } catch (err) { setError(err.response?.data?.message || "That code doesn't look right."); }
    finally { setLoading(false); }
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${s % 60 < 10 ? '0' : ''}${s % 60}`;

  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (d) => ({ zIndex: 0, x: d < 0 ? 60 : -60, opacity: 0 }),
  };

  return (
    <motion.div
      key="auth"
      initial={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: '100vh', display: 'flex', overflow: 'hidden' }}
    >
      <SuccessModal isOpen={showSuccess} onContinue={() => navigate('/dashboard')} />

      {/* ── LEFT BRANDING ── */}
      <div className="auth-left-panel" style={{
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '80px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-20%', left: '-20%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(244,63,94,0.12) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(30px)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(30px)' }} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '64px' }}>
            <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
              <Heart size={26} fill="#f43f5e" color="#f43f5e" />
            </motion.div>
            <span style={{ fontSize: '20px', fontWeight: 800, background: 'var(--accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>VÉRA</span>
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 4vw, 60px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-2px', marginBottom: '24px' }}>
            Welcome to<br />
            your private<br />
            <span style={{ background: 'var(--accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>love space.</span>
          </h1>
          <p style={{ fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '380px' }}>
            Sign in to access your quizzes, games, letters, and everything that makes your relationship fun.
          </p>
        </motion.div>
      </div>

      {/* ── RIGHT AUTH PANEL ── */}
      <div className="auth-right-panel" style={{
        width: '500px', flexShrink: 0, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '60px 52px',
        borderLeft: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(255,255,255,0.015)', position: 'relative',
      }}>
        {/* Top back button */}
        <button
          onClick={step === 'options' ? onBack : () => changeStep('options', -1)}
          style={{
            position: 'absolute', top: '32px', left: '52px', background: 'none', border: 'none',
            color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center',
            gap: '8px', fontSize: '14px', transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <ArrowLeft size={16} /> {step === 'options' ? 'Home' : 'Back'}
        </button>

        <AnimatePresence initial={false} custom={direction} mode="wait">

          {step === 'options' && (
            <motion.div key="options" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>Welcome</p>
              <h2 style={{ fontSize: '30px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.5px' }}>Sign in to VÉRA</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '15px' }}>Choose your preferred sign-in method.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <AuthMethodCard icon={<Camera size={20} />} title="Instagram ID" sub="Sign in with your Instagram credentials" onClick={() => changeStep('insta_login', 1)} accent="#e1306c" />
                <AuthMethodCard icon={<Mail size={20} />} title="Email & Phone" sub="Verify with a secure one-time code" onClick={() => changeStep('email_login', 1)} accent="#8b5cf6" />
              </div>

              <p style={{ textAlign: 'center', marginTop: '48px', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                By continuing, you agree to keep this space<br />private and personal. 💌
              </p>
            </motion.div>
          )}

          {step === 'insta_login' && (
            <motion.div key="insta_login" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #f43f5e, #e1306c)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Camera size={22} color="#fff" />
              </div>
              <h2 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '8px' }}>Instagram Sign In</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '14px' }}>Enter your details to connect.</p>
              <form onSubmit={handleInstaRequestOtp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <FormInput type="text" placeholder="Instagram ID (@username)" value={instaId} onChange={e => setInstaId(e.target.value)} />
                <FormInput type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <FormInput type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
                <FormInput type="tel" placeholder="Phone number" value={phone} onChange={e => setPhone(e.target.value)} />
                {error && <ErrorMsg>{error}</ErrorMsg>}
                <SubmitBtn loading={loading}>Send Verification Code →</SubmitBtn>
              </form>
            </motion.div>
          )}

          {step === 'insta_verify' && (
            <OtpStep email={email} error={error} countdown={countdown} loading={loading} formatTime={formatTime} onComplete={handleInstaVerifyOtp} onResend={handleInstaRequestOtp} />
          )}

          {step === 'email_login' && (
            <motion.div key="email_login" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Mail size={22} color="#fff" />
              </div>
              <h2 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '8px' }}>Email & Phone</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '14px' }}>We'll send a verification code to your email.</p>
              <form onSubmit={handleEmailRequestOtp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <FormInput type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ width: '68px', flexShrink: 0, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600 }}>+91</div>
                  <FormInput type="tel" placeholder="Phone number" value={phone} onChange={e => setPhone(e.target.value)} style={{ flex: 1 }} />
                </div>
                {error && <ErrorMsg>{error}</ErrorMsg>}
                <SubmitBtn loading={loading}>Send Verification Code →</SubmitBtn>
              </form>
            </motion.div>
          )}

          {step === 'email_verify' && (
            <OtpStep email={email} error={error} countdown={countdown} loading={loading} formatTime={formatTime} onComplete={handleEmailVerifyOtp} onResend={handleEmailRequestOtp} />
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* ─── MAIN LANDING WRAPPER ─── */
const Landing = () => {
  const [showAuth, setShowAuth] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  return (
    <>
      <AnimatePresence mode="wait">
        {!showAuth ? (
          <HeroLanding key="hero" onGetStarted={() => setShowAuth(true)} />
        ) : (
          <AuthScreen key="auth" onBack={() => setShowAuth(false)} />
        )}
      </AnimatePresence>

      <style>{`
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        @media (max-width: 768px) {
          nav { padding: 16px 20px !important; }
          .nav-link { display: none !important; }
          .hero-section { padding: 100px 20px 60px !important; }
          .hero-stats { flex-direction: column; gap: 24px !important; }
          .features-section { padding: 60px 20px !important; }
          .cta-section { padding: 40px 20px !important; }
          
          .auth-left-panel { display: none !important; }
          .auth-right-panel { 
            width: 100% !important; 
            padding: 80px 24px 40px !important; 
            border-left: none !important;
          }
        }
      `}</style>
    </>
  );
};

/* ─── SHARED COMPONENTS ─── */
const FormInput = ({ style = {}, ...props }) => (
  <input {...props} className="input-field" style={{ height: '50px', fontSize: '15px', borderRadius: '12px', width: '100%', ...style }} />
);

const ErrorMsg = ({ children }) => (
  <p style={{ color: 'var(--error)', fontSize: '13px', padding: '10px 14px', background: 'rgba(244,63,94,0.06)', borderRadius: '10px', border: '1px solid rgba(244,63,94,0.1)' }}>{children}</p>
);

const SubmitBtn = ({ loading, children }) => (
  <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '8px', height: '52px', fontSize: '15px', fontWeight: 600 }}>
    {loading ? <Loader2 className="animate-spin" /> : children}
  </button>
);

const OtpStep = ({ email, error, countdown, loading, formatTime, onComplete, onResend }) => (
  <motion.div key="otp" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
    <div style={{ fontSize: '48px', marginBottom: '20px' }}>📬</div>
    <h2 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '8px' }}>Check your inbox</h2>
    <p style={{ color: 'var(--text-secondary)', marginBottom: '6px', fontSize: '14px' }}>We sent a 6-digit code to</p>
    <p style={{ color: '#fff', fontWeight: 600, marginBottom: '36px', fontSize: '15px' }}>{email}</p>
    <OtpInput length={6} onComplete={onComplete} error={!!error} />
    {error && <p style={{ color: 'var(--error)', fontSize: '13px', textAlign: 'center', marginTop: '16px' }}>{error}</p>}
    <div style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-secondary)', fontSize: '14px' }}>
      {countdown > 0
        ? <p>Code expires in <strong style={{ color: '#fff' }}>{formatTime(countdown)}</strong></p>
        : <p>Code expired. <button style={{ background: 'none', border: 'none', color: '#f43f5e', cursor: 'pointer', fontWeight: 600 }} onClick={onResend}>Resend</button></p>
      }
    </div>
    {loading && <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}><Loader2 className="animate-spin" /></div>}
  </motion.div>
);

const AuthMethodCard = ({ icon, title, sub, onClick, accent }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ x: 4, backgroundColor: `${accent}10`, borderColor: `${accent}40` }}
    whileTap={{ scale: 0.98 }}
    style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: '16px',
      padding: '18px 20px', background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px',
      color: '#fff', cursor: 'pointer', textAlign: 'left', transition: 'all 0.25s ease',
    }}
  >
    <div style={{ width: '42px', height: '42px', borderRadius: '11px', background: `${accent}18`, border: `1px solid ${accent}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent, flexShrink: 0 }}>
      {icon}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '2px' }}>{title}</div>
      <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{sub}</div>
    </div>
    <ChevronRight size={16} color="var(--text-secondary)" />
  </motion.button>
);

export default Landing;
