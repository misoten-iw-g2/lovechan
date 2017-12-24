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
  CustomFourChoiceContainer,
  CommonChoicesContainer,
} from '../../containers';
import {uri} from '../../config';

export type Props = {
  location: {
    key: string,
  },
  history: {},
  match: {},
};

function Routes() {
  return (
    <div id="routes">
      <Switch>
        {/* landing */}
        <Route
          exact
          path={uri.routes.landing}
          render={() => <LandingContainer />}
        />
        {/* stories */}
        <Route
          exact
          path={uri.routes.stories}
          render={() => <StoriesContainer />}
        />
        {/* story_pattern */}
        <Route
          path={uri.routes.story_pattern}
          render={() => <CommonChoicesContainer />}
        />
        {/* conversations */}
        <Route
          exact
          path={uri.routes.conversations}
          render={() => <ConversationsContainer />}
        />
        {/* requests */}
        <Route
          exact
          path={uri.routes.requests}
          render={() => <RequestsContainer />}
        />
        {/* questions */}
        <Route
          exact
          path={uri.routes.questions}
          render={() => <QuestionsContainer />}
        />
        {/* question_pattern */}
        <Route
          path={uri.routes.questions_pattern}
          render={() => <CommonChoicesContainer />}
        />
      </Switch>
    </div>
  );
}

export default Routes;
