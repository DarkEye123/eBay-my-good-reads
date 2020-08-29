import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { store } from '../store';

const StyledBookList = styled.div`
  grid-area: book-list;
`;

export default () => {
  const { state, actions } = useContext(store);
  function addBook() {
    actions.addToWishList({
      author: 'matej',
      description: '',
      image: 'asd',
      published: '11.2.2020',
      publisher: 'ja',
      title: 'hehe',
    });
  }
  return (
    <StyledBookList>
      {/* {console.log('rerender, book')} */}
      book list <button onClick={addBook}>add mock book</button>
    </StyledBookList>
  );
};
