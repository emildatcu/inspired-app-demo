import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './containers/App';
import './index.css';
import * as serviceWorker from './utils/serviceWorker';

// const store = configureStore();

const RootHtml = () => (
  // <Provider store={store}>
    <Router>
      <App />
    </Router>
  // </Provider>
);

ReactDOM.render(
  <RootHtml />,
  document.getElementById('root') as HTMLElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
