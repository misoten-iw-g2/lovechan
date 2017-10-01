import styled from 'styled-components';

export const Body = styled.div`
  .fade-enter,
  .fade-appear,
  .fade-exit {
    transition: all 3s ease-in 1s;
    transform: translate(0, 0);
  }
  .fade-enter,
  .fade-appear {
    opacity: 0;
    transition: all 1s ease-in 1s;
    transform: translate(0, 0);
  }
  .fade-enter-active,
  .fade-appear-active {
    opacity: 1;
    transition: all 3s ease-in 1s;
    transform: translate(0, 0);
  }
  .fade-exit {
    opacity: 1;
    transition: all 4s ease-in 0s;
    transform: translate(0, 0);
  }
  .fade-exit-active {
    opacity: 1;
    transition: all 4s ease-in 0s;
    transform: translate(0, 0);
  }
`;
export const Container = styled.div`
  width: 100%;
  height: calc(100% - 105px);
  position: absolute;
  top: 105px;
  left: 0;
`;
