import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaArrowRight } from "react-icons/fa";

export default function Servicos() {
  const [name, setName] = useState("");
  const [servicos, setServicos] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Función para filtrar servicios de teste
  function filtrarServicosValidos(servicos) {
    return servicos.filter(s => {
      const nomeServico = s.nome.toLowerCase().trim();
      
      // Padrões básicos de teste para serviços
      const isTestServico = nomeServico.includes('test') || 
                            nomeServico.includes('teste') || 
                            nomeServico.includes('temp') || 
                            nomeServico.includes('exemplo') ||
                            nomeServico.includes('demo') ||
                            nomeServico.includes('corte teste') ||
                            nomeServico === 'corte' ||
                            nomeServico.includes('xxx') ||
                            nomeServico.length < 3;
                            
      return !isTestServico;
    });
  }
  
  // Función para filtrar profissionais de teste
  function filtrarProfissionaisValidos(profissionais) {
    return profissionais.filter(p => {
      const nomeProfissional = p.nome.toLowerCase().trim();
      
      // Padrões básicos de teste
      const isTestProfessional = nomeProfissional.includes('test') || 
                                 nomeProfissional.includes('teste') || 
                                 nomeProfissional.includes('temp') || 
                                 nomeProfissional.includes('exemplo') ||
                                 nomeProfissional.includes('demo') ||
                                 nomeProfissional.startsWith('aa') ||
                                 nomeProfissional.includes('111') ||
                                 nomeProfissional.includes('222') ||
                                 nomeProfissional.includes('333') ||
                                 nomeProfissional.includes('xxx') ||
                                 nomeProfissional.length < 3 ||
                                 nomeProfissional === 'admin' ||
                                 nomeProfissional === 'user';
      
      // Verificar se contém timestamps (sequências longas de números)
      const contemTimestamp = /\d{10,}/.test(nomeProfissional);
      
      // Verificar se é um padrão de profissional genérico com números
      const profissionalGenerico = /^(ana profissional|profissional manicure|profissional)\s*\d+/i.test(nomeProfissional);
      
      // Verificar se contém "cabelo teste" ou "manicure" seguido de números no nome
      const servicoComNumeros = /(cabelo teste|manicure)\s*\d+/i.test(nomeProfissional);
      
      // Verificar padrão específico "Ana profissional [números]"
      const anaComNumeros = /^ana profissional\s+\d+/i.test(nomeProfissional);
      
      // Verificar padrão "Profissional manicure [números]"
      const manicureComNumeros = /^profissional manicure\s+\d+/i.test(nomeProfissional);
      
      return !isTestProfessional && !contemTimestamp && !profissionalGenerico && 
             !servicoComNumeros && !anaComNumeros && !manicureComNumeros;
    });
  }

  useEffect(() => {
    // Obter usuário logado e atualizar com cada cliente
    const usuario = localStorage.getItem('usuarioLogado');
    if (usuario) {
      const userData = JSON.parse(usuario);
      // Atualizar com dados completos do cliente
      fetch(`http://localhost:3000/clientes/${userData.id}`)
        .then(res => {
          if (!res.ok) throw new Error('Erro ao buscar dados do cliente');
          return res.json();
        })
        .then(clienteData => {
          setName(clienteData.nome);
          console.log('[SERVICOS] Dados do cliente atualizados:', clienteData);
        })
        .catch(err => {
          console.error('[SERVICOS] Erro ao atualizar dados do cliente:', err);
          // Usa os dados do localStorage caso a atualização falhe
          setName(userData.nome);
        });
    } else {
      navigate('/');
    }
    // Obter serviços
    fetch('http://localhost:3000/servicos')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar serviços');
        return res.json();
      })
      .then(data => {
        // Filtrar serviços para mostrar apenas os reais
        const servicosValidos = filtrarServicosValidos(Array.isArray(data) ? data : []);
        console.log('[SERVICOS] Serviços filtrados:', servicosValidos);
        setServicos(servicosValidos);
      })
      .catch(err => setError(err.message));
    // Obter profissionais
    fetch('http://localhost:3000/profissionais')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar profissionais');
        return res.json();
      })
      .then(data => {
        // Filtrar profissionais para mostrar apenas os reais
        const profissionaisValidos = filtrarProfissionaisValidos(Array.isArray(data) ? data : []);
        console.log('[SERVICOS] Profissionais filtrados:', profissionaisValidos);
        setProfissionais(profissionaisValidos);
      })
      .catch(err => setError(err.message));
    // Obter horários disponíveis (agendamentos)
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
      <h1 className="userinfo page-title">Bem-vindo, {name}</h1>
      {error && (
        <div className="text-error">
          Erro: {error}
        </div>
      )}
      <div className="servicos-container">
        <div className="servico-container">
          <h2 className="servico-header">SERVIÇOS</h2>
          <h2 className="titulo">Conheça nossos serviços e profissionais</h2>
          <div className="servicos-grid">
            {servicos.map(servico => (
              <div key={servico.id} className="servico-card">
                <h3 className="servico-title">{servico.nome}</h3>
                <p className="servico-description">{servico.descricao || 'Descrição não disponível.'}</p>
                <div className="servico-professionals">
                  <strong>Profissionais:</strong>
                  <ul className="service-professional-list">
                    {profissionais.filter(p => p.servicoId === servico.id).length === 0 && (
                      <li>Nenhum profissional cadastrado.</li>
                    )}
                    {profissionais.filter(p => p.servicoId === servico.id).map(profissional => (
                      <li key={profissional.id}>
                        <FaUser className="mr-4" />
                        {profissional.nome} - {profissional.funcao}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="servico-schedules">
                  <strong>Horários disponíveis:</strong>
                  <div className="schedules-grid">
                    {horarios.filter(h => h.servicoId === servico.id).length === 0 && (
                      <span className="text-muted-gray">Nenhum horário disponível.</span>
                    )}
                    {horarios.filter(h => h.servicoId === servico.id).map(horario => (
                      <span key={horario.id} className="btn-rosa schedule-item">{horario.hora} - {horario.data}</span>
                    ))}
                  </div>
                </div>
                <div className="servico-cta">
                  <span className="text-schedule-cta">Agende já!</span>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleVoltar} className="btn-voltar">Voltar</button>
        </div>
      </div>
    </div>
  );
}
