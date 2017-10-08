/* @flow */
import React from 'react';
import { Route } from 'react-router-dom';
import { Switch, withRouter, Redirect } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export type Props = {
  history: {},
  location: {},
  match: {},
  staticContext: {}
}

const Routes = (_props: Props) => (
  <Route
    render={({ location }) => (
      <div>
        <TransitionGroup appear>
          <CSSTransition
            classNames="fade"
            in={false}
            key={location.key}
            timeout={{ appear: 3000, enter: 3000, exit: 3000 }}
          >
            <Switch location={location} key={location.key}>
              <Route
                exact
                path="/red"
                render={() => (
                  <div>GC_RED</div>
                )}
              />
              <Route
                exact
                path="/blue"
                render={() => (
                  <div>GC_BLUE</div>
                )}
              />
              {/* The following is need to written */}
              <Route exact path="/" render={() => <div>welcome</div>} />
              <Redirect to="/" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    )}
  />
  // more Route
);

export default withRouter(Routes);
