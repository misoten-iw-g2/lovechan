import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Body = styled.div`
  width: 100%;
  height: 105px;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  left: 0;
  border-bottom: 1px solid #e4e4e4;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
`;
export const Nav = styled.nav``;
export const Ul = styled.ul`
  list-style-type: none;
  list-style: none;
  display: flex;
  flex-direction: row;
`;
export const Li = styled.li`
  color: #484848;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 14px;
  padding: 8px 16px;
  display: flex;
  align-content: center;
`;
export const BorderContainerHasHover = styled.div`
  width: calc(inherit - 5%);
  padding-bottom: 5%;
  &:hover {
    border-bottom: 2px solid #767676;
  }
`;
export const Link = styled(NavLink)`
  &&& {
    color: #484848;
  }
  &&&:-webkit-any-link {
    text-decoration-line: none;
  }
`;
