// node_modules
import React from 'react';

import { NavLink } from 'react-router-dom';

import {
  globalStyles,
  Container,
  LogoWrapper,
  Logo,
  Nav,
  Ul,
  Li,
} from './cssinjs';

import { reactLogo } from '../../../config/urls';

// pure function
const Footer = () => (
  <Container className="footer">
    <LogoWrapper>
      <Logo src={reactLogo} alt="logo" />
    </LogoWrapper>
    <Nav>
      <Ul>
        <Li>
          <NavLink exact to="/">
            Welcome to React HOME
          </NavLink>
        </Li>
        <Li>
          <NavLink to="/">ごーホーム</NavLink>
        </Li>
        <Li>
          <NavLink to="/">GO HOME</NavLink>
        </Li>
      </Ul>
    </Nav>
  </Container>
);

globalStyles;

export default Footer;
