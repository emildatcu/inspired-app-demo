import { Dispatch } from 'redux';
import helpers from 'utils/helpers';
import { UserDetails } from '../reducers/session';
import { sessionActions } from './index';

const loginAction = (payload: UserDetails) => ({
  payload,
  type: sessionActions.LOGIN,
});
export type LoginAction = ReturnType<typeof loginAction>;

type Login = (dispatch: Dispatch) => void;
const login = (userDetails: UserDetails): Login => (
  (dispatch: Dispatch) => {
    dispatch({ type: sessionActions.LOGIN });

    const fakeLogin = setTimeout(
      () => {
        helpers.setStored('isAuthenticated', true);
        helpers.setStored('userDetails', userDetails);

        dispatch({ type: sessionActions.LOGIN_COMPLETED, payload: userDetails });

        clearTimeout(fakeLogin);
      },
      5000
    );

    // err case
  }
);

type Logout = {
  type: sessionActions.LOGOUT,
};
const logout = (): Logout => {
  helpers.removeStored('isAuthenticated');
  helpers.removeStored('userDetails');

  return {
    type: sessionActions.LOGOUT,
  };
};

export {
  login,
  logout,
};
