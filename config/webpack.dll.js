const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

const appPath = path.join(__dirname, '..')
const srcPath = path.join(appPath, 'src')
const srcDllPath = path.join(srcPath, 'dll')
const buildPath = path.join(appPath, 'build')
const buildDllPath = path.join(buildPath, 'dll')

module.exports = {
  node: {
    fs: 'empty'
  },
  entry: {
    vendor: [
      path.resolve(srcDllPath, 'vendor.js')
    ]
  },
  output: {
    path: buildDllPath,
    filename: 'dll.[name].js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(buildDllPath, '[name]-manifest.json'),
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
