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
import {routes} from '../../config/uri';

import {ThreeChoice, FourChoice} from '../Templates';

export type Props = {
  location: {
    key: string,
  },
  history: {},
  match: {},
};

const Routes = () => (
  <div id="routes">
    <Route
      path="/"
      render={(props: Props) => (
        <Switch location={props.location} key={props.location.key}>
          {/* landing */}
          <Route
            exact
            path={routes.landing}
            render={() => <LandingContainer />}
          />
          {/* stories */}
          <Route
            exact
            path={routes.stories}
            render={() => <StoriesContainer />}
          />
          {/* story_pattern */}
          <Route exact path={routes.story_pattern} render={() => <div />} />
          {/* conversations */}
          <Route
            exact
            path={routes.conversations}
            render={() => <ConversationsContainer />}
          />
          {/* requests */}
          <Route
            exact
            path={routes.requests}
            render={() => <RequestsContainer />}
          />
          {/* questions */}
          <Route
            exact
            path={routes.questions}
            render={() => <QuestionsContainer />}
          />
          {/* media */}
          <Route exact path={routes.media} render={() => <MediaContainer />} />

          <Route exact path="/three" render={() => <ThreeChoice />} />
          <Route exact path="/four" render={() => <FourChoice />} />
        </Switch>
      )}
    />
  </div>
);

export default withRouter(Routes);
