/* @flow */
import * as React from 'react';
import {Route} from 'react-router-dom';
import {Switch} from 'react-router';
import {
  LandingContainer,
  StoriesContainer,
  ConversationsContainer,
  RequestsContainer,
  QuestionsContainer,
  CommonChoicesContainer,
} from '../../containers';
import {uri} from '../../config';

function Routes() {
  return (
    <div id="routes">
      <Switch>
        <Route exact path={uri.routes.landing} component={LandingContainer} />
        <Route exact path={uri.routes.stories} component={StoriesContainer} />
        <Route
          path={uri.routes.story_pattern}
          component={CommonChoicesContainer}
        />
        <Route
          exact
          path={uri.routes.conversations}
          component={ConversationsContainer}
        />
        <Route exact path={uri.routes.requests} component={RequestsContainer} />
        <Route
          exact
          path={uri.routes.questions}
          component={QuestionsContainer}
        />
        <Route
          path={uri.routes.questions_pattern}
          component={CommonChoicesContainer}
        />
      </Switch>
    </div>
  );
}

export default Routes;
