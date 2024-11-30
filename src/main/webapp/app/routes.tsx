import React from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import Login from 'app/modules/login/login';
import Register from 'app/modules/account/register/register';
import Activate from 'app/modules/account/activate/activate';
import PasswordResetInit from 'app/modules/account/password-reset/init/password-reset-init';
import PasswordResetFinish from 'app/modules/account/password-reset/finish/password-reset-finish';
import Logout from 'app/modules/login/logout';
import Home from 'app/modules/home/home';
import EntitiesRoutes from 'app/entities/routes';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import PageNotFound from 'app/shared/error/page-not-found';
import { AUTHORITIES } from 'app/config/constants';
import Examenes from 'app/modules/examenes';
import Reviews from 'app/modules/reviews';
import Matferline from './modules/matferline';
import Contact from './modules/contact';
import MyExams from './modules/myexams';
import Waitlist from './modules/waitlist';
import Photos from './modules/photos';
import Cobros from './modules/cobros';
import ListaEspera from './modules/waitListAdmin';

const loading = <div>loading ...</div>;

const Account = Loadable({
  loader: () => import(/* webpackChunkName: "account" */ 'app/modules/account'),
  loading: () => loading,
});

const Admin = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "administration" */ 'app/modules/administration'
    ),
  loading: () => loading,
});
const AppRoutes = () => {
  return (
    <div className="view-routes">
      <ErrorBoundaryRoutes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="matferline" element={<Matferline />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cobros" element={<Cobros />} />
        <Route path="exams" element={<MyExams />} />
        <Route path="waitlist" element={<Waitlist />} />
        <Route path="listaespera" element={<ListaEspera />} />
        <Route path="photos" element={<Photos/>} />
        <Route path="examenes" element={<Examenes />} />
        <Route path="logout" element={<Logout />} />
        <Route path="account">
          <Route
            path="*"
            element={
              <PrivateRoute
                hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}
              >
                <Account />
              </PrivateRoute>
            }
          />
          <Route path="register" element={<Register />} />
          <Route path="activate" element={<Activate />} />
          <Route path="reset">
            <Route path="request" element={<PasswordResetInit />} />
            <Route path="finish" element={<PasswordResetFinish />} />
          </Route>
        </Route>
        <Route
          path="admin/*"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
              <EntitiesRoutes />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </ErrorBoundaryRoutes>
    </div>
  );
};

export default AppRoutes;
