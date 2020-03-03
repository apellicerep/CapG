import React from 'react';
import Header2 from '../components/ui/Header2'
import { ThemeProvider } from '@material-ui/styles'
import theme from './ui/Theme'
import Main from '../components/ui/Main'


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header2 />
      <Main />

    </ThemeProvider>

  );
}

export default App;
