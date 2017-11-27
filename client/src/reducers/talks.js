/* @flow */
import {handleActions} from 'redux-actions';
import {actionTalksCreators} from '../actions';
import TalksState from '../models/talks';

export default handleActions(
  {
    [actionTalksCreators.talks.recordStart](state, action) {
      return state.recordStart(state, action);
    },
    [actionTalksCreators.talks.recordSave](state, action) {
      return state.recordSave(state, action);
    },
    [actionTalksCreators.talks.dammy](state, action) {
      return state.dammy(state, action);
    },
    [actionTalksCreators.talks.rootingFromRoot](state, action) {
      return state.rootingFromRoot(state, action);
    },
  },
  new TalksState(),
);
