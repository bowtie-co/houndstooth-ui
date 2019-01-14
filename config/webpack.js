const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const appPath = path.join(__dirname, '..')
const srcPath = path.join(appPath, 'src')
// const buildPath = path.join(appPath, 'build')
const publicPath = path.join(appPath, 'public')
const dllPath = path.join(publicPath, 'dll')

const buildAliases = (fromPaths) => {
  const aliases = {}
  const pathList = Array.isArray(fromPaths) ? fromPaths : [ fromPaths ]

  pathList.forEach(fromPath => {
    const fullFromPath = path.join(srcPath, fromPath)

    const srcFiles = fs.readdirSync(fullFromPath)

    srcFiles.forEach(fileName => {
      const filePath = path.join(fullFromPath, fileName)

      if (fs.statSync(filePath).isDirectory()) {
        aliases[fileName] = filePath
      }
    })
  })

  return aliases
}

module.exports = {
  alias: buildAliases([ '.', 'components' ]),
  plugins: [
    new webpack.DllReferencePlugin({
      context: appPath,
      manifest: path.resolve(dllPath, 'vendor-manifest.json')
    })
  ]
  // configure: (webpackConfig, { env, paths }) => {
  //   const overrides = {}

  //   if (env === 'production') {
  //     overrides.plugins = [
  //       new webpack.DllReferencePlugin({
  //         context: paths.appPath,
  //         manifest: path.join(paths.appBuild, 'dll', 'vendor-manifest.json')
  //       })
  //     ]
  //   }

  //   return Object.assign(webpackConfig, overrides)
  // }
}
