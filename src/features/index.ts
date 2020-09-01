import { Book } from '../types';
import {
  WishListActionList,
  AddToWishListAction,
  LoadWishListFromStoreAction,
  RemoveFromWishListAction,
} from './wishList';
import { BookListActionList, FetchBooksActionFulfilled } from './bookList';

export interface Action {
  type: string;
  payload?: any;
}

interface AppState {
  whishList: Book[];
  books: Book[];
  isLoading: boolean; // generalization of the loading state for whole app - derived from book request
}

type AppActions = WishListActionList & BookListActionList;

export interface AppCtx {
  state: AppState;
  actions: AppActions;
}

// TODO - if possible split to slice reducers
const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case 'loadWishListFromStore': {
      const whishList = (action as LoadWishListFromStoreAction).payload;
      return { ...state, whishList };
    }

    case 'addToWishList': {
      const payload = (action as AddToWishListAction).payload;
      let whishList;
      const book = state.whishList.find(b => b === payload);
      if (!book) {
        payload.wishlisted = true;
        whishList = [...state.whishList, payload];
      } else {
        book.wishlisted = false;
        whishList = state.whishList.filter(b => b !== book);
      }
      return { ...state, whishList };
    }

    case 'removeFromWishList': {
      const payload = (action as RemoveFromWishListAction).payload;
      const book = state.whishList.find(b => b === payload);
      if (book) {
        book.wishlisted = false;
        const whishList = state.whishList.filter(b => b !== book);
        return { ...state, whishList };
      }
      return state;
    }

    case 'fetchBooks.pending':
      return { ...state, isLoading: true };
    case 'fetchBooks.fulfilled':
      // get books from whishlist if possible
      // TODO make it performant -- not a priority though
      const books = (action as FetchBooksActionFulfilled).payload.map(
        book => state.whishList.find(b => b.id === book.id) || book,
      );
      return {
        ...state,
        isLoading: false,
        books,
      };
    case 'fetchBooks.rejected':
      return state;
    default:
      throw new Error();
  }
};

export { reducer as rootReducer };
