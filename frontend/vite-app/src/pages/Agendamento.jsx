import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Agendamento({ onDateSelect = () => {} }) {
  const [selectedDate, setSelectedDate] = useState('');
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

  const horarios = {
    '2025-09-23': ['10:00', '11:00'],
    '2025-09-24': ['09:30', '12:00'],
  };

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
        <h3 style={{ color: "#e75480" }}>Disponibilidade de horário para Cabelo</h3>
        {selectedDate && horarios[selectedDate]?.length > 0 ? (
          horarios[selectedDate].map((hora, index) => (
            <button key={index} style={{ margin: "4px", padding: "8px 16px", borderRadius: "4px", border: "1px solid #e75480", background: "#ffd1dc", color: "#e75480", cursor: "pointer" }}>{hora}</button>
          ))
        ) : selectedDate ? (
          <p style={{ color: "#e75480" }}>Não há horários disponíveis para esta data.</p>
        ) : (
          <p style={{ color: "#e75480" }}>Selecione uma data para ver os horários.</p>
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
