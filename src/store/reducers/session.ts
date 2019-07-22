import { combineReducers } from 'redux';
import createReducer from 'utils/createReducer';

import { sessionActions } from 'store/actions/index';
import { LoginAction } from 'store/actions/session';
import helpers from 'utils/helpers';

export type UserDetails = {
  name: string,
  password?: string,
};

export type SessionStateType = {
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
  [sessionActions.LOGIN]: () => 'logging',
  [sessionActions.LOGIN_COMPLETED]: () => true,
  [sessionActions.LOGIN_FAILED]: () => false,
  [sessionActions.LOGOUT]: () => false,
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
  [sessionActions.LOGIN_COMPLETED]: (state: SessionStateType, action: LoginAction) => {
    const { name, password } = action.payload;

    return {
      ...state,
      name,
      password,
    };
  },
  [sessionActions.LOGIN_FAILED]: () => ({ error: 'User could not log in' }),
});

export default combineReducers({
  isAuthenticated: authReducer,
  user: userReducer,
});
