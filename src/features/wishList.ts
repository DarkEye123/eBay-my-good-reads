import { Book } from '../types';
import { Action } from '.';

export interface AddToWishListAction extends Action {
  payload: Book;
}

export interface RemoveFromWishListAction extends Action {
  payload: Book;
}

export interface LoadWishListFromStoreAction extends Action {
  payload: Book[];
}

export interface WishListActionList {
  addToWishList: (book: Book) => void;
  removeFromWishList: (book: Book) => void;
  loadWishListFromStore: () => void;
}
