/* @flow */
import {handleActions} from 'redux-actions';
import {PENDING, FULFILLED, REJECTED} from 'redux-promise-middleware';
import {talksAction} from '../actions';
import {TalksState} from '../models';

export default handleActions(
  {
    [talksAction.talks.recordAudio](state, action) {
      return state.recordAudio(state, action);
    },
    [talksAction.talks.saveAudio](state, action) {
      return state.saveAudio(state, action);
    },
    [`${talksAction.talks.routing}_${FULFILLED}`](state, action) {
      return state.routing(state, action);
    },
    [`${talksAction.talks.chatRouting}_${FULFILLED}`](state, action) {
      return state.chatRouting(state, action);
    },
  },
  new TalksState()
);
