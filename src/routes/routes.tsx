import * as React from 'react';

export type RouteType = {
  component: React.LazyExoticComponent<React.ComponentType<unknown>>,
  exact: boolean,
  isPrivate: boolean,
  path: string,
};

const LoginPage = React.lazy(() => import('containers/Login'));
const InspirePage = React.lazy(() => import('containers/Inspire'));

export const defaultRoute: RouteType = {
  component: LoginPage,
  exact: false,
  isPrivate: false,
  path: '/login',
};

const routes: RouteType[] = [
  defaultRoute,
  {
    component: InspirePage,
    exact: true,
    isPrivate: true,
    path: '/',
  },
];

export default routes;
