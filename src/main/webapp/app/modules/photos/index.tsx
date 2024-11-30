import React, { useState, useEffect } from 'react';
import { useAppSelector } from 'app/config/store';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

export default function Photos() {
  const [mockData, setMockData] = useState(() => {
    // Cargar datos desde localStorage o establecer datos por defecto
    const savedData = localStorage.getItem('photos');
    return savedData
      ? JSON.parse(savedData)
      : [
          {
            admin: 'Juan Pérez',
            description: 'Esta es la primera foto',
            url: 'content/images/matferline.png',
          },
          {
            admin: 'Ana Gómez',
            description: 'Esta es la segunda foto',
            url: 'content/images/matferline.png',
          },
          {
            admin: 'Carlos López',
            description: 'Esta es la tercera foto',
            url: 'content/images/matferline.png',
          },
          {
            admin: 'Marta Fernández',
            description: 'Esta es la cuarta foto',
            url: 'content/images/matferline.png',
          },
        ];
  });

  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState(null);

  const isAdmin = useAppSelector(state =>
    hasAnyAuthority(state.authentication.account.authorities, [
      AUTHORITIES.ADMIN,
    ]),
  );

  useEffect(() => {
    // Guardar los datos en localStorage cuando mockData cambie
    localStorage.setItem('photos', JSON.stringify(mockData));
  }, [mockData]);

  const handleCreatePost = () => {
    if (!newImage) {
      alert('Por favor, selecciona una imagen.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const newPost = {
        admin: 'Admin User',
        description: newDescription,
        url: reader.result, // La imagen convertida a base64
      };
      setMockData([...mockData, newPost]);
      setNewDescription('');
      setNewImage(null);
    };
    reader.readAsDataURL(newImage); // Convertir la imagen a base64
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '12vh 5vw',
        width: '100%',
        minHeight: '100vh',
        boxSizing: 'border-box',
        marginTop: '0',
      }}
    >
      {isAdmin && (
        <div
          style={{
            marginBottom: '20px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            width: '100%',
            maxWidth: '600px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <h3 style={{ marginBottom: '10px', color: '#01458e' }}>
            Crear nueva publicación
          </h3>
          <textarea
            placeholder="Escribe un pie de foto..."
            value={newDescription}
            onChange={e => setNewDescription(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginBottom: '10px',
              resize: 'none',
            }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={e => setNewImage(e.target.files[0])}
            style={{
              marginBottom: '10px',
            }}
          />
          <button
            onClick={handleCreatePost}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#01458e',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Crear Publicación
          </button>
        </div>
      )}
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          flexGrow: 1,
        }}
      >
        {mockData.map((photo, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '15px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              backgroundColor: '#f9f9f9',
              marginBottom: index === mockData.length - 1 ? '50px' : '20px',
            }}
          >
            <img
              src={photo.url}
              alt={`Foto de ${photo.admin}`}
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            />
            <div
              style={{
                marginTop: '10px',
                color: '#01458e',
                fontSize: '1.2em',
              }}
            >
              <p style={{ margin: 0 }}>
                <strong>{photo.admin}</strong>:
              </p>
              <p style={{ margin: 0 }}>{photo.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
