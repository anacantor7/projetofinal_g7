import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    navigate('/');
  };

  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

  return (
    <div className="admin-header">
      <div className="user-info">
        <div>👤 {usuarioLogado?.nombre || 'Administrador'}</div>
        <div className="user-role">Administrador</div>
      </div>
      <button onClick={handleLogout} className="logout-btn">🚪 Sair</button>
    </div>
  );
};

export default AdminHeader;
