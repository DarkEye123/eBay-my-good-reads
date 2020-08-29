import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from './theme';

// import BookSearch from './book-search/BookSearch';

const StyledApp = styled.div`
  header {
    color: ${({ theme }) => theme.color.main};
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <header>
          <h1>My Good Reads</h1>
        </header>
        <main>
          <div>dummy</div>
        </main>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
