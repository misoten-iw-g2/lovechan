import {push} from 'react-router-redux';
import {matchPath} from 'react-router';
import {uri} from '../config';

function routing(store) {
  return next => action => {
    next(action);
    const storeState = store.getState();

    const {type, payload} = action;
    console.log(type);
    console.log(payload);
    

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
      } else if (payload.next_page === '/api/questions') {
        store.dispatch(push(uri.routes.questions));
      } else if (payload.next_page === '/api/requests') {
        store.dispatch(push(uri.routes.requests));
      } else if (
        payload.is_finish &&
        storeState.router.location.pathname === '/questions'
      ) {
        setTimeout(() => {
          console.log('====================================');
          console.log('3000');
          console.log('====================================');
          store.dispatch(push(uri.routes.conversations));
        }, 3000);
      } else if (
        payload.is_finish &&
        storeState.router.location.pathname !== '/questions'
      ) {
        store.dispatch(push(uri.routes.conversations));
      }
    }

    if (storeState.router.location.pathname === '/questions') {
      if (payload) {
        const payloadChoices = payload.choices ? payload.choices : [];

        if (payloadChoices.length !== 0) {
          // TODO
          const nextQuestionsURL = `/questions/${payload.id}`;
          const matchQuestionsPattern = matchPath(nextQuestionsURL, {
            path: uri.routes.questions_pattern,
          });
          if (matchQuestionsPattern) {
            store.dispatch(push(nextQuestionsURL));
          }
        }
      }
    }
  };
}

export function routingMiddleware() {
  return routing;
}

export default routingMiddleware();
