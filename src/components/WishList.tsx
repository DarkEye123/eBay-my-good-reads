import React, { useContext, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { store } from '../store';
import { darken } from 'polished';

const StyledWishList = styled.aside`
  ${({ theme }) => css`
    grid-area: wishlist;
    margin-top: ${theme.space.md};
    margin-bottom: ${theme.space.md};
    @media only screen and (min-width: ${theme.breakpoints.md}) {
      margin-top: 0;
      margin-bottom: 0;
    }
    background-color: ${theme.color.lightShades};

    div {
      position: sticky;
      top: ${theme.space.lg};
      display: flex;
      flex-direction: column;
    }

    ul {
      list-style-type: none;
      font-size: ${theme.fontSizes.sm};
      padding: calc(${theme.fontSizes.sm}*2);
      margin-top: 0;
    }

    li:hover,
    li:focus {
      list-style-type: '✘ ';
      cursor: pointer;
    }

    li + li {
      padding-top: ${theme.space.md};
    }

    h2 {
      text-align: center;
      background-color: ${darken(0.11, theme.color.main)};
      color: white;
    }

    .centered {
      text-align: center;
    }
  `}
`;

export default () => {
  const { state, actions } = useContext(store);

  useEffect(() => {
    actions.loadWishListFromStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledWishList>
      <div>
        <h2>Wish List</h2>
        {/* menu needs menuitems, empty menu is bad for accessibility, that is why this strange solution */}
        {(state.whishList.length > 0 && (
          <ul role="menu">
            {state.whishList.map(book => (
              <li
                role="menuitem"
                tabIndex={0}
                onClick={() => actions.addToWishList(book)}
                onKeyPress={() => actions.addToWishList(book)}
                key={book.id}
              >
                {book.title}
              </li>
            ))}
          </ul>
        )) || <span className="centered">Empty (╯°□°)╯︵ ┻━┻</span>}
      </div>
    </StyledWishList>
  );
};
