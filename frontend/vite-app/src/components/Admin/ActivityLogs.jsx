import React from 'react';
import { useLogs } from '../../hooks/useLogs';

const ActivityLogs = () => {
  const { logs, loading, error } = useLogs();

  if (loading) return <div>Cargando logs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="activity-logs">
      <h2>Logs de Ações</h2>
      <table style={{
        width: '100%',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px #0001',
        borderCollapse: 'collapse'
      }}>
        <thead>
          <tr style={{ background: '#ffd1dc', color: '#C8377C' }}>
            <th style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Usuário</th>
            <th style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Ação</th>
            <th style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Data/Hora</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center', color: '#888' }}>
                Nenhum log encontrado.
              </td>
            </tr>
          ) : (
            logs.map(log => (
              <tr key={log.id}>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{log.usuario}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{log.acao}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                  {log.dataHora || log.data_hora}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityLogs;
