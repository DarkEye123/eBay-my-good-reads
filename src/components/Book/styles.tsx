import styled, { css } from 'styled-components';

const Book = styled.div`
  ${({ theme }) => css`
    clear: both;
    display: flex;
    padding: ${theme.space.sm};
    background-color: ${theme.color.lightShades};
    img {
      min-width: ${theme.sizes.xl};
    }
    .authors {
      display: grid;
      grid-auto-flow: column;
      column-gap: ${theme.space.xs};
      grid-auto-columns: max-content;
      max-width: ${theme.sizes['3xl']};
      letter-spacing: 0.5px;
      font-size: ${theme.fontSizes.xxs};
    }
  `}
`;

const Info = styled.div`
  ${({ theme }) => css`
    padding-left: ${theme.space.sm};
    width: 100%;
    h3 {
      color: ${theme.color.lightAccent};
      font-size: ${theme.fontSizes.lg};
      line-height: 1.3;
      letter-spacing: 0.5px;
    }
  `}
`;

const Authors = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-auto-flow: column;
    column-gap: ${theme.space.xs};
    grid-auto-columns: max-content;
    max-width: ${theme.sizes['3xl']};
    letter-spacing: 0.5px;
    font-size: ${theme.fontSizes.xxs};
  `}
`;

export default {
  Book,
  Info,
  Authors,
};
