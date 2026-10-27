import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('StudyOS React ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    try {
      localStorage.clear();
      window.location.reload();
    } catch {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8fafc',
          padding: '24px',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            maxWidth: '520px',
            width: '100%',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0',
            textAlign: 'center'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              fontSize: '28px'
            }}>
              ⚠️
            </div>
            
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
              StudyOS Encountered an Error
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5', marginBottom: '24px' }}>
              We encountered a rendering issue. Your study notes and local tasks are safe.
            </p>

            {this.state.error && (
              <div style={{
                textAlign: 'left',
                backgroundColor: '#f1f5f9',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '12px',
                color: '#334155',
                fontFamily: 'monospace',
                marginBottom: '24px',
                maxHeight: '120px',
                overflowY: 'auto',
                whiteSpace: 'pre-wrap'
              }}>
                {this.state.error.toString()}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={this.handleReload}
                style={{
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  fontWeight: '600',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background-color 0.15s ease'
                }}
              >
                Reload Application
              </button>
              <button
                onClick={this.handleReset}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#475569',
                  fontWeight: '500',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Reset App Data
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
