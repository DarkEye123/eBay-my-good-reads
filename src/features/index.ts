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
  wishList: Book[];
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
      const wishList = (action as LoadWishListFromStoreAction).payload;
      return { ...state, wishList };
    }

    case 'addToWishList': {
      const payload = (action as AddToWishListAction).payload;
      let wishList;
      const book = state.wishList.find(b => b === payload);
      if (!book) {
        payload.wishlisted = true;
        wishList = [...state.wishList, payload];
      } else {
        book.wishlisted = false;
        wishList = state.wishList.filter(b => b !== book);
      }
      return { ...state, wishList };
    }

    case 'removeFromWishList': {
      const payload = (action as RemoveFromWishListAction).payload;
      const book = state.wishList.find(b => b === payload);
      if (book) {
        book.wishlisted = false;
        const wishList = state.wishList.filter(b => b !== book);
        return { ...state, wishList };
      }
      return state;
    }

    case 'fetchBooks.pending':
      return { ...state, isLoading: true };
    case 'fetchBooks.fulfilled':
      // get books from wishlist if possible
      // TODO make it performant -- not a priority though
      const books = (action as FetchBooksActionFulfilled).payload.map(
        book => state.wishList.find(b => b.id === book.id) || book,
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
