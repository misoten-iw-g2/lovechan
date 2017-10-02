/* @flow */
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Body, Container } from './cssinjs';
import Header from '../Layouts/Header';
import Courses from '../Courses';
import Counter from '../Counter';
import StyledSample from '../StyledSample';
import ReduxFormSample from '../ReduxFormSample';
import SimpleForm from '../ReduxFormSample/SimpleForm';

class Routes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Body>
          <Header />
          <Container>
            <Route
              exact
              path="/courses"
              render={state => (
                <TransitionGroup component="div" appear>
                  <CSSTransition
                    classNames="fade"
                    in={false}
                    timeout={{ appear: 4000, enter: 4000, exit: 4000 }}
                  >
                    <Courses {...state} />
                  </CSSTransition>
                </TransitionGroup>
              )}
            />
            <Route
              exact
              path="/counter"
              render={state => (
                <TransitionGroup component="div" appear>
                  <CSSTransition
                    classNames="fade"
                    in={false}
                    timeout={{ appear: 4000, enter: 4000, exit: 4000 }}
                  >
                    <Counter {...state} />
                  </CSSTransition>
                </TransitionGroup>
              )}
            />
            <Route
              exact
              path="/styled"
              render={state => <StyledSample {...state} />}
            />
            <Route
              exact
              path="/redux-form-sample"
              render={state => (
                <ReduxFormSample {...state}>
                  <SimpleForm {...state} />
                </ReduxFormSample>
              )}
            />
          </Container>
        </Body>
      </BrowserRouter>
    );
  }
}

export default Routes;
