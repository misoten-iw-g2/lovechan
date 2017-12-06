import {push} from 'react-router-redux';
import {uri} from '../config';

function routing(store) {
  return next => action => {
    next(action);

    if (action.type === 'talks/routing_FULFILLED') {
      const {payload} = action;

      if (payload.next_page === '/api/stories') {
        store.dispatch(push(uri.routes.stories));
      } else if (payload.url === '/api/stories/change/2') {
        store.dispatch(push(uri.routes.story_pattern));
      }
    }
  };
}

export function routingMiddleware() {
  return routing;
}

export default routingMiddleware();
