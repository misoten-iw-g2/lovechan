import {push} from 'react-router-redux';

function routing(store) {
  return next => action => {
    next(action);
    if (action.type === 'talks/routing_FULFILLED') {
      store.dispatch(push('/stories'));
    }
  };
}

export function routingMiddleware() {
  return routing;
}

export default routingMiddleware();
