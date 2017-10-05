// node_modules
import { handleActions } from 'redux-actions';
// redux
import * as actions from '../actions/courses';
import Courses from '../models/Course.model';

// reducer
const reducer = handleActions(
  {
    [actions.readAll](state, action) {
      return state.readAll(state, action.payload);
    },
  },
  new Courses(),
);

export default reducer;
