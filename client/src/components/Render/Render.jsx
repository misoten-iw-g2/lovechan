/* eslint no-console: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {AppContainer} from 'react-hot-loader';
import Routes from '../Routes';
import store from '../../store';

const render = () => {
  const {document} = window;
  try {
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </Provider>
      </AppContainer>,
      document.querySelector('main'),
    );

    if (module.hot) {
      module.hot.accept('../Routes', () => {
        ReactDOM.render(
          <AppContainer>
            <Provider store={store}>
              <BrowserRouter>
                <Routes />
              </BrowserRouter>
            </Provider>
          </AppContainer>,
          document.querySelector('main'),
        );
      });
    }
  } catch (e) {
    console.error(e);
  }
};

render();
