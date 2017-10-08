/* @flow */
import { createAction } from 'redux-actions';
import { MYAPP_TEST, READ } from './actionNames/app';

export const myappTest = createAction(MYAPP_TEST, async () => {
  try {
    const payload = {
      myapp_test: true,
    };
    return payload;
  } catch (err) {
    console.error(err);
    throw err;
  }
});
export const read = createAction(READ, async () => {
  try {
    const payload = {
      datas: [],
    };
    return payload;
  } catch (err) {
    console.error(err);
    throw err;
  }
});
