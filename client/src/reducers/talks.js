/* @flow */
import {handleActions, combineActions} from 'redux-actions';
import actions from '../actions/talks';
import TalksState from '../models/talks';

export default handleActions(
  {
    [combineActions(actions.recordStart, actions.recordSave, actions.dammy)](
      state,
      action,
    ) {
      return {...state, ...action};
    },
  },
  new TalksState(),
);
