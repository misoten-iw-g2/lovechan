/* @flow */
import {handleActions} from 'redux-actions';
import * as myself from './talks';
import {talksActions} from '../actions';
import {TalksState} from '../models';

export const talksReducer = handleActions(
  {
    [talksActions.talks.recordAudio](state, action) {
      return state.recordAudio(state, action);
    },
    [talksActions.talks.saveAudio](state, action) {
      return state.saveAudio(state, action);
    },
    [talksActions.talks.routing](state, action) {
      return state.routing(state, action);
    },
  },
  new TalksState(),
);

export default Object.assign(talksReducer, myself);
