// node_modules
import styled, { injectGlobal } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Header } from 'semantic-ui-react';

// styled component
export const Body = styled.div`
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
`;
export const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  color: palevioletred;
  margin-bottom: 3rem;
`;
export const ButtonGround = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 3rem;
`;
export const Button = styled.button`
  color: ${props => {
    return props.primary ? '#fff' : '#000';
  }};
  background-color: ${props => {
    return props.primary ? '#0275d8' : 'palevioletred';
  }};
  border-color: ${props => {
    return props.primary ? '#0275d8' : 'palevioletred';
  }};
  width: 10rem;
  margin-right: 1rem;
  display: inline-block;
  font-weight: 400;
  line-height: 1.25;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease-in-out;
`;
export const RoutersLink = styled(NavLink)`
  &&& {
    color: palevioletred;
    margin-bottom: 3rem;
  }
`;
export const SubTitle = styled(Header)`
  &&& {
    color: palevioletred;
    margin-bottom: 3rem;
  }
`;
export const globalStyles = injectGlobal`
  html {
    font-size: 16px;
  }
`;
