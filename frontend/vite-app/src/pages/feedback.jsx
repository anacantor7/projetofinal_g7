import react from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { capitalizeName } from '../utils/textUtils';



export default function Feedback() {
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();
  const handleVoltar = () => {
    navigate('/PagSeg');
  };

  useEffect(() => {
    // Obtener datos del usuario logueado desde localStorage
    const usuario = localStorage.getItem('usuarioLogado');
    if (usuario) {
      const userData = JSON.parse(usuario);
      setName(userData.nome);
      // Buscar agendamentos do usuário
      fetch(`http://localhost:3000/agendamentos?clienteId=${userData.id}`)
        .then(res => {
          if (!res.ok) throw new Error('Erro ao buscar agendamentos');
          return res.json();
        })
        .then(data => {
          setAgendamentos(data);
          setFetchError(false);
        })
        .catch(() => {
          setAgendamentos([]);
          setFetchError(true);
        });
    } else {
      // Si no hay usuario logueado, redirigir al login
      navigate('/');
    }
  }, [navigate]);
  const [name, setName] = useState('');
  const handleSubmit = () => {
    if (feedback) {
      console.log(`Feedback submitted: ${feedback}`);
      alert('Feedback submitted successfully!');
      navigate('/'); // Redirect to home after submission
    } else {
      alert('Please enter your feedback before submitting.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    setName('');
    navigate('/');
  };

  return (
    <div className="feedback-container">
      <div className="user-info">
              <div>👤 {capitalizeName(name)}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9, marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Cliente</div>
      </div>
      <button onClick={handleLogout} className="logout-btn">🚪 Sair</button>
      <h1>Sugestões</h1>
      <textarea className='feedback-textarea'
        placeholder="Suas Sugestões..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit} className='btn-primary'>Enviar</button>
      <button onClick={handleVoltar} style={{ marginTop: 32 }}>Voltar</button>
    </div>
  );
}

