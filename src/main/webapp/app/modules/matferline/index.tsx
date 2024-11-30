import React from 'react';

export default function Matferline() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center',
        gap: '20px',
      }}
    >
      <h1 style={{ color: '#01458e' }}>MATFERLINE</h1>
      <p style={{ fontSize: '1.2em', color: '#01458e' }}>
        Realiza pruebas teóricas a través de Matferline
      </p>
      <img
        src="content/images/matferline.png"
        alt="Matferline"
        style={{
          maxWidth: '100%',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      />
      <a
        href="https://www.matferline.com/acceso/index.php"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: '#01458e',
          textDecoration: 'none',
          fontWeight: 'bold',
          marginTop: '20px',
        }}
      >
        Accede a Matferline
      </a>
    </div>
  );
}
