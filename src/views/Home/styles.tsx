import styled, { css } from 'styled-components';

const Layout = styled.div`
  ${({ theme }) => css`
    padding: ${theme.space.sm};

    @media only screen and (min-width: ${theme.breakpoints.md}) {
      padding: ${theme.space.xl};
      display: grid;
      grid-template-areas:
        'content wishlist'
        'content wishlist';
      grid-template-columns: 3fr 1fr;
      column-gap: ${theme.space.xxl};
    }

    height: calc(100% - ${theme.space.xxl} - 2 * ${theme.space.xl});

    main {
      display: grid;
      grid-area: content;
      grid-template-areas:
        'search'
        'book-list';
      grid-template-rows: ${theme.sizes.xs} 1fr;
      row-gap: ${theme.space.lg};
    }
  `}
`;

export { Layout };
