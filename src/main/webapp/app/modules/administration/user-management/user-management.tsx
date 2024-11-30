import './management.scss';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Badge, Button, Table } from 'reactstrap';
import {
  JhiItemCount,
  JhiPagination,
  TextFormat,
  getPaginationState,
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortDown,
  faSortUp,
} from '@fortawesome/free-solid-svg-icons';

import { APP_DATE_FORMAT } from 'app/config/constants';
import {
  ASC,
  DESC,
  ITEMS_PER_PAGE,
  SORT,
} from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getUsersAsAdmin, updateUser } from './user-management.reducer';

export const UserManagement = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(
      getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'),
      pageLocation.search,
    ),
  );

  const getUsersFromProps = () => {
    dispatch(
      getUsersAsAdmin({
        page: pagination.activePage - 1,
        size: pagination.itemsPerPage,
        sort: `${pagination.sort},${pagination.order}`,
      }),
    );
    const endURL = `?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    getUsersFromProps();
  }, [pagination.activePage, pagination.order, pagination.sort]);

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sortParam = params.get(SORT);
    if (page && sortParam) {
      const sortSplit = sortParam.split(',');
      setPagination({
        ...pagination,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [pageLocation.search]);

  const sort = p => () =>
    setPagination({
      ...pagination,
      order: pagination.order === ASC ? DESC : ASC,
      sort: p,
    });

  const handlePagination = currentPage =>
    setPagination({
      ...pagination,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    getUsersFromProps();
  };

  const toggleActive = user => () => {
    dispatch(
      updateUser({
        ...user,
        activated: !user.activated,
      }),
    );
  };

  const account = useAppSelector(state => state.authentication.account);
  const users = useAppSelector(state => state.userManagement.users);
  const totalItems = useAppSelector(state => state.userManagement.totalItems);
  const loading = useAppSelector(state => state.userManagement.loading);

  return (
    <div className="user-management-container">
      <h2 className="page-heading">
        <FontAwesomeIcon icon="users" className="me-2" />
        Gestión de Usuarios
        <div className="d-flex justify-content-end">
          <Button
            className="me-2 btn-refresh"
            color="info"
            onClick={handleSyncList}
            disabled={loading}
          >
            <FontAwesomeIcon icon="sync" spin={loading} /> Refrescar lista
          </Button>
          <Link to="new" className="btn btn-primary">
            <FontAwesomeIcon icon="plus" /> Crear Usuario
          </Link>
        </div>
      </h2>
      <Table responsive striped className="user-table">
        <thead>
          <tr>
            <th onClick={sort('id')} className="sortable-header">
              ID <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={sort('login')} className="sortable-header">
              Login <FontAwesomeIcon icon={faSort} />
            </th>
            <th onClick={sort('email')} className="sortable-header">
              Email <FontAwesomeIcon icon={faSort} />
            </th>
            <th>Estado</th>
            <th>Roles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={`user-${i}`} className="user-row">
              <td>{user.id}</td>
              <td>{user.login}</td>
              <td>{user.email}</td>
              <td>
                <Badge color={user.activated ? 'success' : 'danger'}>
                  {user.activated ? 'Activado' : 'Desactivado'}
                </Badge>
              </td>
              <td>
                {user.authorities.map((role, j) => (
                  <Badge key={`role-${j}`} color="info" className="me-1">
                    {role}
                  </Badge>
                ))}
              </td>
              <td className="actions-column">
                <Button tag={Link} to={user.login} color="info" size="sm">
                  <FontAwesomeIcon icon="eye" /> Ver
                </Button>
                <Button
                  tag={Link}
                  to={`${user.login}/edit`}
                  color="primary"
                  size="sm"
                >
                  <FontAwesomeIcon icon="pencil-alt" /> Editar
                </Button>
                <Button
                  tag={Link}
                  to={`${user.login}/delete`}
                  color="danger"
                  size="sm"
                  disabled={account.login === user.login}
                >
                  <FontAwesomeIcon icon="trash" /> Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {totalItems ? (
        <div className="pagination-container">
          <JhiPagination
            activePage={pagination.activePage}
            onSelect={handlePagination}
            maxButtons={5}
            itemsPerPage={pagination.itemsPerPage}
            totalItems={totalItems}
          />
        </div>
      ) : (
        <div>No hay usuarios disponibles.</div>
      )}
    </div>
  );
};

export default UserManagement;
