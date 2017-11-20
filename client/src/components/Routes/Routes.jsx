/* @flow */
import * as React from 'react';
import {Route} from 'react-router-dom';
import {Switch, withRouter} from 'react-router';
import classNames from 'classnames';

import {
  LandingContainer,
  StoriesContainer,
  ConversationsContainer,
  MediaContainer,
} from '../../containers';
import {routes} from '../../config/uri';

export type Props = {
  location: {
    key: string,
  },
  history: {},
  match: {},
};

const Routes = () => (
  <div>
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
          <Route exact path={routes.requests} render={() => <div />} />
          {/* questions */}
          <Route exact path={routes.questions} render={() => <div />} />
          {/* media */}
          <Route exact path={routes.media} render={() => <MediaContainer />} />
        </Switch>
      )}
    />
  </div>
);

export default withRouter(Routes);
