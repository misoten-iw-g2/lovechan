// node_modules
import { Record } from 'immutable';

// model
const CounterState = Record({
  counter: 0,
});
class Counter extends CounterState {
  increment(state, payload) {
    const newState = state.update(
      'counter',
      () => state.counter + payload.amount,
    );
    return newState;
  }
  decrement(state, payload) {
    const newState = state.update(
      'counter',
      () => state.counter - payload.amount,
    );
    return newState;
  }
}

export default Counter;
