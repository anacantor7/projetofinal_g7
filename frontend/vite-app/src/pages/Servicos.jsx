import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaArrowRight } from "react-icons/fa";

export default function Servicos() {
  const [name, setName] = useState("");
  const [servicos, setServicos] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const horarioTrabalho = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  useEffect(() => {
    // Obtener usuario logueado
    const usuario = localStorage.getItem('usuarioLogado');
    if (usuario) {
      const userData = JSON.parse(usuario);
      setName(userData.nome);
    } else {
      navigate('/');
    }
    // Obtener servicios
    fetch('http://localhost:3000/servicos')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar serviços');
        return res.json();
      })
      .then(data => setServicos(data))
      .catch(err => setError(err.message));
    // Obtener profesionales
    fetch('http://localhost:3000/profissionais')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar profissionais');
        return res.json();
      })
      .then(data => setProfissionais(data))
      .catch(err => setError(err.message));
    // Obtener horarios disponibles (agendamentos)
    fetch('http://localhost:3000/agendamentos')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar horários');
        return res.json();
      })
      .then(data => setHorarios(data))
      .catch(err => setError(err.message));
  }, [navigate]);

  const handleVoltar = () => {
    navigate('/PagSeg');
  };

  return (
    <div>
      <h1>Bem-vindo, {name}</h1>
      {error && (
        <div style={{ color: 'red', marginBottom: 16, fontWeight: 'bold' }}>
          Erro: {error}
        </div>
      )}
      <div className="servicos-container">
        <div className="servico-container">
          <h2 className="servico-header">SERVIÇOS</h2>
          <h2 className="titulo">Conheça nossos serviços e profissionais</h2>
          <div className="botoes-servico" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            {servicos.map(servico => (
              <div key={servico.id} className="servico-card" style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, minWidth: 220 }}>
                <h3 style={{ color: '#a020f0' }}>{servico.nome}</h3>
                <p>{servico.descricao || 'Descrição não disponível.'}</p>
                <div style={{ marginTop: 8 }}>
                  <strong>Profissionais:</strong>
                  <ul style={{ paddingLeft: 18 }}>
                    {profissionais.filter(p => p.servicoId === servico.id).length === 0 && (
                      <li>Nenhum profissional cadastrado.</li>
                    )}
                    {profissionais.filter(p => p.servicoId === servico.id).map(profissional => (
                      <li key={profissional.id}>
                        <FaUser style={{ marginRight: 4 }} />
                        {profissional.nome} - {profissional.funcao}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginTop: 8 }}>
                  <strong>Horários disponíveis:</strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
                    {horarios.filter(h => h.servicoId === servico.id).length === 0 && (
                      <span style={{ color: '#888' }}>Nenhum horário disponível.</span>
                    )}
                    {horarios.filter(h => h.servicoId === servico.id).map(horario => (
                      <span key={horario.id} className="btn-rosa" style={{ margin: 2 }}>{horario.hora} - {horario.data}</span>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: 12, textAlign: 'center' }}>
                  <span style={{ color: '#e75480', fontWeight: 'bold' }}>Agende já!</span>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleVoltar} style={{ marginTop: 32 }}>Voltar</button>
        </div>
      </div>
    </div>
  );
}
