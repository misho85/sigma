import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet-async';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './pages/Home';

import './utils/icons';

const App = () => (
  <Fragment>
    <Helmet>
      <title>SSSR</title>
      <html lang="en" />
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="SSR on steroid!" />
      <meta name="theme-color" content="#008f68" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
      />
    </Helmet>
    <CssBaseline />
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </Fragment>
);

export default App;
