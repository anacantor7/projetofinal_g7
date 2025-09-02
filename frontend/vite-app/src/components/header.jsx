import logo from '../assets/FUCSIA.png';
import React from 'react';


const Header = () => {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      padding: '32px 0 28px 0',
      justifyContent: 'center',
      background: 'linear-gradient(90deg, #fff 60%, #fce4ec 100%)',
      boxShadow: '0 2px 16px 0 #f8bbd0',
      borderBottomLeftRadius: '18px',
      borderBottomRightRadius: '18px',
      position: 'relative',
      zIndex: 10
    }}>
      <img
        src={logo}
        alt="Logo Bellizy"
        style={{
          height: '80px',
          width: '80px',
          objectFit: 'contain',
          borderRadius: '50%',
          border: '3px solid #C8377C',
          boxShadow: '0 4px 12px rgba(200, 55, 124, 0.3)',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'rotate(-10deg) scale(1.08)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(200, 55, 124, 0.4)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(200, 55, 124, 0.3)';
        }}
        onClick={() => window.location.href = '/'}
      />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <h1 style={{ color: '#C8377C', fontWeight: 'bold', fontSize: '2.5rem', margin: 0, letterSpacing: '2px' }}>BELLIZY</h1>
        <span style={{ color: '#C8377C', fontSize: '1.1rem', fontWeight: 400, marginTop: '-4px', opacity: 0.8 }}>
          Beleza ao seu alcance
        </span>
      </div>
    </header>
  );
};

export default Header;
