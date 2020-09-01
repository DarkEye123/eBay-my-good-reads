import React, { FC, useState, useRef } from 'react';
import Styled from './styles';
import useTextOverflow from '../../hooks/useTextOverflow';
import { Book as BookType } from '../../types';

interface BookProps {
  book: BookType;
}

const Book: FC<BookProps> = ({ book }) => {
  const MAX_LINES = 3;

  const date = new Date(book.published).getFullYear() || book.published;
  const textRef = useRef<HTMLDivElement>(null);
  const isOverflowing = useTextOverflow(textRef);
  const [showFullDescription, setShowFullDescription] = useState(false);

  function toggleShowFullDescription() {
    setShowFullDescription(v => !v);
  }

  return (
    <Styled.Book>
      <div>
        <img alt={`${book.title} cover`} src={book.image} />
      </div>
      <Styled.Info>
        <h3>{book.title}</h3>
        <Styled.Metadata>
          <Styled.Left>
            {book.authors?.map((author, index, authors) => (
              <span key={`${book.id}-${author}`}>{`${
                index === authors.length - 1 ? author : author + ','
              }`}</span>
            ))}
            <Styled.Date>- {date}</Styled.Date>
          </Styled.Left>
          <Styled.Right>{book.publisher}</Styled.Right>
        </Styled.Metadata>
        <Styled.Description
          isOverflowing={isOverflowing}
          showFullDetail={showFullDescription}
          maxLines={MAX_LINES}
        >
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
