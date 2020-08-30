import React, { useState, ChangeEvent, useContext, useMemo } from 'react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import Search from '../components/Search';
import BookList from '../components/BookList';
import WishList from '../components/WishList';
import { store } from '../store';

const StyledHomeView = styled.div`
  height: 100vh;
  header {
    width: ${({ theme }) => theme.sizes.full};
    display: flex;
    justify-content: center;
    background-color: ${({ theme }) => theme.color.lightAccent};
    color: ${({ theme }) => theme.color.lightShades};
    height: 5rem;
  }
  main {
    display: grid;
    padding: ${({ theme }) => theme.space[16]};
    grid-template-areas:
      'search wishlist'
      'book-list wishlist';
    grid-template-rows: ${({ theme }) => `${theme.sizes[8]} 1fr`};
    grid-template-columns: 3fr 1fr;
    row-gap: ${({ theme }) => theme.space[8]};
    column-gap: ${({ theme }) => theme.space[20]};
    height: ${({ theme }) =>
      `calc(100% - ${theme.space[20]} - 2*${theme.space[16]})`};
  }
`;

export default function Home() {
  const [bookType, setBookType] = useState('');
  const { actions } = useContext(store);

  const debouncedFetchBooks = useMemo(() => debounce(actions.fetchBooks, 500), [
    actions.fetchBooks,
  ]);

  function handleSearchOnChange(e: ChangeEvent<HTMLInputElement>) {
    setBookType(e.currentTarget.value);
    debouncedFetchBooks(e.currentTarget.value);
  }

  return (
    <StyledHomeView>
      <header>
        <h1>My Good Reads</h1>
      </header>
      <main>
        <Search value={bookType} onChange={handleSearchOnChange}></Search>
        <BookList></BookList>
        <WishList></WishList>
      </main>
    </StyledHomeView>
  );
}
