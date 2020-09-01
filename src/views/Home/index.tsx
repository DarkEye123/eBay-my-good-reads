import React, { useState, ChangeEvent, useContext, useMemo } from 'react';
import debounce from 'lodash.debounce';
import Search from '../../components/Search';
import BookList from '../../components/BookList';
import WishList from '../../components/WishList';
import { store } from '../../store';
import * as Styled from '../styles';
import { Layout } from './styles';

const DEBOUNCE_LIMIT = 500;

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
    <Styled.Page>
      <Styled.Header>
        <h1>My Good Reads</h1>
      </Styled.Header>
      <Layout>
        <main>
          <Search value={bookType} onChange={handleSearchOnChange}></Search>
          <BookList></BookList>
        </main>
        <WishList></WishList>
      </Layout>
    </Styled.Page>
  );
}
