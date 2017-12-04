/* @flow */
import {combineReducers} from 'redux';
import {routerReducer as router} from 'react-router-redux';
import routing from './routing';
import talks from './talks';

export default combineReducers({
  router,
  routing,
  talks,
});
