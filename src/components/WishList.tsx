import React, { useContext } from 'react';
import styled from 'styled-components';
import { store } from '../store';

const StyledWishList = styled.div`
  grid-area: wishlist;
`;

export default () => {
  const { state } = useContext(store);
  return <StyledWishList>{state.books.length}</StyledWishList>;
};
