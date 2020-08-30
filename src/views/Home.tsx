import React, { useState, ChangeEvent, useContext, useMemo } from 'react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import Search from '../components/Search';
import BookList from '../components/BookList';
import WishList from '../components/WishList';
import { store } from '../store';

const DEBOUNCE_LIMIT = 500;

const StyledHomeView = styled.div`
  height: 100vh;
  header {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: ${({ theme }) => theme.color.lightAccent};
    color: ${({ theme }) => theme.color.lightShades};
    height: 5rem;
  }
  main {
    display: grid;
    padding: ${({ theme }) => theme.space.xl};
    grid-template-areas:
      'search wishlist'
      'book-list wishlist';
    grid-template-rows: ${({ theme }) => `${theme.sizes.xs} 1fr`};
    grid-template-columns: 3fr 1fr;
    row-gap: ${({ theme }) => theme.space.lg};
    column-gap: ${({ theme }) => theme.space.xxl};
    height: ${({ theme }) =>
      `calc(100% - ${theme.space.xxl} - 2*${theme.space.xl})`};
  }
`;

export default function Home() {
  const [bookType, setBookType] = useState('');
  const { actions } = useContext(store);

  const debouncedFetchBooks = useMemo(
    () => debounce(actions.fetchBooks, DEBOUNCE_LIMIT),
    [actions.fetchBooks],
  );

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
