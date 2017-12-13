import {push} from 'react-router-redux';
import {matchPath} from 'react-router';
import {uri} from '../config';

function routing(store) {
  return next => action => {
    next(action);
    console.log(action);

    const {type, payload} = action;

    if (type === 'talks/routing_FULFILLED') {
      const nextURL = `/stories/${payload.story_pattern}/${payload.next_step}`;
      const matchStoryPattern = matchPath(nextURL, {
        path: uri.routes.story_pattern,
      });

      if (matchStoryPattern) {
        if (!payload.is_clear) {
          store.dispatch(push(nextURL));
        } else {
          store.dispatch(push(uri.routes.landing));
        }
      } else if (payload.next_page === '/api/stories') {
        store.dispatch(push(uri.routes.stories));
      } else if (payload.next_page === '/api/conversations') {
        store.dispatch(push(uri.routes.conversations));
      }
    }
  };
}

export function routingMiddleware() {
  return routing;
}

export default routingMiddleware();
