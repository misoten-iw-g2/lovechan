// node_modules
import { createAction } from 'redux-actions';
// actionNames
import * as actionNames from './actionNames/calcMethods';

// actions
export const increment = createAction(actionNames.INCREMENT, async () => ({
  amount: 1,
}));
export const decrement = createAction(actionNames.DECREMENT, async () => ({
  amount: 1,
}));
