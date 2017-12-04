/* @flow */
import {handleActions} from 'redux-actions';
import {LOCATION_CHANGE} from 'react-router-redux';
import {_PENDING, _FULFILLED, _REJECTED} from 'redux-promise-middleware';

export default handleActions(
  {
    [LOCATION_CHANGE](state, _action) {
      return state;
    },
  },
  {}
);
