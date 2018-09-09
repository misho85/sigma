import App from './common/App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import theme from './common/theme';
import { renderToString } from 'react-dom/server';
import { JssProvider, SheetsRegistry } from 'react-jss';
import {
  MuiThemeProvider,
  createGenerateClassName
} from '@material-ui/core/styles';
import { dom as fontawesomeDom } from '@fortawesome/fontawesome-svg-core';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    // This is needed in order to deduplicate the injection of CSS in the page.
    const sheetsManager = new WeakMap();
    // This is needed in order to inject the critical CSS.
    const sheetsRegistry = new SheetsRegistry();
    // Create a new class name generator.
    const generateClassName = createGenerateClassName();

    const context = {};
    const markup = renderToString(
      <JssProvider
        registry={sheetsRegistry}
        generateClassName={generateClassName}
      >
        <MuiThemeProvider sheetsManager={sheetsManager} theme={theme}>
          <StaticRouter context={context} location={req.url}>
            <App />
          </StaticRouter>
        </MuiThemeProvider>
      </JssProvider>
    );

    // Grab the CSS from our sheetsRegistry.
    const css = sheetsRegistry.toString();

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        ${css ? `<style id='jss-server-side'>${css}</style>` : ''}
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
        <style>
        ${fontawesomeDom.css()}
        </style>
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
      );
    }
  });

export default server;
