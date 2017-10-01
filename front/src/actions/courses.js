// node_modules
import { createAction } from 'redux-actions';
// actionNames
import { COURSES_READ_ALL } from './actionNames/courses';
// apis
import apis from './apis/courses';

// actions
export const readAll = createAction(COURSES_READ_ALL, async () => {
  try {
    const result = await apis.getAllCourses();
    const payload = {
      datas: result,
    };
    return payload;
  } catch (err) {
    console.error(err);
    throw err;
  }
});
