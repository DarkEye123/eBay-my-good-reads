// store.js
import React, {createContext, useReducer, FC} from 'react';
import { Book } from './services/BookService';

interface Action {
  type: string
  payload?: any;
}

interface AddToWishListAction {
  payload: Book
}

interface AppState {
  whishList: Book[];
  books: Book[],
  addToWishList: 
}

const initialState: AppState = {whishList: [], books: []};
const store = createContext(initialState);
const { Provider } = store;

/**
 * This book app is small and there is low frequency of state updates. Therefore React ctx approach is good regarding cost/perf. 
 */
const StateProvider: FC = ( { children } ) => {
  // const [state, dispatch] = useReducer((state: AppState, action: Action) => {
  //   switch(action.type) {
  //     case 'addToWishList':
  //       const whishList = [...state.whishList, (action as AddToWishListAction).payload] // do something with the action
  //       return {...state, whishList};
  //     default:
  //       throw new Error();
  //   };
  // }, {books: [], whishList: []});

  function addToWishList(book: Book) {
    dispatch({type: 'addToWishList', payload: book})
  }

  // TODO - pagination?
  function fetchBooks() {
    dispatch({type: 'fetchBooks'})
  }

  return <Provider value={{books: state.books, whishList: state.whishList, addToWishList}}>{children}</Provider>;
};

export { store, StateProvider }