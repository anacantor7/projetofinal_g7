import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Agendamento({ onDateSelect = () => {} }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [servicos, setServicos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [servicoSelecionado, setServicoSelecionado] = useState('');
  const [profissionais, setProfissionais] = useState([]);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState('');
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
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

  // Obtém o nome do dia da semana em português
  const getWeekDay = (day) => {
    const date = new Date(year, month, day);
    return date.toLocaleDateString('pt-BR', { weekday: 'short' }); // Ex: "seg.", "ter."
  };

  // Obtém o nome do mês em português
  const getMonthName = () => {
    return today.toLocaleDateString('pt-BR', { month: 'long' });
  };

  useEffect(() => {
    // Cargar tipos de servicio al iniciar
    fetch('http://localhost:3000/tipos')
      .then(res => res.json())
      .then(data => setTipos(data));
    // Cargar servicios al iniciar
    fetch('http://localhost:3000/servicos')
      .then(res => res.json())
      .then(data => setServicos(data));
  }, []);

  useEffect(() => {
    // Cargar profissionais filtrados por serviço
    if (servicoSelecionado) {
      const servico = servicos.find(s => String(s.id) === String(servicoSelecionado));
      // Buscar tipo do serviço pelo tipoId
      let especialidade = '';
      if (servico?.tipoId) {
        const tipo = tipos.find(t => t.id === servico.tipoId);
        especialidade = tipo?.nome || '';
      } else if (servico?.tipo && servico.tipo.nome) {
        especialidade = servico.tipo.nome;
      } else {
        especialidade = servico?.nome || '';
      }
      fetch(`http://localhost:3000/profissionais?especialidade=${encodeURIComponent(especialidade)}`)
        .then(res => res.json())
        .then(data => setProfissionais(data));
    } else {
      setProfissionais([]);
    }
    setProfissionalSelecionado('');
  }, [servicoSelecionado, servicos, tipos]);

  useEffect(() => {
    // Cargar horarios disponibles cuando se selecciona fecha, servicio y profesional
    if (selectedDate && servicoSelecionado && profissionalSelecionado) {
      fetch(`http://localhost:3000/agendamentos?data=${selectedDate}&servicoId=${servicoSelecionado}&profissionalId=${profissionalSelecionado}`)
        .then(res => res.json())
        .then(data => {
          // Extraer horarios ocupados y calcular disponibles (ejemplo: 09:00-18:00 cada 30min)
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
  }, [selectedDate, servicoSelecionado, profissionalSelecionado]);

  const handleDayClick = (day) => {
    const dateStr = formatDate(day);
    setSelectedDate(dateStr);
    onDateSelect(dateStr);
  };

  // Botões de ação
  const handleConfirmar = () => {
    // Lógica de confirmação
    alert('Agendamento confirmado!');
    navigate('/pagseg');
  };
  const handleCancelar = () => {
    setSelectedDate('');
  };
  const handleVoltar = () => {
    navigate('/pagseg');
  };

  return (
    <div style={{ border: "2px solid #e75480", borderRadius: "8px", padding: "32px", background: "#ffe4ec", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ marginBottom: 16 }}>
        <label style={{ color: '#C8377C', fontWeight: 'bold', fontSize: '1.1rem' }}>Escolha o serviço:</label>
        <select value={servicoSelecionado} onChange={e => setServicoSelecionado(e.target.value)} style={{ marginLeft: 8, padding: 8, borderRadius: 4 }}>
          <option value="">Selecione...</option>
          {servicos.map(s => {
            const tipo = tipos.find(t => t.id === s.tipoId);
            return (
              <option key={s.id} value={s.id}>
                {s.nome} {tipo ? `(${tipo.nome})` : ''}
              </option>
            );
          })}
        </select>
      </div>
      {servicoSelecionado && (
        <div style={{ marginBottom: 16 }}>
          <label style={{ color: '#C8377C', fontWeight: 'bold', fontSize: '1.1rem' }}>Escolha o profissional:</label>
          <select value={profissionalSelecionado} onChange={e => setProfissionalSelecionado(e.target.value)} style={{ marginLeft: 8, padding: 8, borderRadius: 4 }}>
            <option value="">Selecione...</option>
            {profissionais.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
          </select>
        </div>
      )}
      {profissionais.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <label style={{ color: '#C8377C', fontWeight: 'bold', fontSize: '1.1rem' }}>Profissionais disponíveis:</label>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {profissionais.map(p => (
              <li key={p.id} style={{ color: '#C8377C', fontWeight: 'normal' }}>{p.nome} ({p.especialidade})</li>
            ))}
          </ul>
        </div>
      )}
      <div className="Agendamentos-container">
        <label style={{ color: '#C8377C', fontWeight: 'bold', fontSize: '1.1rem' }}>Selecione uma data do mês de {getMonthName()}:</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", margin: "16px 0" }}>
          {daysArray.map((day) => (
            <button
              key={day}
              style={{
                padding: "10px",
                background: selectedDate === formatDate(day) ? "#C8377C" : "#ffd1dc",
                color: selectedDate === formatDate(day) ? "#fff" : "#C8377C",
                border: selectedDate === formatDate(day) ? "2px solid #C8377C" : "1px solid #e75480",
                borderRadius: "4px",
                cursor: "pointer",
                width: "70px",
                flexDirection: "column",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: selectedDate === formatDate(day) ? 'bold' : 'normal',
                boxShadow: selectedDate === formatDate(day) ? '0 0 8px #C8377C55' : 'none',
                transition: 'all 0.2s'
              }}
              onClick={() => handleDayClick(day)}
            >
              <span style={{ fontSize: "0.8em", color: selectedDate === formatDate(day) ? "#fff" : "#C8377C" }}>{getWeekDay(day)}</span>
              <span>{day}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="horarios-container" style={{ marginTop: "28px" }}>
        <h3 style={{ color: "#e75480" }}>Disponibilidade de horário</h3>
        {selectedDate && servicoSelecionado && profissionalSelecionado && horariosDisponiveis.length > 0 ? (
          horariosDisponiveis.map((hora, index) => (
            <button key={index} style={{ margin: "4px", padding: "8px 16px", borderRadius: "4px", border: "1px solid #e75480", background: "#ffd1dc", color: "#e75480", cursor: "pointer" }}>{hora}</button>
          ))
        ) : selectedDate && servicoSelecionado && profissionalSelecionado ? (
          <p style={{ color: "#e75480" }}>Não há horários disponíveis para esta data.</p>
        ) : (
          <p style={{ color: "#e75480" }}>Selecione um serviço, profissional e uma data para ver os horários.</p>
        )}
      </div>
      <div className="horarios-container" style={{ marginTop: "32px", display: "flex", flexDirection: 'column', gap: "12px", alignItems: 'center' }}>
        <button onClick={handleConfirmar} className="btn btn-primary m-2" style={{ padding: "12px 28px", backgroundColor: "#e75480", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", width: '220px' }}>
          Confirmar Agendamento
        </button>
        <button onClick={handleCancelar} className="btn btn-secondary m-2" style={{ padding: "12px 28px", backgroundColor: "#ffd1dc", color: "#e75480", border: "none", borderRadius: "4px", cursor: "pointer", width: '220px' }}>
          Cancelar
        </button>
        <button onClick={handleVoltar} className="btn btn-secondary m-2" style={{ padding: "12px 28px", backgroundColor: "#ffd1dc", color: "#e75480", border: "none", borderRadius: "4px", cursor: "pointer", width: '220px' }}>
          Voltar
        </button>
      </div>
    </div>
  );
}
