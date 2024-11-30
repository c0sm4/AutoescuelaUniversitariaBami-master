import React from 'react';

export default function Contact() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center',
        color: '#01458e',
        fontFamily: 'sans-serif', // Asegura que se use la fuente sans-serif predeterminada
      }}
    >
      {/* Encabezado */}
      <h1
        style={{
          fontSize: '2.5em',
          fontWeight: 'bold',
          textTransform: 'uppercase',
        }}
      >
        AUTOESCUELA <br /> UNIVERSITARIA BAMI
      </h1>

      {/* Logo */}
      <img
        src="content/images/logo.png" // Cambiar por la ruta de tu logo
        alt="Logo Autoescuela"
        style={{ width: '150px', margin: '20px 0' }} // Tamaño del logo
      />

      {/* Sección de contacto */}
      <div
        style={{ fontSize: '1.2em', lineHeight: '1.8', fontWeight: 'normal' }}
      >
        <h5 style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
          Contacto:
        </h5>
        <p>Francisco José Millán Calleja</p>

        <h5 style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
          Tlf. Móvil:
        </h5>
        <p>
          687883411 <br /> 600588546
        </p>

        <h5 style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
          Tlf. Fijo:
        </h5>
        <p>954707080</p>

        <h5 style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
          Email:
        </h5>
        <p>aeuniversitariafranmillanbami@gmail.com</p>

        <h5 style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
          Instagram:
        </h5>
        <p>autoescuelauniversitariabami</p>
      </div>
    </div>
  );
}
