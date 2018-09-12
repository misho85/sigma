const modifyBuilder = require('razzle-plugin-pwa').default;
const path = require('path');
const pwaConfig = {
  swDest: 'sw.js',
  clientsClaim: true,
  skipWaiting: true
};

const manifestConfig = {
  filename: 'manifest.json',
  name: 'Razzle App',
  short_name: 'Razzle',
  description: 'Another Razzle App',
  orientation: 'portrait',
  display: 'standalone',
  start_url: '.',
  theme_color: '#ffffff',
  background_color: '#ffffff',
  icons: [
    {
      src: require.resolve(path.join(__dirname, 'public', 'icon.png')),
      sizes: '512x512',
      type: 'image/png'
    }
  ]
};

const modify = modifyBuilder({ pwaConfig, manifestConfig });

module.exports = {
  plugins: [{ func: modify }]
};
