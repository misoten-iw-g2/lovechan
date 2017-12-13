/* @flow */
import {handleActions} from 'redux-actions';
import {_PENDING, FULFILLED, _REJECTED} from 'redux-promise-middleware';
import {talksActions} from '../actions';
import {TalksState} from '../models';

export default handleActions(
  {
    [talksActions.talks.recordAudio](state, action) {
      return state.recordAudio(state, action);
    },
    [talksActions.talks.saveAudio](state, action) {
      return state.saveAudio(state, action);
    },
    [`${talksActions.talks.routing}_${FULFILLED}`](state, action) {
      return state.routing(state, action);
    },
    [`${talksActions.talks.chatRouting}_${FULFILLED}`](state, action) {
      return state.chatRouting(state, action);
    },
  },
  new TalksState()
);
