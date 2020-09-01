import React, { FC, useState, useRef } from 'react';
import Styled from './styles';
import useTextOverflow from '../../hooks/useTextOverflow';
import { Book as BookType } from '../../types';
import { Hearth, Button } from '../common';

interface BookProps {
  book: BookType;
  onWishListAppend: () => void;
}

const Book: FC<BookProps> = ({ onWishListAppend, book }) => {
  const MAX_LINES = 3;

  const date = new Date(book.published).getFullYear() || book.published;
  const textRef = useRef<HTMLDivElement>(null);
  const isOverflowing = useTextOverflow(textRef);
  const [showFullDescription, setShowFullDescription] = useState(false);

  function toggleShowFullDescription() {
    setShowFullDescription(v => !v);
  }

  return (
    <Styled.Book tabIndex={0} onKeyPress={onWishListAppend} data-testid="book">
      <Styled.ImageWrapper>
        <img
          alt={`${book.title} cover`}
          src={book.image}
          data-testid="cover-image"
        />
      </Styled.ImageWrapper>
      <Styled.Info>
        <h3 data-testid="book-title">{book.title}</h3>
        <Styled.Metadata>
          <Styled.Left>
            {book.authors?.map((author, index, authors) => (
              <span key={`${book.id}-${author}`} data-testid="book-author">{`${
                index === authors.length - 1 ? author : author + ','
              }`}</span>
            ))}
            <Styled.Date data-testid="book-publish-date">- {date}</Styled.Date>
          </Styled.Left>
          <Styled.Right data-testid="book-publisher">
            {book.publisher}
          </Styled.Right>
        </Styled.Metadata>
        <Styled.Description
          isOverflowing={isOverflowing}
          showFullDetail={showFullDescription}
          maxLines={MAX_LINES}
          data-testid="book-description"
        >
          <span ref={textRef}>{book.description}</span>
          {isOverflowing && (
            <Button
              data-testid="book-description-detailed-info"
              onClick={toggleShowFullDescription}
            >
              {!showFullDescription ? 'see more...' : 'see less...'}
            </Button>
          )}
        </Styled.Description>
      </Styled.Info>
      <Hearth
        data-testid="book-wishlist"
        active={book.wishlisted}
        onClick={onWishListAppend}
      ></Hearth>
    </Styled.Book>
  );
};

export default Book;
