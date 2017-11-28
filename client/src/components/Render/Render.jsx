/* eslint no-console: 0 */
import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {AppContainer} from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter} from 'react-router-redux';
import {Routes} from '../Routes';
import {store} from '../../store';

const main = () => {
  const mainRender = ComponentRoutes => {
    const {document} = window;
    const history = createHistory();
    render(
      <AppContainer>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <BrowserRouter>
              <ComponentRoutes />
            </BrowserRouter>
          </ConnectedRouter>
        </Provider>
      </AppContainer>,
      document.querySelector('main'),
    );
  };

  try {
    mainRender(Routes);
    if (module.hot) {
      module.hot.accept('../Routes', () => {
        const hotRoutes = require('../Routes/Routes');
        mainRender(hotRoutes);
      });
    }
  } catch (e) {
    console.error(e);
  }
};

export default main;
