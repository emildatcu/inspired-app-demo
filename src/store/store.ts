import { applyMiddleware, combineReducers, createStore } from 'redux';
// tslint:disable-next-line: no-implicit-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

import * as reducers from './reducers';
// import { InspireStateType } from './reducers/inspire';
import { SessionStateType } from './reducers/session';

export type ReducerStateType = {
  // inspire: InspireStateType,
  session: SessionStateType,
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
