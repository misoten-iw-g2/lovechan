/* @flow */
import {combineReducers} from 'redux';
import {routerReducer as router} from 'react-router-redux';
import talks from './talks';

export default combineReducers({
  router,
  talks,
});
