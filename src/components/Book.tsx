import React, { FC } from 'react';
import { Book as BookType } from '../services/BookService';

interface BookProps {
  book: BookType;
}

const Book: FC<BookProps> = ({ book }) => <div>{book.title}</div>;

export default Book;
