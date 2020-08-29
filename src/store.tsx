// store.js
import React, {createContext, useReducer, FC} from 'react';
import { Book } from './services/BookService';

const initialState = {};
const store = createContext(initialState);
const { Provider } = store;

interface Action {
  type: string
}

const StateProvider: FC = ( { children } ) => {
  const [state, dispatch] = useReducer((state: Book[], action: Action) => {
    switch(action.type) {
      case 'addToWishList':
        const newState = // do something with the action
        return newState;
      default:
        throw new Error();
    };
  }, initialState);

  function addToWishList(book: Book) {
    dispatch({type: 'addToWishList'})
  }

  return <Provider value={{ state, addToWishList }}>{children}</Provider>;
};

export { store, StateProvider }