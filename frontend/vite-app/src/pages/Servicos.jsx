import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaArrowRight } from "react-icons/fa";

export default function Servicos() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching user data
    const userData = { name: "John Doe", password: "123456" };
    setName(userData.name);
    setPassword(userData.password);
  }, []);

  const handleLogout = () => {
    // Clear user data and redirect to login page
    setName("");
    setPassword("");
    navigate("/");
  };

  return (
    <div>
      <h1>Bem-vindo, {name}</h1>

      <div className="servicos-container">
        <div className="servico-container">
          <header className="servico-header">SERVIÇOS</header>
          <h2 className="titulo">ESCOLHE TEU SERVIÇO</h2>

          <div className="botoes-servico">
            <button className="btn-roxo">CABELO</button>
            <button className="btn-rosa">UNHAS</button>
          </div>

          <div className="profissionais">
            <div className="profissional">
              <FaUser className="icon" />
              <span>MARIA - CABELELEIRA</span>
              <FaArrowRight className="icon seta" />
            </div>
            <div className="profissional">
              <FaUser className="icon" />
              <span>ISABEL - MANICURISTA</span>
              <FaArrowRight className="icon seta" />
            </div>
            <button onClick={handleLogout}>Sair</button>
          </div>
        </div>
      </div>
    </div>
  );
}
