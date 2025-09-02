import { useState, useEffect } from 'react';

export const useSchedules = () => {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/horarios');
      if (!response.ok) throw new Error('Error al cargar horarios');
      const data = await response.json();
      setHorarios(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addSchedule = async (scheduleData) => {
    try {
      const response = await fetch('http://localhost:3000/horarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scheduleData)
      });
      if (!response.ok) throw new Error('Error al agregar horario');
      await fetchSchedules();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteSchedule = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/horarios/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Error al eliminar horario');
      await fetchSchedules();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return {
    horarios,
    loading,
    error,
    fetchSchedules,
    addSchedule,
    deleteSchedule
  };
};
