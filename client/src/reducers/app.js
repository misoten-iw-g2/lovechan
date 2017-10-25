/* @flow */
import {handleActions} from 'redux-actions';
import * as actions from '../actions/app';
import AppState from '../models/app';

export default handleActions(
  {
    [actions.myappTest](state, action) {
      return state.myappTest(state, action.payload);
    },
    [actions.read](state, action) {
      return state.read(state, action.payload);
    },
  },
  new AppState(),
);
