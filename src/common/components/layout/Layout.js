import React, { Component, Fragment } from 'react';
import Appbar from './Appbar';
// import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// import blue from '@material-ui/core/colors/blue';

class Layout extends Component {
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
        {this.props.children}
      </Fragment>
    );
  }
}

export default Layout;
