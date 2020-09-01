// store.js
import React, { createContext, useReducer, FC } from 'react';
import { client as bookServiceClient } from './services/BookService';
import { client as bookStorageClient } from './services/StorageService';
import { Book } from './types';
import { AppCtx, rootReducer } from './features';

const store = createContext<AppCtx>({} as AppCtx);
const { Provider } = store;

/**
 * Little note:
 * This book app is small and there is low frequency of state updates. Therefore React ctx approach is good regarding cost/perf in my opinion.
 * I'm aware that e.g. redux has solutions similar to ones I have here (and of course, much more robust & bulletproof)
 */
const StateProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, {
    books: [],
    whishList: [],
    isLoading: false,
  });

  async function addToWishList(book: Book) {
    let savedBook = await bookStorageClient.load(book.id);
    if (savedBook) {
      removeFromWishList(book);
    } else {
      await bookStorageClient.persist(book);
      dispatch({ type: 'addToWishList', payload: book });
    }
  }

  async function removeFromWishList(book: Book) {
    await bookStorageClient.remove(book.id);
    dispatch({ type: 'removeFromWishList', payload: book });
  }

  async function loadWishListFromStore() {
    const books = await bookStorageClient.loadAll();
    dispatch({ type: 'loadWishListFromStore', payload: books });
  }

  // TODO - pagination?
  async function fetchBooks(type: string) {
    dispatch({ type: 'fetchBooks.pending' });
    try {
      const books = await bookServiceClient.getBooksByType(type);
      dispatch({ type: 'fetchBooks.fulfilled', payload: books });
    } catch (e) {
      dispatch({ type: 'fetchBooks.rejected', payload: [] });
    }
  }

  return (
    <Provider
      value={{
        actions: {
          addToWishList,
          fetchBooks,
          loadWishListFromStore,
          removeFromWishList,
        },
        state,
      }}
    >
      {children}
    </Provider>
  );
};

export { store, StateProvider };
