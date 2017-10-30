/* @flow */
import {combineReducers} from 'redux';
// import app from './app';
import {reducer as talks} from './talks';

export default combineReducers({
  talks,
});
