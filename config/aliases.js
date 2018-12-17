const path = require('path')
// const paths = require('./paths')

module.exports = {
  // Support React Native Web
  // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
  'react-native': 'react-native-web',
  'atoms': path.resolve(__dirname, '../src/components/atoms'),
  'ecosystems': path.resolve(__dirname, '../src/components/ecosystems'),
  'environments': path.resolve(__dirname, '../src/components/environments'),
  'molecules': path.resolve(__dirname, '../src/components/molecules'),
  'organisms': path.resolve(__dirname, '../src/components/organisms'),
  'components': path.resolve(__dirname, '../src/components'),
  'helpers': path.resolve(__dirname, '../src/helpers'),
  'images': path.resolve(__dirname, '../src/images'),
  'lib': path.resolve(__dirname, '../src/lib'),
  'Routes': path.resolve(__dirname, '../src/Routes'),
  'scss': path.resolve(__dirname, '../src/scss'),
  'root': path.resolve(__dirname, '../src')
}
