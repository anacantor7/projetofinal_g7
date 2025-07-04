import React from "react";
import { useNavigate } from "react-router-dom";

const RecuperarSenha = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <h1>Recuperar Senha</h1>
      <form style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '28px 22px', maxWidth: '320px', width: '100%' }}>
        <div style={{ marginBottom: '18px' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            style={{ background: '#fff', border: '1px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', background: '#C8377C', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Enviar</button>
        <button type="button" onClick={() => navigate('/')} style={{ width: '100%', marginTop: '10px', background: '#ffd1dc', color: '#C8377C', border: '1px solid #C8377C', borderRadius: '4px', padding: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Voltar</button>
      </form>
    </div>
  );
};

export default RecuperarSenha;
