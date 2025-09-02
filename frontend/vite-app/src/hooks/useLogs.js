import { useState, useEffect } from 'react';

export const useLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/log-acao');
      if (!response.ok) throw new Error('Error al cargar logs');
      const data = await response.json();
      setLogs(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return {
    logs,
    loading,
    error,
    fetchLogs
  };
};
