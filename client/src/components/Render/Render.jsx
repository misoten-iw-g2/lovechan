/* eslint no-console: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {AppContainer} from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter} from 'react-router-redux';
import {Routes} from '../Routes';
import store from '../../store';

const render = () => {
  const {document} = window;
  const history = createHistory();
  try {
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </ConnectedRouter>
        </Provider>
      </AppContainer>,
      document.querySelector('main'),
    );

    if (module.hot) {
      module.hot.accept('../Routes', () => {
        ReactDOM.render(
          <AppContainer>
            <Provider store={store}>
              <ConnectedRouter history={history}>
                <BrowserRouter>
                  <Routes />
                </BrowserRouter>
              </ConnectedRouter>
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
