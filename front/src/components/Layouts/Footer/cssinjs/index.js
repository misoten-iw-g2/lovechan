// node_modules
import styled, { injectGlobal } from 'styled-components';

// style component
export const Container = styled.div`
  & {
    width: 100%;
    display: flex;
    position: relative;
  }
`;
export const LogoWrapper = styled.div`
  & {
    height: inherit;
    display: flex;
    align-items: center;
  }
`;
export const Logo = styled.img`
  & {
    width: auto;
    height: 44px;
    @media (min-width: 1025px) {
      padding: 0 24px;
    }
  }
`;
export const Nav = styled.nav`
  @media (max-width: 1024px) {
    height: calc(100vh);
    max-height: calc(100vh);
  }
  @media (min-width: 1025px) {
    position: absolute;
    top: 0;
    right: 0;
  }
`;
export const Ul = styled.ul`
  @media (min-width: 1025px) {
    list-style-type: none;
    list-style: none;
    display: flex;
    flex-direction: row;
  }
`;
export const Li = styled.li`
  & {
    color: #484848;
    box-sizing: border-box;
    @media (max-width: 1024px) {
      font-size: 19px;
      padding: 12px 0;
      display: flex;
      align-content: center;
      font-weight: 300;
    }
    @media (min-width: 1025px) {
      font-size: 14px;
      padding: 0 16px;
      display: flex;
      align-content: center;
    }
  }
`;
export const globalStyles = injectGlobal`
  a:-webkit-any-link {
    text-decoration-line: none;
  }
  a:link {
    color: #484848;
    text-decoration-line: none;
  }
  a:visited {
    color: #484848;
    text-decoration-line: none;
  }
  a:hover {
    color: #484848;
    text-decoration-line: underline;
  }
  a:active {
    color: #484848;
    text-decoration-line: underline;
  }
  .HeaderMobile .title i {
    position: relative;
    left: -10px;
    color: #767676;
  }
`;
