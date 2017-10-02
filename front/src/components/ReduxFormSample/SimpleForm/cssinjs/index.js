// node_modules
import styled, { injectGlobal } from 'styled-components';
import {
  Container as BootStrapContainer,
  Row as BootStrapRow,
  Col as BootStrapCol,
} from 'reactstrap';

// styled component
export const Container = styled(BootStrapContainer)``;
export const Row = styled(BootStrapRow)``;
export const Col = styled(BootStrapCol)``;
export const globalStyles = injectGlobal`
  #reduxFormSample {}
`;
