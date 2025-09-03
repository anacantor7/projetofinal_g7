import { useState, useEffect } from 'react';

export const useEmployees = () => {
  const [profissionais, setProfissionais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/profissionais');
      if (!response.ok) throw new Error('Error al cargar empleados');
      const data = await response.json();
      setProfissionais(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async (employeeData) => {
    try {
      const response = await fetch('http://localhost:3000/profissionais', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData)
      });
      if (!response.ok) throw new Error('Error al agregar empleado');
      await fetchEmployees();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateEmployee = async (id, employeeData) => {
    try {
      const response = await fetch(`http://localhost:3000/profissionais/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData)
      });
      if (!response.ok) throw new Error('Error al actualizar empleado');
      await fetchEmployees();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/profissionais/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Error al eliminar empleado');
      await fetchEmployees();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    profissionais,
    loading,
    error,
    fetchEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
  };
};
