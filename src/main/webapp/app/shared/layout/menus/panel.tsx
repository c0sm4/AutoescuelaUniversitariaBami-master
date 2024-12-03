import React from 'react';

import EntitiesMenuItems from 'app/entities/menu';
import { NavDropdown } from './menu-components';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCamera,
  faUsers,
  faStar,
  faListUl,
  faClipboardList,
  faDollarSign,
  faFileAlt,
  faTools,
} from '@fortawesome/free-solid-svg-icons';

const accountMenuItemsAuthenticated = () => (
  <>
    <MenuItem icon={faCamera} to="/photos" data-cy="settings">
      Fotos
    </MenuItem>
    <MenuItem
      icon={faUsers}
      to="/admin/user-management"
      data-cy="userManagement"
    >
      Usuarios
    </MenuItem>
    <MenuItem icon={faDollarSign} to="/cobros" data-cy="cobros">
      Cobros
    </MenuItem>
    <MenuItem icon={faFileAlt} to="/examenes" data-cy="examenes">
      Exámenes
    </MenuItem>
    <MenuItem icon={faListUl} to="/listaespera" data-cy="listaespera">
      Lista de espera
    </MenuItem>

    <MenuItem icon={faStar} to="/reviews" data-cy="reviews">
      Reseñas
    </MenuItem>
  </>
);

export const PanelControl = ({ isAuthenticated = false }) => (
  <NavDropdown
    icon={faTools}
    name="Panel de administrador"
    id="account-menu"
    data-cy="accountMenu"
  >
    {isAuthenticated && accountMenuItemsAuthenticated()}
  </NavDropdown>
);

export default PanelControl;
