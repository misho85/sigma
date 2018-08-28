import React from 'react';
import Appbar from './components/layout/Appbar';
import SheetJsApp from './components/Datatables/SheetJsApp';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import CssBaseline from '@material-ui/core/CssBaseline';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';

library.add(faGithub, faPlaneDeparture);

const theme = createMuiTheme({
  palette: {
    primary: blue,
    type: 'dark'
  }
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Appbar />
      <SheetJsApp />
    </MuiThemeProvider>
  );
};

export default App;
