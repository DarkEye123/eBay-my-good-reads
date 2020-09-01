import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import VisuallyHidden from '@reach/visually-hidden';

const StyledSearch = styled.input`
  grid-area: search;
`;

type SearchProps = InputHTMLAttributes<HTMLInputElement> &
  Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>>;

export default (props: SearchProps) => (
  <>
    <VisuallyHidden>
      <label htmlFor="search" data-testid="search-label">
        Search bar
      </label>
    </VisuallyHidden>
    <StyledSearch
      className="full-width"
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus
      name="search"
      id="search"
      type="search"
      placeholder="Search for books to add to your reading list and press Enter"
      data-testid="search-input"
      {...props}
    />
  </>
);
