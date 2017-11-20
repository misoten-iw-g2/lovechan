/* @flow */
import * as React from 'react';
import {Route} from 'react-router-dom';
import {Switch, withRouter} from 'react-router';
import classNames from 'classnames';

import {Landing, Media} from '../../container';

import {routes} from '../../config/uri';

export type Props = {};

const Routes = (props: Props) => (
  <Route
    path="/"
    render={({location}) => (
      <Switch location={location} key={location.key}>
        <Route exact path={routes.landing} render={() => <Landing />} />
        <Route exact path={routes.media} render={() => <Media />} />
        <Route exact path={routes.withLoveChoice} render={() => <div />} />
        <Route exact path={routes.randomChoice} render={() => <div />} />
      </Switch>
    )}
  />
);

export default withRouter(Routes);
