import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { compose } from 'recompose';
import { Dispatch } from 'redux';

import {
  AppBar,
  Button,
  CircularProgress,
  LinearProgress,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import logo2xPng from 'assets/logo2x.png';
import routes, { defaultRoute, RouteType } from 'routes/routes';
import { logout } from 'store/actions/session';
import { UserDetails } from 'store/reducers/session';
import { ReducerStateType } from 'store/store';
import appStyles, { theme } from './appStyles';

type MapStateToProps = {
  isAuthenticated: boolean,
  user: UserDetails,
};

type MapDispatchToProps = {
  logout: () => void;
};

type PropsType = MapStateToProps & MapDispatchToProps;

const App: React.FC<PropsType> = (props) => {
  const classes = appStyles();
  const { isAuthenticated, user } = props;
  const { Suspense } = React;

  const LogoutButton = () => (
    isAuthenticated && typeof isAuthenticated === 'boolean' ? (
      <p>
        Welcome {user.name}! <> </>
        <Button
          variant="contained"
          color="secondary"
          onClick={props.logout}
        >
          Sign out
        </Button>
      </p>
    ) : (
      <></>
    )
  );

  const getRoute = (rte: RouteType, isLoggedIn: boolean|string) => {
    const { component, exact, isPrivate, path } = rte;

    if (typeof isLoggedIn === 'string' && isLoggedIn === 'logging') {
      const loader = () => (
        <div className={classes.center}>
          <CircularProgress color="secondary" />
          <>Hold your tits mate, it's getting there...</>
        </div>
      );

      return (
        <Route
          key={path}
          path={path}
          component={loader}
          exact={exact}
        />
      );
    }

    if (isPrivate && !isLoggedIn) {
      const redirectComponent = () => <Redirect to={defaultRoute.path} />;

      return (
        <Route
          key={path}
          path={path}
          component={redirectComponent}
          exact={exact}
        />
      );
    }

    if (path === defaultRoute.path && isLoggedIn) {
      const redirectComponent = () => <Redirect to="/" />;

      return (
        <Route
          key={path}
          path={path}
          component={redirectComponent}
          exact={exact}
        />
      );
    }

    return (
      <Route
        key={path}
        path={path}
        component={component}
        exact={exact}
      />
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Toolbar className={classes.titleContainer}>
          <img src={logo2xPng} className={classes.logo} alt="logo" />
          <div className={classes.center}>
            <div style={{ flexGrow: 1 }} />
            <Typography variant="h3" className={classes.title}>
              Welcome to React + Typescript
            </Typography>
            <div style={{ flexGrow: 1 }} />
            <LogoutButton />
          </div>
        </Toolbar>
      </AppBar>
      <AppBar position="static" color="secondary">
        <Toolbar className={classes.navBar}>
          <Link to="/login" className={classes.link}> Login </Link>
          <Link to="/" className={classes.link}> Get !nspired </Link>
        </Toolbar>
      </AppBar>

      <Switch>
        {routes.map(r => getRoute(r, isAuthenticated))}
        <Suspense fallback={<LinearProgress color="secondary" />}>
          <>Page not found!</>
        </Suspense>
      </Switch>
    </ThemeProvider>
  );
};

const mapStateToProps = ({ session }: ReducerStateType) => {
  const { isAuthenticated, user } = session;

  return {
    isAuthenticated,
    user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => dispatch(logout()),
});

// tslint:disable-next-line: no-any
const enhance = compose<PropsType, any>(
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(App);
