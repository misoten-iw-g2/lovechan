/* @flow */
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducer from './../reducers';

const middleWares = [promiseMiddleware];
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleWares),
);

export default store;
