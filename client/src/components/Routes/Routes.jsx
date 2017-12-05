/* @flow */
import * as React from 'react';
import {Route} from 'react-router-dom';
import {Switch} from 'react-router';

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
      <Switch>
        {/* landing */}
        <Route
          exact
          path={uri.routes.landing}
          render={() => <LandingContainer />}
        />
        {/* stories */}
        <Route path={uri.routes.stories} render={() => <StoriesContainer />} />
        {/* story_pattern */}
        <Route exact path={uri.routes.story_pattern} render={() => <div />} />
        {/* conversations */}
        <Route
          path={uri.routes.conversations}
          render={() => <ConversationsContainer />}
        />
        {/* requests */}
        <Route
          path={uri.routes.requests}
          render={() => <RequestsContainer />}
        />
        {/* questions */}
        <Route
          path={uri.routes.questions}
          render={() => <QuestionsContainer />}
        />
        {/* media */}
        <Route path={uri.routes.media} render={() => <MediaContainer />} />
        {/* chat */}
        <Route exact path="/chat" render={() => <Chat />} />

        <Route exact path="/three" render={() => <ThreeChoice />} />
        <Route exact path="/four" render={() => <FourChoice />} />
      </Switch>
    </div>
  );
}

function Routes() {
  return RoutesComponent;
}

export default Routes();
