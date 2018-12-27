const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

const appPath = path.join(__dirname, '..')
const dllInputPath = path.join(appPath, 'src', 'dll')
const dllOutputPath = path.join(appPath, 'public', 'dll')

module.exports = {
  mode: 'production',
  node: {
    fs: 'empty'
  },
  entry: {
    vendor: [
      path.resolve(dllInputPath, 'vendor.js')
    ]
  },
  output: {
    path: dllOutputPath,
    filename: 'dll.[name].js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(dllOutputPath, '[name]-manifest.json'),
      name: '[name]'
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  optimization: {
    minimizer: [
      new TerserPlugin()
    ]
  },
  resolve: {
    modules: [ 'node_modules' ]
  }
}
