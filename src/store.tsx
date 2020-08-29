// store.js
import React, { createContext, useReducer, FC } from 'react';
import { Book } from './services/BookService';

interface Action {
  type: string;
  payload?: any;
}

interface AddToWishListAction {
  payload: Book;
}

interface WishListActionList {
  addToWishList: (book: Book) => void;
}

interface BookListActionList {
  fetchBooks: () => void;
}

interface AppState {
  whishList: Book[];
  books: Book[];
}

type AppActions = WishListActionList & BookListActionList;

interface AppCtx {
  state: AppState;
  actions: AppActions;
}

const store = createContext<AppCtx>({} as AppCtx);
const { Provider } = store;

/**
 * This book app is small and there is low frequency of state updates. Therefore React ctx approach is good regarding cost/perf.
 */
const StateProvider: FC = ({ children }) => {
  const initialState: AppCtx = {
    state: { books: [], whishList: [] },
    actions: {
      addToWishList,
      fetchBooks,
    },
  };
  const [state, dispatch] = useReducer(
    (state: AppState, action: Action) => {
      switch (action.type) {
        case 'addToWishList':
          const whishList = [
            ...state.whishList,
            (action as AddToWishListAction).payload,
          ];
          return { ...state, whishList };
        default:
          throw new Error();
      }
    },
    { ...initialState.state },
  );

  function addToWishList(book: Book) {
    dispatch({ type: 'addToWishList', payload: book });
  }

  // TODO - pagination?
  function fetchBooks() {
    dispatch({ type: 'fetchBooks' });
  }

  return (
    <Provider value={{ actions: initialState.actions, state: state }}>
      {/* {console.log('rerender', state)} */}
      {children}
    </Provider>
  );
};

export { store, StateProvider };
