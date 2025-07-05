import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [servicos, setServicos] = useState([
    { id: 1, nome: 'Corte de Cabelo' },
    { id: 2, nome: 'Manicure' },
    { id: 3, nome: 'Coloração' }
  ]);
  const [novoEmpregado, setNovoEmpregado] = useState({ nome: '', telefone: '', especialidade: '', ativo: true });
  const [novoHorario, setNovoHorario] = useState({ profissionalId: '', servicoId: '', hora: '', horaFinal: '' });
  const [profissionais, setProfissionais] = useState([]);
  const [novoTipoServico, setNovoTipoServico] = useState('');
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [horariosRegistrados, setHorariosRegistrados] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [nuevoServico, setNuevoServico] = useState({ nome: '', duracao: '', preco: '', tipoId: '', ativo: true });
  const navigate = useNavigate();

  // Días de la semana para selección múltiple
  const diasSemana = [
    { value: 'Lunes', label: 'Lunes' },
    { value: 'Martes', label: 'Martes' },
    { value: 'Miércoles', label: 'Miércoles' },
    { value: 'Jueves', label: 'Jueves' },
    { value: 'Viernes', label: 'Viernes' },
    { value: 'Sábado', label: 'Sábado' },
    { value: 'Domingo', label: 'Domingo' },
  ];

  useEffect(() => {
    const usuario = localStorage.getItem('usuarioLogado');
    if (!usuario) {
      navigate('/');
    } else {
      fetch('http://localhost:3000/usuarios')
        .then(res => res.json())
        .then(data => setUsuarios(data))
        .catch(err => console.error('Error al cargar usuarios:', err));
      // Si el backend no responde, se mantienen las opciones por defecto
      fetch('http://localhost:3000/servicos')
        .then(res => res.json())
        .then(data => { if (Array.isArray(data) && data.length > 0) setServicos(data); });
      fetch('http://localhost:3000/profissionais')
        .then(res => res.json())
        .then(data => setProfissionais(data));
      fetch('http://localhost:3000/horarios')
        .then(res => res.json())
        .then(data => setHorariosRegistrados(data));
      fetch('http://localhost:3000/tipos')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setTipos(data);
          } else {
            // Si no hay tipos en la base, agregar por defecto
            setTipos([
              { id: 1, nome: 'Presencial' },
              { id: 2, nome: 'Domicilio' }
            ]);
          }
        })
        .catch(() => {
          setTipos([
            { id: 1, nome: 'Presencial' },
            { id: 2, nome: 'Domicilio' }
          ]);
        });
    }
  }, [navigate]);

  // Registrar nuevo empleado
  const handleAddEmpregado = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3000/profissionais', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoEmpregado)
    });
    setNovoEmpregado({ nome: '', telefone: '', especialidade: '', ativo: true });
    // Recargar lista de profesionales
    fetch('http://localhost:3000/profissionais')
      .then(res => res.json())
      .then(data => setProfissionais(data));
  };

  // Registrar nuevo horario
  const handleAddHorario = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3000/horarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoHorario)
    });
    setNovoHorario({ profissionalId: '', servicoId: '', hora: '', horaFinal: '' });
  };

  // Eliminar empleado
  const handleDeleteEmpregado = async (id) => {
    if (window.confirm('¿Desea eliminar este empleado?')) {
      await fetch(`http://localhost:3000/profissionais/${id}`, { method: 'DELETE' });
      setProfissionais(profissionais.filter(p => p.id !== id));
    }
  };

  // Agregar nuevo tipo de servicio
  const handleAddTipoServico = async (e) => {
    e.preventDefault();
    if (!novoTipoServico.trim()) return;
    // POST al backend para crear tipo de servicio
    await fetch('http://localhost:3000/servicos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: novoTipoServico })
    });
    setNovoTipoServico('');
    // Recargar lista de servicios
    fetch('http://localhost:3000/servicos')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setServicos(data); });
  };

  // Agregar horario localmente antes de enviar
  const handleAddHorarioLocal = (e) => {
    e.preventDefault();
    diasSeleccionados.forEach(dia => {
      setHorarios(prev => [...prev, {
        ...novoHorario,
        dia,
        id: Date.now() + Math.random()
      }]);
    });
    setNovoHorario({ profissionalId: '', servicoId: '', hora: '', horaFinal: '' });
    setDiasSeleccionados([]);
  };

  // Enviar todos los horarios seleccionados al backend
  const handleGuardarHorarios = async () => {
    for (const horario of horarios) {
      await fetch('http://localhost:3000/horarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(horario)
      });
    }
    setHorarios([]);
    // Recargar lista de horarios
    fetch('http://localhost:3000/horarios')
      .then(res => res.json())
      .then(data => setHorariosRegistrados(data));
  };

  // Eliminar horario del backend
  const handleDeleteHorario = async (id) => {
    await fetch(`http://localhost:3000/horarios/${id}`, { method: 'DELETE' });
    setHorariosRegistrados(horariosRegistrados.filter(h => h.id !== id));
  };

  // Editar horario (carga en el formulario)
  const handleEditHorario = (horario) => {
    setNovoHorario({ profissionalId: horario.profissionalId, servicoId: horario.servicoId, hora: horario.hora, horaFinal: horario.horaFinal });
    setDiasSeleccionados([horario.dia]);
    setHorarios(horarios.filter(h => h.id !== horario.id));
  };

  // Agregar servicio
  const handleAddServico = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3000/servicos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoServico)
    });
    setNuevoServico({ nome: '', duracao: '', preco: '', tipoId: '', ativo: true });
    // Recargar lista de servicios
    fetch('http://localhost:3000/servicos')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setServicos(data); });
  };

  // Eliminar servicio
  const handleDeleteServico = async (id) => {
    await fetch(`http://localhost:3000/servicos/${id}`, { method: 'DELETE' });
    setServicos(servicos.filter(s => s.id !== id));
  };

  // Cambiar estado de servicio (activar/desactivar)
  const handleToggleServicoAtivo = async (id, ativo) => {
    await fetch(`http://localhost:3000/servicos/${id}/ativo`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ativo: !ativo })
    });
    fetch('http://localhost:3000/servicos')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setServicos(data); });
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

      <h2>Empleados</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Especialidad</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {profissionais.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.nome}</td>
              <td>{emp.telefone}</td>
              <td>{emp.especialidade}</td>
              <td>{emp.ativo ? 'Sí' : 'No'}</td>
              <td>
                <button onClick={() => handleDeleteEmpregado(emp.id)} style={{ background: '#ffd1dc', color: '#C8377C', border: '1px solid #C8377C', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer' }}>Eliminar</button>
              </td>
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
          type="text"
          placeholder="Teléfono"
          value={novoEmpregado.telefone}
          onChange={e => setNovoEmpregado({ ...novoEmpregado, telefone: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Especialidad"
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
          Activo
        </label>
        <button type="submit">Registrar Empleado</button>
      </form>

      <h2>Agregar Tipo de Servicio</h2>
      <form onSubmit={handleAddTipoServico} className="admin-form" style={{ marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="Nombre del nuevo servicio"
          value={novoTipoServico}
          onChange={e => setNovoTipoServico(e.target.value)}
          required
        />
        <button type="submit">Agregar Servicio</button>
      </form>

      <h2>Registrar Horario</h2>
      <form onSubmit={handleAddHorarioLocal} className="admin-form">
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
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '8px 0' }}>
          {diasSemana.map(dia => (
            <label key={dia.value} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <input
                type="checkbox"
                checked={diasSeleccionados.includes(dia.value)}
                onChange={e => {
                  if (e.target.checked) setDiasSeleccionados([...diasSeleccionados, dia.value]);
                  else setDiasSeleccionados(diasSeleccionados.filter(d => d !== dia.value));
                }}
              />
              {dia.label}
            </label>
          ))}
        </div>
        <input
          type="time"
          placeholder="Hora inicio"
          value={novoHorario.hora}
          onChange={e => setNovoHorario({ ...novoHorario, hora: e.target.value })}
          required
        />
        <input
          type="time"
          placeholder="Hora final"
          value={novoHorario.horaFinal}
          onChange={e => setNovoHorario({ ...novoHorario, horaFinal: e.target.value })}
          required
        />
        <button type="submit">Agregar a lista</button>
      </form>
      {horarios.length > 0 && (
        <div style={{ margin: '12px 0' }}>
          <h4>Horarios a registrar:</h4>
          <ul>
            {horarios.map((h, idx) => (
              <li key={h.id}>{diasSemana.find(d => d.value === h.dia)?.label || h.dia} - {h.hora} a {h.horaFinal} <button onClick={() => setHorarios(horarios.filter(x => x.id !== h.id))}>Eliminar</button></li>
            ))}
          </ul>
          <button onClick={handleGuardarHorarios}>Guardar todos</button>
        </div>
      )}
      <h3>Horarios registrados</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Empleado</th>
            <th>Servicio</th>
            <th>Día</th>
            <th>Hora inicio</th>
            <th>Hora final</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {horariosRegistrados.map(h => (
            <tr key={h.id}>
              <td>{profissionais.find(p => p.id === h.profissionalId)?.nome || h.profissionalId}</td>
              <td>{servicos.find(s => s.id === h.servicoId)?.nome || h.servicoId}</td>
              <td>{h.dia}</td>
              <td>{h.hora}</td>
              <td>{h.horaFinal}</td>
              <td>
                <button onClick={() => handleEditHorario(h)}>Editar</button>
                <button onClick={() => handleDeleteHorario(h.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Servicios Disponibles</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Duración (min)</th>
            <th>Precio</th>
            <th>Tipo</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicos.map(servico => (
            <tr key={servico.id}>
              <td>{servico.id}</td>
              <td>{servico.nome}</td>
              <td>{servico.duracao}</td>
              <td>{servico.preco}</td>
              <td>{tipos.find(t => t.id === servico.tipoId)?.nome || '-'}</td>
              <td>{servico.ativo ? 'Sí' : 'No'}</td>
              <td>
                <button onClick={() => handleToggleServicoAtivo(servico.id, servico.ativo)}>{servico.ativo ? 'Desactivar' : 'Activar'}</button>
                <button onClick={() => handleDeleteServico(servico.id)} style={{ marginLeft: 8 }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Registrar Servicio</h2>
      <form onSubmit={handleAddServico} className="admin-form">
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoServico.nome}
          onChange={e => setNuevoServico({ ...nuevoServico, nome: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Duración (min)"
          value={nuevoServico.duracao}
          onChange={e => setNuevoServico({ ...nuevoServico, duracao: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={nuevoServico.preco}
          onChange={e => setNuevoServico({ ...nuevoServico, preco: e.target.value })}
          required
        />
        <select
          value={nuevoServico.tipoId}
          onChange={e => setNuevoServico({ ...nuevoServico, tipoId: e.target.value })}
          required
        >
          <option value="">Selecciona un tipo</option>
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
          Activo
        </label>
        <button type="submit">Registrar Servicio</button>
      </form>
    </div>
  );
};

export default Admin;
