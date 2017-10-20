/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../Routes';
import store from '../../store';

const render = () => {
  try {
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </Provider>
      </AppContainer>,
      document.querySelector('main')
    );
  } catch (e) {
    console.error(e);
  } finally {
    console.log('ReactDOM.rendered');
  }
};

if (module.hot) {
  module.hot.accept('../Routes', () => {
    console.log('hot');
    render();
  });
}

render();
