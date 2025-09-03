import React from "react";
import { useNavigate } from "react-router-dom";

const RecuperarSenha = () => {
  const navigate = useNavigate();
  return (
    <div className="recovery-container">
      <h1 className="page-title">Recuperar Senha</h1>
      <form className="recovery-form">
        <div className="form-group-large">
          <label htmlFor="email" className="form-label" style={{ color: '#C8377C', display: 'block', marginBottom: '6px' }}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="btn-submit">Enviar</button>
        <button type="button" onClick={() => navigate('/')} className="btn-submit" style={{ marginTop: '10px', background: '#ffd1dc', color: '#C8377C', border: '1px solid #C8377C' }}>Voltar</button>
      </form>
    </div>
  );
};

export default RecuperarSenha;
