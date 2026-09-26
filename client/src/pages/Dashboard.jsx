import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Shield, User as UserIcon, Calendar, Activity, Gamepad2, Brain } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import RockPaperScissors from '../components/RockPaperScissors';
import Quiz from '../components/Quiz';
import DateNight from '../components/DateNight';
import LoveLetter from '../components/LoveLetter';
import Countdown from '../components/Countdown';
import Horoscope from '../components/Horoscope';
import MoodCheck from '../components/MoodCheck';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [activity, setActivity] = useState(null);

  const getIdentifier = () => {
    if (user?.instagramId) return `@${user.instagramId}`;
    if (user?.email) return user.email;
    if (user?.phoneNumber) return user.phoneNumber;
    return 'User';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px' }}>
      <header style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, background: 'var(--accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>VÉRA</h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div className="nav-links" style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)' }}>
            <span style={{ cursor: 'pointer', color: '#fff' }}>Home</span>
            <span style={{ cursor: 'pointer' }}>Profile</span>
            <span style={{ cursor: 'pointer' }}>Security</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '30px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <UserIcon size={16} />
            </div>
            <span style={{ fontSize: '14px', fontWeight: 500 }}>{getIdentifier()}</span>
            <button onClick={logout} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', marginLeft: '8px' }}>
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '40px' }}>
          <h2 className="dashboard-title" style={{ fontSize: '48px', fontWeight: 700, marginBottom: '16px', lineHeight: 1.2 }}>
            {activity === 'game' ? 'Rock Paper Scissors' : 
             activity === 'quiz' ? 'Quick Quiz' : 
             activity === 'datenight' ? 'Date Ideas' : 
             activity === 'loveletter' ? 'Secret Love Letter' : 
             activity === 'countdown' ? 'Milestone' : 
             activity === 'horoscope' ? 'Compatibility' : 
             activity === 'moodcheck' ? 'Vibe Check' : 
             'Welcome back,'} <br/>
            {!activity && <span style={{ background: 'var(--accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{getIdentifier()}</span>}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>
            {activity ? 'Have fun!' : 'Everything is ready. Pick an activity below.'}
          </p>
        </motion.div>

        {activity === 'game' && <RockPaperScissors onBack={() => setActivity(null)} />}
        {activity === 'quiz' && <Quiz onBack={() => setActivity(null)} />}
        {activity === 'datenight' && <DateNight onBack={() => setActivity(null)} />}
        {activity === 'loveletter' && <LoveLetter onBack={() => setActivity(null)} />}
        {activity === 'countdown' && <Countdown onBack={() => setActivity(null)} />}
        {activity === 'horoscope' && <Horoscope onBack={() => setActivity(null)} />}
        {activity === 'moodcheck' && <MoodCheck onBack={() => setActivity(null)} />}
        
        {!activity && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}
          >
          <div onClick={() => setActivity('game')} style={{ cursor: 'pointer', height: '100%' }}>
            <DashboardCard 
              icon={<Gamepad2 size={24} color="#f43f5e" />} 
              title="Activity" 
              value="Play a Game"
              status="Rock Paper Scissors"
            />
          </div>
          <div onClick={() => setActivity('quiz')} style={{ cursor: 'pointer', height: '100%' }}>
            <DashboardCard 
              icon={<Brain size={24} color="#8b5cf6" />} 
              title="Activity" 
              value="Take a Quiz"
              status="Test your knowledge"
            />
          </div>
          <div onClick={() => setActivity('datenight')} style={{ cursor: 'pointer', height: '100%' }}>
            <DashboardCard icon={<span style={{fontSize: '24px'}}>🎲</span>} title="Activity" value="Date Night" status="Generate ideas" />
          </div>
          <div onClick={() => setActivity('loveletter')} style={{ cursor: 'pointer', height: '100%' }}>
            <DashboardCard icon={<span style={{fontSize: '24px'}}>💌</span>} title="Feature" value="Love Letter" status="Send a sweet note" />
          </div>
          <div onClick={() => setActivity('countdown')} style={{ cursor: 'pointer', height: '100%' }}>
            <DashboardCard icon={<span style={{fontSize: '24px'}}>⏳</span>} title="Tracker" value="Countdown" status="Track milestones" />
          </div>
          <div onClick={() => setActivity('horoscope')} style={{ cursor: 'pointer', height: '100%' }}>
            <DashboardCard icon={<span style={{fontSize: '24px'}}>✨</span>} title="Fun" value="Horoscope" status="Cosmic match" />
          </div>
          <div onClick={() => setActivity('moodcheck')} style={{ cursor: 'pointer', height: '100%' }}>
            <DashboardCard icon={<span style={{fontSize: '24px'}}>🌈</span>} title="Check-in" value="Mood Check" status="Log your vibe" />
          </div>
          <DashboardCard 
            icon={<Shield size={24} color="#10b981" />} 
            title="Authentication Method" 
            value={user?.authMethod === 'instagram' ? 'Instagram ID' : user?.authMethod === 'email' ? 'Email Address' : 'Phone Number'}
            status="Secured"
          />
        </motion.div>
        )}
      </main>
      
      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .dashboard-title { font-size: 32px !important; }
        }
      `}</style>
    </div>
  );
};

const DashboardCard = ({ icon, title, value, status }) => {
  return (
    <motion.div 
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 40px -10px rgba(244, 63, 94, 0.15)', borderColor: 'rgba(244, 63, 94, 0.3)' }}
      className="glass-panel"
      style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%', transition: 'border-color 0.3s ease' }}
    >
      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
        {icon}
      </div>
      <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>{title}</div>
      <div style={{ fontSize: '20px', fontWeight: 500, marginBottom: '24px' }}>{value}</div>
      
      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success)' }}></div>
        {status}
      </div>
    </motion.div>
  );
};

export default Dashboard;
