import React, { useState } from "react";

const Cadastro = () => {
    const [mensagem, setMensagem] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        // Adaptar os nomes dos campos para coincidir com o backend
        const data = {
            nome: formData.get("name"),
            telefone: formData.get("phone"),
            email: formData.get("email"),
            senha: formData.get("password")
        };
        try {
            const response = await fetch("http://localhost:3000/clientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                setMensagem("Cliente cadastrado com sucesso!");
                event.target.reset();
                setTimeout(() => {
                    window.location.href = "/";
                }, 1500); // Espera 1.5 segundos antes de redirigir
            } else {
                const erro = await response.json();
                setMensagem(erro.erro || "Erro ao cadastrar cliente");
            }
        } catch {
            setMensagem("Erro de conexão com o servidor");
        }
    };

  return (
    <div className="page-container">
      <div className="form-container" style={{ maxWidth: '500px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.2rem' }}>
          Criar Conta
        </h1>

        {mensagem && (
          <div className={`message ${mensagem.includes('sucesso') ? 'success' : 'error'}`}>
            {mensagem}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Nome Completo:</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="form-input"
              placeholder="Digite seu nome completo"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">Telefone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="form-input"
              placeholder="(11) 99999-9999"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="form-input"
              placeholder="Digite seu email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Senha:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="form-input"
              placeholder="Digite sua senha"
              minLength="6"
            />
          </div>

          <button type="submit" className="form-button">
            Criar Conta
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ marginBottom: '0.5rem', color: '#666' }}>
            Já tem uma conta?
          </p>
          <a
            href="/"
            style={{
              color: '#C8377C',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1rem'
            }}
          >
            Fazer login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
