const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const appPath = path.join(__dirname, '..')
const srcPath = path.join(appPath, 'src')
const buildPath = path.join(appPath, 'build')

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
      manifest: path.join(buildPath, 'vendor-manifest.json')
    })
  ]
}
