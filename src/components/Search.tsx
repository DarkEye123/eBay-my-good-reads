import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledSearch = styled.input`
  grid-area: search;
`;

type SearchProps = InputHTMLAttributes<HTMLInputElement> &
  Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>>;

export default (props: SearchProps) => (
  <StyledSearch
    className="full-width"
    autoFocus
    name="gsearch"
    type="search"
    placeholder="Search for books to add to your reading list and press Enter"
    {...props}
  />
);
