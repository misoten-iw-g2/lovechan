/* @flow */
import * as React from 'react';
import {Route} from 'react-router-dom';
import {Switch, withRouter} from 'react-router';

import {
  LandingContainer,
  StoriesContainer,
  ConversationsContainer,
  MediaContainer,
  RequestsContainer,
  QuestionsContainer,
} from '../../containers';
import {uri} from '../../config';

import {ThreeChoice, FourChoice, Chat} from '../Templates';

export type Props = {
  location: {
    key: string,
  },
  history: {},
  match: {},
};

function RoutesComponent() {
  return (
    <div id="routes">
      <Route
        path="/"
        render={(props: Props) => (
          <Switch location={props.location} key={props.location.key}>
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
              exact
              path={uri.routes.story_pattern}
              render={() => <div />}
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
            {/* media */}
            <Route
              exact
              path={uri.routes.media}
              render={() => <MediaContainer />}
            />
            {/* chat */}
            <Route exact path="/chat" render={() => <Chat />} />

            <Route exact path="/three" render={() => <ThreeChoice />} />
            <Route exact path="/four" render={() => <FourChoice />} />
          </Switch>
        )}
      />
    </div>
  );
}

function Routes() {
  return withRouter(RoutesComponent);
}

export default Routes();
