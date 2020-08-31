import styled, { css } from 'styled-components';

interface DescriptionProps {
  readonly maxLines: number;
  readonly isOverflowing: boolean;
}

const Book = styled.div`
  ${({ theme }) => css`
    clear: both;
    display: flex;
    padding: ${theme.space.sm};
    background-color: ${theme.color.lightShades};
    img {
      min-width: ${theme.sizes.xl};
    }
  `}
`;

const Info = styled.div`
  ${({ theme }) => css`
    padding-left: ${theme.space.sm};
    width: 100%;
    display: flex;
    flex-direction: column;
    h3 {
      color: ${theme.color.lightAccent};
      font-size: ${theme.fontSizes.lg};
      line-height: 1.3;
      letter-spacing: 0.5px;
      margin-bottom: ${theme.space.xs};
    }
  `}
`;

const Date = styled.span`
  letter-spacing: 0.5px;
  font-size: ${({ theme }) => theme.fontSizes.xxs};
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

const Description = styled.div<DescriptionProps>`
  ${({ isOverflowing, maxLines, theme }) => css`
    position: relative;
    font-size: ${theme.fontSizes.sm};
    border: 1px ${theme.color.darkAccent} solid;
    border-radius: 10px;
    margin-top: ${theme.space.md};
    padding: ${theme.space.md};
    height: 100%;

    span {
      position: relative;
      display: inline-block;
      word-wrap: break-word;
      overflow: hidden;
      max-height: ${maxLines}.6em;
      height: ${!isOverflowing && '100%'};
      transition: max-height 0.2s;
      line-height: 1.2em;
      text-align: justify;
    }

    button {
      padding: 0;
    }
  `}
`;

export default {
  Book,
  Info,
  Authors,
  Date,
  Description,
};
