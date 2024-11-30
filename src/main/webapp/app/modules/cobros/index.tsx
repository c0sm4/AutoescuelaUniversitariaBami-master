import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLibros, createLibro, deleteLibro } from './cobrosSlice';
import { AppDispatch, RootState } from 'app/config/store';

import './libros.scss';

const Cobros: React.FC = () => {
  const [titulo, setTitulo] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const dispatch: AppDispatch = useDispatch();
  const { libros, loading, errorMessage } = useSelector(
    (state: RootState) => state.libro,
  );

  const librosPerPage = 10;
  const totalPages = Math.ceil(libros.length / librosPerPage);

  const currentLibros = libros.slice(
    (currentPage - 1) * librosPerPage,
    currentPage * librosPerPage,
  );

  useEffect(() => {
    dispatch(fetchLibros());
  }, [dispatch]);

  const handleAddLibro = () => {
    if (titulo && url) {
      dispatch(createLibro({ titulo, url }));
      setTitulo('');
      setUrl('');
    } else {
      alert('Por favor completa ambos campos');
    }
  };

  const handleDeleteLibro = (id: number) => {
    dispatch(deleteLibro(id));
  };

  const changePage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="libros-container">
      <h2>Gestión de Libros</h2>

      {/* Formulario para añadir libros */}
      <div className="input-container">
        <label htmlFor="titulo">Título</label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="url">URL</label>
        <input
          id="url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <button onClick={handleAddLibro} disabled={loading} className="add-button">
        {loading ? 'Cargando...' : 'Añadir Libro'}
      </button>

      {/* Tabla de libros */}
      <div className="libros-table">
        {loading && <p>Cargando libros...</p>}
        {errorMessage && (
          <p>Error: {errorMessage}</p>
        )}
        {!loading && !errorMessage && (
          <>
            <table>
              <thead>
                <tr>
                  <th>Libro de cobros</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentLibros.map((libro) => (
                  <tr key={libro.id}>
                    <td>
                      <a href={libro.url} target="_blank" rel="noopener noreferrer" className="titulo-link">
                        {libro.titulo}
                      </a>
                    </td>
                    <td>
                      <button onClick={() => handleDeleteLibro(libro.id)} className="delete-button">
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Paginación */}
            <div className="pagination">
              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                Anterior
              </button>
              <span className="pagination-info">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cobros;
