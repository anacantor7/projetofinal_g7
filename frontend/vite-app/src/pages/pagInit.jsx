import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation


export default function PageInit() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    if (name && password) {
      console.log(`Login successful for ${name}`);
    } else {
      console.log('Please enter both name and password');
    }
  };
  return (
    <>
      <h1>Seja bem-vindo {name}</h1>
      <div className='login-container'>
        <input type="text" placeholder="Digite seu nome" onChange={(e) => setName(e.target.value)} />
        <input type="password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}> login </button>
        <Link to="/cadastro">Cadastro</Link>
        <Link to="/recuperar-senha">Recuperar Senha</Link>
      </div>
    </>
  );
}