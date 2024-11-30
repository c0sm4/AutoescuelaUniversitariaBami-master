import './header.scss';

import React, { useState } from 'react';

import {
  Collapse,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  NavLink,
} from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';
import { NavLink as Link } from 'react-router-dom';
import { AdminMenu, EntitiesMenu, PanelControl } from '../menus';
import {
  Brand,
  Contact,
  Login,
  Photos,
  Reviews,
  Waitlist,
  Matferline,
  Exams,
} from './header-components';
import MenuItem from '../menus/menu-item';
import { NavDropdown } from '../menus/menu-components';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const accountMenuItemsAuthenticated = () => (
    <>
      <MenuItem icon="wrench" to="/account/settings" data-cy="settings">
        Ajustes
      </MenuItem>
      <MenuItem icon="lock" to="/account/password" data-cy="passwordItem">
        Contraseña
      </MenuItem>
      <MenuItem icon="sign-out-alt" to="/logout" data-cy="logout">
        Cerrar la sesión
      </MenuItem>
    </>
  );

  const AccountMenu = ({ isAuthenticated = false }) => (
    <NavDropdown
      icon="user"
      name="Cuenta"
      id="account-menu"
      data-cy="accountMenu"
    >
      {isAuthenticated && accountMenuItemsAuthenticated()}
    </NavDropdown>
  );

  return (
    <div id="app-header">
      <LoadingBar className="loading-bar" />
      <Navbar
        data-cy="navbar"
        dark
        expand="md"
        fixed="top"
        className="bg-light"
      >
        <div className="align-items-left">
          <Brand />
        </div>

        <NavbarToggler
          aria-label="Menu"
          onClick={toggleMenu}
          className="align-items-right"
        />


        <Collapse isOpen={menuOpen} navbar>
          <Nav id="header-tabs" className="me-auto" navbar></Nav>
          <Nav className="ms-auto" navbar>
            {!props.isAuthenticated && !props.isAdmin && (
              <>
                <Reviews />
                <Photos />
                <Contact />
                <Login />
              </>
            )}
            {props.isAuthenticated && !props.isAdmin && (
              <>
                <Reviews />
                <Photos />
                <Exams />
                <Waitlist />
                <Matferline />
                <Contact />
                <AccountMenu isAuthenticated={props.isAuthenticated} />
              </>
            )}
            {props.isAuthenticated && props.isAdmin && (
              <>
                <AdminMenu showOpenAPI={props.isOpenAPIEnabled} />
                <PanelControl isAuthenticated={props.isAuthenticated} />
                <AccountMenu isAuthenticated={props.isAuthenticated} />
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
