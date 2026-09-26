import React from 'react';

const AnimatedBackground = () => {
  return (
    <>
      <div className="bg-container">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-orb orb-3"></div>
      </div>
      <div className="grain-overlay"></div>
    </>
  );
};

export default AnimatedBackground;
