/* @flow */
/* eslint no-underscore-dangle: off */
import {createStore, applyMiddleware, compose} from 'redux';
import {instrument, persistState} from 'redux-devtools';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import {routerMiddleware} from 'react-router-redux';
import {reducers} from '../reducers';

const history = createHistory();

const middlewares = [
  thunkMiddleware,
  promiseMiddleware(),
  routerMiddleware(history),
];

let enhancer;
if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    applyMiddleware(...middlewares)
  );
} else {
  enhancer = compose(
    applyMiddleware(...middlewares),
    instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  );
}

export default createStore(reducers, enhancer);
