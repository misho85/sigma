import React, { Component, Fragment } from 'react';
import Appbar from '../components/layout/AppBar';
import SheetJsApp from '../components/datatables/SheetJsApp';
// import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// import blue from '@material-ui/core/colors/blue';

class Home extends Component {
  state = {
    type: true
  };

  changeTheme = () => this.setState({ type: !this.state.type });

  render() {
    // const theme = createMuiTheme({
    //   palette: {
    //     primary: blue,
    //     type: this.state.type ? 'dark' : 'light'
    //   }
    // });

    return (
      <Fragment>
        <Appbar changeTheme={this.changeTheme} />
        <SheetJsApp />
      </Fragment>
    );
  }
}

export default Home;
