/* @flow */
import React from 'react';
import { Provider } from 'react-redux';
import Routes from '../Routes';
import store from '../../store';
import { injectGlobal } from 'styled-components';

injectGlobal`
  body {
    background-color: #fbf9ff;
    overflow-y: scroll;
  }
`;

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;
