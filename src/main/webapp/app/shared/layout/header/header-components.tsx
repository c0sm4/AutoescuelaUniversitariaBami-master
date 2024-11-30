import React from 'react';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/logo.png" alt="Logo" />
  </div>
);

export const Brand = () => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
  </NavbarBrand>
);

export const Home = () => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      <span>Inicio</span>
    </NavLink>
  </NavItem>
);
export const Reviews = () => (
  <NavItem>
    <NavLink tag={Link} to="/reviews" className="align-items-left">
      <span>Reseñas</span>
    </NavLink>
  </NavItem>
);

export const Photos = () => (
  <NavItem>
    <NavLink tag={Link} to="/photos" className="align-items-left">
      <span>Fotos</span>
    </NavLink>
  </NavItem>
);

export const Contact = () => (
  <NavItem>
    <NavLink tag={Link} to="/contact" className="align-items-left">
      <span>Contactanos</span>
    </NavLink>
  </NavItem>
);

export const Login = () => (
  <NavItem>
    <NavLink tag={Link} to="/login" className="login-button">
      <span>Iniciar sesión</span>
    </NavLink>
  </NavItem>
);

export const Exams = () => (
  <NavItem>
    <NavLink tag={Link} to="/exams" className="align-items-left">
      <span>Exámenes</span>
    </NavLink>
  </NavItem>
);

export const Waitlist = () => (
  <NavItem>
    <NavLink tag={Link} to="/waitlist" className="align-items-left">
      <span>Lista de espera</span>
    </NavLink>
  </NavItem>
);

export const Matferline = () => (
  <NavItem>
    <NavLink tag={Link} to="/matferline" className="align-items-left">
      <span>Matferline</span>
    </NavLink>
  </NavItem>
);
