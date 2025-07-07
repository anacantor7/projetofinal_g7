import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [novoEmpregado, setNovoEmpregado] = useState({ nome: '', telefone: '', especialidade: '', ativo: true });
  const [novoHorario, setNovoHorario] = useState({ profissionalId: '', servicoId: '', hora: '', horaFinal: '' });
  const [profissionais, setProfissionais] = useState([]);
  const [novoTipoServico, setNovoTipoServico] = useState('');
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [horariosRegistrados, setHorariosRegistrados] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [nuevoServico, setNuevoServico] = useState({ nome: '', duracao: '', preco: '', tipoId: '', ativo: true });
  const [editandoServico, setEditandoServico] = useState(null);
  const [editandoEmpregado, setEditandoEmpregado] = useState(null);
  const [editandoUsuario, setEditandoUsuario] = useState(null);
  const [novoUsuario, setNovoUsuario] = useState({ nombre: '', email: '' });
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [logs, setLogs] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [nuevaSubcategoria, setNuevaSubcategoria] = useState({ nome: '', tipoId: '' });
  const [editandoSubcategoria, setEditandoSubcategoria] = useState(null);
  const [showAddEmpregado, setShowAddEmpregado] = useState(false);
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
      fetch('http://localhost:3000/clientes') // Corrigido de /usuarios para /clientes
        .then(res => res.json())
        .then(data => setUsuarios(data))
        .catch(err => console.error('Error al cargar usuarios:', err));
      // Si el backend no responde, se mantienen las opciones por defecto
      fetch('http://localhost:3000/servicos')
        .then(res => res.json())
        .then(async data => {
          if (Array.isArray(data) && data.length > 0) {
            setServicos(data);
          } else {
            // Si no hay servicios, registrar algunos por defecto según especialidades de empleados
            const profissionaisRes = await fetch('http://localhost:3000/profissionais');
            const profissionais = await profissionaisRes.json();
            const especialidadesUnicas = [...new Set(profissionais.map(p => p.especialidade))];
            const tipoId = 1; // Asignar un tipoId por defecto
            const defaultServicos = especialidadesUnicas.map((esp, idx) => ({
              nome: esp,
              duracao: 30 + idx * 10, // ejemplo: duración variable
              preco: 50 + idx * 20,   // ejemplo: precio variable
              tipoId,
              ativo: true
            }));
            for (const serv of defaultServicos) {
              await fetch('http://localhost:3000/servicos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(serv)
              });
            }
            // Recargar lista de servicios
            fetch('http://localhost:3000/servicos')
              .then(res2 => res2.json())
              .then(data2 => setServicos(data2));
          }
        });
      fetch('http://localhost:3000/profissionais')
        .then(res => res.json())
        .then(data => setProfissionais(data));
      fetch('http://localhost:3000/horarios')
        .then(res => res.json())
        .then(data => setHorariosRegistrados(data));
      fetch('http://localhost:3000/tipos')
        .then(res => res.json())
        .then(async data => {
          if (Array.isArray(data) && data.length > 0) {
            setTipos(data);
          } else {
            // Si no hay tipos en la base, crearlos en el backend
            const tiposDefault = [
              { nome: 'Presencial' },
              { nome: 'Domicilio' }
            ];
            for (const tipo of tiposDefault) {
              await fetch('http://localhost:3000/tipos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tipo)
              });
            }
            // Recargar tipos desde el backend
            fetch('http://localhost:3000/tipos')
              .then(res => res.json())
              .then(data2 => setTipos(data2));
          }
        })
        .catch(async () => {
          // Si el backend no responde, intentar crearlos
          const tiposDefault = [
            { nome: 'Presencial' },
            { nome: 'Domicilio' }
          ];
          for (const tipo of tiposDefault) {
            await fetch('http://localhost:3000/tipos', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(tipo)
            });
          }
          fetch('http://localhost:3000/tipos')
            .then(res => res.json())
            .then(data2 => setTipos(data2));
        });
      // Cargar logs de acciones
      fetch('http://localhost:3000/api/log-acao')
        .then(res => res.json())
        .then(data => setLogs(data))
        .catch(err => setLogs([]));
      // Cargar subcategorias
      fetch('http://localhost:3000/subcategorias')
        .then(res => res.json())
        .then(data => setSubcategorias(data));
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

  // Funciones para recargar datos
  const reloadUsuarios = () => {
    fetch('http://localhost:3000/clientes') // Corrigido de /usuarios para /clientes
      .then(res => res.json())
      .then(data => setUsuarios(data));
  };
  const reloadServicos = () => {
    fetch('http://localhost:3000/servicos')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setServicos(data); });
  };
  const reloadProfissionais = () => {
    fetch('http://localhost:3000/profissionais')
      .then(res => res.json())
      .then(data => setProfissionais(data));
  };
  const reloadHorarios = () => {
    fetch('http://localhost:3000/horarios')
      .then(res => res.json())
      .then(data => setHorariosRegistrados(data));
  };
  const reloadSubcategorias = () => {
    fetch('http://localhost:3000/subcategorias')
      .then(res => res.json())
      .then(data => setSubcategorias(data));
  };

  // Eliminar empleado
  const handleDeleteEmpregado = async (id) => {
    if (window.confirm('¿Desea eliminar este empleado?')) {
      try {
        const res = await fetch(`http://localhost:3000/profissionais/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Error al eliminar empleado');
        setFeedback({ message: 'Empleado eliminado correctamente', type: 'success' });
        reloadProfissionais();
      } catch (err) {
        setFeedback({ message: 'Error al eliminar empleado', type: 'error' });
      }
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
    try {
      for (const horario of horarios) {
        await fetch('http://localhost:3000/horarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(horario)
        });
      }
      setHorarios([]);
      setFeedback({ message: 'Horarios guardados correctamente', type: 'success' });
      reloadHorarios();
    } catch (err) {
      setFeedback({ message: 'Error al guardar horarios', type: 'error' });
    }
  };

  // Eliminar servicio
  const handleDeleteServico = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/servicos/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar servicio');
      setFeedback({ message: 'Servicio eliminado correctamente', type: 'success' });
      reloadServicos();
    } catch (err) {
      setFeedback({ message: 'Error al eliminar servicio', type: 'error' });
    }
  };

  // Eliminar horario del backend
  const handleDeleteHorario = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/horarios/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar horario');
      setFeedback({ message: 'Horario eliminado correctamente', type: 'success' });
      reloadHorarios();
    } catch (err) {
      setFeedback({ message: 'Error al eliminar horario', type: 'error' });
    }
  };

  // Eliminar subcategoria del backend
  const handleDeleteSubcategoria = async (id) => {
    await fetch(`http://localhost:3000/subcategorias/${id}`, { method: 'DELETE' });
    setSubcategorias(subcategorias.filter(s => s.id !== id));
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

  // Editar servicio: cargar datos en el formulario
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

  // Guardar edición de servicio
  const handleUpdateServico = async (e) => {
    e.preventDefault();
    if (!editandoServico) {
      setFeedback({ message: 'ID de servicio inválido. No se puede actualizar.', type: 'error' });
      return;
    }
    // Validación frontend
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
    try {
      const res = await fetch(`http://localhost:3000/servicos/${editandoServico}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(servicoEdit)
      });
      if (!res.ok) {
        const errorData = await res.json();
        setFeedback({ message: (errorData.erro ? errorData.erro + ` (ID: ${editandoServico})` : 'Error al actualizar servicio'), type: 'error' });
        return;
      }
      setFeedback({ message: 'Servicio actualizado correctamente', type: 'success' });
      setEditandoServico(null);
      setNuevoServico({ nome: '', duracao: '', preco: '', tipoId: '', ativo: true });
      reloadServicos();
    } catch (err) {
      setFeedback({ message: 'Error de red al actualizar servicio', type: 'error' });
    }
  };

  // Cancelar edición
  const handleCancelEditServico = () => {
    setEditandoServico(null);
    setNuevoServico({ nome: '', duracao: '', preco: '', tipoId: '', ativo: true });
  };

  // Editar empleado: cargar datos en el formulario
  const handleEditEmpregado = (emp) => {
    setEditandoEmpregado(emp.id);
    setNovoEmpregado({
      nome: emp.nome,
      telefone: emp.telefone,
      especialidade: emp.especialidade,
      ativo: emp.ativo
    });
  };

  // Guardar edición de empleado
  const handleUpdateEmpregado = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/profissionais/${editandoEmpregado}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoEmpregado)
      });
      if (!res.ok) throw new Error('Error al guardar empleado');
      setFeedback({ message: 'Empleado actualizado correctamente', type: 'success' });
      setEditandoEmpregado(null);
      setNovoEmpregado({ nome: '', telefone: '', especialidade: '', ativo: true });
      reloadProfissionais();
    } catch (err) {
      setFeedback({ message: 'Error al actualizar empleado', type: 'error' });
    }
  };

  // Cancelar edición empleado
  const handleCancelEditEmpregado = () => {
    setEditandoEmpregado(null);
    setNovoEmpregado({ nome: '', telefone: '', especialidade: '', ativo: true });
  };

  // Editar usuario: cargar datos en el formulario
  const handleEditUsuario = (usuario) => {
    setEditandoUsuario(usuario.id);
    setNovoUsuario({ nombre: usuario.nombre, email: usuario.email });
  };

  // Guardar edición de usuario
  const handleUpdateUsuario = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/clientes/${editandoUsuario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoUsuario)
      });
      if (!res.ok) throw new Error('Error al guardar usuario');
      setFeedback({ message: 'Usuario actualizado correctamente', type: 'success' });
      setEditandoUsuario(null);
      setNovoUsuario({ nombre: '', email: '' });
      reloadUsuarios();
    } catch (err) {
      setFeedback({ message: 'Error al actualizar usuario', type: 'error' });
    }
  };

  // Cancelar edición usuario
  const handleCancelEditUsuario = () => {
    setEditandoUsuario(null);
    setNovoUsuario({ nombre: '', email: '' });
  };

  // CRUD Subcategorias
  const handleAddSubcategoria = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3000/subcategorias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaSubcategoria)
    });
    setNuevaSubcategoria({ nome: '', tipoId: '' });
    fetch('http://localhost:3000/subcategorias')
      .then(res => res.json())
      .then(data => setSubcategorias(data));
  };

  const handleEditSubcategoria = (sub) => {
    setEditandoSubcategoria(sub.id);
    setNuevaSubcategoria({ nome: sub.nome, tipoId: sub.tipoId });
  };

  const handleUpdateSubcategoria = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/subcategorias/${editandoSubcategoria}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaSubcategoria)
    });
    setEditandoSubcategoria(null);
    setNuevaSubcategoria({ nome: '', tipoId: '' });
    fetch('http://localhost:3000/subcategorias')
      .then(res => res.json())
      .then(data => setSubcategorias(data));
  };

  return (
    <div className="admin-container">
      <h1>Panel de Administração</h1>
      {feedback.message && (
        <div className={`alert ${feedback.type === 'success' ? 'alert-success' : 'alert-danger'}`}>{feedback.message}</div>
      )}
      <h2>Usuários</h2>
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
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>
                <button onClick={() => handleEditUsuario(usuario)}>Editar</button>
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
          <button type="button" onClick={handleCancelEditUsuario} className="btn btn-secondary" style={{ marginLeft: 8 }}>Cancelar</button>
        </form>
      )}

      <h2>Funcionários</h2>
      <button className="btn btn-success" style={{ marginBottom: 12 }} onClick={() => setShowAddEmpregado(!showAddEmpregado)}>
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
              <td>{emp.nome}</td>
              <td>{emp.telefone}</td>
              <td>{emp.especialidade}</td>
              <td>{emp.ativo ? 'Sim' : 'Não'}</td>
              <td>
                <button onClick={() => handleEditEmpregado(emp)}>Editar</button>
                <button onClick={() => handleDeleteEmpregado(emp.id)} style={{ marginLeft: 8 }}>Excluir</button>
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
          <button type="button" onClick={handleCancelEditEmpregado} className="btn btn-secondary" style={{ marginLeft: 8 }}>Cancelar</button>
        </form>
      )}

      <h2>Adicionar Tipo de Serviço</h2>
      <form onSubmit={handleAddTipoServico} className="admin-form" style={{ marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="Nome do novo serviço"
          value={novoTipoServico}
          onChange={e => setNovoTipoServico(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-success">Adicionar Serviço</button>
      </form>

      <h2>Registrar Horário</h2>
      <form onSubmit={handleAddHorarioLocal} className="admin-form">
        <select
          value={novoHorario.profissionalId}
          onChange={e => setNovoHorario({ ...novoHorario, profissionalId: e.target.value })}
          required
        >
          <option value="">Seleciona um empregado</option>
          {profissionais.map(prof => (
            <option key={prof.id} value={prof.id}>{prof.nome}</option>
          ))}
        </select>
        <select
          value={novoHorario.servicoId}
          onChange={e => setNovoHorario({ ...novoHorario, servicoId: e.target.value })}
          required
        >
          <option value="">Seleciona um serviço</option>
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
        <button type="submit" className="btn btn-success">Adicionar à lista</button>
      </form>
      {horarios.length > 0 && (
        <div style={{ margin: '12px 0' }}>
          <h4>Horários a registrar:</h4>
          <ul>
            {horarios.map((h, idx) => (
              <li key={h.id}>{diasSemana.find(d => d.value === h.dia)?.label || h.dia} - {h.hora} a {h.horaFinal} <button className="btn btn-danger btn-sm" onClick={() => setHorarios(horarios.filter(x => x.id !== h.id))}>Eliminar</button></li>
            ))}
          </ul>
          <button className="btn btn-primary" onClick={handleGuardarHorarios}>Salvar todos</button>
        </div>
      )}
      <h3>Horários registrados</h3>
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

      <h2>Serviços Disponíveis</h2>
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
              <td>{servico.duracao}</td>
              <td>{servico.preco}</td>
              <td>{tipos.find(t => t.id === servico.tipoId)?.nome || '-'}</td>
              <td>{servico.ativo ? 'Sim' : 'Não'}</td>
              <td>
                <button onClick={() => handleEditServico(servico)}>Editar</button>
                <button onClick={() => handleToggleServicoAtivo(servico.id, servico.ativo)}>{servico.ativo ? 'Desativar' : 'Ativar'}</button>
                <button onClick={() => handleDeleteServico(servico.id)} style={{ marginLeft: 8 }}>Excluir</button>
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
        <button type="submit" className="btn btn-success">{editandoServico ? 'Salvar Alterações' : 'Cadastrar Serviço'}</button>
        {editandoServico && <button type="button" onClick={handleCancelEditServico} className="btn btn-secondary" style={{ marginLeft: 8 }}>Cancelar</button>}
      </form>

      <h2>Logs de Ações</h2>
      <table style={{ width: '100%', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px #0001', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#ffd1dc', color: '#C8377C' }}>
            <th style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Usuário</th>
            <th style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Ação</th>
            <th style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Data/Hora</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr><td colSpan="3" style={{ textAlign: 'center', color: '#888' }}>Nenhum log encontrado.</td></tr>
          ) : (
            logs.map(log => (
              <tr key={log.id}>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{log.usuario}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{log.acao}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{log.dataHora || log.data_hora}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h2>Subcategorias</h2>
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
                <button onClick={() => handleEditSubcategoria(sub)}>Editar</button>
                <button onClick={() => handleDeleteSubcategoria(sub.id)} style={{ marginLeft: 8 }}>Excluir</button>
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
        <button type="submit" className="btn btn-success">{editandoSubcategoria ? 'Salvar Alterações' : 'Adicionar Subcategoria'}</button>
        {editandoSubcategoria && <button type="button" onClick={() => { setEditandoSubcategoria(null); setNuevaSubcategoria({ nome: '', tipoId: '' }); }} className="btn btn-secondary" style={{ marginLeft: 8 }}>Cancelar</button>}
      </form>
      <button
        onClick={() => {
          localStorage.removeItem('usuarioLogado');
          navigate('/');
        }}
        className="btn btn-danger logout-btn"
        style={{ marginTop: 32 }}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Admin;
