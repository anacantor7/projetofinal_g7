import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [novoEmpregado, setNovoEmpregado] = useState({ nome: '', email: '', servicoId: '' });
  const [novoHorario, setNovoHorario] = useState({ profissionalId: '', servicoId: '', hora: '' });
  const [profissionais, setProfissionais] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = localStorage.getItem('usuarioLogado');
    if (!usuario) {
      navigate('/');
    } else {
      fetch('http://localhost:3000/api/usuarios')
        .then(res => res.json())
        .then(data => setUsuarios(data))
        .catch(err => console.error('Error al cargar usuarios:', err));
      fetch('http://localhost:3000/api/servicos')
        .then(res => res.json())
        .then(data => setServicos(data));
      fetch('http://localhost:3000/api/profissionais')
        .then(res => res.json())
        .then(data => setProfissionais(data));
    }
  }, [navigate]);

  // Registrar nuevo empleado
  const handleAddEmpregado = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3000/api/profissionais', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoEmpregado)
    });
    setNovoEmpregado({ nome: '', email: '', servicoId: '' });
    // Recargar lista de profesionales
    fetch('http://localhost:3000/api/profissionais')
      .then(res => res.json())
      .then(data => setProfissionais(data));
  };

  // Registrar nuevo horario
  const handleAddHorario = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3000/api/horarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoHorario)
    });
    setNovoHorario({ profissionalId: '', servicoId: '', hora: '' });
  };

  return (
    <div className="admin-container">
      <h1>Panel de Administración</h1>
      <h2>Usuarios</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Registrar Empleado</h2>
      <form onSubmit={handleAddEmpregado} className="admin-form">
        <input
          type="text"
          placeholder="Nombre"
          value={novoEmpregado.nome}
          onChange={e => setNovoEmpregado({ ...novoEmpregado, nome: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={novoEmpregado.email}
          onChange={e => setNovoEmpregado({ ...novoEmpregado, email: e.target.value })}
          required
        />
        <select
          value={novoEmpregado.servicoId}
          onChange={e => setNovoEmpregado({ ...novoEmpregado, servicoId: e.target.value })}
          required
        >
          <option value="">Selecciona un servicio</option>
          {servicos.map(servico => (
            <option key={servico.id} value={servico.id}>{servico.nome}</option>
          ))}
        </select>
        <button type="submit">Registrar Empleado</button>
      </form>

      <h2>Registrar Horario</h2>
      <form onSubmit={handleAddHorario} className="admin-form">
        <select
          value={novoHorario.profissionalId}
          onChange={e => setNovoHorario({ ...novoHorario, profissionalId: e.target.value })}
          required
        >
          <option value="">Selecciona un empleado</option>
          {profissionais.map(prof => (
            <option key={prof.id} value={prof.id}>{prof.nome}</option>
          ))}
        </select>
        <select
          value={novoHorario.servicoId}
          onChange={e => setNovoHorario({ ...novoHorario, servicoId: e.target.value })}
          required
        >
          <option value="">Selecciona un servicio</option>
          {servicos.map(servico => (
            <option key={servico.id} value={servico.id}>{servico.nome}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Horario (ej: 10:00)"
          value={novoHorario.hora}
          onChange={e => setNovoHorario({ ...novoHorario, hora: e.target.value })}
          required
        />
        <button type="submit">Registrar Horario</button>
      </form>
    </div>
  );
};

export default Admin;
