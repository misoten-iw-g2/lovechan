/* @flow */
import {handleActions} from 'redux-actions';
import createActions from '../actions/talks';
import TalksState from '../models/talks';

export default handleActions(
  {
    [createActions.talks.media](state, action) {
      return state.media(state, action.payload);
    },
    [createActions.talks.dammy](state, action) {
      return state.dammy(state, action.payload);
    },
  },
  new TalksState(),
);
