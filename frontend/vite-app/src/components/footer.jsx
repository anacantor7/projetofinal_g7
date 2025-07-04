import React from "react";


const Footer = () => {
  return (
    <footer style={{ background: '#fff', color: '#C8377C', textAlign: 'center', padding: '18px 0', borderTop: '1px solid #eee', marginTop: '40px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '24px', marginBottom: '8px' }}>
          <span style={{ fontWeight: 'bold' }}>© 2025 Bellizy. Todos os direitos reservados.</span>
          <span>Contato: <a href="mailto:contato@bellizy.com" style={{ color: '#C8377C', textDecoration: 'underline' }}>contato@bellizy.com</a></span>
          <span>Siga-nos no <a href="https://instagram.com/bellizyapp" target="_blank" rel="noopener noreferrer" style={{ color: '#C8377C', textDecoration: 'underline' }}>Instagram</a></span>
          <span><a href="#" style={{ color: '#C8377C', textDecoration: 'underline' }}>Política de Privacidade</a> | <a href="#" style={{ color: '#C8377C', textDecoration: 'underline' }}>Termos de Serviço</a></span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', fontSize: '0.95em' }}>
          <span>Versão 1.0.0</span>
          <span>Última atualização: Julho 2025</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


