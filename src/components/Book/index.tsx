import React, { FC } from 'react';
import Styled from './styles';
import { Book as BookType } from '../../services/BookService';

interface BookProps {
  book: BookType;
}

const Book: FC<BookProps> = ({ book }) => (
  <Styled.Book>
    <img alt={`${book.title} cover`} src={book.image} />
    <Styled.Info>
      <h3>{book.title}</h3>
      <Styled.Authors>
        {book.authors?.map((author, index, authors) => (
          <span key={book.id}>{`${
            index === authors.length - 1 ? author : author + ','
          }`}</span>
        ))}
      </Styled.Authors>
    </Styled.Info>
  </Styled.Book>
);

export default Book;
