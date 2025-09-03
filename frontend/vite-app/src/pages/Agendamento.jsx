import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { capitalizeName } from '../utils/textUtils';

export default function Agendamento({ onDateSelect = () => {} }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [servicos, setServicos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [servicoSelecionado, setServicoSelecionado] = useState('');
  const [profissionais, setProfissionais] = useState([]);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState('');
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [categoriaManicure, setCategoriaManicure] = useState('');
  const [horaSelecionada, setHoraSelecionada] = useState('');
  const [subcategorias, setSubcategorias] = useState([]);
  const [subcategoriaSelecionada, setSubcategoriaSelecionada] = useState('');
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const navigate = useNavigate();

  // Array de días del mes actual
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Formata a data selecionada para YYYY-MM-DD
  const formatDate = (day) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  // Obtém o nome do dia da semana em português e o número do dia da semana (0=domingo)
  const getWeekDay = (day) => {
    const date = new Date(year, month, day);
    return {
      label: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
      weekDay: date.getDay()
    };
  };

  // Obtém o nome do mês em português
  const getMonthName = () => {
    return today.toLocaleDateString('pt-BR', { month: 'long' });
  };

  // Función para crear el calendario completo 6x7
  const createCalendarGrid = () => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayWeekday = firstDayOfMonth.getDay(); // 0 = domingo
    const daysInMonth = lastDayOfMonth.getDate();
    
    // Días del mes anterior para completar la primera semana
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
    
    // Días del mes siguiente para completar la última semana
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    
    const calendarDays = [];
    
    // Agregar días del mes anterior
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      calendarDays.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        isNextMonth: false,
        isPrevMonth: true,
        date: new Date(prevYear, prevMonth, daysInPrevMonth - i)
      });
    }
    
    // Agregar días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push({
        day: day,
        isCurrentMonth: true,
        isNextMonth: false,
        isPrevMonth: false,
        date: new Date(year, month, day)
      });
    }
    
    // Agregar días del mes siguiente para completar 42 días (6 semanas × 7 días)
    const remainingDays = 42 - calendarDays.length;
    for (let day = 1; day <= remainingDays; day++) {
      calendarDays.push({
        day: day,
        isCurrentMonth: false,
        isNextMonth: true,
        isPrevMonth: false,
        date: new Date(nextYear, nextMonth, day)
      });
    }
    
    return calendarDays;
  };

  // Headers de los días de la semana
  const weekdayHeaders = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  // Función para determinar la clase CSS del día
  const getDayClasses = (dayInfo) => {
    const classes = ['calendar-day-btn'];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (!dayInfo.isCurrentMonth) {
      classes.push('other-month');
      return classes.join(' ');
    }
    
    const dayDate = new Date(dayInfo.date);
    dayDate.setHours(0, 0, 0, 0);
    
    const isPast = dayDate < today;
    const isSunday = dayDate.getDay() === 0;
    const isToday = dayDate.getTime() === today.getTime();
    const isSelected = selectedDate === formatDate(dayInfo.day);
    
    if (isPast || isSunday) {
      classes.push('disabled');
    } else {
      classes.push('available');
    }
    
    if (isToday) {
      classes.push('today');
    }
    
    if (isSelected) {
      classes.push('selected');
    }
    
    return classes.join(' ');
  };

  // Función para normalizar acentos y minúsculas
  function normalize(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ç/g, 'c');
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
    // Cargar tipos de servicio al iniciar
    fetch('http://localhost:3000/tipos')
      .then(res => res.json())
      .then(data => setTipos(data));
    
    // Cargar apenas servicios ativos (não incluir serviços de teste/inativos)
    fetch('http://localhost:3000/servicos?ativo=true')
      .then(res => res.json())
      .then(data => {
        // Filtrar adicionalmente serviços que parecem ser de teste
        const servicosValidos = data.filter(s => {
          const nomeServico = s.nome.toLowerCase();
          const isTestService = nomeServico.includes('test') || 
                                nomeServico.includes('teste') || 
                                nomeServico.includes('temp') || 
                                nomeServico.includes('exemplo') ||
                                nomeServico.includes('demo') ||
                                nomeServico.startsWith('aa') ||
                                nomeServico.includes('111') ||
                                nomeServico.includes('222') ||
                                nomeServico.includes('333') ||
                                nomeServico.includes('xxx') ||
                                nomeServico.length < 3; // Nomes muito curtos provavelmente são teste
          return !isTestService;
        });
        setServicos(servicosValidos);
      });
    
    // Cargar subcategorias al iniciar
    fetch('http://localhost:3000/subcategorias')
      .then(res => res.json())
      .then(data => setSubcategorias(data));
  }, []);

  useEffect(() => {
    // Cargar profissionais filtrados por serviço e subcategoria
    if (servicoSelecionado) {
      const servico = servicos.find(s => String(s.id) === String(servicoSelecionado));
      let especialidade = '';
      let tipo = null;
      if (servico?.tipoId) {
        tipo = tipos.find(t => t.id === servico.tipoId);
        especialidade = tipo?.nome || '';
      } else if (servico?.tipo && servico.tipo.nome) {
        tipo = servico.tipo;
        especialidade = servico.tipo.nome;
      } else {
        especialidade = servico?.nome || '';
      }
      // LOG extra para depuração de dados de servicio e tipo
      console.log('[AGENDAMENTO] Objeto servico:', servico);
      console.log('[AGENDAMENTO] Objeto tipo:', tipo);
      // Si es Manicure y hay categoría seleccionada, usar la categoría como especialidad
      if (servico?.nome && normalize(servico.nome) === 'manicure' && categoriaManicure) {
        especialidade = categoriaManicure;
      }
      // Si es Corte de cabelo y hay subcategoria seleccionada, usar la subcategoria
      if (servico?.nome && normalize(servico.nome).includes('cabelo') && subcategoriaSelecionada) {
        especialidade = subcategoriaSelecionada;
      }
      // Busca de profissionais: garantir que massagem sempre busca por 'massagem'
      if ((tipo && normalize(tipo.nome).includes('massagem')) || (servico?.nome && normalize(servico.nome).includes('massagem'))) {
        especialidade = 'massagem';
      }
      // LOG para depuração
      console.log('[AGENDAMENTO] Buscando TODOS os profissionais ativos (abordagem flexível)');
      fetch(`http://localhost:3000/profissionais?ativo=true`)
        .then(res => res.json())
        .then(data => {
          console.log('[AGENDAMENTO] Resposta de profissionais (bruta):', data);
          // Filtrar profissionais válidos (remover os de teste)
          const profissionaisValidos = filtrarProfissionaisValidos(Array.isArray(data) ? data : []);
          console.log('[AGENDAMENTO] Profissionais filtrados:', profissionaisValidos);
          setProfissionais(profissionaisValidos);
        })
        .catch(error => {
          console.error('[AGENDAMENTO] Erro ao buscar profissionais:', error);
          setProfissionais([]);
        });
      setProfissionalSelecionado('');
      setHoraSelecionada('');
    } else {
      setProfissionais([]);
      setProfissionalSelecionado('');
      setHoraSelecionada('');
    }
  }, [servicoSelecionado, servicos, tipos, categoriaManicure, subcategoriaSelecionada]);

  useEffect(() => {
    // Cargar horarios disponibles cuando se selecciona fecha, servicio y profesional
    if (selectedDate && servicoSelecionado && profissionalSelecionado) {
      console.log('DEBUG:', { selectedDate, servicoSelecionado, profissionalSelecionado, profissionais });
      // Adicionando log detalhado para depuração
      console.log('Requisição para horários:', `http://localhost:3000/agendamentos?data=${selectedDate}&profissionalId=${profissionalSelecionado}`);
      fetch(`http://localhost:3000/agendamentos?data=${selectedDate}&profissionalId=${profissionalSelecionado}`)
        .then(res => res.json())
        .then(data => {
          console.log('DEBUG horarios data:', data);
          if (!Array.isArray(data)) {
            setHorariosDisponiveis([]);
            alert(
              data && data.erro
                ? `Erro ao buscar horários: ${data.erro} | Parâmetros enviados: data=${selectedDate}, profissionalId=${profissionalSelecionado}`
                : 'Erro inesperado ao buscar horários. Tente novamente.'
            );
            return;
          }
          const ocupados = data.map(a => a.hora);
          const horarios = [];
          for (let h = 9; h < 18; h++) {
            ["00", "30"].forEach(min => {
              const hora = `${String(h).padStart(2, '0')}:${min}`;
              if (!ocupados.includes(hora)) horarios.push(hora);
            });
          }
          setHorariosDisponiveis(horarios);
        });
    } else {
      setHorariosDisponiveis([]);
    }
  }, [selectedDate, servicoSelecionado, profissionalSelecionado, profissionais]);

  const handleDayClick = (day) => {
    const dateStr = formatDate(day);
    setSelectedDate(dateStr);
    onDateSelect(dateStr);
  };

  // Botões de ação
  const handleConfirmar = async () => {
    // Validar seleção
    if (!profissionalSelecionado || !selectedDate || !horaSelecionada || !servicoSelecionado) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    // NOVA ABORDAGEM: Permitir que qualquer profissional atenda qualquer serviço
    // Removida a validação rigorosa de especialidade para maior flexibilidade
    const profissional = profissionais.find(p => String(p.id) === String(profissionalSelecionado));
    const servico = servicos.find(s => String(s.id) === String(servicoSelecionado));

    console.log('[AGENDAMENTO] Profissional selecionado:', profissional);
    console.log('[AGENDAMENTO] Serviço selecionado:', servico);
    console.log('[AGENDAMENTO] Validação de especialidade: DESABILITADA para maior flexibilidade');

    // Construir payload - usar especialidade do profissional se disponível
    const especialidadeProfissional = profissional?.especialidade || 'geral';
    
    const payload = {
      clienteId: JSON.parse(localStorage.getItem('usuarioLogado'))?.id, // Ajustar segundo login real
      servicoId: servicoSelecionado,
      profissionalId: profissionalSelecionado,
      data: selectedDate,
      hora: horaSelecionada,
      categoria: categoriaManicure ? categoriaManicure : null,
      especialidade: especialidadeProfissional
    };
    
    console.log('[AGENDAMENTO] Payload completo a ser enviado:', JSON.stringify(payload, null, 2));
    
    try {
      const response = await fetch('http://localhost:3000/agendamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      console.log('[AGENDAMENTO] Status da resposta:', response.status);
      console.log('[AGENDAMENTO] Headers da resposta:', Object.fromEntries(response.headers.entries()));
      
      if (response.ok) {
        const resultado = await response.json();
        console.log('[AGENDAMENTO] Sucesso:', resultado);
        alert('Agendamento confirmado!');
        navigate('/PagSeg');
      } else {
        const erro = await response.json();
        console.error('[AGENDAMENTO] Erro do servidor:', erro);
        alert(erro.erro || erro.message || 'Erro ao confirmar agendamento');
      }
    } catch (error) {
      console.error('[AGENDAMENTO] Erro de conexão:', error);
      alert('Erro de conexão com o servidor');
    }
  };
  const handleCancelar = () => {
    setSelectedDate('');
  };
  const handleVoltar = () => {
    navigate('/PagSeg');
  };

  return (
    <div className="agendamento-container">
      <div className="section-title">
        📋 Agendamento de Serviços
      </div>
      
      <div className="agendamento-sections">
        {/* Section de Formulários */}
        <div className="agendamento-form-section">
          <div className="section-title">
            🛍️ Seleção de Serviços
          </div>
          
          <div className="form-group">
            <label className="form-label">Escolha o serviço:</label>
            <select value={servicoSelecionado} onChange={e => { setServicoSelecionado(e.target.value); setCategoriaManicure(''); }} className="form-select">
              <option value="">Selecione...</option>
              {servicos.map(s => {
                const tipo = tipos.find(t => t.id === s.tipoId);
                return (
                  <option key={s.id} value={s.id}>
                    {capitalizeName(s.nome)} {tipo ? `(${capitalizeName(tipo.nome)})` : ''}
                  </option>
                );
              })}
            </select>
          </div>
          
          {/* Dropitem para Manicure */}
          {servicoSelecionado && servicos.find(s => String(s.id) === String(servicoSelecionado))?.nome.toLowerCase() === 'manicure' && (
            <div className="form-group">
              <label className="form-label">Categoria de Manicure:</label>
              <select value={categoriaManicure} onChange={e => setCategoriaManicure(e.target.value)} className="form-select">
                <option value="">Selecione...</option>
                <option value="unhas">Unhas</option>
                <option value="Manutenção">Manutenção</option>
              </select>
            </div>
          )}
          
          {/* Dropitem para subcategoria de cabelo */}
          {servicoSelecionado && servicos.find(s => String(s.id) === String(servicoSelecionado))?.nome.toLowerCase().includes('cabelo') && (
            <div className="form-group">
              <label className="form-label">Subcategoria de Cabelo:</label>
              <select value={subcategoriaSelecionada} onChange={e => setSubcategoriaSelecionada(e.target.value)} className="form-select">
                <option value="">Selecione...</option>
                {subcategorias.filter(sc => tipos.find(t => t.id === sc.tipoId)?.nome?.toLowerCase() === 'cabelo').map(sc => (
                  <option key={sc.id} value={sc.nome}>{capitalizeName(sc.nome)}</option>
                ))}
              </select>
            </div>
          )}
          
          {servicoSelecionado && (
            <div className="form-group">
              <label className="form-label">Escolha o profissional:</label>
              <select value={profissionalSelecionado} onChange={e => setProfissionalSelecionado(e.target.value)} className="form-select">
                <option value="">Selecione...</option>
                {profissionais.map(p => (
                  <option key={p.id} value={p.id}>
                    {capitalizeName(p.nome)} {p.especialidade ? `- Especialidade: ${capitalizeName(p.especialidade)}` : ''}
                  </option>
                ))}
              </select>
              {profissionais.length > 0 && (
                <div className="text-info">
                  💡 Todos os profissionais podem atender qualquer serviço
                </div>
              )}
            </div>
          )}
          
          {servicoSelecionado && profissionais.length === 0 && (
            <div className="form-group">
              <span className="text-warning">Nenhum profissional disponível para este serviço.</span>
            </div>
          )}
          
          {profissionais.length > 0 && (
            <div className="form-group">
              <label className="form-label">Profissionais disponíveis:</label>
              <ul className="professional-list">
                {profissionais.map(p => (
                  <li key={p.id} className="professional-list-item">{capitalizeName(p.nome)} ({p.especialidade})</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Section do Calendário */}
        <div className="agendamento-calendar-section">
          <div className="section-title">
            🗓️ Escolha a Data
          </div>
          
          <div className="calendar-header">
            <span className="calendar-month-year">{capitalizeName(getMonthName())} {year}</span>
          </div>
          
          <div className="calendar-grid">
            {weekdayHeaders.map(day => (
              <div key={day} className="calendar-weekday-header">{day}</div>
            ))}
            {createCalendarGrid().map((dayInfo, index) => (
              <button
                key={index}
                className={getDayClasses(dayInfo)}
                onClick={() => dayInfo.isCurrentMonth && getDayClasses(dayInfo).includes('available') && handleDayClick(dayInfo.day)}
                disabled={!dayInfo.isCurrentMonth || getDayClasses(dayInfo).includes('disabled')}
              >
                <div className="calendar-day-content">
                  <span className="calendar-day-number">{dayInfo.day}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Section dos Horários */}
        <div className="agendamento-schedule-section">
          <div className="section-title">
            🕒 Disponibilidade de Horário
          </div>
          
          {selectedDate && servicoSelecionado && profissionalSelecionado && horariosDisponiveis.length > 0 ? (
            <div className="schedule-grid">
              {horariosDisponiveis.map((hora, index) => (
                <button
                  key={index}
                  className={`schedule-time-btn ${horaSelecionada === hora ? 'selected' : ''}`}
                  onClick={() => setHoraSelecionada(hora)}
                >
                  {hora}
                </button>
              ))}
            </div>
          ) : selectedDate && servicoSelecionado && profissionalSelecionado ? (
            <p style={{ color: "#e75480", textAlign: "center", padding: "20px" }}>Não há horários disponíveis para esta data.</p>
          ) : (
            <p style={{ color: "#e75480", textAlign: "center", padding: "20px" }}>Selecione um serviço, profissional e uma data para ver os horários.</p>
          )}
        </div>

        {/* Section dos Botões de Ação */}
        <div className="agendamento-actions-section">
          <div className="section-title">
            🎯 Finalizar Agendamento
          </div>
          
          <div className="action-buttons-grid">
            <button onClick={handleConfirmar} className="action-btn primary">
              ✓ Confirmar Agendamento
            </button>
            <button onClick={handleCancelar} className="action-btn secondary">
              ✗ Cancelar
            </button>
            <button onClick={handleVoltar} className="action-btn secondary">
              ← Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
