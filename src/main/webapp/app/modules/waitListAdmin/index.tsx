import React, { useState } from 'react';
import './ListaEspera.scss';

const ListaEspera = () => {
    const [lista, setLista] = useState([
        { id: 1, nombre: 'Juan Pérez Sánchez' },
        { id: 2, nombre: 'Domingo Ruiz Pérez' },
        { id: 3, nombre: 'Laura López Martín' },
        { id: 4, nombre: 'Elena Rodríguez Bernal' },
        { id: 5, nombre: 'Manuel Bernal Bernal' },
        { id: 6, nombre: 'Pedro Suárez Jiménez' },
        { id: 7, nombre: 'Julio Martín Lama' },
        { id: 8, nombre: 'Ana García Fernández' },
        { id: 9, nombre: 'Raúl Gutiérrez Fernández' },
        { id: 10, nombre: 'Isabel González Campos' },
        { id: 11, nombre: 'Andrés Castillo Sánchez' },
        { id: 12, nombre: 'Marta Jiménez Gómez' },
        { id: 13, nombre: 'Carolina Santos Durán' },
        { id: 14, nombre: 'Luis Méndez Velasco' },
        { id: 15, nombre: 'Ricardo Morales Pérez' },
        { id: 16, nombre: 'Cristina Delgado Pardo' },
        { id: 17, nombre: 'Hugo Domínguez Soriano' },
        { id: 18, nombre: 'Silvia Peña Moya' },
        { id: 19, nombre: 'Fernando Robles Calderón' },
        { id: 20, nombre: 'Alba Ramos Gómez' },
        { id: 21, nombre: 'Esteban Navarro Crespo' },
        { id: 22, nombre: 'Clara Sanz Molina' },
        { id: 23, nombre: 'Francisco Ortiz Herrera' },
        { id: 24, nombre: 'Paula Vargas Gálvez' },
        { id: 25, nombre: 'Nuria Rivas López' },
      ]);
      

  const moverArriba = (index) => {
    if (index === 0) return;
    const nuevaLista = [...lista];
    [nuevaLista[index - 1], nuevaLista[index]] = [nuevaLista[index], nuevaLista[index - 1]];
    setLista(nuevaLista);
  };

  const moverAbajo = (index) => {
    if (index === lista.length - 1) return;
    const nuevaLista = [...lista];
    [nuevaLista[index], nuevaLista[index + 1]] = [nuevaLista[index + 1], nuevaLista[index]];
    setLista(nuevaLista);
  };

  const eliminarAlumno = (index) => {
    const nuevaLista = lista.filter((_, i) => i !== index);
    setLista(nuevaLista);
  };

  return (
    <div className="lista-espera">
      <h2>LISTA DE ESPERA</h2>
      <table className="lista-espera-table">
        <thead>
          <tr>
            <th>N°</th>
            <th>Alumno</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((alumno, index) => (
            <tr key={alumno.id} className="fila-lista">
              <td>{index + 1}</td>
              <td>{alumno.nombre}</td>
              <td>
                <div className="botones-accion">
                  <button
                    onClick={() => moverArriba(index)}
                    disabled={index === 0}
                    className="accion-boton subir"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path d="M12 2L4 10h5v8h6v-8h5z" fill="currentColor" />
                    </svg>
                  </button>
                  <button
                    onClick={() => moverAbajo(index)}
                    disabled={index === lista.length - 1}
                    className="accion-boton bajar"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path d="M12 22l8-8h-5v-8h-6v8h-5z" fill="currentColor" />
                    </svg>
                  </button>
                  <button onClick={() => eliminarAlumno(index)} className="accion-boton eliminar">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaEspera;
