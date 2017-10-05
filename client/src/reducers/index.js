/* @flow */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import counter from './calculations';
import courses from './courses';

export default combineReducers({
  form: formReducer,
  counter,
  courses,
});
