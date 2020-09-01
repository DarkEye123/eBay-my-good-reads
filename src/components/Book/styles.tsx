import styled, { css } from 'styled-components';

interface DescriptionProps {
  readonly maxLines: number;
  readonly isOverflowing: boolean;
  readonly showFullDetail: boolean;
}

const Book = styled.div`
  ${({ theme }) => css`
    display: flex;
    padding: ${theme.space.sm};
    background-color: ${theme.color.lightShades};
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
      font-size: ${theme.fontSizes.sm};
      @media only screen and (min-width: ${theme.breakpoints.sm}) {
        font-size: ${theme.fontSizes.lg};
        letter-spacing: 0.5px;
        line-height: 1.3;
      }
      line-height: 1;
      margin-bottom: ${theme.space.xs};
    }
  `}
`;

const Date = styled.span`
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    letter-spacing: 0.5px;
  }
  font-size: ${({ theme }) => theme.fontSizes.xxs};
`;

const Metadata = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-auto-flow: column;
    column-gap: ${theme.space.xs};
    grid-auto-columns: max-content;
    max-width: ${theme.sizes['3xl']};
    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      letter-spacing: 0.5px;
    }
    font-size: ${theme.fontSizes.xxs};
    color: ${theme.color.darkShades};
  `}
`;

const Right = styled.div`
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    letter-spacing: 0.5px;
  }
  font-size: ${({ theme }) => theme.fontSizes.xxs};
  color: black;
`;

const Description = styled.div<DescriptionProps>`
  ${({ isOverflowing, showFullDetail, maxLines, theme }) => css`
    position: relative;
    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: ${theme.fontSizes.sm};
    }
    font-size: ${theme.fontSizes.xs};
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
      transition: max-height 0.3s;
      line-height: 1.2em;
      text-align: justify;
      ${showFullDetail &&
      css`
        overflow: auto;
        height: initial;
        max-height: 400px;
      `}
    }

    button {
      padding: 0;
    }
  `}
`;

const ImageWrapper = styled.div`
  ${({ theme }) => css`
    img {
      width: 0;
      visibility: collapse;
      @media only screen and (min-width: ${theme.breakpoints.xs}) {
        visibility: visible;
        min-width: ${theme.sizes.sm};
        width: ${theme.sizes.sm};
      }
      @media only screen and (min-width: ${theme.breakpoints.sm}) {
        min-width: ${theme.sizes.xl};
        width: ${theme.sizes.xl};
      }
      @media only screen and (min-width: ${theme.breakpoints.md}) {
        min-width: ${theme.sizes.xl};
        width: inherit;
      }
    }
  `}
`;

export default {
  Book,
  Info,
  Left,
  Right,
  Date,
  Description,
  Metadata,
  ImageWrapper,
};
