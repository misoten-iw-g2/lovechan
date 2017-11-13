/* @flow */
import * as React from 'react';
import {Route} from 'react-router-dom';
import {Switch, withRouter} from 'react-router';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import classNames from 'classnames';

import {Landing, Media} from '../../container';

import routes from '../../config/routes';

export type Props = {};

const Routes = (props: Props) => (
  <div>
    <div>
      <Route
        path="/"
        render={({location}) => (
          <TransitionGroup appear>
            <CSSTransition
              classNames="fade"
              key={location.key}
              timeout={{
                appear: 600,
                enter: 600,
                exit: 600,
              }}>
              <Switch location={location} key={location.key}>
                <Route exact path="/" render={() => <Landing />} />
                <Route exact path={routes.media} render={() => <Media />} />
                <Route exact path={routes.storyChoice} render={() => <div />} />
                <Route
                  exact
                  path={routes.withLoveChoice}
                  render={() => <div />}
                />
                <Route
                  exact
                  path={routes.randomChoice}
                  render={() => <div />}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </div>
  </div>
);

export default withRouter(Routes);
