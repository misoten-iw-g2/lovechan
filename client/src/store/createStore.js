/* @flow */
import {createStore, applyMiddleware, compose} from 'redux';
import {instrument, persistState} from 'redux-devtools';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import {rootReducer} from '../reducers';
import {routingMiddleware} from './routingMiddleware';
import {history} from '../config';

const middlewares = [
  thunkMiddleware,
  promiseMiddleware(),
  routerMiddleware(history),
  routingMiddleware(),
];

const enhancer = compose(
  applyMiddleware(...middlewares),
  instrument(),
  persistState(window.location.href.match(/[?&]debug_session=([^&#]+)\b/))
);

export default function configureStore(initialState: any) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
}
