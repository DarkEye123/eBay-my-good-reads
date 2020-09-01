import styled from 'styled-components';
import { darken } from 'polished';

const Page = styled.div`
  height: 100vh;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => darken(0.04, theme.color.lightAccent)};
  color: white;
  height: 5rem;
`;

export { Header, Page };
