import React, { useState } from 'react';
import { useEmployees } from '../../hooks/useEmployees';

const EmployeeManagement = () => {
  const { profissionais, loading, error, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const [novoEmpregado, setNovoEmpregado] = useState({ nome: '', telefone: '', especialidade: '', ativo: true });
  const [editandoEmpregado, setEditandoEmpregado] = useState(null);
  const [showAddEmpregado, setShowAddEmpregado] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const handleAddEmpregado = async (e) => {
    e.preventDefault();
    const result = await addEmployee(novoEmpregado);
    if (result.success) {
      setFeedback({ message: 'Empleado agregado correctamente', type: 'success' });
      setNovoEmpregado({ nome: '', telefone: '', especialidade: '', ativo: true });
      setShowAddEmpregado(false);
    } else {
      setFeedback({ message: result.error || 'Error al agregar empleado', type: 'error' });
    }
  };

  const handleEditEmpregado = (emp) => {
    setEditandoEmpregado(emp.id);
    setNovoEmpregado({
      nome: emp.nome,
      telefone: emp.telefone,
      especialidade: emp.especialidade,
      ativo: emp.ativo
    });
  };

  const handleUpdateEmpregado = async (e) => {
    e.preventDefault();
    const result = await updateEmployee(editandoEmpregado, novoEmpregado);
    if (result.success) {
      setFeedback({ message: 'Empleado actualizado correctamente', type: 'success' });
      setEditandoEmpregado(null);
      setNovoEmpregado({ nome: '', telefone: '', especialidade: '', ativo: true });
    } else {
      setFeedback({ message: result.error || 'Error al actualizar empleado', type: 'error' });
    }
  };

  const handleCancelEditEmpregado = () => {
    setEditandoEmpregado(null);
    setNovoEmpregado({ nome: '', telefone: '', especialidade: '', ativo: true });
  };

  const handleDeleteEmpregado = async (id) => {
    if (window.confirm('¿Desea eliminar este empleado?')) {
      const result = await deleteEmployee(id);
      if (result.success) {
        setFeedback({ message: 'Empleado eliminado correctamente', type: 'success' });
      } else {
        setFeedback({ message: result.error || 'Error al eliminar empleado', type: 'error' });
      }
    }
  };

  if (loading) return <div>Cargando empleados...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="employee-management">
      <h2>Funcionários</h2>

      {feedback.message && (
        <div className={`alert ${feedback.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
          {feedback.message}
        </div>
      )}

      <button
        className="btn btn-success"
        onClick={() => setShowAddEmpregado(!showAddEmpregado)}
      >
        {showAddEmpregado ? 'Cancelar' : 'Adicionar Funcionário'}
      </button>

      {showAddEmpregado && (
        <form onSubmit={handleAddEmpregado} className="admin-form" style={{ marginBottom: 18 }}>
          <input
            type="text"
            placeholder="Nome"
            value={novoEmpregado.nome}
            onChange={e => setNovoEmpregado({ ...novoEmpregado, nome: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Telefone"
            value={novoEmpregado.telefone}
            onChange={e => setNovoEmpregado({ ...novoEmpregado, telefone: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Especialidade"
            value={novoEmpregado.especialidade}
            onChange={e => setNovoEmpregado({ ...novoEmpregado, especialidade: e.target.value })}
            required
          />
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0' }}>
            <input
              type="checkbox"
              checked={novoEmpregado.ativo}
              onChange={e => setNovoEmpregado({ ...novoEmpregado, ativo: e.target.checked })}
            />
            Ativo
          </label>
          <button type="submit" className="btn btn-primary">Salvar Funcionário</button>
        </form>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Especialidade</th>
            <th>Ativo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {profissionais.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.nome?.charAt(0).toUpperCase() + emp.nome?.slice(1).toLowerCase()}</td>
              <td>{emp.telefone}</td>
              <td>{emp.especialidade}</td>
              <td>{emp.ativo ? 'Sim' : 'Não'}</td>
              <td>
                <button onClick={() => handleEditEmpregado(emp)} className="btn btn-primary btn-sm">
                  Editar
                </button>
                <button onClick={() => handleDeleteEmpregado(emp.id)} className="btn btn-danger btn-sm">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editandoEmpregado && (
        <form onSubmit={handleUpdateEmpregado} className="admin-form">
          <input
            type="text"
            placeholder="Nome"
            value={novoEmpregado.nome}
            onChange={e => setNovoEmpregado({ ...novoEmpregado, nome: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Telefone"
            value={novoEmpregado.telefone}
            onChange={e => setNovoEmpregado({ ...novoEmpregado, telefone: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Especialidade"
            value={novoEmpregado.especialidade}
            onChange={e => setNovoEmpregado({ ...novoEmpregado, especialidade: e.target.value })}
            required
          />
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0' }}>
            <input
              type="checkbox"
              checked={novoEmpregado.ativo}
              onChange={e => setNovoEmpregado({ ...novoEmpregado, ativo: e.target.checked })}
            />
            Ativo
          </label>
          <button type="submit" className="btn btn-primary">Salvar Alterações</button>
          <button type="button" onClick={handleCancelEditEmpregado} className="btn btn-secondary">
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
};

export default EmployeeManagement;
