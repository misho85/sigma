import App from './common/App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { JssProvider, SheetsRegistry } from 'react-jss';
import {
  MuiThemeProvider,
  createGenerateClassName
} from '@material-ui/core/styles';
import { dom as fontawesomeDom } from '@fortawesome/fontawesome-svg-core';
import theme from './common/theme';

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

    const helmetContext = {};
    const context = {};
    // Render the component to a string
    const markup = renderToString(
      <JssProvider
        registry={sheetsRegistry}
        generateClassName={generateClassName}
      >
        <MuiThemeProvider sheetsManager={sheetsManager} theme={theme}>
          <HelmetProvider context={helmetContext}>
            <StaticRouter context={context} location={req.url}>
              <App />
            </StaticRouter>
          </HelmetProvider>
        </MuiThemeProvider>
      </JssProvider>
    );

    const { helmet } = helmetContext;

    // Grab the CSS from our sheetsRegistry.
    const css = sheetsRegistry.toString();

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!DOCTYPE html>
    <html ${helmet.htmlAttributes.toString()}>
    <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
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
        <style>${fontawesomeDom.css()}</style>
    </head>
    <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${markup}</div>
    </body>
    </html>`
      );
    }
  });

export default server;
