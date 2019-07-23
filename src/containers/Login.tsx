import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Dispatch } from 'redux';
import loginStyles from './loginStyles';

import {
  Button,
  Grid,
  Paper,
  TextField,
  WithStyles,
  withStyles,
} from '@material-ui/core';

import { login } from 'store/actions/session';
import { UserDetails } from 'store/reducers/session';
import { StoreState } from 'store/store';

type MapStateToProps = {
  isAuthenticated: boolean,
};

type MapDispatchToProps = {
  login: (values: UserDetails) => void;
};

type OwnProps = {
};
type PropsType = MapStateToProps & MapDispatchToProps & OwnProps & WithStyles<typeof loginStyles>;

const Login: React.FC<PropsType> = (props) => {
  const { classes } = props;

  const [values, setValues] = React.useState({
    disabled: true,
    name: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      disabled: event.target.value.length < 3,
      name: event.target.value,
    });
  };

  const doLogin = () => props.login({ name: values.name });

  return (
    <Grid container={true} justify="center" alignContent="center">
      <Paper className={classes.root}>
      <h1>Login page</h1>
        <Grid container={true} justify="center" alignItems="center">
          <Grid
            container={true}
            item={true}
            justify="center"
            spacing={3}
            direction="column"
            className={classes.form}
          >
            <img src="https://s4.scoopwhoop.com/anj/modefam/85004845.gif" alt="How you doin'?" />
          </Grid>
          <TextField
            id="standard-name"
            label="And your name is..."
            className={classes.textField}
            value={values.name}
            onChange={handleChange}
            margin="normal"
          />
          <Button
            variant="contained"
            type="button"
            color="primary"
            onClick={doLogin}
            className={classes.button}
            disabled={values.disabled}
          >
            I'm ready
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};

const mapStateToProps = ({ session }: StoreState) => {
  const { isAuthenticated } = session;

  return {
    isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  // tslint:disable-next-line: no-any
  login: (values: UserDetails) => dispatch<any>(login(values)),
});

const enhance = compose<PropsType, OwnProps>(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(loginStyles, { withTheme: true }),
);

export default enhance(Login);
