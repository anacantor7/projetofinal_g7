import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({ activeSection, onSectionChange }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    navigate('/');
  };

  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'users', label: 'Usuários', icon: '👥' },
    { id: 'employees', label: 'Funcionários', icon: '👨‍💼' },
    { id: 'services', label: 'Serviços', icon: '✂️' },
    { id: 'schedules', label: 'Agendamentos', icon: '📅' },
    { id: 'subcategories', label: 'Subcategorias', icon: '🏷️' },
    { id: 'logs', label: 'Logs', icon: '📋' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="admin-navbar">
        <div className="admin-navbar-container">
          {/* Logo/Brand */}
          <div className="admin-brand">
            <span className="admin-logo">💼</span>
            <h2>Admin Panel</h2>
          </div>

          {/* Desktop Navigation */}
          <div className="admin-nav-menu">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`admin-nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => onSectionChange(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            ))}
          </div>

          {/* User Info & Controls */}
          <div className="admin-user-controls">
            <div className="admin-user-info">
              <span className="user-avatar">👤</span>
              <div className="user-details">
                <div className="user-name">{usuarioLogado?.nome || 'Administrador'}</div>
                <div className="user-role">Administrador</div>
              </div>
            </div>
            <button onClick={handleLogout} className="admin-logout-btn">
              <span>🚪</span>
              Sair
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`admin-mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`admin-mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`admin-mobile-nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => {
                onSectionChange(item.id);
                setIsMobileMenuOpen(false);
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
          <div className="mobile-user-section">
            <div className="mobile-user-info">
              <span className="user-avatar">👤</span>
              <div>
                <div className="user-name">{usuarioLogado?.nome || 'Administrador'}</div>
                <div className="user-role">Administrador</div>
              </div>
            </div>
            <button onClick={handleLogout} className="mobile-logout-btn">
              <span>🚪</span>
              Sair
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="admin-mobile-overlay" 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default AdminHeader;
