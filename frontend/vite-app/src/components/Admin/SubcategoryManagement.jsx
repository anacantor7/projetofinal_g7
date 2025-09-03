import React, { useState } from 'react';
import { useTypes, useSubcategories } from '../../hooks/useTypesAndSubcategories';

const SubcategoryManagement = () => {
  const { tipos } = useTypes();
  const { subcategorias, loading, error, addSubcategory, updateSubcategory, deleteSubcategory } = useSubcategories();
  const [nuevaSubcategoria, setNuevaSubcategoria] = useState({ nome: '', tipoId: '' });
  const [editandoSubcategoria, setEditandoSubcategoria] = useState(null);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const handleAddSubcategoria = async (e) => {
    e.preventDefault();
    const result = await addSubcategory(nuevaSubcategoria);
    if (result.success) {
      setFeedback({ message: 'Subcategoría agregada correctamente', type: 'success' });
      setNuevaSubcategoria({ nome: '', tipoId: '' });
    } else {
      setFeedback({ message: result.error || 'Error al agregar subcategoría', type: 'error' });
    }
  };

  const handleEditSubcategoria = (sub) => {
    setEditandoSubcategoria(sub.id);
    setNuevaSubcategoria({ nome: sub.nome, tipoId: sub.tipoId });
  };

  const handleUpdateSubcategoria = async (e) => {
    e.preventDefault();
    const result = await updateSubcategory(editandoSubcategoria, nuevaSubcategoria);
    if (result.success) {
      setFeedback({ message: 'Subcategoría actualizada correctamente', type: 'success' });
      setEditandoSubcategoria(null);
      setNuevaSubcategoria({ nome: '', tipoId: '' });
    } else {
      setFeedback({ message: result.error || 'Error al actualizar subcategoría', type: 'error' });
    }
  };

  const handleDeleteSubcategoria = async (id) => {
    const result = await deleteSubcategory(id);
    if (result.success) {
      setFeedback({ message: 'Subcategoría eliminada correctamente', type: 'success' });
    } else {
      setFeedback({ message: result.error || 'Error al eliminar subcategoría', type: 'error' });
    }
  };

  const handleCancelEdit = () => {
    setEditandoSubcategoria(null);
    setNuevaSubcategoria({ nome: '', tipoId: '' });
  };

  if (loading) return <div>Cargando subcategorías...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="subcategory-management">
      <h2>Subcategorias</h2>

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
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {subcategorias.map(sub => (
            <tr key={sub.id}>
              <td>{sub.id}</td>
              <td>{sub.nome}</td>
              <td>{tipos.find(t => t.id === sub.tipoId)?.nome || sub.tipoId}</td>
              <td>
                <button onClick={() => handleEditSubcategoria(sub)} className="btn btn-primary btn-sm">
                  Editar
                </button>
                <button onClick={() => handleDeleteSubcategoria(sub.id)} className="btn btn-danger btn-sm">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={editandoSubcategoria ? handleUpdateSubcategoria : handleAddSubcategoria} className="admin-form">
        <input
          type="text"
          placeholder="Nome da subcategoria"
          value={nuevaSubcategoria.nome}
          onChange={e => setNuevaSubcategoria({ ...nuevaSubcategoria, nome: e.target.value })}
          required
        />
        <select
          value={nuevaSubcategoria.tipoId}
          onChange={e => setNuevaSubcategoria({ ...nuevaSubcategoria, tipoId: e.target.value })}
          required
        >
          <option value="">Selecione um tipo</option>
          {tipos.map(tipo => (
            <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
          ))}
        </select>
        <button type="submit" className="btn btn-success">
          {editandoSubcategoria ? 'Salvar Alterações' : 'Adicionar Subcategoria'}
        </button>
        {editandoSubcategoria && (
          <button type="button" onClick={handleCancelEdit} className="btn btn-secondary">
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
};

export default SubcategoryManagement;
