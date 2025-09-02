import React, { useState } from 'react';
import { useUsers } from '../../hooks/useUsers';

const UserManagement = () => {
  const { usuarios, loading, error, updateUser } = useUsers();
  const [editandoUsuario, setEditandoUsuario] = useState(null);
  const [novoUsuario, setNovoUsuario] = useState({ nombre: '', email: '' });
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const handleEditUsuario = (usuario) => {
    setEditandoUsuario(usuario.id);
    setNovoUsuario({ nombre: usuario.nombre, email: usuario.email });
  };

  const handleUpdateUsuario = async (e) => {
    e.preventDefault();
    const result = await updateUser(editandoUsuario, novoUsuario);
    if (result.success) {
      setFeedback({ message: 'Usuario actualizado correctamente', type: 'success' });
      setEditandoUsuario(null);
      setNovoUsuario({ nombre: '', email: '' });
    } else {
      setFeedback({ message: result.error || 'Error al actualizar usuario', type: 'error' });
    }
  };

  const handleCancelEditUsuario = () => {
    setEditandoUsuario(null);
    setNovoUsuario({ nombre: '', email: '' });
  };

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-management">
      <h2>Usuários</h2>

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
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre?.charAt(0).toUpperCase() + usuario.nombre?.slice(1).toLowerCase()}</td>
              <td>{usuario.email}</td>
              <td>
                <button onClick={() => handleEditUsuario(usuario)} className="btn btn-primary btn-sm">
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editandoUsuario && (
        <form onSubmit={handleUpdateUsuario} className="admin-form">
          <input
            type="text"
            placeholder="Nome"
            value={novoUsuario.nombre}
            onChange={e => setNovoUsuario({ ...novoUsuario, nombre: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={novoUsuario.email}
            onChange={e => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
            required
          />
          <button type="submit" className="btn btn-primary">Salvar Alterações</button>
          <button type="button" onClick={handleCancelEditUsuario} className="btn btn-secondary">
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
};

export default UserManagement;
