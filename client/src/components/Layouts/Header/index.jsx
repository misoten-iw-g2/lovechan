/* @flow */
import React from 'react';
import 'react-router-dom';
import {
  Body,
  Nav,
  Ul,
  Li,
  BorderContainerHasHover,
  Link,
} from './cssinjs';

const Header = () => (
  <Body id="header">
    <Nav>
      <Ul>
        <Li>
          <BorderContainerHasHover>
            <Link to="/courses">Courses</Link>
          </BorderContainerHasHover>
        </Li>
        <Li>
          <BorderContainerHasHover>
            <Link to="/counter">Counter</Link>
          </BorderContainerHasHover>
        </Li>
        <Li>
          <BorderContainerHasHover>
            <Link to="/styled">StyledSample</Link>
          </BorderContainerHasHover>
        </Li>
        <Li>
          <BorderContainerHasHover>
            <Link to="/redux-form-sample">ReduxFormSample</Link>
          </BorderContainerHasHover>
        </Li>
        <Li>
          <BorderContainerHasHover>
            <Link to="/">GO HOME</Link>
          </BorderContainerHasHover>
        </Li>
      </Ul>
    </Nav>
  </Body>
);

export default Header;
