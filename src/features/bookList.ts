import { Book } from '../types';
import { Action } from '.';

export interface FetchBooksActionFulfilled extends Action {
  payload: Book[];
}

export interface BookListActionList {
  fetchBooks: (type: string) => void;
}
