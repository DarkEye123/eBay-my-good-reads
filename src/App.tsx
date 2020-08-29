import React from "react";
import { ThemeProvider } from "styled-components";
import Home from "./views/Home";
import theme from "./theme";
import { StateProvider as BookStateProvider } from "./store";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BookStateProvider>
        <Home></Home>
      </BookStateProvider>
    </ThemeProvider>
  );
}

export default App;
