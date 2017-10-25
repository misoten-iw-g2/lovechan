/* @flow */
import {Record} from 'immutable';

const TalksState = Record({
  myapp_test: undefined,
  datas: undefined,
});

class Talks extends TalksState {
  static myappTest(state, payload) {
    const newState = state.update('myapp_test', () => payload.myapp_test);
    return newState;
  }
  static read(state, payload) {
    const newState = state.update('datas', () => payload.datas);
    return newState;
  }
}

export default Talks;
