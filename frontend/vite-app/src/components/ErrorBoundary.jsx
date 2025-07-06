import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: '#C8377C', textAlign: 'center' }}>
          <h2>Ocorreu um erro inesperado.</h2>
          <p>Por favor, tente recarregar a página ou entre em contato com o suporte.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
