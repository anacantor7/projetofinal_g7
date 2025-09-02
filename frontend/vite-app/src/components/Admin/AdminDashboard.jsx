import React, { useEffect } from 'react';
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

  useEffect(() => {
    const usuario = localStorage.getItem('usuarioLogado');
    if (!usuario) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="admin-container">
      <AdminHeader />

      <h1>Panel de Administração</h1>

      <UserManagement />
      <EmployeeManagement />
      <ServiceManagement />
      <ScheduleManagement />
      <SubcategoryManagement />
      <ActivityLogs />
    </div>
  );
};

export default AdminDashboard;
