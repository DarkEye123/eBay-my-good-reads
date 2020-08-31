import React, { FC, useEffect, useState, useRef } from 'react';
import Styled from './styles';
import useTextOverflow from '../../hooks/useTextOverflow';
import Button from '../Button';
import { Book as BookType } from '../../services/BookService';

interface BookProps {
  book: BookType;
}

const Book: FC<BookProps> = ({ book }) => {
  const MAX_HEIGHT = '400px';
  const MAX_LINES = 3;

  const date = new Date(book.published).getFullYear() || book.published;
  const textRef = useRef<HTMLDivElement>(null);
  const isOverflowing = useTextOverflow(textRef);
  const [showFullDescription, setShowFullDescription] = useState(false);

  function toggleShowFullDescription() {
    if (isOverflowing && textRef.current) {
      setShowFullDescription(prev => !prev);
      if (!showFullDescription) {
        textRef.current.style.maxHeight = MAX_HEIGHT;
        textRef.current.style.overflow = 'auto';
      } else {
        textRef.current.style.maxHeight = `${MAX_LINES}.6em`;
        textRef.current.style.overflow = 'hidden';
      }
    }
  }

  return (
    <Styled.Book>
      <img alt={`${book.title} cover`} src={book.image} />
      <Styled.Info>
        <h3>{book.title}</h3>
        <Styled.Authors>
          {book.authors?.map((author, index, authors) => (
            <span key={`${book.id}-${author}`}>{`${
              index === authors.length - 1 ? author : author + ','
            }`}</span>
          ))}
          <Styled.Date>- {date}</Styled.Date>
        </Styled.Authors>
        <Styled.Description isOverflowing={isOverflowing} maxLines={MAX_LINES}>
          <span ref={textRef}>{book.description}</span>
          {isOverflowing && (
            <Button onClick={toggleShowFullDescription}>
              {!showFullDescription ? 'see more...' : 'see less...'}
            </Button>
          )}
        </Styled.Description>
      </Styled.Info>
    </Styled.Book>
  );
};

export default Book;
