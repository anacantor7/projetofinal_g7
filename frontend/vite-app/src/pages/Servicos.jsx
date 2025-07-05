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
    fetch('http://localhost:3000/api/servicos')
      .then(res => res.json())
      .then(data => setServicos(data));
    // Obtener profesionales
    fetch('http://localhost:3000/api/profissionais')
      .then(res => res.json())
      .then(data => setProfissionais(data));
    // Obtener horarios disponibles
    fetch('http://localhost:3000/api/horarios')
      .then(res => res.json())
      .then(data => setHorarios(data));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    setName("");
    navigate("/");
  };

  return (
    <div>
      <h1>Bem-vindo, {name}</h1>
      <div className="servicos-container">
        <div className="servico-container">
          <header className="servico-header">SERVIÇOS</header>
          <h2 className="titulo">ESCOLHA SEU SERVIÇO</h2>
          <div className="botoes-servico">
            {servicos.map(servico => (
              <button
                key={servico.id}
                className={servicoSelecionado === servico.id ? "btn-roxo" : "btn-rosa"}
                onClick={() => setServicoSelecionado(servico.id)}
              >
                {servico.nome}
              </button>
            ))}
          </div>
          {/* Seleção de dia */}
          {servicoSelecionado && (
            <>
              <h3>Selecione o dia:</h3>
              <div className="dias">
                {[...Array(7)].map((_, i) => {
                  const data = new Date();
                  data.setDate(data.getDate() + i);
                  const label = data.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' });
                  return (
                    <button
                      key={i}
                      className={diaSelecionado === i ? "btn-roxo" : "btn-rosa"}
                      onClick={() => setDiaSelecionado(i)}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </>
          )}
          {/* Mostrar horario de trabalho da loja ao selecionar dia */}
          {diaSelecionado !== null && (
            <>
              <h3>Horário de trabalho da loja:</h3>
              <div className="horarios">
                {horarioTrabalho.map(hora => (
                  <span key={hora} className="btn-rosa" style={{ margin: 4 }}>{hora}</span>
                ))}
              </div>
            </>
          )}
          {servicoSelecionado && (
            <>
              <h3>Profissionais disponíveis:</h3>
              <div className="profissionais">
                {profissionais
                  .filter(p => p.servicoId === servicoSelecionado)
                  .map(profissional => (
                    <div
                      key={profissional.id}
                      className={profissionalSelecionado === profissional.id ? "profissional selecionado" : "profissional"}
                      onClick={() => setProfissionalSelecionado(profissional.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <FaUser className="icon" />
                      <span>{profissional.nome} - {profissional.funcao}</span>
                      <FaArrowRight className="icon seta" />
                    </div>
                  ))}
              </div>
            </>
          )}
          {profissionalSelecionado && (
            <>
              <h3>Horários disponíveis:</h3>
              <div className="horarios">
                {horarios
                  .filter(h => h.profissionalId === profissionalSelecionado)
                  .map(horario => (
                    <button
                      key={horario.id}
                      className={horarioSelecionado === horario.id ? "btn-roxo" : "btn-rosa"}
                      onClick={() => setHorarioSelecionado(horario.id)}
                    >
                      {horario.hora}
                    </button>
                  ))}
              </div>
            </>
          )}
          <button onClick={handleLogout}>Sair</button>
        </div>
      </div>
    </div>
  );
}
