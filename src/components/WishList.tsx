import React, { useContext } from 'react';
import styled from 'styled-components';
import { store } from '../store';

const StyledWishList = styled.div`
  grid-area: wishlist;
`;

export default () => {
  const { state, actions } = useContext(store);
  return (
    <StyledWishList>
      {/* {console.log('rerender from wishlist')} */}
      {state.books.length}
    </StyledWishList>
  );
};
