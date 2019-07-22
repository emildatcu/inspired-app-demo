import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import {
  AppBar, Toolbar,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import logo2xPng from 'assets/logo2x.png';
import routes from 'routes/routes';
import appStyle, { theme } from './appStyle';

const App: React.FC = () => {
  const classes = appStyle();

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <img src={logo2xPng} className={classes.appLogo} alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <div>
            <Link to="/login" className={classes.appLink}> Login </Link>
            <Link to="/" className={classes.appLink}> Inspire </Link>
          </div>
        </Toolbar>
      </AppBar>

      <Switch>
        {routes.map(r => <Route key={r.path} {...r} />)}
      </Switch>
    </ThemeProvider>
  );
};

export default App;
