import { applyMiddleware, combineReducers, createStore } from 'redux';
// tslint:disable-next-line: no-implicit-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

import * as reducers from 'store/reducers';
import { InspireState } from 'store/reducers/inspire';
import { SessionState } from 'store/reducers/session';

export type StoreState = {
  inspire: InspireState,
  session: SessionState,
};

export const configureStore = () => {
  const rootReducer = combineReducers(reducers);
  const composeEnhancers = composeWithDevTools({});

  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(reduxThunk)),
  );
};

const store = configureStore();

export default store;
