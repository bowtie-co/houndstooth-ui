const fs = require('fs')
const path = require('path')
const basePath = path.join(__dirname, '..', 'src')

const buildAliases = (fromPaths) => {
  const aliases = {}
  const pathList = Array.isArray(fromPaths) ? fromPaths : [ fromPaths ]

  pathList.forEach(fromPath => {
    const fullFromPath = path.join(basePath, fromPath)

    const srcFiles = fs.readdirSync(fullFromPath)

    console.log(srcFiles)

    srcFiles.forEach(fileName => {
      const filePath = path.join(fullFromPath, fileName)

      if (fs.statSync(filePath).isDirectory()) {
        aliases[fileName] = filePath
      }
    })
  })

  return aliases
}

module.exports = buildAliases([ '.', 'components' ])
