import React, { useState } from 'react';
import './scraper.scss';

const ScraperNotaComponent: React.FC = () => {
  const [dni, setDni] = useState<string>('');
  const [fechaNacimiento, setFechaNacimiento] = useState<string>('');
  const [fechaExamen, setFechaExamen] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<{
    errores: number;
    apto: boolean;
    tipoExamen: string;
    fechaExamen: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleScrape = () => {
    if (!dni || !fechaNacimiento || !fechaExamen) {
      alert('Por favor, completa todos los campos antes de enviar.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    // Simulación de los resultados
    setTimeout(() => {
      const errores = Math.floor(Math.random() * 7); // Número aleatorio de errores (0-9)
      const apto = errores <= 3; // Si los errores son 3 o menos, el resultado es "Apto"
      const tipoExamen = Math.random() > 0.5 ? 'Teórico' : 'Práctico'; // Aleatorio entre Teórico y Práctico

      setResult({
        errores,
        apto,
        tipoExamen,
        fechaExamen, // Mantenemos la fecha de examen ingresada
      });
      setLoading(false);
    }, 1000); // Simulamos un tiempo de espera de 1 segundo
  };

  return (
    <div className="scraper-container">
      <h2>RESULTADOS</h2>
      <div className="input-container">
        <label htmlFor="dni">Ingresa el DNI del alumno</label>
        <input
          id="dni"
          type="text"
          value={dni}
          onChange={e => setDni(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="fecha-examen">Ingresa la fecha del examen</label>
        <input
          id="fecha-examen"
          type="date"
          value={fechaExamen}
          onChange={e => setFechaExamen(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="fecha-nacimiento">
          Ingresa la fecha de nacimiento del alumno
        </label>
        <input
          id="fecha-nacimiento"
          type="date"
          value={fechaNacimiento}
          onChange={e => setFechaNacimiento(e.target.value)}
        />
      </div>
      <button onClick={handleScrape} disabled={loading}>
        {loading ? 'Cargando...' : 'ENVIAR'}
      </button>
      {/* Renderizado de errores o resultados */}
      {errorMessage && <p className="error-message">Error: {errorMessage}</p>}
      {result && (
        <div className="result-message">
          <p>Número de errores: {result.errores}</p>
          <p>Estado: {result.apto ? 'Apto' : 'No Apto'}</p>
          <p>Tipo de examen: {result.tipoExamen}</p>
          <p>Fecha del examen: {result.fechaExamen}</p>
        </div>
      )}
    </div>
  );
};

export default ScraperNotaComponent;
