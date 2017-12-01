/* @flow */
import {combineReducers} from 'redux';
import {routerReducer as router} from 'react-router-redux';
import * as myself from './combineReducers';
import talks from './talks';

export const reducers = combineReducers({
  router,
  talks,
});

export default Object.assign(reducers, myself);
