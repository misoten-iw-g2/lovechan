// node_modules
import { Record, List } from 'immutable';

// model
const CoursesState = Record({
  datas: List(),
});
class Courses extends CoursesState {
  readAll(state, payload) {
    const newState = state.update('datas', () => payload.datas);
    return newState;
  }
}

export default Courses;
