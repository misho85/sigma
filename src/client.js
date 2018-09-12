import App from './common/App';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import React, { Component } from 'react';
import { hydrate } from 'react-dom';
import theme from './common/theme';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createGenerateClassName
} from '@material-ui/core/styles';

class Main extends Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('service worker registration successful');
        })
        .catch(err => {
          console.warn('service worker registration failed', err.message);
        });
    }
  }

  render() {
    return <App />;
  }
}

// This is needed in order to deduplicate the injection of CSS in the page.
const sheetsManager = new WeakMap();

// Create a new class name generator.
const generateClassName = createGenerateClassName();

hydrate(
  <JssProvider generateClassName={generateClassName}>
    <MuiThemeProvider sheetsManager={sheetsManager} theme={theme}>
      <HelmetProvider>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </HelmetProvider>
    </MuiThemeProvider>
  </JssProvider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
