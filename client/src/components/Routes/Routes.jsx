/* @flow */
import * as React from 'react';
import {Route} from 'react-router-dom';
import {Switch, withRouter} from 'react-router';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import classNames from 'classnames';

// components
// import Sidebar from '../Common/Sidebar';
// import Landing from '../Landing';
// import Table from '../Table';
import Media from '../../container/media';

import routes from '../../config/routes';

export type Props = {
  // getLoginUser(): void,
  // checkSession(): void
};

class Routes extends React.Component<Props> {
  async componentWillMount<T>(): $await<T> {
    // await this.props.getLoginUser();
    // await this.props.checkSession();
  }

  async componentWillUpdate<T>(): $await<T> {
    // await this.props.checkSession();
    // await this.props.getLoginUser();
  }

  render() {
    return (
      <div>
        <div>sidebar</div>
        <div
          className={classNames({
            'gc-routes': true,
          })}>
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
                    <Route exact path="/" render={() => <div>aa</div>} />
                    {/* media */}
                    <Route exact path={routes.media} render={() => <Media />} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Routes);
