// node_modules
import React from 'react';
// styles
import {
  globalStyles,
  Body,
  Title,
  ButtonGround,
  Button,
  RoutersLink,
  SubTitle,
} from './cssinjs';

// pure function
const StyledSample = () => (
  <Body id="styledSample">
    <Title>Hello styled component</Title>
    <ButtonGround>
      <Button>Normal</Button>
      <Button primary>Primary</Button>
    </ButtonGround>
    <RoutersLink to="#">Turn Home</RoutersLink>
    <SubTitle as="h2">Finish...</SubTitle>
  </Body>
);

globalStyles;

export default StyledSample;
