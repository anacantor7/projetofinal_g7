import React from "react";

const RecuperarSenha = () => {
  return (
    <div>
      <h1>Recuperar Senha</h1>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default RecuperarSenha;
