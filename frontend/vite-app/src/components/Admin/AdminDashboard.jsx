import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import UserManagement from './UserManagement';
import EmployeeManagement from './EmployeeManagement';
import ServiceManagement from './ServiceManagement';
import ScheduleManagement from './ScheduleManagement';
import SubcategoryManagement from './SubcategoryManagement';
import ActivityLogs from './ActivityLogs';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    const usuario = localStorage.getItem('usuarioLogado');
    if (!usuario) {
      navigate('/');
    }
  }, [navigate]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const renderDashboardOverview = () => (
    <div className="dashboard-overview">
      <h1>Dashboard - Visão Geral</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Usuários</h3>
            <p>Gerencie clientes cadastrados</p>
            <button 
              className="btn btn-primary" 
              onClick={() => setActiveSection('users')}
            >
              Ver Usuários
            </button>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👨‍💼</div>
          <div className="stat-content">
            <h3>Funcionários</h3>
            <p>Gerencie profissionais do salão</p>
            <button 
              className="btn btn-primary" 
              onClick={() => setActiveSection('employees')}
            >
              Ver Funcionários
            </button>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✂️</div>
          <div className="stat-content">
            <h3>Serviços</h3>
            <p>Gerencie serviços oferecidos</p>
            <button 
              className="btn btn-primary" 
              onClick={() => setActiveSection('services')}
            >
              Ver Serviços
            </button>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>Agendamentos</h3>
            <p>Gerencie horários e agendas</p>
            <button 
              className="btn btn-primary" 
              onClick={() => setActiveSection('schedules')}
            >
              Ver Agendamentos
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboardOverview();
      case 'users':
        return <UserManagement />;
      case 'employees':
        return <EmployeeManagement />;
      case 'services':
        return <ServiceManagement />;
      case 'schedules':
        return <ScheduleManagement />;
      case 'subcategories':
        return <SubcategoryManagement />;
      case 'logs':
        return <ActivityLogs />;
      default:
        return renderDashboardOverview();
    }
  };

  return (
    <div className="admin-container">
      <AdminHeader 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange} 
      />
      
      <main className="admin-main-content">
        {renderActiveSection()}
      </main>
    </div>
  );
};

export default AdminDashboard;
