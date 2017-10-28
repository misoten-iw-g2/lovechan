/* @flow */
import {handleActions, combineActions} from 'redux-actions';
import actions from '../actions/app';
import AppState from '../models/app';

export default handleActions(
  {
    [combineActions(actions.dammy)](state, action) {
      return {...state, ...action};
    },
  },
  new AppState(),
);
