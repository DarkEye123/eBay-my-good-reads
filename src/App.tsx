import React from 'react';
import { ThemeProvider } from 'styled-components';
import Home from './views/Home';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home></Home>
    </ThemeProvider>
  );
}

export default App;
