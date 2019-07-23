import * as React from 'react';

import Login from 'containers/Login';

export type RouteType = {
  // tslint:disable-next-line: no-any
  component: React.ComponentType<any>,
  exact: boolean,
  isPrivate: boolean,
  path: string,
};

const Inspre: React.FC = () => (<h1>Inspire page</h1>);

export const defaultRoute: RouteType = {
  component: Login,
  exact: false,
  isPrivate: false,
  path: '/login',
};

const routes: RouteType[] = [
  defaultRoute,
  {
    component: Inspre,
    exact: true,
    isPrivate: true,
    path: '/',
  },
];

export default routes;
