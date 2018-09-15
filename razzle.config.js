const { GenerateSW } = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

module.exports = {
  modify: (config, { target }) =>
    target === 'web'
      ? {
          ...config,
          plugins: [
            ...config.plugins,
            new GenerateSW({
              clientsClaim: true,
              skipWaiting: true,
              runtimeCaching: [
                {
                  urlPattern: /images/,
                  handler: 'cacheFirst'
                },
                {
                  urlPattern: new RegExp(
                    '^https://fonts.(?:googleapis|gstatic).com/(.*)'
                  ),
                  handler: 'cacheFirst'
                },
                {
                  urlPattern: /.*/,
                  handler: 'networkFirst'
                }
              ]
            }),
            new WebpackPwaManifest({
              name: 'Sigma',
              short_name: 'Sigma',
              description: 'Custom Excel doc web presentation.',
              theme_color: '#000000',
              background_color: '#303030',
              inject: false,
              fingerprints: false,
              icons: [
                {
                  src: path.resolve('public/icon.png'),
                  sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
                }
              ]
            })
          ]
        }
      : config
};
