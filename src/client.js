import App from './common/App';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import React, { Component } from 'react';
import { hydrate } from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createGenerateClassName
} from '@material-ui/core/styles';
import theme from './common/utils/theme';

// This is needed in order to deduplicate the injection of CSS in the page.
const sheetsManager = new WeakMap();
// Create a new class name generator.
const generateClassName = createGenerateClassName();

class Client extends Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider sheetsManager={sheetsManager} theme={theme}>
          <HelmetProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </HelmetProvider>
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}

hydrate(<Client />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
