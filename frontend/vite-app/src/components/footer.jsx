import React from "react";
import { FaInstagram, FaEnvelope, FaFileContract } from "react-icons/fa";


const Footer = () => {
  return (
    <footer style={{
      background: "linear-gradient(90deg, #fff 60%, #fce4ec 100%)",
      color: "#C8377C",
      textAlign: "center",
      padding: "32px 0 28px 0",
      marginTop: "40px",
      boxShadow: "0 -2px 16px 0 #f8bbd0",
      borderTopLeftRadius: "18px",
      borderTopRightRadius: "18px",
      position: "relative",
      zIndex: 10
    }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "28px",
          marginBottom: "12px"
        }}>
          <span style={{ fontWeight: "bold" }}>© 2025 Bellizy. Todos os direitos reservados.</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <FaEnvelope style={{ color: "#C8377C" }} />
            <a href="mailto:contato@bellizy.com" style={{ color: "#C8377C", textDecoration: "underline", fontWeight: 500 }}>contato@bellizy.com</a>
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <FaInstagram style={{ color: "#C8377C" }} />
            <a href="https://instagram.com/bellizyapp" target="_blank" rel="noopener noreferrer" style={{ color: "#C8377C", textDecoration: "underline", fontWeight: 500 }}>Instagram</a>
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <FaFileContract style={{ color: "#C8377C" }} />
            <a href="#" style={{ color: "#C8377C", textDecoration: "underline", fontWeight: 500 }}>Política de Privacidade</a>
            <span style={{ color: "#C8377C", fontWeight: 400 }}>|</span>
            <a href="#" style={{ color: "#C8377C", textDecoration: "underline", fontWeight: 500 }}>Termos de Serviço</a>
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", fontSize: "0.95em" }}>
          <span>Versão 1.0.0</span>
          <span>Última atualização: Julho 2025</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


