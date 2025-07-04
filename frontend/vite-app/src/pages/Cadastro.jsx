import React, { useState } from "react";

const Cadastro = () => {
    const [mensagem, setMensagem] = useState("");


    const handleBack = () => {
        // Implementar a lógica para voltar à página anterior ou redirecionar
        window.location.href = "/login"; // Redireciona para a página de login
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        // Adaptar los nombres de los campos para coincidir con el backend
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
            } else {
                const erro = await response.json();
                setMensagem(erro.erro || "Erro ao cadastrar cliente");
            }
        } catch (error) {
            setMensagem("Erro de conexão com o servidor");
        }
    };

  return (
    <div>
      <h1>Cadastro</h1>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input type="text" id="name" name="name" required style={{ background: '#fff', color: '#333', border: '1px solid #ccc', borderRadius: '4px', padding: '8px', maxWidth: '100%', width: '250px' }} />
        </div>
        <div>
          <label htmlFor="phone">Telefone:</label>
          <input type="text" id="phone" name="phone" required style={{ background: '#fff', color: '#333', border: '1px solid #ccc', borderRadius: '4px', padding: '8px', maxWidth: '100%', width: '250px' }} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required style={{ background: '#fff', color: '#333', border: '1px solid #ccc', borderRadius: '4px', padding: '8px', maxWidth: '100%', width: '250px' }} />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input type="password" id="password" name="password" required style={{ background: '#fff', color: '#333', border: '1px solid #ccc', borderRadius: '4px', padding: '8px', maxWidth: '100%', width: '250px' }} />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <button type="button" onClick={() => window.location.href = "/"}>Voltar</button>
    </div>
  );
};

export default Cadastro;
