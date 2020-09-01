import styled from 'styled-components';

const Layout = styled.div`
  display: grid;
  padding: ${({ theme }) => theme.space.xl};
  grid-template-areas:
    'content wishlist'
    'content wishlist';
  grid-template-columns: 3fr 1fr;
  column-gap: ${({ theme }) => theme.space.xxl};
  height: ${({ theme }) =>
    `calc(100% - ${theme.space.xxl} - 2*${theme.space.xl})`};

  main {
    display: grid;
    grid-area: content;
    grid-template-areas:
      'search'
      'book-list';
    grid-template-rows: ${({ theme }) => `${theme.sizes.xs} 1fr`};
    row-gap: ${({ theme }) => theme.space.lg};
  }
`;

export { Layout };
