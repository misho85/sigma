import React, { Component } from 'react';
import Appbar from './components/layout/AppBar';
import SheetJsApp from './components/Datatables/SheetJsApp';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import CssBaseline from '@material-ui/core/CssBaseline';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';

library.add(faGithub, faPlaneDeparture);

class App extends Component {
  state = {
    type: true
  };

  changeTheme = () => this.setState({ type: !this.state.type });

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: blue,
        type: this.state.type ? 'dark' : 'light'
      }
    });

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Appbar changeTheme={this.changeTheme} />
        <SheetJsApp />
      </MuiThemeProvider>
    );
  }
}

export default App;
