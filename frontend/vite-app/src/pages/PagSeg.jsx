import react from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function PagSeg() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching user data
    const userData = { name: 'John Doe', password: '123456' };
    setName(userData.name);
    setPassword(userData.password);
  }, []);

  const handleLogout = () => {
    // Clear user data and redirect to login page
    setName('');
    setPassword('');
    navigate('/');
  };

  return (
    <div className='PagSeg-body'>
      <h1>Bem-vindo, {name}</h1>
      <p>Você está na página de serviços.</p>
      <p>Selecione uma opção abaixo:</p>
        <div className="PagSeg-container">
        <button onClick={() => alert('Agendar')}>Agendar</button>
        <button onClick={() => alert('Serviços')}>Serviços</button>
        <button onClick={() => alert('Feedback')}>Feedback</button>
        </div>
        <button onClick={handleLogout}>Sair</button>
    </div>
  );
}