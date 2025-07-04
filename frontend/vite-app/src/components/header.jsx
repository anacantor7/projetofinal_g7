import React from "react";
import logo from '../assets/FUCSIA.png';

const Header = () => {
  return (
    <header style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', justifyContent: 'center', background: '#fff' }}>
      <img src={logo} alt="Logo Bellizy" style={{ height: '38px', width: '38px', objectFit: 'contain' }} />
      <h1 style={{ color: '#C8377C', fontWeight: 'bold', fontSize: '1.5rem', margin: 0 }}>BELLIZY</h1>
    </header>
  );
};

export default Header;
