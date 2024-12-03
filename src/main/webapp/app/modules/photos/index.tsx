import React, { useState, useEffect } from 'react';
import { useAppSelector } from 'app/config/store';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

export default function Photos() {
  const [mockData, setMockData] = useState(() => {
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
  const [isModalOpen, setIsModalOpen] = useState(false); // Para el modal

  const isAdmin = useAppSelector(state =>
    hasAnyAuthority(state.authentication.account.authorities, [
      AUTHORITIES.ADMIN,
    ]),
  );

  useEffect(() => {
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
        url: reader.result,
      };
      setMockData([...mockData, newPost]);
      setNewDescription('');
      setNewImage(null);
      setIsModalOpen(false); // Cerrar el modal tras añadir la publicación
    };
    reader.readAsDataURL(newImage);
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
      {/* Botón fijo en la esquina inferior derecha */}
      {isAdmin && (
        <>
          <button
            onClick={() => setIsModalOpen(true)} // Mostrar modal
            style={{
              position: 'fixed', // Fijo en la pantalla
              bottom: '20px', // Separado 20px del borde inferior
              right: '20px', // Separado 20px del borde derecho
              padding: '15px 20px',
              fontSize: '16px',
              backgroundColor: '#01458e',
              color: '#fff',
              border: 'none',
              borderRadius: '50px', // Botón redondeado
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Sombra para efecto flotante
              zIndex: 1000, // Asegura que esté sobre otros elementos
            }}
          >
            Añadir publicación
          </button>

          {/* Modal para crear publicación */}
          {isModalOpen && (
            <div
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#fff',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                zIndex: 1000,
                width: '90%',
                maxWidth: '500px',
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
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => setIsModalOpen(false)} // Cerrar modal
                  style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#ccc',
                    color: '#000',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Cancelar
                </button>
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
            </div>
          )}
          {/* Fondo oscuro al abrir el modal */}
          {isModalOpen && (
            <div
              onClick={() => setIsModalOpen(false)} // Cerrar modal al hacer clic fuera
              style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 999,
              }}
            ></div>
          )}
        </>
      )}

      {/* Mostrar publicaciones */}
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
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#f9f9f9',
              marginBottom: index === mockData.length - 1 ? '50px' : '20px',
              textAlign: 'center',
            }}
          >
            <img
              src={photo.url}
              alt={`Foto de ${photo.admin}`}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
            <div
              style={{
                padding: '15px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '10px',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#01458e',
                    marginRight: '10px',
                  }}
                ></div>
                <strong style={{ fontSize: '1.2em', color: '#01458e' }}>
                  {photo.admin}
                </strong>
              </div>
              <p style={{ margin: '0', fontSize: '1em', color: '#555' }}>
                {photo.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
