/* @flow */
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import * as myself from './combineReducers';
import talks from './talks';

export const reducers = combineReducers({
  talks,
  router: routerReducer,
});

export default Object.assign(reducers, myself);
