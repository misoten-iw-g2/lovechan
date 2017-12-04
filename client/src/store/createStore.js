/* @flow */
/* eslint no-underscore-dangle: off */
import {createStore, applyMiddleware, compose} from 'redux';
import {instrument, persistState} from 'redux-devtools';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'react-router-redux';
import {reducers} from '../reducers';
import {routingMiddleware} from './routingMiddleware';

// console.log(routingMiddleware());

const history = createBrowserHistory();

const middlewares = [
  thunkMiddleware,
  promiseMiddleware(),
  routerMiddleware(history),
  routingMiddleware(),
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
