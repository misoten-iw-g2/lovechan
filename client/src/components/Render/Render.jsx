/* eslint no-console: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import Routes from '../Routes';
import store from '../../store';

const render = () => {
  const {document} = window;
  try {
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>,
      document.querySelector('main'),
    );
  } catch (e) {
    console.error(e);
  } finally {
    console.log('ReactDOM.rendered');
  }
};

render();
