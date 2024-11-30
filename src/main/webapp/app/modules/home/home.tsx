import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Button } from 'reactstrap';

export const Home = () => {
  return (
    <div className="home-container">
      <Row className="align-items-center justify-content-center">
        <Col md="6" className="text-center text-md-start">
          <h2 className="mb-4 sobre-nosotros">
            ¡Te ayudamos a conducir hacia tu futuro!
          </h2>
          <p className="mb-4">
            ¿Listo para empezar tu camino hacia la independencia al volante? En
            Autoescuela Universitaria, te ayudamos a obtener tu carnet de
            conducir de forma rápida y eficiente.
          </p>
          <Button
            className="custom-button"
            color="primary"
            size="lg"
            tag={Link}
            to="/contact"
          >
            ¡Empieza ya!
          </Button>
        </Col>
        <Col md="6" className="text-center">
          <img
            src="https://media.istockphoto.com/id/621601764/es/foto/conducir-coche-en-la-carretera.jpg?s=612x612&w=0&k=20&c=ydzbAPDnc4Xdd0iUpkHQM7Tf84bFrNAJ5vc7K6CgHew=" // Reemplaza con la URL de tu imagen
            alt="Autoescuela Universitaria"
            className="img-fluid rounded"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
