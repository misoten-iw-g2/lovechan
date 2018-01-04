/* @flow */
/* eslint no-console: off */
import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {AppContainer} from 'react-hot-loader';
import {ConnectedRouter} from 'react-router-redux';
import {Routes} from '../Routes';
import {store} from '../../store';
import {history} from '../../config';

function main() {
  const mainRender = (ComponentRoutes: any) => {
    const {document} = window;
    render(
      <AppContainer>
        <Provider store={store()}>
          <ConnectedRouter history={history}>
            <ComponentRoutes />
          </ConnectedRouter>
        </Provider>
      </AppContainer>,
      document.querySelector('main')
    );
  };

  mainRender(Routes);

  if (module.hot) {
    module.hot.accept('../Routes', () => {
      const hotRoutes = require('../Routes').default;
      mainRender(hotRoutes);
    });
  }
}

export default main;
