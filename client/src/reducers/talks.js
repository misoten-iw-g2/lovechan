/* @flow */
import {createActions, handleActions} from 'redux-actions';
import TalksState from '../models/talks';

const actionCreators = createActions({
  talks: {
    recordStart: undefined,
    recordSave: undefined,
    dammy: undefined,
  },
});

const reducer = handleActions(
  {
    [actionCreators.talks.recordStart](state, action) {
      return state.recordStart(state, action);
    },
    [actionCreators.talks.recordSave](state, action) {
      return state.recordSave(state, action);
    },
    [actionCreators.talks.dammy](state, action) {
      return state.dammy(state, action);
    },
  },
  new TalksState(),
);

export {actionCreators, reducer};
