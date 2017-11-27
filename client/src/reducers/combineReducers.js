/* @flow */
import {combineReducers, applyMiddleware} from 'redux';
import createHistory from 'history/createBrowserHistory';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import talks from './talks';

const history = createHistory();

export default combineReducers(
  {
    talks,
    router: routerReducer,
  },
  applyMiddleware(routerMiddleware(history)),
);
