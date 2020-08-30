// store.js
import React, { createContext, useReducer, FC } from 'react';
import { client as bookServiceClient, Book } from './services/BookService';

interface Action {
  type: string;
  payload?: any;
}

interface AddToWishListAction {
  payload: Book;
}

interface FetchBooksActionFulfilled {
  payload: Book[];
}

interface WishListActionList {
  addToWishList: (book: Book) => void;
}

interface BookListActionList {
  fetchBooks: (type: string) => void;
}

interface AppState {
  whishList: Book[];
  books: Book[];
  isLoading: boolean; // generalization of the loading state for whole app - derived from book request
}

type AppActions = WishListActionList & BookListActionList;

interface AppCtx {
  state: AppState;
  actions: AppActions;
}

const store = createContext<AppCtx>({} as AppCtx);
const { Provider } = store;

const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case 'addToWishList':
      const whishList = [
        ...state.whishList,
        (action as AddToWishListAction).payload,
      ];
      return { ...state, whishList };
    case 'fetchBooks.pending':
      return { ...state, isLoading: true };
    case 'fetchBooks.fulfilled':
      return {
        ...state,
        isLoading: false,
        books: (action as FetchBooksActionFulfilled).payload,
      };
    case 'fetchBooks.rejected':
      return state;
    default:
      throw new Error();
  }
};

/**
 * Little note:
 * This book app is small and there is low frequency of state updates. Therefore React ctx approach is good regarding cost/perf in my opinion.
 * I'm aware that e.g. redux has solutions similar to ones I have here (and of course, much more robust & bulletproof)
 */
const StateProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    books: [],
    whishList: [],
    isLoading: false,
  });

  function addToWishList(book: Book) {
    dispatch({ type: 'addToWishList', payload: book });
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
        },
        state,
      }}
    >
      {children}
    </Provider>
  );
};

export { store, StateProvider };
