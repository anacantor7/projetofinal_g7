import React, { useState } from 'react';
import { useServices } from '../../hooks/useServices';
import { useTypes } from '../../hooks/useTypesAndSubcategories';

const ServiceManagement = () => {
  const { servicos, loading: servicesLoading, error: servicesError, addService, updateService, deleteService } = useServices();
  const { tipos, loading: typesLoading } = useTypes();
  const [nuevoServico, setNuevoServico] = useState({ nome: '', duracao: '', preco: '', tipoId: '', ativo: true });
  const [editandoServico, setEditandoServico] = useState(null);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const handleAddServico = async (e) => {
    e.preventDefault();
    const result = await addService(nuevoServico);
    if (result.success) {
      setFeedback({ message: 'Servicio agregado correctamente', type: 'success' });
      setNuevoServico({ nome: '', duracao: '', preco: '', tipoId: '', ativo: true });
    } else {
      setFeedback({ message: result.error || 'Error al agregar servicio', type: 'error' });
    }
  };

  const handleEditServico = (servico) => {
    setEditandoServico(servico.id);
    setNuevoServico({
      nome: servico.nome,
      duracao: servico.duracao,
      preco: servico.preco,
      tipoId: servico.tipoId,
      ativo: servico.ativo
    });
  };

  const handleUpdateServico = async (e) => {
    e.preventDefault();
    if (!editandoServico) {
      setFeedback({ message: 'ID de servicio inválido. No se puede actualizar.', type: 'error' });
      return;
    }

    if (!nuevoServico.nome || !nuevoServico.duracao || !nuevoServico.preco || !nuevoServico.tipoId) {
      setFeedback({ message: 'Todos los campos son obligatorios', type: 'error' });
      return;
    }

    const servicoEdit = {
      ...nuevoServico,
      duracao: Number(nuevoServico.duracao),
      preco: Number(nuevoServico.preco),
      tipoId: Number(nuevoServico.tipoId),
      ativo: Boolean(nuevoServico.ativo)
    };

    const result = await updateService(editandoServico, servicoEdit);
    if (result.success) {
      setFeedback({ message: 'Servicio actualizado correctamente', type: 'success' });
      setEditandoServico(null);
      setNuevoServico({ nome: '', duracao: '', preco: '', tipoId: '', ativo: true });
    } else {
      setFeedback({ message: result.error || 'Error al actualizar servicio', type: 'error' });
    }
  };

  const handleCancelEditServico = () => {
    setEditandoServico(null);
    setNuevoServico({ nome: '', duracao: '', preco: '', tipoId: '', ativo: true });
  };

  const handleDeleteServico = async (id) => {
    const result = await deleteService(id);
    if (result.success) {
      setFeedback({ message: 'Servicio eliminado correctamente', type: 'success' });
    } else {
      setFeedback({ message: result.error || 'Error al eliminar servicio', type: 'error' });
    }
  };

  if (servicesLoading || typesLoading) return <div>Cargando servicios...</div>;
  if (servicesError) return <div>Error: {servicesError}</div>;

  return (
    <div className="service-management">
      <h2>Serviços Disponíveis</h2>

      {feedback.message && (
        <div className={`alert ${feedback.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
          {feedback.message}
        </div>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Duração (min)</th>
            <th>Preço</th>
            <th>Tipo</th>
            <th>Ativo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {servicos.map(servico => (
            <tr key={servico.id}>
              <td>{servico.id}</td>
              <td>{servico.nome}</td>
              <td>{servico.duracao || '-'}</td>
              <td>{servico.preco || '-'}</td>
              <td>{tipos.find(t => t.id === servico.tipoId)?.nome || '-'}</td>
              <td>{servico.ativo ? 'Sim' : 'Não'}</td>
              <td>
                <button onClick={() => handleEditServico(servico)} className="btn btn-primary btn-sm">
                  Editar
                </button>
                <button onClick={() => handleDeleteServico(servico.id)} className="btn btn-danger btn-sm">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{editandoServico ? 'Editar Serviço' : 'Cadastrar Serviço'}</h2>
      <form onSubmit={editandoServico ? handleUpdateServico : handleAddServico} className="admin-form">
        <input
          type="text"
          placeholder="Nome"
          value={nuevoServico.nome}
          onChange={e => setNuevoServico({ ...nuevoServico, nome: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Duração (min)"
          value={nuevoServico.duracao}
          onChange={e => setNuevoServico({ ...nuevoServico, duracao: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={nuevoServico.preco}
          onChange={e => setNuevoServico({ ...nuevoServico, preco: e.target.value })}
          required
        />
        <select
          value={nuevoServico.tipoId}
          onChange={e => setNuevoServico({ ...nuevoServico, tipoId: e.target.value })}
          required
        >
          <option value="">Selecione um tipo</option>
          {tipos.map(tipo => (
            <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
          ))}
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0' }}>
          <input
            type="checkbox"
            checked={nuevoServico.ativo}
            onChange={e => setNuevoServico({ ...nuevoServico, ativo: e.target.checked })}
          />
          Ativo
        </label>
        <button type="submit" className="btn btn-success">
          {editandoServico ? 'Salvar Alterações' : 'Cadastrar Serviço'}
        </button>
        {editandoServico && (
          <button type="button" onClick={handleCancelEditServico} className="btn btn-secondary">
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
};

export default ServiceManagement;
