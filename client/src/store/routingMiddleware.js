import {push} from 'react-router-redux';
import {uri} from '../config';

function routing(store) {
  return next => action => {
    next(action);

    console.log(action);

    if (action.type === 'talks/routing_FULFILLED') {
      const {payload} = action;

      if (payload.next_page === '/api/stories') {
        store.dispatch(push(uri.routes.stories));
      } else if (payload.url === '/api/stories/suddenly/2') {
        store.dispatch(push(uri.routes.story_pattern));
      } else if (payload.url === '/api/stories/suddenly/3') {
        store.dispatch(push(uri.routes.story_pattern));
      } else if (payload.url === '/api/stories/suddenly/4') {
        store.dispatch(push(uri.routes.story_pattern));
      } else if (payload.is_clear) {
        store.dispatch(push(uri.routes.root));
      }
    }
  };
}

export function routingMiddleware() {
  return routing;
}

export default routingMiddleware();
