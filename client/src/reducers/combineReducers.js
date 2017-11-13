/* @flow */
import {combineReducers} from 'redux';
import {reducer as talks} from './talks';

export default combineReducers({
  talks,
});
