// node_modules
import { handleActions } from 'redux-actions';
// redux
import * as actions from '../actions/calculations';
import Counter from '../models/Counter.model';

// reducer
const reducer = handleActions(
  {
    [actions.increment](state, action) {
      return state.increment(state, action.payload);
    },
    [actions.decrement](state, action) {
      return state.decrement(state, action.payload);
    },
  },
  new Counter(),
);

export default reducer;
