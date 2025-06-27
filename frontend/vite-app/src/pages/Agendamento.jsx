import { useState } from "react";

export default function Agendamento({ onDateSelect = () => {} }) {
  const [selectedDate, setSelectedDate] = useState('');
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Genera un array con los días del mes actual
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Formatea la fecha seleccionada a YYYY-MM-DD
  const formatDate = (day) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  // Obtiene el nombre del día de la semana
  const getWeekDay = (day) => {
    const date = new Date(year, month, day);
    return date.toLocaleDateString('es-ES', { weekday: 'short' }); // Ej: "lun.", "mar."
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

  return (
    <div style={{ border: "2px solid #e75480", borderRadius: "8px", padding: "32px", background: "#ffe4ec", maxWidth: "600px", margin: "0 auto" }}>
      <div className="Agendamentos-container">
        <label>Selecciona una fecha del mes:</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", margin: "16px 0" }}>
          {daysArray.map((day) => (
            <button
              key={day}
              style={{
                padding: "10px",
                background: selectedDate === formatDate(day) ? "#e75480" : "#ffd1dc",
                color: selectedDate === formatDate(day) ? "#fff" : "#000",
                border: "1px solid #e75480",
                borderRadius: "4px",
                cursor: "pointer",
                width: "70px",
                flexDirection: "column",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              onClick={() => handleDayClick(day)}
            >
              <span style={{ fontSize: "0.8em", color: "#e75480" }}>{getWeekDay(day)}</span>
              <span>{day}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="horarios-container" style={{ marginTop: "28px" }}>
        <h3 style={{ color: "#e75480" }}>Disponibilidade de horário para Cabelho</h3>
        {selectedDate && horarios[selectedDate]?.length > 0 ? (
          horarios[selectedDate].map((hora, index) => (
            <button key={index} style={{ margin: "4px", padding: "8px 16px", borderRadius: "4px", border: "1px solid #e75480", background: "#ffd1dc", color: "#e75480", cursor: "pointer" }}>{hora}</button>
          ))
        ) : selectedDate ? (
          <p style={{ color: "#e75480" }}>No hay horarios disponibles para esta fecha.</p>
        ) : (
          <p style={{ color: "#e75480" }}>Selecciona una fecha para ver los horarios.</p>
        )}
      </div>
      
      <div className="horarios-container" style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
        <button className="btn btn-primary m-2" style={{ padding: "12px 28px", backgroundColor: "#e75480", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Confirmar Agendamento
        </button>
        <button className="btn btn-secondary m-2" style={{ padding: "12px 28px", backgroundColor: "#ffd1dc", color: "#e75480", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Cancelar Agendamento
        </button>
        <button className="btn btn-secondary m-2" style={{ padding: "12px 28px", backgroundColor: "#ffd1dc", color: "#e75480", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Reset Agendamento
        </button>
        <button className="btn btn-secondary m-2" style={{ padding: "12px 28px", backgroundColor: "#ffd1dc", color: "#e75480", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Voltar
        </button>
      </div>
    </div>
  );
}
