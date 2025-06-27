import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation


export default function PageInit() {
  
  // Simulate fixed input for demonstration
  const name = "John Doe";
  const password = "123456";

  const handleLogin = () => {
    if (name && password) {
      console.log(`Login successful for ${name}`);
    } else {
      console.log('Please enter both name and password');
    }
  };
  // Simulate calling PagSeg on login
  const callPagSeg = () => {
    // Aquí iría la lógica para llamar a PagSeg
    // Por ejemplo, una llamada fetch simulada:
    fetch('https://api.pagseguro.com/endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Agrega aquí los headers necesarios, como Authorization si es necesario
      },
      body: JSON.stringify({ name, password }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Respuesta de PagSeg:', data);
      })
      .catch(error => {
        console.error('Error al llamar a PagSeg:', error);
      });
  };

  return (
    <>
      <h1>Seja bem-vindo {name}</h1>
      <div className='login-container'>
        <input type="text" placeholder="Digite seu nome" onChange={(e) => setName(e.target.value)} />
        <input type="password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)} />
        <button
          onClick={() => {
            handleLogin();
            callPagSeg();
          }}
        >
          login
        </button>
        <Link to="/cadastro">Cadastro</Link>
        <Link to="/recuperar-senha">Recuperar Senha</Link>
      </div>
    </>
  );
}