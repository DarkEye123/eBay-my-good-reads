import React, { useContext } from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import VisuallyHidden from '@reach/visually-hidden';
import { store } from '../store';
import Book from './Book';
import theme from '../theme';

const StyledBookList = styled.div`
  grid-area: book-list;
  display: grid;
  grid-template-rows: auto;
  grid-auto-rows: auto;
  grid-row-gap: ${({ theme }) => theme.space.md};
  .spinner {
    align-self: center;
    justify-self: center;
  }
`;

export default () => {
  const { state, actions } = useContext(store);

  return (
    <StyledBookList data-testid="booklist">
      {(state.isLoading && (
        <>
          <VisuallyHidden data-testid="booklist-hidden-loading">
            Loading
          </VisuallyHidden>
          <ReactLoading
            type={'spinningBubbles'}
            color={theme.color.darkAccent}
            className="spinner"
            aria-hidden
            data-testid="booklist-loading"
          />
        </>
      )) || (
        <>
          <VisuallyHidden data-testid="booklist-hidden-results-info">
            Search Results
          </VisuallyHidden>
          {state.books.map(book => (
            <Book
              key={book.id}
              book={book}
              onWishListAppend={() => actions.addToWishList(book)}
            ></Book>
          ))}
        </>
      )}
    </StyledBookList>
  );
};
