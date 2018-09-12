const modifyBuilder = require('razzle-plugin-pwa').default;
const path = require('path');
const pwaConfig = {
  swDest: 'sw.js',
  clientsClaim: true,
  skipWaiting: true
};

const manifestConfig = {
  filename: 'manifest.json',
  name: 'Sigma',
  short_name: 'Sigma',
  description: 'custom Excel doc web presentation',
  display: 'standalone',
  start_url: '.',
  theme_color: '#000000',
  background_color: '#303030',
  icons: [
    {
      src: path.resolve('public/icon.png'),
      sizes: [96, 128, 192, 256, 384, 512]
    }
  ]
};

const modify = modifyBuilder({ pwaConfig, manifestConfig });

module.exports = {
  plugins: [{ func: modify }]
};
