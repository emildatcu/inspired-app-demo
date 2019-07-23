import { combineReducers } from 'redux';
import createReducer from 'utils/createReducer';

import { sessionActions as types } from 'store/actions/index';
import { LoginAction } from 'store/actions/session';
import helpers from 'utils/helpers';

export type UserDetails = {
  name: string,
  password?: string,
};

export type SessionState = {
  isAuthenticated: boolean,
  user: UserDetails,
};

const getAuthState = () => {
  const userDetails = helpers.getStored('userDetails');

  if (userDetails) {
    return helpers.getStored('isAuthenticated');
  }

  return false;
};

const authReducer = createReducer(getAuthState())({
  [types.LOGIN]: () => 'logging',
  [types.LOGIN_COMPLETED]: () => true,
  [types.LOGIN_FAILED]: () => false,
  [types.LOGOUT]: () => false,
});

const initialUser: UserDetails = {
  name: '',
  password: '',
};

const getInitialUser = () => {
  const userDetails = helpers.getStored('userDetails');

  return userDetails ? userDetails : initialUser;
};

const userReducer = createReducer(getInitialUser())({
  [types.LOGIN_COMPLETED]: (state: SessionState, action: LoginAction) => {
    const { name, password } = action.payload;

    return {
      ...state,
      name,
      password,
    };
  },
  [types.LOGIN_FAILED]: () => ({ error: 'User could not log in' }),
});

export default combineReducers({
  isAuthenticated: authReducer,
  user: userReducer,
});
