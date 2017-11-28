/* @flow */
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import {routerMiddleware} from 'react-router-redux';
import * as myself from './createStore';
import {reducers} from '../reducers';

const history = createHistory();

export const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(
      promiseMiddleware(),
      thunkMiddleware,
      routerMiddleware(history),
    ),
  ),
);

export default Object.assign(store, myself);
